// src/types/agent.ts
export interface AgentData {
  name: string;
  poweredBy: string;
  winRate: number;
  totalEarnings: number;
  potentialAPR: string;
  depositAsset: {
    name: string;
    icon: string;
  };
  tvl: number;
  myDeposit: number;
  walletBalance: {
    move: number;
    cBCAP: number;
  };
  exchangeRates: {
    moveToCAP: number;
    cBAPToMove: number;
    lemonBonus: string;
  };
  minDepositSize: number;
  availableCapacity: number;
  agentFlow: string[];
  agentSpec: {
    tradingTarget: string;
    runningTime: string;
    contract: string;
    cBCAPPrice: number;
    fee: string;
  };
}
