import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { Users, Copy, CheckCircle2, Gift, ArrowRight } from 'lucide-react';

export default function ReferralPage() {
  const { state } = useGame();
  const [copied, setCopied] = useState(false);
  const [referralInput, setReferralInput] = useState('');
  const { dispatch } = useGame();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(state.referralCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleSubmitReferral = () => {
    if (referralInput && referralInput !== state.referralCode) {
      dispatch({ type: 'SET_REFERRED_BY', payload: referralInput });
      setReferralInput('');
    }
  };

  return (
    <div className="h-[calc(100vh-80px)] p-2">
      <div className="relative h-full">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/40 via-purple-900/40 to-indigo-900/40 rounded-xl border border-indigo-700/30" />
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        
        <div className="relative h-full flex flex-col p-4 space-y-4 overflow-y-auto">
          {/* Referral Code Section */}
          <div className="glassmorphism rounded-xl p-4 border border-indigo-500/20">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 rounded-lg bg-indigo-500/20">
                  <Users className="w-5 h-5 text-indigo-400" />
                </div>
                <h3 className="font-semibold">Your Referral Code</h3>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="flex-1 bg-gray-800/50 rounded-lg p-3 font-mono text-indigo-400">
                {state.referralCode}
              </div>
              <button
                onClick={handleCopy}
                className="p-3 rounded-lg bg-indigo-500/20 hover:bg-indigo-500/30 transition-colors"
              >
                {copied ? (
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                ) : (
                  <Copy className="w-5 h-5 text-indigo-400" />
                )}
              </button>
            </div>
          </div>

          {/* Enter Referral Code Section */}
          {!state.referredBy && (
            <div className="glassmorphism rounded-xl p-4 border border-purple-500/20">
              <div className="flex items-center space-x-2 mb-4">
                <div className="p-2 rounded-lg bg-purple-500/20">
                  <Gift className="w-5 h-5 text-purple-400" />
                </div>
                <h3 className="font-semibold">Enter Referral Code</h3>
              </div>
              
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={referralInput}
                  onChange={(e) => setReferralInput(e.target.value.toUpperCase())}
                  placeholder="Enter code"
                  className="flex-1 bg-gray-800/50 rounded-lg p-3 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-purple-500/20"
                  maxLength={6}
                />
                <button
                  onClick={handleSubmitReferral}
                  disabled={!referralInput}
                  className={`p-3 rounded-lg transition-colors ${
                    referralInput
                      ? 'bg-purple-500 hover:bg-purple-600 text-white'
                      : 'bg-gray-800/50 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* Stats Section */}
          <div className="grid grid-cols-2 gap-4">
            <div className="glassmorphism rounded-xl p-4 border border-indigo-500/20">
              <h4 className="text-sm text-gray-400 mb-1">Total Referrals</h4>
              <p className="text-2xl font-bold">{state.referrals.length}</p>
            </div>
            <div className="glassmorphism rounded-xl p-4 border border-purple-500/20">
              <h4 className="text-sm text-gray-400 mb-1">Bonus Earned</h4>
              <p className="text-2xl font-bold">
                {state.referralBonus.toFixed(4)} <span className="text-sm text-purple-400">USDT</span>
              </p>
            </div>
          </div>

          {/* Referral Benefits */}
          <div className="glassmorphism rounded-xl p-4 border border-indigo-500/20">
            <h3 className="font-semibold mb-4">Referral Benefits</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                  5%
                </div>
                <p className="text-sm text-gray-300">Bonus for each referral</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400">
                  10%
                </div>
                <p className="text-sm text-gray-300">Bonus when using a referral code</p>
              </div>
            </div>
          </div>

          {/* Active Referrals */}
          {state.referrals.length > 0 && (
            <div className="glassmorphism rounded-xl p-4 border border-indigo-500/20">
              <h3 className="font-semibold mb-4">Active Referrals</h3>
              <div className="space-y-2">
                {state.referrals.map((code, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-800/30"
                  >
                    <span className="font-mono text-indigo-400">{code}</span>
                    <span className="text-sm text-gray-400">Active</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}