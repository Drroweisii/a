import React from 'react';
import { GameProvider } from './context/GameContext';
import { useGame } from './context/GameContext';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import WithdrawPage from './components/WithdrawPage';
import ReferralPage from './components/ReferralPage';
import CryptoSelector from './components/CryptoSelector';
import AuthScreen from './components/AuthScreen';

function AppContent() {
  const { state, dispatch } = useGame();
  const [activeTab, setActiveTab] = React.useState('MINER');

  if (!state.user) {
    return <AuthScreen />;
  }

  return (
    <div className="h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden flex flex-col">
      <div className="absolute inset-0 grid-pattern opacity-50"></div>
      <div className="relative z-10 flex flex-col h-full">
        <main className="flex-1 container mx-auto px-2 py-2 overflow-hidden">
          <CryptoSelector />
          {activeTab === 'MINER' && <Dashboard />}
          {activeTab === 'P1' && <WithdrawPage />}
          {activeTab === 'P2' && <ReferralPage />}
          {activeTab === 'P4' && <div className="h-full flex items-center justify-center text-2xl">Coming Soon: Tasks</div>}
        </main>
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  );
}