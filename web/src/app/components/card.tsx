"use client"
import Image from "next/image";
import { useState } from 'react';
// 定義介面
interface CardProps {
  agentData: {
    name: string;
    poweredBy: string;
    winRate: number;
    robotIcon: string;
    totalEarnings?: {
      amount: number;
      currency: string;
    };
    potentialApr: {
      min: number;
      max: number;
    };
    depositAsset: {
      icon: string;
      amount: number;
      currency: string;
    };
    tvl: string;
    myDeposit: {
      amount: number;
      currency: string;
    };
    walletBalance: {
      amount: number;
      currency: string;
    };
    exchangeRate: {
      from: {
        amount: number;
        currency: string;
      };
      to: {
        amount: number;
        currency: string;
      };
    };
    minDepositSize: {
      amount: number;
      currency: string;
    };
    availableCapacity: {
      amount: number;
      currency: string;
    };
    agentSpec: {
      tradingTarget: string[];
      runningTime: number;
      contract: string;
      cBCAPPrice: number;
      fee: string;
    };
    withdrawBalance: {
      amount: number;
      currency: string;
    };
    withdrawExchangeRate: {
      from: {
        amount: number;
        currency: string;
      };
      to: {
        amount: number;
        currency: string;
        bonus?: {
          amount: number;
          currency: string;
        };
      };
    };
    
  }
}

