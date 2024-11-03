import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { gameReducer, initialState, GameState } from './gameReducer';
import { calculateMiningPower } from '../utils/gameUtils';
import { saveGameState, loadGameState } from '../services/storage';

interface GameContextType {
  state: GameState;
  dispatch: React.Dispatch<any>;
}

const GameContext = createContext<GameContextType | null>(null);

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState, () => {
    const savedState = loadGameState();
    return savedState || initialState;
  });

  useEffect(() => {
    if (state.selectedCrypto) {
      const miningInterval = setInterval(() => {
        dispatch({ type: 'MINE_CRYPTO' });
      }, 1000);

      return () => clearInterval(miningInterval);
    }
  }, [state.selectedCrypto]);

  useEffect(() => {
    const newMiningPower = calculateMiningPower(state.components, state.selectedCrypto);
    dispatch({ type: 'UPDATE_MINING_POWER', payload: newMiningPower });
  }, [state.components, state.selectedCrypto]);

  useEffect(() => {
    saveGameState(state);
  }, [state]);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};