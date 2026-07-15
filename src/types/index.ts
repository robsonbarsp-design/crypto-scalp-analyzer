// Tipos de dados para criptomoedas
export interface Cryptocurrency {
  id: string;
  symbol: string;
  name: string;
  currentPrice: number;
  marketCap: number;
  marketCapRank: number;
  volume24h: number;
  priceChange24h: number;
  priceChangePercent24h: number;
  ath: number;
  atl: number;
  circulatingSupply: number;
  totalSupply: number;
  image?: string;
}

// Candles para gráficos
export interface Candle {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

// Indicadores técnicos
export interface TechnicalIndicators {
  ema12: number;
  ema26: number;
  rsi: number;
  macd: number;
  signal: number;
  histogram: number;
  cvd: number;
  openInterest: number;
  atr: number;
  bb_upper: number;
  bb_lower: number;
  bb_middle: number;
}

// Análise de Smart Money Concepts
export interface SMCAnalysis {
  supportLevels: number[];
  resistanceLevels: number[];
  liquidityLevels: number[];
  orderBlocks: OrderBlock[];
  fairValueGaps: FVG[];
}

export interface OrderBlock {
  level: number;
  type: 'bullish' | 'bearish';
  strength: number;
  timestamp: number;
}

export interface FVG {
  high: number;
  low: number;
  type: 'bullish' | 'bearish';
  timestamp: number;
}

// Sinal de entrada/saída
export interface Signal {
  symbol: string;
  type: 'LONG' | 'SHORT';
  entry: number;
  stopLoss: number;
  takeProfit: number;
  confidence: number; // 0-100%
  reason: string;
  timestamp: Date;
  indicators: TechnicalIndicators;
}

// Trade realizado
export interface Trade {
  id: string;
  symbol: string;
  type: 'LONG' | 'SHORT';
  entry: number;
  stopLoss: number;
  takeProfit: number;
  exit?: number;
  result?: 'WIN' | 'LOSS' | 'PENDING';
  pnl?: number;
  pnlPercent?: number;
  entryTime: Date;
  exitTime?: Date;
  confidence: number;
  reason: string;
}

// Estatísticas de trading
export interface TradingStats {
  totalTrades: number;
  winTrades: number;
  lossTrades: number;
  winRate: number; // %
  averageWin: number;
  averageLoss: number;
  profitFactor: number;
  totalProfit: number;
  maxDrawdown: number;
}

// Configurações do app
export interface AppSettings {
  selectedPair: string;
  timeframe: '1m' | '5m' | '15m' | '1h' | '4h';
  rsiOverbought: number;
  rsiOversold: number;
  macdSensitivity: number;
  slPercent: number;
  tpPercent: number;
  minConfidence: number;
}
