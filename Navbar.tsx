import React from 'react';
import { useGame } from '../context/GameContext';
import { Cpu, Wallet, Users, ListTodo } from 'lucide-react';

const tabs = [
  { id: 'MINER', icon: Cpu, label: 'Mine' },
  { id: 'P1', icon: Wallet, label: 'Withdraw' },
  { id: 'P2', icon: Users, label: 'Referral' },
  { id: 'P4', icon: ListTodo, label: 'Tasks' }
];

export default function Navbar({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (tab: string) => void }) {
  const { state } = useGame();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div className="container mx-auto px-2 sm:px-4">
        <div className="mb-2 mx-2">
          <div className="glassmorphism rounded-xl border border-gray-700/50 backdrop-blur-lg">
            <div className="flex items-center justify-between p-1">
              <div className="absolute left-1/2 -translate-x-1/2 -top-10 p-2 rounded-xl glassmorphism border border-gray-700/50">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-xs number-animation">{state.balance.toFixed(3)}</span>
                  <span className="text-emerald-400 text-xs">USDT</span>
                </div>
              </div>
              
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="flex-1 flex flex-col items-center p-1 space-y-0.5 relative group"
                >
                  <div className={`p-1 rounded-lg transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-emerald-400/20'
                      : 'group-hover:bg-gray-700/30'
                  }`}>
                    <tab.icon className={`w-4 h-4 transition-colors ${
                      activeTab === tab.id ? 'text-emerald-400' : 'text-gray-400 group-hover:text-gray-300'
                    }`} />
                  </div>
                  <span className={`text-[10px] transition-colors ${
                    activeTab === tab.id ? 'text-emerald-400' : 'text-gray-400 group-hover:text-gray-300'
                  }`}>
                    {tab.label}
                  </span>
                  {activeTab === tab.id && (
                    <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-emerald-400" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}