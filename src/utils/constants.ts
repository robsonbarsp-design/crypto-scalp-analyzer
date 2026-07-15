// Constantes do aplicativo

export const DEFAULT_SETTINGS = {
  timeframe: '5m' as const,
  rsiOverbought: 70,
  rsiOversold: 30,
  macdSensitivity: 0.5,
  slPercent: 1.5,
  tpPercent: 3.0,
  minConfidence: 75,
};

export const COLORS = {
  primary: '#00D084',
  secondary: '#1a1a1a',
  dark: '#0a0a0a',
  light: '#f5f5f5',
  success: '#00D084',
  warning: '#FFB800',
  danger: '#FF6B6B',
  neutral: '#666666',
};

export const TIMEFRAMES = [
  { label: '1 min', value: '1m' },
  { label: '5 min', value: '5m' },
  { label: '15 min', value: '15m' },
  { label: '1 hora', value: '1h' },
  { label: '4 horas', value: '4h' },
] as const;

export const TOP_CRYPTOS = [
  'bitcoin',
  'ethereum',
  'solana',
  'cardano',
  'polkadot',
  'ripple',
  'litecoin',
  'dogecoin',
  'polygon',
  'chainlink',
  'uniswap',
  'avalanche-2',
  'cosmos',
  'tron',
  'near-protocol',
];

export const API_ENDPOINTS = {
  coingecko: 'https://api.coingecko.com/api/v3',
  binance: 'https://api.binance.com/api/v3',
  binanceWs: 'wss://stream.binance.com:9443/ws',
};

export const CONFIDENCE_THRESHOLDS = {
  veryWeak: [0, 30],
  weak: [30, 50],
  moderate: [50, 70],
  strong: [70, 85],
  veryStrong: [85, 100],
};
