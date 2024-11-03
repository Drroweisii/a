import React from 'react';
import { useGame } from '../context/GameContext';
import { Bitcoin, DollarSign, Coins, Gem } from 'lucide-react';

const cryptoOptions = [
  { id: 'USDT', name: 'USDT', icon: DollarSign, color: 'emerald' },
  { id: 'BTC', name: 'Bitcoin', icon: Bitcoin, color: 'orange' },
  { id: 'ETH', name: 'Ethereum', icon: Coins, color: 'blue' },
  { id: 'TON', name: 'TON', icon: Gem, color: 'purple' },
];

export default function CryptoSelector() {
  const { state, dispatch } = useGame();

  if (state.selectedCrypto) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-2xl p-6 max-w-md w-full border border-gray-800">
        <h2 className="text-xl font-bold text-center mb-6">Select Your Mining Currency</h2>
        <div className="grid grid-cols-2 gap-4">
          {cryptoOptions.map((crypto) => {
            const isUnlocked = state.unlockedMiners.includes(crypto.id);
            return (
              <button
                key={crypto.id}
                onClick={() => isUnlocked && dispatch({ type: 'SELECT_CRYPTO', payload: crypto.id })}
                className={`p-4 rounded-xl border transition-all duration-300
                  flex flex-col items-center space-y-2 ${
                    isUnlocked
                      ? `border-gray-800 hover:border-${crypto.color}-500/50 bg-gray-800/50 hover:bg-gray-800`
                      : 'border-gray-800/50 bg-gray-900/50 opacity-50 cursor-not-allowed'
                  }`}
              >
                <div className={`p-2 rounded-lg ${isUnlocked ? `bg-${crypto.color}-500/20` : 'bg-gray-800/50'}`}>
                  <crypto.icon className={`w-6 h-6 ${isUnlocked ? `text-${crypto.color}-500` : 'text-gray-600'}`} />
                </div>
                <span className="text-sm font-medium">{crypto.name}</span>
                {!isUnlocked && (
                  <span className="text-xs text-gray-500">Locked</span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}