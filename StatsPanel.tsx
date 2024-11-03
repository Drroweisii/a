import React from 'react';
import { useGame } from '../context/GameContext';
import { Zap, Clock, Wallet, ArrowRight } from 'lucide-react';

export default function StatsPanel() {
  const { state } = useGame();
  const hourlyRate = state.miningPower * 3600;
  const formattedHourlyRate = hourlyRate.toFixed(
    Math.min(8, Math.max(3, -Math.floor(Math.log10(hourlyRate))))
  );

  const nextMinerCost = 20;
  const progressToNextMiner = Math.min((state.balance / nextMinerCost) * 100, 100);

  const formatBalance = (value: number) => {
    if (value < 0.000001) {
      return value.toExponential(6);
    }
    return value.toFixed(Math.min(8, Math.max(3, -Math.floor(Math.log10(value)))));
  };

  return (
    <div className="space-y-2">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/40 via-rose-900/40 to-red-900/40 rounded-xl border border-red-900/30" />
        <div className="absolute inset-0 bg-grid-pattern-red opacity-20" />
        <div className="relative flex gap-2 overflow-x-auto p-3">
          {[
            {
              icon: Zap,
              label: 'Balance',
              value: `${formatBalance(state.balance)} ${state.selectedCrypto}`,
              color: 'rose',
            },
            {
              icon: Clock,
              label: 'Hourly Earnings',
              value: `${formattedHourlyRate} ${state.selectedCrypto}`,
              color: 'red',
            },
            {
              icon: Wallet,
              label: 'Unlocked Miners',
              value: `${state.unlockedMiners.length}/4`,
              color: 'amber',
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="glassmorphism rounded-lg p-2 component-hover flex-1 min-w-[120px] border border-red-900/20"
            >
              <div className="flex items-center space-x-2">
                <div className={`p-1 rounded-lg bg-${stat.color}-500 bg-opacity-20`}>
                  <stat.icon className={`w-4 h-4 text-${stat.color}-500 float-animation`} />
                </div>
                <div>
                  <h3 className="text-[10px] text-red-200/60">{stat.label}</h3>
                  <p className="text-sm font-bold number-animation text-red-50">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {state.unlockedMiners.length < 4 && (
        <div className="glassmorphism rounded-lg p-2 border border-emerald-500/20">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center space-x-2">
              <ArrowRight className="w-4 h-4 text-emerald-400" />
              <span className="text-xs text-emerald-400">Next Miner</span>
            </div>
            <span className="text-xs text-emerald-400">{formatBalance(state.balance)}/20 USDT</span>
          </div>
          <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 transition-all duration-300"
              style={{ width: `${progressToNextMiner}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}