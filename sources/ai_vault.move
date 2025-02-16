module ai_vault::ai_vault_module {
    use std::signer;
    use aptos_framework::coin::{Self, Coin};
    use aptos_framework::aptos_coin::AptosCoin;
    use liquidswap_v05::router;
    use liquidswap_v05::curves::Uncorrelated;
    use std::type_info::{Self, TypeInfo};
    use std::vector;

    // Contract Constants and Error Codes
    const VAULT_ADDRESS: address = @0x0;  // Zero address for maximum security
    
    // Error codes with detailed descriptions
    const ENOT_ADMIN: u64 = 1;           // Operation can only be performed by admin
    const EINSUFFICIENT_SHARES: u64 = 2;  // User doesn't have enough shares for withdrawal
    const ENO_DEPOSIT: u64 = 3;           // User has no deposits in the vault
    const EZERO_DEPOSIT: u64 = 4;         // Cannot deposit zero amount
    const ETOKEN_NOT_FOUND: u64 = 5;      // Token type not found in vault
    const ETOKEN_ALREADY_EXISTS: u64 = 6;  // Token type already exists in vault

    // Main Vault structure
    // Stores APT coins, supported tokens, and total shares information
    struct Vault has key {
        coins: Coin<AptosCoin>,          // APT holdings
        token_types: vector<TypeInfo>,    // List of supported token types
        tokens: vector<TokenStore>,       // Token balances and information
        admin: address,                   // Admin address for privileged operations
        total_shares: u64                 // Total shares issued by vault
    }

    // Structure to store token-specific information
    // Each token type has its own store with balance and decimals
    struct TokenStore has store {
        token_type: TypeInfo,            // Type information of the token
        balance: u64,                    // Current balance of this token
        decimals: u8                     // Token's decimal places
    }

    // Structure to track user's share in the vault
    // Maps user address to their share amount
    struct UserDeposit has key {
        shares: u64                      // User's share of the vault
    }

    // Initialize vault with admin account
    // @param admin: Signer of the admin account
    public entry fun initialize(admin: &signer) {
        move_to(admin, Vault {
            coins: coin::zero<AptosCoin>(),
            token_types: vector::empty<TypeInfo>(),
            tokens: vector::empty<TokenStore>(),
            admin: signer::address_of(admin),
            total_shares: 0
        });
    }

    // Helper function to get token price in APT
    // @param TokenType: The token type to get price for
    // @return: Price with 8 decimal precision
    #[view]
    public fun get_token_price_in_apt<TokenType>(): u64 {
        let (reserve_x, reserve_y) = router::get_reserves_size<AptosCoin, TokenType, Uncorrelated>();
        if (reserve_y == 0) return 0;
        (reserve_x * 100000000) / reserve_y  // Price with 8 decimal precision
    }

    // Calculate total vault value in APT
    // Includes both APT holdings and other tokens converted to APT value
    // @return: Total vault value in APT
    #[view]
    public fun get_vault_total_value(): u64 acquires Vault {
        let vault = borrow_global<Vault>(VAULT_ADDRESS);
        let total_value = coin::value(&vault.coins); // APT value
        
        // Calculate value for each token
        let len = vector::length(&vault.tokens);
        let i = 0;
        while (i < len) {
            let token_store = vector::borrow(&vault.tokens, i);
            let token_balance = token_store.balance;
            
            if (token_balance > 0) {
                // Get pool reserves for this token type
                let (reserve_x, reserve_y) = router::get_reserves_size<AptosCoin, AptosCoin, Uncorrelated>();
                
                if (reserve_y > 0) {
                    // Calculate token value in APT: (apt_reserve / token_reserve) * token_balance
                    let token_value_in_apt = ((reserve_x * token_balance) / reserve_y);
                    total_value = total_value + token_value_in_apt;
                };
            };
            i = i + 1;
        };
        
        total_value
    }

    // User deposits APT into vault
    // Calculates and assigns shares based on deposit amount and current vault value
    // @param user: Signer of the depositing account
    // @param amount: Amount of APT to deposit
    public entry fun deposit(
        user: &signer,
        amount: u64
    ) acquires Vault, UserDeposit {
        assert!(amount > 0, EZERO_DEPOSIT);
        
        // Calculate total value before modifying vault
        let total_value = get_vault_total_value();
        
        let vault = borrow_global_mut<Vault>(VAULT_ADDRESS);
        let deposit_coins = coin::withdraw<AptosCoin>(user, amount);
        
        // Calculate new shares
        let new_shares = if (vault.total_shares == 0) {
            amount
        } else {
            (amount * vault.total_shares) / total_value
        };
        
        coin::merge(&mut vault.coins, deposit_coins);
        vault.total_shares = vault.total_shares + new_shares;
        
        // Record user shares
        let user_addr = signer::address_of(user);
        if (!exists<UserDeposit>(user_addr)) {
            move_to(user, UserDeposit { shares: 0 });
        };
        let user_deposit = borrow_global_mut<UserDeposit>(user_addr);
        user_deposit.shares = user_deposit.shares + new_shares;
    }

    // User withdraws assets based on shares
    // Withdraws proportional amount of all assets based on shares
    // @param user: Signer of the withdrawing account
    // @param shares_to_withdraw: Number of shares to withdraw
    public entry fun withdraw(
        user: &signer,
        shares_to_withdraw: u64
    ) acquires Vault, UserDeposit {
        let user_addr = signer::address_of(user);
        assert!(exists<UserDeposit>(user_addr), ENO_DEPOSIT);
        
        let user_deposit = borrow_global_mut<UserDeposit>(user_addr);
        assert!(user_deposit.shares >= shares_to_withdraw, EINSUFFICIENT_SHARES);
        
        let vault = borrow_global_mut<Vault>(VAULT_ADDRESS);
        
        // Calculate withdrawal ratio (with 8 decimal precision)
        let withdraw_ratio = (shares_to_withdraw * 100000000) / vault.total_shares;
        
        // Withdraw APT
        let apt_amount = (coin::value(&vault.coins) * withdraw_ratio) / 100000000;
        if (apt_amount > 0) {
            let withdraw_coins = coin::extract(&mut vault.coins, apt_amount);
            coin::deposit(user_addr, withdraw_coins);
        };
        
        // Withdraw other tokens
        let len = vector::length(&vault.tokens);
        let i = 0;
        while (i < len) {
            let token_store = vector::borrow_mut(&mut vault.tokens, i);
            let token_amount = (token_store.balance * withdraw_ratio) / 100000000;
            
            if (token_amount > 0) {
                // Register token type for user if needed
                if (!coin::is_account_registered<AptosCoin>(user_addr)) {
                    coin::register<AptosCoin>(user);
                };
                
                // Withdraw token from vault and deposit to user
                token_store.balance = token_store.balance - token_amount;
                // Note: We need to handle actual token transfers here
                // This might require additional changes to support dynamic token types
            };
            i = i + 1;
        };
        
        // Update shares
        vault.total_shares = vault.total_shares - shares_to_withdraw;
        user_deposit.shares = user_deposit.shares - shares_to_withdraw;
    }

    // Swap APT to specified token using LiquidSwap
    // Only admin can perform this operation
    // @param admin: Signer of the admin account
    // @param amount: Amount of APT to swap
    // @param min_amount_out: Minimum amount of tokens to receive
    public entry fun swap_apt_to_token_v05<TokenType>(
        admin: &signer,
        amount: u64,
        min_amount_out: u64
    ) acquires Vault {
        let admin_addr = signer::address_of(admin);
        let vault = borrow_global_mut<Vault>(VAULT_ADDRESS);
        
        assert!(admin_addr == vault.admin, ENOT_ADMIN);
        let apt_coins = coin::extract(&mut vault.coins, amount);
        
        let token_coins = router::swap_exact_coin_for_coin<AptosCoin, TokenType, Uncorrelated>(
            apt_coins,
            min_amount_out
        );

        // Get token info
        let token_type = type_info::type_of<TokenType>();
        
        // Add new token type if not exists
        if (!vector::contains(&vault.token_types, &token_type)) {
            vector::push_back(&mut vault.token_types, token_type);
            vector::push_back(&mut vault.tokens, TokenStore {
                token_type,
                balance: 0,
                decimals: coin::decimals<TokenType>()
            });
        };

        // Update token balance
        let token_amount = coin::value(&token_coins);
        let len = vector::length(&vault.tokens);
        let i = 0;
        while (i < len) {
            let token_store = vector::borrow_mut(&mut vault.tokens, i);
            if (token_store.token_type == token_type) {
                token_store.balance = token_store.balance + token_amount;
                break
            };
            i = i + 1;
        };

        // Store tokens in vault address
        if (!coin::is_account_registered<TokenType>(VAULT_ADDRESS)) {
            coin::register<TokenType>(admin);
        };
        coin::deposit(VAULT_ADDRESS, token_coins);
    }

    // Swap token to APT using LiquidSwap
    // Only admin can perform this operation
    // @param admin: Signer of the admin account
    // @param amount: Amount of tokens to swap
    // @param min_apt_out: Minimum amount of APT to receive
    public entry fun swap_token_to_apt_v05<TokenType>(
        admin: &signer,
        amount: u64,
        min_apt_out: u64
    ) acquires Vault {
        let admin_addr = signer::address_of(admin);
        let vault = borrow_global_mut<Vault>(VAULT_ADDRESS);
        
        assert!(admin_addr == vault.admin, ENOT_ADMIN);
        
        // Update token balance in vault
        let token_type = type_info::type_of<TokenType>();
        let len = vector::length(&vault.tokens);
        let i = 0;
        let found = false;
        while (i < len) {
            let token_store = vector::borrow_mut(&mut vault.tokens, i);
            if (token_store.token_type == token_type) {
                assert!(token_store.balance >= amount, EINSUFFICIENT_SHARES);
                token_store.balance = token_store.balance - amount;
                found = true;
                break
            };
            i = i + 1;
        };
        assert!(found, ETOKEN_NOT_FOUND);

        // Withdraw tokens from vault address
        let token_coins = coin::withdraw<TokenType>(admin, amount);
        
        let apt_coins = router::swap_exact_coin_for_coin<TokenType, AptosCoin, Uncorrelated>(
            token_coins,
            min_apt_out
        );
        
        coin::merge(&mut vault.coins, apt_coins);
    }

    // View Functions

    // Get user's share amount
    // @param user_addr: Address of the user
    // @return: Number of shares owned by user
    #[view]
    public fun get_user_shares(user_addr: address): u64 acquires UserDeposit {
        if (!exists<UserDeposit>(user_addr)) return 0;
        borrow_global<UserDeposit>(user_addr).shares
    }

    // Get vault information including total shares and token details
    // @return: (total_shares, token_types, decimals, amounts)
    #[view]
    public fun get_vault_info(): (u64, vector<TypeInfo>, vector<u8>, vector<u64>) acquires Vault {
        let vault = borrow_global<Vault>(VAULT_ADDRESS);
        
        // Initialize return vectors
        let token_types = vector::empty<TypeInfo>();
        let decimals = vector::empty<u8>();
        let amounts = vector::empty<u64>();
        
        // Add AptosCoin information
        vector::push_back(&mut token_types, type_info::type_of<AptosCoin>());
        vector::push_back(&mut decimals, 8); // APT has 8 decimals
        vector::push_back(&mut amounts, coin::value(&vault.coins));

        // Add other tokens information
        let len = vector::length(&vault.tokens);
        let i = 0;
        while (i < len) {
            let token_store = vector::borrow(&vault.tokens, i);
            vector::push_back(&mut token_types, token_store.token_type);
            vector::push_back(&mut decimals, token_store.decimals);
            vector::push_back(&mut amounts, token_store.balance);
            i = i + 1;
        };

        // Return total shares and token information
        (vault.total_shares, token_types, decimals, amounts)
    }

    // Get detailed information about vault tokens
    // @return: (token_count, token_types, decimals, amounts)
    #[view]
    public fun get_vault_tokens(): (u64, vector<TypeInfo>, vector<u8>, vector<u64>) acquires Vault {
        let vault = borrow_global<Vault>(VAULT_ADDRESS);
        
        // Initialize return vectors
        let token_types = vector::empty<TypeInfo>();
        let decimals = vector::empty<u8>();
        let amounts = vector::empty<u64>();
        
        // Add AptosCoin information
        vector::push_back(&mut token_types, type_info::type_of<AptosCoin>());
        vector::push_back(&mut decimals, 8); // APT has 8 decimals
        vector::push_back(&mut amounts, coin::value(&vault.coins));

        // Add other tokens information
        let len = vector::length(&vault.tokens);
        let i = 0;
        while (i < len) {
            let token_store = vector::borrow(&vault.tokens, i);
            vector::push_back(&mut token_types, token_store.token_type);
            vector::push_back(&mut decimals, token_store.decimals);
            vector::push_back(&mut amounts, token_store.balance);
            i = i + 1;
        };

        // Return total number of tokens and token information
        (len + 1, token_types, decimals, amounts)
    }

    // Get user shares and corresponding token amounts
    // @param user_addr: Address of the user
    // @return: (user_shares, total_shares, token_types, amounts, user_value)
    #[view]
    public fun get_user_shares_tokens(user_addr: address): (u64, u64, vector<TypeInfo>, vector<u64>, u64) acquires Vault, UserDeposit {
        let user_shares = if (!exists<UserDeposit>(user_addr)) {
            0
        } else {
            borrow_global<UserDeposit>(user_addr).shares
        };

        let vault = borrow_global<Vault>(VAULT_ADDRESS);
        let total_shares = vault.total_shares;
        
        if (user_shares == 0 || total_shares == 0) {
            return (0, total_shares, vector::empty(), vector::empty(), 0)
        };

        // Calculate withdrawal ratio (with 8 decimal precision)
        let withdraw_ratio = (user_shares * 100000000) / total_shares;
        
        // Initialize return vectors
        let token_types = vector::empty<TypeInfo>();
        let amounts = vector::empty<u64>();
        
        // Calculate APT amount
        let apt_amount = (coin::value(&vault.coins) * withdraw_ratio) / 100000000;
        vector::push_back(&mut token_types, type_info::type_of<AptosCoin>());
        vector::push_back(&mut amounts, apt_amount);

        // Calculate other tokens amount
        let len = vector::length(&vault.tokens);
        let i = 0;
        while (i < len) {
            let token_store = vector::borrow(&vault.tokens, i);
            let token_amount = (token_store.balance * withdraw_ratio) / 100000000;
            vector::push_back(&mut token_types, token_store.token_type);
            vector::push_back(&mut amounts, token_amount);
            i = i + 1;
        };

        // Calculate total value in APT
        let total_value = get_vault_total_value();
        let user_value = (total_value * withdraw_ratio) / 100000000;

        (user_shares, total_shares, token_types, amounts, user_value)
    }

    // Get total vault value based on actual account balances
    // @return: Total value in APT
    #[view]
    public fun get_vault_actual_value(): u64 acquires Vault {
        let vault = borrow_global<Vault>(VAULT_ADDRESS);
        // Use actual APT balance of vault address
        let total_value = coin::balance<AptosCoin>(VAULT_ADDRESS);
        
        // Calculate value for each token
        let len = vector::length(&vault.tokens);
        let i = 0;
        while (i < len) {
            let token_store = vector::borrow(&vault.tokens, i);
            // Use actual token balance
            let token_balance = coin::balance<AptosCoin>(VAULT_ADDRESS);
            
            if (token_balance > 0) {
                // Get pool reserves for this token type
                let (reserve_x, reserve_y) = router::get_reserves_size<AptosCoin, AptosCoin, Uncorrelated>();
                
                if (reserve_y > 0) {
                    // Calculate token value in APT: (apt_reserve / token_reserve) * token_balance
                    let token_value_in_apt = ((reserve_x * token_balance) / reserve_y);
                    total_value = total_value + token_value_in_apt;
                };
            };
            i = i + 1;
        };
        
        total_value
    }
}