import React from 'react';
import ComponentCard from './ComponentCard';
import StatsPanel from './StatsPanel';
import LockedMiner from './LockedMiner';
import { Cpu, Battery, CircuitBoard, Fan, Wifi, Code, Bitcoin, Coins, Wallet, Gem } from 'lucide-react';

const components = [
  { id: 'miningRig', name: 'Mining Rig', icon: Cpu, color: 'text-purple-400' },
  { id: 'powerSupply', name: 'Power Supply', icon: Battery, color: 'text-yellow-400' },
  { id: 'motherboard', name: 'Motherboard', icon: CircuitBoard, color: 'text-blue-400' },
  { id: 'cooling', name: 'Cooling System', icon: Fan, color: 'text-cyan-400' },
  { id: 'network', name: 'Network Card', icon: Wifi, color: 'text-green-400' },
  { id: 'software', name: 'Mining Software', icon: Code, color: 'text-pink-400' },
];

const lockedMiners = [
  { id: 'BTC', name: 'Bitcoin Miner', icon: Bitcoin, color: 'orange' },
  { id: 'ETH', name: 'Ethereum Miner', icon: Wallet, color: 'blue' },
  { id: 'TON', name: 'TON Miner', icon: Gem, color: 'purple' },
];

export default function Dashboard() {
  return (
    <div className="h-[calc(100vh-80px)] flex flex-col gap-2 overflow-y-auto pb-20">
      <StatsPanel />
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
        {components.map((component) => (
          <ComponentCard key={component.id} {...component} />
        ))}
      </div>
      
      <div className="mt-4">
        <h2 className="text-sm font-semibold text-gray-400 mb-2 px-1">Available Miners</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {lockedMiners.map((miner) => (
            <LockedMiner key={miner.id} {...miner} />
          ))}
        </div>
      </div>
    </div>
  );
}