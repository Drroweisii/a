interface CryptoRates {
  [key: string]: {
    baseRate: number;
    baseCosts: {
      [key: string]: number;
    };
    dailyTarget: number;
    weeklyTarget: number;
  };
}

const CRYPTO_CONFIGS: CryptoRates = {
  USDT: {
    baseRate: 0.0000231,
    baseCosts: {
      miningRig: 0.4,
      powerSupply: 0.25,
      motherboard: 0.3,
      cooling: 0.15,
      network: 0.1,
      software: 0.15
    },
    dailyTarget: 2,
    weeklyTarget: 10
  },
  BTC: {
    baseRate: 0.0000000001,
    baseCosts: {
      miningRig: 0.00002,
      powerSupply: 0.000012,
      motherboard: 0.000015,
      cooling: 0.000008,
      network: 0.000005,
      software: 0.000008
    },
    dailyTarget: 0.0001,
    weeklyTarget: 0.0005
  },
  ETH: {
    baseRate: 0.000000001,
    baseCosts: {
      miningRig: 0.0002,
      powerSupply: 0.00012,
      motherboard: 0.00015,
      cooling: 0.00008,
      network: 0.00005,
      software: 0.00008
    },
    dailyTarget: 0.001,
    weeklyTarget: 0.005
  },
  TON: {
    baseRate: 0.0000231,
    baseCosts: {
      miningRig: 0.4,
      powerSupply: 0.25,
      motherboard: 0.3,
      cooling: 0.15,
      network: 0.1,
      software: 0.15
    },
    dailyTarget: 2,
    weeklyTarget: 10
  }
};

export const calculateMiningPower = (components: any, cryptoType: string | null) => {
  if (!cryptoType) return 0;

  const { miningRig, powerSupply, motherboard, cooling, network, software } = components;
  
  const power = (
    miningRig * 0.3 +
    powerSupply * 0.16 +
    motherboard * 0.24 +
    cooling * 0.12 +
    network * 0.08 +
    software * 0.14
  );
  
  return power * CRYPTO_CONFIGS[cryptoType].baseRate;
};

export const calculateUpgradeCost = (component: string, currentLevel: number, cryptoType: string) => {
  if (!cryptoType || !CRYPTO_CONFIGS[cryptoType]) return 0;
  
  const baseCosts = CRYPTO_CONFIGS[cryptoType].baseCosts;
  const scalingFactor = 1.5;
  return baseCosts[component] * Math.pow(scalingFactor, currentLevel - 1);
};