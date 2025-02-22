"use client";

import { useAptosWallet } from "@razorlabs/wallet-kit";
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  Copy,
  LogOut,
  User,
} from "lucide-react";
import { useCallback, useState } from "react";
import { Button } from "./ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useToast } from "./ui/use-toast";

export function WalletSelector() {
  const [open, setOpen] = useState(false);
  const { select, account, disconnect, connected, detectedWallets } = useAptosWallet();
  const { toast } = useToast();

  const sortedWallets = [...detectedWallets].sort((a, b) => {
    if (a.name === "Petra") return -1;
    if (b.name === "Petra") return 1;
    return 0;
  });

  const handleConnect = async (walletName: string) => {
    try {
      await select(walletName);
      setOpen(false);
    } catch (error) {
      console.error("Failed to connect:", error);
    }
  };

  const copyAddress = useCallback(async () => {
    if (!account?.address) return;
    try {
      await navigator.clipboard.writeText(account.address);
      toast({
        title: "Success",
        description: "Copied wallet address to clipboard.",
      });
    } catch {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to copy wallet address.",
      });
    }
  }, [account?.address, toast]);

  if (!connected || !account) {
    return (
      <>
        <Button
          onClick={() => setOpen(true)}
          className="bg-yellow-500 text-white hover:bg-yellow-600"
        >
          Connect Wallet
        </Button>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">Connect Wallet</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {sortedWallets.map((wallet) => (
                <Button
                  key={wallet.name}
                  onClick={() => handleConnect(wallet.name)}
                  className="flex items-center justify-between w-full px-4 py-2 bg-white hover:bg-gray-50 border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    {wallet.adapter.icon && (
                      <img 
                        src={wallet.adapter.icon} 
                        alt={wallet.name} 
                        className="w-6 h-6 rounded-full"
                      />
                    )}
                    <span className="font-medium">{wallet.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">
                      {wallet.installed ? "Installed" : "Not Installed"}
                    </span>
                  </div>
                </Button>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>
          {account?.address.toString().slice(0, 6)}...
          {account?.address.toString().slice(-4)}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onSelect={copyAddress} className="gap-2">
          <Copy className="h-4 w-4" /> Copy address
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={disconnect} className="gap-2">
          <LogOut className="h-4 w-4" /> Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
