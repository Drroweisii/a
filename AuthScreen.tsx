import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { Cpu, User, Lock, AlertCircle } from 'lucide-react';

export default function AuthScreen() {
  const { dispatch } = useGame();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch(`/api/auth/${isLogin ? 'login' : 'signup'}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
        credentials: 'include'
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      dispatch({ type: 'SET_USER', payload: data.user });
    } catch (err) {
      setError(err.message || 'Authentication failed');
    }
  };

  const handleGuestLogin = () => {
    const guestUser = {
      id: `guest_${Date.now()}`,
      firstName: 'Guest',
      referralCode: Math.random().toString(36).substring(2, 8).toUpperCase()
    };
    dispatch({ type: 'SET_USER', payload: guestUser });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="glassmorphism rounded-2xl p-8 border border-gray-700/50">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="p-4 rounded-xl bg-emerald-500/20">
                <Cpu className="w-12 h-12 text-emerald-400" />
              </div>
            </div>
            <h1 className="text-2xl font-bold mb-2">Welcome to Crypto Miner</h1>
            <p className="text-gray-400">Start your mining journey</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Username</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:border-emerald-500"
                  placeholder="Enter username"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:border-emerald-500"
                  placeholder="Enter password"
                  required
                />
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:border-emerald-500"
                    placeholder="Confirm password"
                    required
                  />
                </div>
              </div>
            )}

            {error && (
              <div className="flex items-center space-x-2 text-red-400 text-sm">
                <AlertCircle className="w-4 h-4" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-emerald-600 to-emerald-500 rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-emerald-500/20 transition-all duration-300"
            >
              {isLogin ? 'Login' : 'Sign Up'}
            </button>
          </form>

          <div className="mt-4 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-emerald-400 text-sm hover:underline"
            >
              {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Login'}
            </button>
          </div>

          <div className="mt-4 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-900 text-gray-400">Or</span>
            </div>
          </div>

          <button
            onClick={handleGuestLogin}
            className="mt-4 w-full py-3 px-4 bg-gray-800 rounded-lg text-gray-300 font-semibold hover:bg-gray-700 transition-all duration-300"
          >
            Play as Guest
          </button>
        </div>
      </div>
    </div>
  );
}