// Configuração avançada de trading
// Copie e customize conforme sua estratégia

export const ADVANCED_CONFIG = {
  // === FILTROS DE MOEDAS ===
  CRYPTO_FILTERS: {
    minMarketCap: 1_000_000, // 1M USD mínimo
    maxPrice: 100, // Preço máximo
    minVolume24h: 1_000_000, // 1M USD volume mínimo
    minLiquidity: 500_000, // Liquidez mínima
    excludeStablecoins: true,
  },

  // === INDICADORES - EMA ===
  EMA_CONFIG: {
    fastPeriod: 12,
    slowPeriod: 26,
    minEmaDistance: 0.5, // % distância mínima entre EMAs
  },

  // === INDICADORES - RSI ===
  RSI_CONFIG: {
    period: 14,
    overbought: 70,
    oversold: 30,
    // Para LONG: buscar RSI entre oversold e 50
    longMinRsi: 30,
    longMaxRsi: 50,
    // Para SHORT: buscar RSI > 70
    shortMinRsi: 70,
    shortMaxRsi: 100,
  },

  // === INDICADORES - MACD ===
  MACD_CONFIG: {
    fastPeriod: 12,
    slowPeriod: 26,
    signalPeriod: 9,
    // Histogram deve ultrapassar este valor
    minHistogramStrength: 0.001,
  },

  // === INDICADORES - BOLLINGER BANDS ===
  BB_CONFIG: {
    period: 20,
    stdDeviation: 2,
    // LONG: preço deve estar acima da middle
    // SHORT: preço deve estar abaixo da middle
  },

  // === INDICADORES - ATR ===
  ATR_CONFIG: {
    period: 14,
    // Stop Loss = Entrada - (ATR × slMultiplier)
    slMultiplier: 1.5,
    // Take Profit = Entrada + (ATR × tpMultiplier)
    tpMultiplier: 3,
  },

  // === RISK MANAGEMENT ===
  RISK_MANAGEMENT: {
    // Percentual máximo de risco por trade
    maxRiskPercentPerTrade: 1.5,
    // Percentual máximo de perda diária
    maxDailyLossPercent: 5,
    // Mínimo de risk/reward
    minRiskRewardRatio: 1.5,
    // Máximo de SL% em relação ao preço
    maxSlPercent: 5,
  },

  // === SINAL DE CONFIANÇA ===
  CONFIDENCE_WEIGHTS: {
    // Pesos para cálculo de confiança
    emaForce: 0.3, // 30%
    momentumForce: 0.25, // 25%
    volumeForce: 0.2, // 20%
    structureForce: 0.25, // 25%
  },

  // === FILTROS DE SINAL ===
  SIGNAL_FILTERS: {
    // Confiance mínima para gerar sinal
    minConfidence: 75,
    // Descarta sinais muito fracos
    maxConfidence: 100,
    // Timeframe do scalp
    timeframe: '5m',
    // Máximo de sinais simultâneos
    maxConcurrentSignals: 5,
  },

  // === SMC (SMART MONEY CONCEPTS) ===
  SMC_CONFIG: {
    // Detectar order blocks de força X
    minOrderBlockStrength: 0.3,
    // Detectar liquidity sweeps
    detectLiquiditySweeps: true,
    // Detectar fair value gaps
    detectFVG: true,
    // Tolerância de preço para agrupamento de suportes/resistências
    tolerancePercent: 0.5,
  },

  // === ICT (INNER CIRCLE TRADER) ===
  ICT_CONFIG: {
    // Lookback para detectar padrões
    lookbackPeriods: 10,
    // Detectar higher highs/lower lows
    detectStructureBreaks: true,
    // Força mínima de breakout
    minBreakoutStrength: 1.5,
  },

  // === SCALPING ESPECÍFICO ===
  SCALPING_CONFIG: {
    // Tempo máximo de operação
    maxHoldTime: '30m',
    // Target de lucro rápido
    quickProfitTarget: 0.5, // 0.5% rápido
    // Se atingir 50% do TP, sair com 30% do risco
    trailingStopAtHalfTP: true,
  },

  // === MOEDAS PREFERENCIAIS ===
  PREFERRED_PAIRS: [
    'BTC', 'ETH', 'SOL', 'BNB', 'ADA',
    'XRP', 'DOGE', 'LINK', 'MATIC', 'AVAX',
  ],

  // === MOEDAS PARA EVITAR ===
  BLACKLIST_PAIRS: [
    // Moedas muito voláteis ou baixa liquidez
    'SHIB', 'FLOKI', // Memecoins
    'BONK', 'PEPE', // Shitcoins
  ],

  // === LOGGING ===
  DEBUG: {
    logIndicators: true, // Log de todos os indicadores
    logSignals: true, // Log de sinais gerados
    logTrades: true, // Log de execução de trades
    verbose: false, // Modo verbose (muito detalhe)
  },
};

// === PRESETS DE ESTRATÉGIA ===

export const STRATEGY_PRESETS = {
  // Conservador: Alto confiance, poucos trades
  CONSERVATIVE: {
    minConfidence: 85,
    slMultiplier: 2.0,
    tpMultiplier: 2.5,
    maxRiskPercentPerTrade: 0.5,
  },

  // Equilibrado: Balanço entre risco e recompensa
  BALANCED: {
    minConfidence: 75,
    slMultiplier: 1.5,
    tpMultiplier: 3.0,
    maxRiskPercentPerTrade: 1.0,
  },

  // Agressivo: Mais sinais, menor confiance
  AGGRESSIVE: {
    minConfidence: 65,
    slMultiplier: 1.0,
    tpMultiplier: 3.5,
    maxRiskPercentPerTrade: 2.0,
  },

  // Scalp Puro: Muito rápido, TP pequeno
  PURE_SCALP: {
    minConfidence: 70,
    slMultiplier: 0.8,
    tpMultiplier: 1.5,
    maxRiskPercentPerTrade: 0.3,
  },
};

// === EXEMPLO DE USO ===
/*

import { ADVANCED_CONFIG, STRATEGY_PRESETS } from './tradingConfig';

// Usar configuração padrão
const config = ADVANCED_CONFIG;

// Ou usar preset
const config = {
  ...ADVANCED_CONFIG,
  ...STRATEGY_PRESETS.BALANCED,
};

// Ou customizar
const config = {
  ...ADVANCED_CONFIG,
  SIGNAL_FILTERS: {
    ...ADVANCED_CONFIG.SIGNAL_FILTERS,
    minConfidence: 80, // Aumentar threshold
  },
};

*/
