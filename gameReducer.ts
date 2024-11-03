export interface GameState {
  user: any;
  balance: number;
  miningPower: number;
  selectedCrypto: string | null;
  unlockedMiners: string[];
  lastPurchaseTime: number | null;
  referralCode: string;
  referralBonus: number;
  referredBy: string | null;
  referrals: string[];
  components: {
    miningRig: number;
    powerSupply: number;
    motherboard: number;
    cooling: number;
    network: number;
    software: number;
  };
}

export const initialState: GameState = {
  user: null,
  balance: 0,
  miningPower: 0,
  selectedCrypto: null,
  unlockedMiners: ['USDT'],
  lastPurchaseTime: null,
  referralCode: '',
  referralBonus: 0,
  referredBy: null,
  referrals: [],
  components: {
    miningRig: 1,
    powerSupply: 1,
    motherboard: 1,
    cooling: 1,
    network: 1,
    software: 1,
  },
};

export const gameReducer = (state: GameState, action: any) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        referralCode: action.payload.referralCode || state.referralCode
      };
      
    case 'SELECT_CRYPTO':
      return {
        ...state,
        selectedCrypto: action.payload,
        balance: 0,
        miningPower: 0,
        components: {
          miningRig: 1,
          powerSupply: 1,
          motherboard: 1,
          cooling: 1,
          network: 1,
          software: 1,
        },
      };
    
    case 'MINE_CRYPTO':
      const bonusMultiplier = state.unlockedMiners.length > 1 ? 1 + (state.unlockedMiners.length - 1) * 0.1 : 1;
      const referralMultiplier = 1 + (state.referrals.length * 0.05) + (state.referredBy ? 0.1 : 0);
      return {
        ...state,
        balance: state.balance + (state.miningPower * bonusMultiplier * referralMultiplier),
        referralBonus: state.referralBonus + (state.miningPower * bonusMultiplier * (referralMultiplier - 1)),
      };
    
    case 'UPGRADE_COMPONENT':
      const cost = action.payload.cost;
      
      if (state.balance < cost) return state;
      
      return {
        ...state,
        balance: state.balance - cost,
        components: {
          ...state.components,
          [action.payload.component]: state.components[action.payload.component] + 1,
        },
      };
    
    case 'UPDATE_MINING_POWER':
      return {
        ...state,
        miningPower: action.payload,
      };

    case 'PURCHASE_MINER':
      if (state.balance < action.payload.cost) return state;
      if (state.unlockedMiners.includes(action.payload.minerId)) return state;

      return {
        ...state,
        balance: state.balance - action.payload.cost,
        unlockedMiners: [...state.unlockedMiners, action.payload.minerId],
        lastPurchaseTime: Date.now(),
      };

    case 'ADD_REFERRAL':
      if (state.referrals.includes(action.payload) || action.payload === state.referralCode) return state;
      return {
        ...state,
        referrals: [...state.referrals, action.payload],
      };

    case 'SET_REFERRED_BY':
      if (state.referredBy || action.payload === state.referralCode) return state;
      return {
        ...state,
        referredBy: action.payload,
      };
    
    default:
      return state;
  }
};