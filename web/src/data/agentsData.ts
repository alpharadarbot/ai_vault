// src/data/agentsData.ts
import { AgentData } from '@/types/agent';

export const agentsData: AgentData[] = [
  {
    name: "Big Cap Agent",
    poweredBy: "Powered by LEMON AI",
    winRate: 75.00,
    totalEarnings: 543,
    potentialAPR: "10% - 20%",
    depositAsset: {
      name: "MOVE",
      icon: "./images/width_200.webp"
    },
    tvl: 10,
    myDeposit: 10,
    walletBalance: {
      move: 10,
      cBCAP: 10
    },
    exchangeRates: {
      moveToCAP: 0.952,
      cBAPToMove: 1.05,
      lemonBonus: "XXX"
    },
    minDepositSize: 1,
    availableCapacity: 100,
    agentFlow: [
      "Deposit MOVE to Agent Pool and receive cBCAP token",
      "Agent detected and automatically trade high potential new tokens from launchpad",
      "Watch the value of cBCAP increase as Agent earn profit from trade!"
    ],
    agentSpec: {
      tradingTarget: "BTC, ETH",
      runningTime: "30 days",
      contract: "xxxxxxxxXXX",
      cBCAPPrice: 1.05,
      fee: "5%"
    }
  },
  // 可以加入更多代理資料...
];
