import React from 'react';
import { useGame } from '../context/GameContext';
import { Wallet, AlertCircle } from 'lucide-react';

export default function WithdrawPage() {
  const { state } = useGame();
  const canWithdraw = state.balance >= 10;

  return (
    <div className="h-[calc(100vh-80px)] p-2">
      <div className="relative h-full">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-800/40 via-gray-800/40 to-gray-800/40 rounded-xl border border-gray-700/30" />
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        
        <div className="relative h-full flex flex-col items-center justify-center p-4 space-y-6">
          {/* Balance Display */}
          <div className="glassmorphism rounded-xl p-6 w-full max-w-sm border border-gray-700/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Available Balance</span>
              <Wallet className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="text-2xl font-bold text-white">
              {state.balance.toFixed(3)} <span className="text-emerald-400">USDT</span>
            </div>
          </div>

          {/* Withdraw Section */}
          <div className="glassmorphism rounded-xl p-6 w-full max-w-sm border border-gray-700/20">
            <div className="flex flex-col items-center space-y-4">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-white mb-1">
                  Minimum Withdrawal: 10 USDT
                </h3>
                <p className="text-sm text-gray-400">
                  {canWithdraw 
                    ? 'You can now withdraw your earnings!'
                    : `Need ${(10 - state.balance).toFixed(3)} more USDT to withdraw`}
                </p>
              </div>

              <button
                disabled={!canWithdraw}
                className={`w-full py-3 px-4 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  canWithdraw
                    ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 hover:shadow-lg hover:shadow-emerald-500/20 text-white'
                    : 'bg-gray-800/50 text-gray-400 cursor-not-allowed border border-gray-700'
                }`}
              >
                {canWithdraw ? 'Withdraw Funds' : 'Insufficient Balance'}
              </button>

              {!canWithdraw && (
                <div className="flex items-center space-x-2 text-emerald-400/70 text-xs">
                  <AlertCircle className="w-4 h-4" />
                  <span>Continue mining to reach withdrawal threshold</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}