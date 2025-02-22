"use client"
import React, { useState } from 'react';
import Link from 'next/link'
import { WalletSelector } from "@/components/WalletSelector";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full shadow-md fixed top-0 z-50 backdrop-blur-md">

      <div className="container mx-auto px-4 flex items-center justify-between h-20 p-8">
        {/* 左邊 Logo 區域 */}
        <div className="flex-shrink-0">
          <Link href="/" className="text-2xl font-bold text-gray-800">
            LEMON AI
          </Link>
        </div>

        {/* 中間導航欄 (桌面版顯示) */}
        <nav className="hidden lg:flex space-x-6">
          <Link href="agents"  className="text-gray-600 hover:text-gray-900">
              Home
          </Link>
          <Link href="about"  className="text-gray-600 hover:text-gray-900">
              About
          </Link>
          <Link href="#trade"  className="text-gray-600 hover:text-gray-900">
              Trade
          </Link>
          <Link href="#wallet"  className="text-gray-600 hover:text-gray-900">
              Wallet
          </Link>
        </nav>

        {/* 右邊按鈕區 (桌面版顯示) */}
        <div className="hidden lg:flex items-center space-x-4">
          <WalletSelector />
        </div>

        {/* 手機版選單按鈕 */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden text-gray-800 focus:outline-none"
        >
          {menuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          )}
        </button>
      </div>

      {/* 手機版選單 (展開時顯示) */}
      {menuOpen && (
        <div className="lg:hidden bg-white shadow-md">
          <nav className="flex flex-col space-y-4 px-4 py-4">
            <a href="agents" className="text-gray-600 hover:text-gray-900">
              Home
            </a>
            <a href="#markets" className="text-gray-600 hover:text-gray-900">
              Markets
            </a>
            <a href="#trade" className="text-gray-600 hover:text-gray-900">
              Trade
            </a>
            <a href="#wallet" className="text-gray-600 hover:text-gray-900">
              Wallet
            </a>
          </nav>
          <div className="flex flex-col space-y-4 px-4 py-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Login
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-800 rounded hover:bg-gray-200">
              Register
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;