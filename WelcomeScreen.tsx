import React from 'react';
import { useGame } from '../context/GameContext';
import { Bitcoin, Coins, Wallet, Gem } from 'lucide-react';

interface CryptoOption {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
  description: string;
}

const cryptoOptions: CryptoOption[] = [
  {
    id: 'USDT',
    name: 'USDT Miner',
    icon: Coins,
    color: 'emerald',
    description: 'Mine Tether with stable returns'
  },
  {
    id: 'BTC',
    name: 'Bitcoin Miner',
    icon: Bitcoin,
    color: 'orange',
    description: 'Classic Bitcoin mining experience'
  },
  {
    id: 'ETH',
    name: 'Ethereum Miner',
    icon: Wallet,
    color: 'purple',
    description: 'Mine ETH with smart contracts'
  },
  {
    id: 'TON',
    name: 'TON Miner',
    icon: Gem,
    color: 'blue',
    description: 'Next-gen TON mining platform'
  }
];

export default function WelcomeScreen() {
  const { dispatch } = useGame();

  const handleSelection = (cryptoId: string) => {
    dispatch({ type: 'SELECT_CRYPTO', payload: cryptoId });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome to Crypto Miner</h1>
          <p className="text-gray-400">Choose your preferred mining operation</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cryptoOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => handleSelection(option.id)}
              className={`glassmorphism p-6 rounded-xl border border-${option.color}-500/20 hover:border-${option.color}-500/40 
                transition-all duration-300 component-hover text-left group`}
            >
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-lg bg-${option.color}-500/20 group-hover:bg-${option.color}-500/30`}>
                  <option.icon className={`w-6 h-6 text-${option.color}-400`} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">{option.name}</h3>
                  <p className="text-gray-400 text-sm">{option.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}