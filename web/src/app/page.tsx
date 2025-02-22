import Image from "next/image";

export default function Home() {
  return (
      <div className="container mx-auto px-4 max-w-4xl pt-8 flex-1 p-6 mt-24">
          {/* 上方三個卡片 */}
          <div className="flex flex-wrap gap-4 mb-4 items-center pb-4">
              <div className="flex-1 basis-[calc(20%-1rem)] max-w-[100px]">
                <Image className="rounded-full" src="/images/lemonRobot.png" alt="robot" width={304} height={306}  />
              </div>
              <div className="flex-1 basis-[calc(60%-1rem)] text-center">
                <h1 className="text-2xl font-semibold">LEMON DEFAI Agent on MOVEMENT</h1>
                <span>Simply deposit, let our advanced algorithmic trading agent work, and watch your earnings grow!</span>
              </div>
              <div className="flex-1 basis-[calc(20%-1rem)] max-w-[100px] opacity-50">
                <Image src="/images/width_200.webp" alt="background"  width={200} height={200}/>
            
              </div>
          </div>
          {/* 底部兩個卡片 */}
          <div className="flex flex-wrap gap-4">
          
<div className="flex-1 basis-[calc(50%-0.5rem)] min-w-[280px] aspect-video bg-gray-100 border border-gray-200 rounded-lg">
           <div className="flex flex-wrap gap-4 mb-4 items-center bg-gray-200 p-4 rounded-t-lg">
              <div className="flex-1 basis-[calc(15%-1rem)] max-w-[50px]">
              <Image className="rounded-full" src="/images/icon_coin.png" alt="Coin" width={392} height={290}  />
              </div>
              <div className="flex-1 basis-[calc(60%-1rem)]">
                <h1 className="text-sm font-semibold">Big Cap Agent</h1>
                <p className='text-xs'>Powered by LEMON AI</p>
              </div>
              <div className="flex-1 basis-[calc(25%-1rem)] max-w-[100px] text-right">
              <h1 className="text-sm font-semibold">Win Rate</h1>
              <p className='text-sm font-semibold text-red-500'>75%</p>
              </div>
          </div>
          <div className="flex px-4 mb-2">
                <p className='flex-1 text-gray-800'>Total Earnings</p>
                <p className='font-semibold text-right'>543 MOVE</p>
          </div>      
          <div className="flex px-4 mb-2">
                <p className="flex-1 text-gray-800">Potential APR</p>
                <p className="font-bold text-right">10% - 20%</p>
         </div>
         <div className="flex px-4 mb-2">
                <p className="flex-1 text-gray-800">Deposit Asset</p>
                <p className="flex text-right align-items-center">
                    <span>
                    <Image src="/images/width_200.webp" width={20} height={20}  alt="background" /></span>
                    <span>10 MOVE</span>
                </p>
         </div>
         <div className="flex px-4 mb-2">
                <p className="flex-1 text-gray-800">TVL</p>
                <p className="flex-1 text-right">$50,000</p>
         </div>
         <div className="flex px-4">
                <p className="flex-1 text-gray-800">My deposit</p>
                <p className="flex-1 text-right">10 MOVE</p>
         </div>
<hr className='my-4'/>
    <div className="w-full p-4">
        <h1 className="text-base font-semibold">DEPOSIT</h1>
        <p className="text-xs text-gray-600 mr-2 text-right">
            Wallet Balance :10 MOVE
        </p>
    <div className="my-2">
      <div className="w-full min-w-[200px]">
        <div className="relative">
          <input type="number" className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-4 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="0 MOVE" />
          <button className="absolute right-1 top-1 rounded bg-slate-800 py-1 px-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
            MAX
          </button>
        </div>
      </div>
    </div>
    <p className="text-xs text-gray-600 mr-2 mb-4 text-right">
      Exchange rate: 1 MOVE = 0.952 cBCAP
    </p>
    <div className="flex mb-2">
        <p className="flex-1 text-gray-800">Min Deposit Size</p>
        <p className="font-bold text-right">1 MOVE</p>
    </div>
    <div className="flex">
        <p className="flex-1 text-gray-800">Available Capacity</p>
        <p className="text-right">100 MOVE</p>
    </div>
    <button className="bg-orange-400 text-white px-4 py-2 rounded-md w-full mt-4">DEPOSIT</button>
<hr className='my-4'/>
    <h1 className="text-base font-semibold">WITHDRAW</h1>
        <p className="text-xs text-gray-600 mr-2 text-right">
            Wallet Balance :10 cBCAP
        </p>
        <div className="my-2">
      <div className="w-full min-w-[200px]">
        <div className="relative">
          <input type="number" className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-4 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="0 cBCAP" />
          <button className="absolute right-1 top-1 rounded bg-slate-800 py-1 px-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
            MAX
          </button>
        </div>
      </div>
    </div>
        <p className="text-xs text-gray-600 mr-2 text-right">
            Exchange rate: 1 cBCAP = 1.05 MOVE + XXX LEMON
        </p>
        <button className="bg-orange-400 text-white px-4 py-2 rounded-md w-full mt-4">WITHDRAW</button>
<hr className='my-4'/>
    <h1 className="text-base font-semibold mb-2">AGENT FLOW</h1>
    <ol className="list-decimal pl-4 text-gray-600 text-sm">
          <li>Deposit MOVE to Agent Pool and receive cBCAP token</li>
          <li>Agent detected and automatically trade high potential new tokens from launchpad</li>
          <li>Watch the value of cBCAP increase as Agent earn profit from trade!</li>
        </ol>
<hr className='my-4'/>
    <h1 className="text-base font-semibold mb-2">AGENT SPEC</h1>
    <div className="flex">
        <p className="flex-1 text-gray-800">Trading Target</p>
        <p className="text-right">BTC, ETH</p>
    </div>
    <div className="flex">
        <p className="flex-1 text-gray-800">Running time</p>
        <p className="text-right">30 days</p>
    </div>
    <div className="flex">
        <p className="flex-1 text-gray-800">Contract</p>
        <p className="text-right">xxxxxxxxXXX</p>
    </div>
    <div className="flex">
        <p className="flex-1 text-gray-800">cBCAP Price</p>
        <p className="text-right">1.05</p>
    </div>
    <div className="flex">
        <p className="flex-1 text-gray-800">Fee</p>
        <p className="text-right">5%</p>
    </div>
    </div>
  </div>
  


  <div className="flex-1 basis-[calc(50%-0.5rem)] min-w-[280px] aspect-video bg-gray-100 border border-gray-200 rounded-lg">
           <div className="flex flex-wrap gap-4 mb-4 items-center bg-gray-200 p-4 rounded-t-lg">
              <div className="flex-1 basis-[calc(15%-1rem)] max-w-[50px]">
              <Image className="rounded-full" src="/images/icon_cstar.png" alt="cStar" width={272} height={274}  />
              </div>
              <div className="flex-1 basis-[calc(60%-1rem)]">
                <h1 className="text-sm font-semibold">Rising Star Meme Agent  
                </h1>
                <p className='text-xs'>Powered by LEMON AI</p>
              </div>
              <div className="flex-1 basis-[calc(25%-1rem)] max-w-[100px] text-right">
              <h1 className="text-sm font-semibold">Win Rate</h1>
              <p className='text-sm font-semibold text-red-500'>65%</p>
              </div>
          </div>
          <div className="flex px-4 mb-2">
                <p className='flex-1 text-gray-800'>Total Earnings</p>
                <p className='font-semibold text-right'>543 MOVE</p>
          </div>      
          <div className="flex px-4 mb-2">
                <p className="flex-1 text-gray-800">Potential APR</p>
                <p className="font-bold text-right">50% - 200%</p>
         </div>
         <div className="flex px-4 mb-2">
                <p className="flex-1 text-gray-800">Deposit Asset</p>
                <p className="flex text-right align-items-center">
                    <span>
                      <Image src="/images/width_200.webp" width={20} height={20}  alt="background" />
                    </span>
                    <span>10 MOVE</span>
                </p>
         </div>
         <div className="flex px-4 mb-2">
                <p className="flex-1 text-gray-800">TVL</p>
                <p className="flex-1 text-right">$50,000</p>
         </div>
         <div className="flex px-4">
                <p className="flex-1 text-gray-800">My deposit</p>
                <p className="flex-1 text-right">10 MOVE</p>
         </div>
<hr className='my-4'/>
    <div className="w-full p-4">
        <h1 className="text-base font-semibold">DEPOSIT</h1>
        <p className="text-xs text-gray-600 mr-2 text-right">
            Wallet Balance :10 MOVE
        </p>
    <div className="my-2">
      <div className="w-full min-w-[200px]">
        <div className="relative">
          <input type="number" className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-4 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="0 MOVE" />
          <button className="absolute right-1 top-1 rounded bg-slate-800 py-1 px-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
            MAX
          </button>
        </div>
      </div>
    </div>
    <p className="text-xs text-gray-600 mr-2 mb-4 text-right">
      Exchange rate: 1 MOVE = 0.952 cSTAR
    </p>
    <div className="flex mb-2">
        <p className="flex-1 text-gray-800">Min Deposit Size</p>
        <p className="font-bold text-right">1 MOVE</p>
    </div>
    <div className="flex">
        <p className="flex-1 text-gray-800">Available Capacity</p>
        <p className="text-right">100 MOVE</p>
    </div>
    <button className="bg-orange-400 text-white px-4 py-2 rounded-md w-full mt-4">DEPOSIT</button>
<hr className='my-4'/>
    <h1 className="text-base font-semibold">WITHDRAW</h1>
        <p className="text-xs text-gray-600 mr-2 text-right">
            Wallet Balance :10 cSTAR
        </p>
        <div className="my-2">
      <div className="w-full min-w-[200px]">
        <div className="relative">
          <input type="number" className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-4 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="0 cSTAR" />
          <button className="absolute right-1 top-1 rounded bg-slate-800 py-1 px-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
            MAX
          </button>
        </div>
      </div>
    </div>
        <p className="text-xs text-gray-600 mr-2 text-right">
            Exchange rate: 1 cSTAR = 1.05 MOVE + XXX LEMON
        </p>
        <button className="bg-orange-400 text-white px-4 py-2 rounded-md w-full mt-4">WITHDRAW</button>
<hr className='my-4'/>
    <h1 className="text-base font-semibold mb-2">AGENT FLOW</h1>
    <ol className="list-decimal pl-4 text-gray-600 text-sm">
          <li>Deposit MOVE to Agent Pool and receive cSTAR token</li>
          <li>Agent detected and automatically trade high potential new tokens from launchpad</li>
          <li>Watch the value of cSTAR increase as Agent earn profit from trade!</li>
        </ol>
<hr className='my-4'/>
    <h1 className="text-base font-semibold mb-2">AGENT SPEC</h1>
    <div className="flex">
        <p className="flex-1 text-gray-800">Trading Target</p>
        <p className="text-right">Memecoins
        </p>
    </div>
    <div className="flex">
        <p className="flex-1 text-gray-800">Running time</p>
        <p className="text-right">30 days</p>
    </div>
    <div className="flex">
        <p className="flex-1 text-gray-800">Contract</p>
        <p className="text-right">xxxxxxxxXXX</p>
    </div>
    <div className="flex">
        <p className="flex-1 text-gray-800">cBCAP Price</p>
        <p className="text-right">1.05</p>
    </div>
    <div className="flex">
        <p className="flex-1 text-gray-800">Fee</p>
        <p className="text-right">5%</p>
    </div>
    </div>
  </div>

        
          </div>
      </div>
  
  );
}