export default function Card({ agentData }: CardProps) {
   // 新增狀態管理
   const [depositAmount, setDepositAmount] = useState<string>('');
   const [withdrawAmount, setWithdrawAmount] = useState<string>('');
 
   // 處理存款金額變更
   const handleDepositChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     const value = e.target.value;
     if (value === '' || (!isNaN(Number(value)) && Number(value) >= 0)) {
       setDepositAmount(value);
     }
   };
 
   // 處理提款金額變更
   const handleWithdrawChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     const value = e.target.value;
     if (value === '' || (!isNaN(Number(value)) && Number(value) >= 0)) {
       setWithdrawAmount(value);
     }
   };
 
   // 處理存款 MAX 按鈕
   const handleDepositMax = () => {
     setDepositAmount(agentData.walletBalance.amount.toString());
   };
 
   // 處理提款 MAX 按鈕
   const handleWithdrawMax = () => {
     setWithdrawAmount(agentData.withdrawBalance.amount.toString());
   };
 
   // 計算存款兌換金額
   const calculateDepositExchange = () => {
     if (!depositAmount) return 0;
     return Number(depositAmount) * agentData.exchangeRate.to.amount;
   };
 
   // 計算提款兌換金額
   const calculateWithdrawExchange = () => {
     if (!withdrawAmount) return 0;
     return Number(withdrawAmount) * agentData.withdrawExchangeRate.to.amount;
   };
  return (
    <div className="flex-1 basis-[calc(50%-0.5rem)] min-w-[280px] aspect-video bg-gray-100 border border-gray-200 rounded-lg">
           <div className="flex flex-wrap gap-4 mb-4 items-center bg-gray-200 p-4 rounded-t-lg">
              <div className="flex-1 basis-[calc(15%-1rem)] max-w-[50px]">
                <Image className="rounded-full" src={agentData.robotIcon} alt="robot" width={48} height={48}  />
              </div>
              <div className="flex-1 basis-[calc(60%-1rem)]">
                <h1 className="text-sm font-semibold">{agentData.name}</h1>
                <p className='text-xs'>{agentData.poweredBy}</p>
              </div>
              <div className="flex-1 basis-[calc(25%-1rem)] max-w-[100px] text-right">
              <h1 className="text-sm font-semibold">Win Rate</h1>
              <p className='text-sm font-semibold text-red-500'>{agentData.winRate.toFixed(2)}%</p>
              </div>
          </div>
          <div className="flex px-4 mb-2">
                <p className='flex-1 text-gray-800'>Total Earnings</p>
                <p className='font-semibold text-right'>{agentData.totalEarnings?.amount} {agentData.totalEarnings?.currency}</p>
          </div>      
          <div className="flex px-4 mb-2">
                <p className="flex-1 text-gray-800">Potential APR</p>
                <p className="font-bold text-right">{agentData.potentialApr.min}% - {agentData.potentialApr.max}%</p>
         </div>
         <div className="flex px-4 mb-2">
                <p className="flex-1 text-gray-800">Deposit Asset</p>
                <p className="flex text-right align-items-center">
                    <span> <Image src={agentData.depositAsset.icon} width={20} height={20}  alt="background" /> </span>
                    <span>{agentData.depositAsset.amount} {agentData.depositAsset.currency}</span>
                </p>
         </div>
         <div className="flex px-4 mb-2">
                <p className="flex-1 text-gray-800">TVL</p>
                <p className="flex-1 text-right">{agentData.tvl}</p>
         </div>
         <div className="flex px-4">
                <p className="flex-1 text-gray-800">My deposit</p>
                <p className="flex-1 text-right">{agentData.myDeposit.amount} {agentData.myDeposit.currency}</p>
         </div>
<hr className='my-4'/>
    <div className="w-full p-4">
        <h1 className="text-base font-semibold">DEPOSIT</h1>
        <p className="text-xs text-gray-600 mr-2 text-right">
            Wallet Balance :{agentData.walletBalance.amount} {agentData.walletBalance.currency}
        </p>
    <div className="my-2">
      <div className="w-full min-w-[200px]">
        <div className="relative">
          <input
             type="number"
             className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-4 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
             placeholder={`0 ${agentData.walletBalance.currency}`}
             value={depositAmount}
             onChange={handleDepositChange} />
          
          <button  className="absolute right-1 top-1 rounded bg-slate-800 py-1 px-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
                onClick={handleDepositMax}>
            MAX
          </button>
        </div>
      </div>
    </div>
    <p className="text-xs text-gray-600 mr-2 mb-4 text-right">
    Exchange rate: {agentData.exchangeRate.from.amount} {agentData.exchangeRate.from.currency} = {agentData.exchangeRate.to.amount} {agentData.exchangeRate.to.currency}
          {depositAmount && (
            <><br />You will receive: {calculateDepositExchange().toFixed(3)} {agentData.exchangeRate.to.currency}</>
          )}
    </p>
    <div className="flex mb-2">
        <p className="flex-1 text-gray-800">Min Deposit Size</p>
        <p className="font-bold text-right">{agentData.minDepositSize.amount} {agentData.minDepositSize.currency}</p>
    </div>
    <div className="flex">
        <p className="flex-1 text-gray-800">Available Capacity</p>
        <p className="text-right">{agentData.availableCapacity.amount} {agentData.availableCapacity.currency}</p>
    </div>
    <button className="bg-orange-400 text-white px-4 py-2 rounded-md w-full mt-4">DEPOSIT</button>
<hr className='my-4'/>
    <h1 className="text-base font-semibold">WITHDRAW</h1>
        <p className="text-xs text-gray-600 mr-2 text-right">
            Wallet Balance :{agentData.withdrawBalance.amount} {agentData.withdrawBalance.currency}
        </p>
        <div className="my-2">
      <div className="w-full min-w-[200px]">
        <div className="relative">
        <input
                type="number"
                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-4 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                placeholder={`0 ${agentData.withdrawBalance.currency}`}
                value={withdrawAmount}
                onChange={handleWithdrawChange}
              />
              <button
                className="absolute right-1 top-1 rounded bg-slate-800 py-1 px-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
                onClick={handleWithdrawMax}
              >
            MAX
          </button>
        </div>
      </div>
    </div>
        <p className="text-xs text-gray-600 mr-2 text-right">
        Exchange rate: {agentData.withdrawExchangeRate.from.amount} {agentData.withdrawExchangeRate.from.currency} = {agentData.withdrawExchangeRate.to.amount} {agentData.withdrawExchangeRate.to.currency}
          {agentData.withdrawExchangeRate.to.bonus && ` + ${agentData.withdrawExchangeRate.to.bonus.amount} ${agentData.withdrawExchangeRate.to.bonus.currency}`}
          {withdrawAmount && (
            <><br />You will receive: {calculateWithdrawExchange().toFixed(3)} {agentData.withdrawExchangeRate.to.currency}</>
          )}
        </p>
        <button className="bg-orange-400 text-white px-4 py-2 rounded-md w-full mt-4">WITHDRAW</button>
<hr className='my-4'/>
    <h1 className="text-base font-semibold mb-2">AGENT FLOW</h1>
    <ol className="list-decimal pl-4 text-gray-600 text-sm">
          <li>Deposit MOVE to Agent Pool and receive {agentData.exchangeRate.to.currency} token</li>
          <li>Agent detected and automatically trade high potential new tokens from launchpad</li>
          <li>Watch the value of {agentData.exchangeRate.to.currency} increase as Agent earn profit from trade!</li>
        </ol>
<hr className='my-4'/>
    <h1 className="text-base font-semibold mb-2">AGENT SPEC</h1>
    <div className="flex">
        <p className="flex-1 text-gray-800">Trading Target</p>
        <p className="text-right">{agentData.agentSpec.tradingTarget.join(', ')}</p>
    </div>
    <div className="flex">
        <p className="flex-1 text-gray-800">Running time</p>
        <p className="text-right">{agentData.agentSpec.runningTime} days</p>
    </div>
    <div className="flex">
        <p className="flex-1 text-gray-800">Contract</p>
        <p className="text-right">{agentData.agentSpec.contract}</p>
    </div>
    <div className="flex">
        <p className="flex-1 text-gray-800">cBCAP Price</p>
        <p className="text-right">{agentData.agentSpec.cBCAPPrice}</p>
    </div>
    <div className="flex">
        <p className="flex-1 text-gray-800">Fee</p>
        <p className="text-right">{agentData.agentSpec.fee}%</p>
    </div>
    </div>
  </div>
  
  );
};