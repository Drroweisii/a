import React from 'react';
import { useGame } from '../context/GameContext';
import { LucideIcon, Lock, Check } from 'lucide-react';

interface LockedMinerProps {
  id: string;
  name: string;
  icon: LucideIcon;
  color: string;
}

export default function LockedMiner({ id, name, icon: Icon, color }: LockedMinerProps) {
  const { state, dispatch } = useGame();
  const canPurchase = state.balance >= 20;
  const isUnlocked = state.unlockedMiners.includes(id);

  const handlePurchase = () => {
    if (!canPurchase || isUnlocked) return;
    dispatch({ 
      type: 'PURCHASE_MINER', 
      payload: { 
        minerId: id,
        cost: 20
      } 
    });
  };

  return (
    <div className={`glassmorphism rounded-lg p-3 border transition-all duration-300 ${
      isUnlocked 
        ? 'border-green-500/20 bg-green-500/5' 
        : 'border-gray-800/50 component-hover'
    }`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <div className={`p-2 rounded-lg ${isUnlocked ? 'bg-green-500/20' : `bg-${color}-500/20`}`}>
            <Icon className={`w-5 h-5 ${isUnlocked ? 'text-green-400' : `text-${color}-400`}`} />
          </div>
          <div>
            <h3 className="text-sm font-semibold">{name}</h3>
            <p className="text-xs text-gray-400">
              {isUnlocked ? 'Unlocked' : '20 USDT to unlock'}
            </p>
          </div>
        </div>
        {isUnlocked ? (
          <Check className="w-4 h-4 text-green-500" />
        ) : (
          <Lock className="w-4 h-4 text-gray-500" />
        )}
      </div>
      
      {!isUnlocked && (
        <button
          onClick={handlePurchase}
          disabled={!canPurchase}
          className={`w-full py-2 px-3 rounded-lg text-sm font-medium transition-all duration-300 ${
            canPurchase
              ? `bg-gradient-to-r from-${color}-600 to-${color}-500 hover:shadow-lg hover:shadow-${color}-500/20 text-white`
              : 'bg-gray-800/50 text-gray-400 cursor-not-allowed'
          }`}
        >
          {canPurchase ? 'Purchase Miner' : `Need ${(20 - state.balance).toFixed(2)} more USDT`}
        </button>
      )}
    </div>
  );
}