"use client"

import Card from "../components/card";
import Image from 'next/image'

export default function Agents() {
  const agentDataList = [
    {
      name: "Big Cap Agent",
      poweredBy: "Powered by LEMON AI",
      winRate: 75.00,
      robotIcon: "./images/icon_coin.png",
      totalEarnings: {
        amount: 10,
        currency: "Move"
      },
      potentialApr: {
        min: 10,
        max: 20
      },
      depositAsset: {
        icon: "./images/width_200.webp",
        amount: 10,
        currency: "Move"
      },
      tvl: "50,000",
      myDeposit: {
        amount: 10,
        currency: "Move"
      },
      walletBalance: {
        amount: 10,
        currency: "Move"
      },
      exchangeRate: {
        from: {
          amount: 1,
          currency: "MOVE"
        },
        to: {
          amount: 0.952,
          currency: "cBCAP"
        }
      },
      minDepositSize: {
        amount: 1,
        currency: "MOVE"
      },
      availableCapacity: {
        amount: 100,
        currency: "MOVE"
      },
      agentSpec: {
        tradingTarget: ["BTC", "ETH"],
        runningTime: 30,
        contract: "xxxxxxxxXXX",
        cBCAPPrice: 1.05,
        fee: "5%"
      },
      withdrawBalance: {
        amount: 10,
        currency: "cBCAP"
      },
      withdrawExchangeRate: {
        from: {
          amount: 1,
          currency: "cBCAP"
        },
        to: {
          amount: 1.05,
          currency: "MOVE",
          bonus: {
            amount: 0,
            currency: "LEMON"
          }
        }
      }
    },
    {
      name: "Rising Star Meme Agent",
      poweredBy: "Powered by LEMON AI",
      winRate: 65.00,
      robotIcon: "./images/icon_cstar.png",
      totalEarnings: {
        amount: 543,
        currency: "Move"
      },
      potentialApr: {
        min: 50,
        max: 200
      },
      depositAsset: {
        icon: "./images/width_200.webp",
        amount: 20,
        currency: "Move"
      },
      tvl: "$75,000",
      myDeposit: {
        amount: 15,
        currency: "Move"
      },
      walletBalance: {
        amount: 10,
        currency: "Move"
      },
      exchangeRate: {
        from: {
          amount: 1,
          currency: "MOVE"
        },
        to: {
          amount: 0.952,
          currency: "cSTAR"
        }
      },
      minDepositSize: {
        amount: 1,
        currency: "MOVE"
      },
      availableCapacity: {
        amount: 100,
        currency: "MOVE"
      },
      agentSpec: {
        tradingTarget: ["Memecoins"],
        runningTime: 30,
        contract: "yyyyyyyyYYY",
        cBCAPPrice: 1.05,
        fee: "5%"
      },
      withdrawBalance: {
        amount: 15,
        currency: "cSTAR"
      },
      withdrawExchangeRate: {
        from: {
          amount: 1,
          currency: "cSTAR"
        },
        to: {
          amount: 1.08,
          currency: "MOVE",
          bonus: {
            amount: 5,
            currency: "LEMON"
          }
        }
      }
    }
  ];

  return (
      // 容器
      <div className="container mx-auto px-4 max-w-4xl pt-8 flex-1 p-6 mt-24">
          {/* 上方三個卡片 */}
          <div className="flex flex-wrap gap-4 mb-4 items-center pb-4">
              <div className="flex-1 basis-[calc(20%-1rem)] max-w-[100px]">
                <Image className="rounded-full" src="./images/lemonRobot.png" width={200} height={200} alt="background" />
              </div>
              <div className="flex-1 basis-[calc(60%-1rem)] text-center">
                <h1 className="text-2xl font-semibold">LEMON DEFAI Agent on MOVEMENT</h1>
                <span>Simply deposit, let our advanced algorithmic trading agent work, and watch your earnings grow!</span>
              </div>
              <div className="flex-1 basis-[calc(20%-1rem)] max-w-[100px] opacity-50">
              <Image src="./images/width_200.webp" width={200} height={200}  alt="background" />
              </div>
          </div>
          {/* 底部兩個卡片 */}
          <div className="flex flex-wrap gap-4">
            {agentDataList.map((agentData, index) => (
              <Card key={index} agentData={agentData} />
            ))}
          </div>
      </div>
  )
}
