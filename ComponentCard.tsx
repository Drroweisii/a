import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { calculateUpgradeCost } from '../utils/gameUtils';
import { LucideIcon } from 'lucide-react';

interface ComponentCardProps {
  id: string;
  name: string;
  icon: LucideIcon;
  color: string;
}

export default function ComponentCard({ id, name, icon: Icon, color }: ComponentCardProps) {
  const { state, dispatch } = useGame();
  const [isUpgrading, setIsUpgrading] = useState(false);
  const level = state.components[id];
  
  const upgradeCost = state.selectedCrypto 
    ? calculateUpgradeCost(id, level, state.selectedCrypto)
    : 0;
    
  const canUpgrade = state.selectedCrypto && state.balance >= upgradeCost;

  const handleUpgrade = () => {
    if (!canUpgrade) return;
    setIsUpgrading(true);
    dispatch({ 
      type: 'UPGRADE_COMPONENT', 
      payload: { 
        component: id,
        cost: upgradeCost
      } 
    });
    setTimeout(() => setIsUpgrading(false), 500);
  };

  if (!state.selectedCrypto) {
    return (
      <div className="glassmorphism rounded-lg p-2 opacity-50">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center space-x-1.5">
            <div className={`p-1 rounded-lg bg-opacity-20 ${color.replace('text', 'bg')}`}>
              <Icon className={`w-4 h-4 ${color}`} />
            </div>
            <h3 className="text-xs font-semibold">{name}</h3>
          </div>
          <span className="px-1.5 py-0.5 bg-gray-700 bg-opacity-50 rounded text-[10px]">
            Locked
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`glassmorphism rounded-lg p-2 component-hover ${
      isUpgrading ? 'mining-animation' : ''
    }`}>
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center space-x-1.5">
          <div className={`p-1 rounded-lg bg-opacity-20 ${color.replace('text', 'bg')}`}>
            <Icon className={`w-4 h-4 ${color} float-animation`} />
          </div>
          <h3 className="text-xs font-semibold">{name}</h3>
        </div>
        <span className="px-1.5 py-0.5 bg-gray-700 bg-opacity-50 rounded text-[10px]">
          Lvl {level}
        </span>
      </div>
      
      <div className="space-y-1.5">
        <div className="text-gray-400 text-[10px]">
          Upgrade cost: 
          <span className="text-white font-medium ml-1 number-animation">
            {upgradeCost.toFixed(8)} {state.selectedCrypto}
          </span>
        </div>
        
        <button
          onClick={handleUpgrade}
          disabled={!canUpgrade}
          className={`w-full py-1 px-2 rounded text-xs font-medium transition-all duration-300 transform hover:scale-105 ${
            canUpgrade
              ? `bg-gradient-to-r from-emerald-600 to-emerald-500 hover:shadow-lg hover:shadow-emerald-500/20`
              : 'bg-gray-700 bg-opacity-50 text-gray-400 cursor-not-allowed'
          }`}
        >
          {isUpgrading ? 'Upgrading...' : 'Upgrade'}
        </button>
      </div>
    </div>
  );
}