// Testes unitários básicos para validação

import {
  calculateEMA,
  calculateRSI,
  calculateMACD,
  calculateBollingerBands,
  calculateATR,
  calculateRiskReward,
} from '../utils/calculations';

// Dados de teste
const testPrices = [
  100, 101, 102, 101, 103, 104, 103, 105, 106, 107,
  106, 108, 109, 110, 109, 111, 112, 113, 112, 114,
  115, 116, 115, 117, 118, 119, 120, 119, 121, 122,
];

const testCandles = [
  { high: 101, low: 99, close: 100, volume: 1000 },
  { high: 102, low: 100, close: 101, volume: 1100 },
  { high: 103, low: 101, close: 102, volume: 1200 },
  { high: 102, low: 100, close: 101, volume: 950 },
  { high: 104, low: 102, close: 103, volume: 1300 },
  { high: 105, low: 103, close: 104, volume: 1400 },
  { high: 104, low: 102, close: 103, volume: 1100 },
  { high: 106, low: 104, close: 105, volume: 1500 },
  { high: 107, low: 105, close: 106, volume: 1600 },
  { high: 108, low: 106, close: 107, volume: 1700 },
];

// === TESTES ===

export const runTests = () => {
  console.log('🧪 Iniciando testes...');

  try {
    // Teste 1: EMA
    const emaResult = calculateEMA(testPrices, 12);
    console.log(
      '✅ EMA: OK (último valor:',
      emaResult[emaResult.length - 1]?.toFixed(2),
      ')'
    );
  } catch (e) {
    console.error('❌ EMA: FALHA -', e);
  }

  try {
    // Teste 2: RSI
    const rsiResult = calculateRSI(testPrices, 14);
    console.log('✅ RSI: OK (valor:', rsiResult.toFixed(2), ')');
    if (rsiResult < 0 || rsiResult > 100) {
      console.error('❌ RSI: Valor fora do intervalo [0-100]');
    }
  } catch (e) {
    console.error('❌ RSI: FALHA -', e);
  }

  try {
    // Teste 3: MACD
    const macdResult = calculateMACD(testPrices);
    console.log('✅ MACD: OK (MACD:', macdResult.macd.toFixed(4), ')');
  } catch (e) {
    console.error('❌ MACD: FALHA -', e);
  }

  try {
    // Teste 4: Bollinger Bands
    const bbResult = calculateBollingerBands(testPrices, 20, 2);
    console.log(
      '✅ Bollinger Bands: OK (Upper:',
      bbResult.upper.toFixed(2),
      ', Middle:',
      bbResult.middle.toFixed(2),
      ', Lower:',
      bbResult.lower.toFixed(2),
      ')'
    );
    if (bbResult.lower > bbResult.middle || bbResult.middle > bbResult.upper) {
      console.error('❌ BB: Ordem inválida');
    }
  } catch (e) {
    console.error('❌ Bollinger Bands: FALHA -', e);
  }

  try {
    // Teste 5: ATR
    const atrResult = calculateATR(testCandles, 14);
    console.log('✅ ATR: OK (valor:', atrResult.toFixed(4), ')');
  } catch (e) {
    console.error('❌ ATR: FALHA -', e);
  }

  try {
    // Teste 6: Risk/Reward
    const rr = calculateRiskReward(100, 98, 106);
    console.log('✅ Risk/Reward: OK (1:', rr.toFixed(2), ')');
    if (rr < 1) {
      console.error('❌ R/R: Valor menor que 1 (risco > recompensa)');
    }
  } catch (e) {
    console.error('❌ Risk/Reward: FALHA -', e);
  }

  console.log('\n✅ Testes concluídos!');
};

// === VALIDAÇÕES ===

export const validateIndicators = (indicators: any) => {
  const issues = [];

  if (!indicators) {
    issues.push('❌ Indicadores nulos');
    return issues;
  }

  // Validar EMA
  if (indicators.ema12 === 0 || indicators.ema26 === 0) {
    issues.push('⚠️  EMA zerada (dados insuficientes?)');
  }

  // Validar RSI
  if (indicators.rsi < 0 || indicators.rsi > 100) {
    issues.push('❌ RSI fora do intervalo [0-100]');
  }
  if (indicators.rsi === 50) {
    issues.push('⚠️  RSI neutra (sem sinal claro)');
  }

  // Validar MACD
  if (isNaN(indicators.macd)) {
    issues.push('❌ MACD inválido (NaN)');
  }

  // Validar BB
  if (indicators.bb_lower > indicators.bb_middle || indicators.bb_middle > indicators.bb_upper) {
    issues.push('❌ Bollinger Bands com ordem inválida');
  }

  // Validar ATR
  if (indicators.atr <= 0) {
    issues.push('⚠️  ATR <= 0 (volatilidade muito baixa)');
  }

  return issues;
};

export const validateSignal = (signal: any) => {
  const issues = [];

  if (!signal) return issues;

  // Validar entry
  if (signal.entry <= 0) {
    issues.push('❌ Entry inválido (<= 0)');
  }

  // Validar SL
  if (signal.type === 'LONG' && signal.stopLoss >= signal.entry) {
    issues.push('❌ SL >= Entry em LONG (deve ser menor)');
  }
  if (signal.type === 'SHORT' && signal.stopLoss <= signal.entry) {
    issues.push('❌ SL <= Entry em SHORT (deve ser maior)');
  }

  // Validar TP
  if (signal.type === 'LONG' && signal.takeProfit <= signal.entry) {
    issues.push('❌ TP <= Entry em LONG (deve ser maior)');
  }
  if (signal.type === 'SHORT' && signal.takeProfit >= signal.entry) {
    issues.push('❌ TP >= Entry em SHORT (deve ser menor)');
  }

  // Validar Risk/Reward
  const risk = Math.abs(signal.entry - signal.stopLoss);
  const reward = Math.abs(signal.takeProfit - signal.entry);
  const rr = reward / risk;
  if (rr < 1) {
    issues.push(`⚠️  Risk/Reward baixo (${rr.toFixed(2)}, ideal > 1)`);
  }

  // Validar confiança
  if (signal.confidence < 0 || signal.confidence > 100) {
    issues.push('❌ Confiança fora do intervalo [0-100]');
  }
  if (signal.confidence < 70) {
    issues.push('⚠️  Confiança baixa (< 70%)');
  }

  return issues;
};

// === BACKTESTING BÁSICO ===

export interface BacktestResult {
  totalTrades: number;
  wins: number;
  losses: number;
  winRate: number;
  totalPnL: number;
  profitFactor: number;
  maxDrawdown: number;
}

export const backtest = (
  trades: any[],
  initialCapital: number = 1000
): BacktestResult => {
  let capital = initialCapital;
  let wins = 0;
  let losses = 0;
  let peak = capital;
  let maxDrawdown = 0;
  let totalProfit = 0;

  for (const trade of trades) {
    if (!trade.pnl) continue;

    capital += trade.pnl;
    totalProfit += trade.pnl;

    if (trade.result === 'WIN') {
      wins++;
    } else if (trade.result === 'LOSS') {
      losses++;
    }

    // Atualizar drawdown
    if (capital > peak) {
      peak = capital;
    }
    const drawdown = peak - capital;
    if (drawdown > maxDrawdown) {
      maxDrawdown = drawdown;
    }
  }

  const totalTrades = wins + losses;
  const winRate = totalTrades > 0 ? (wins / totalTrades) * 100 : 0;

  // Profit Factor
  const totalWins = trades
    .filter((t) => t.result === 'WIN')
    .reduce((sum, t) => sum + (t.pnl || 0), 0);
  const totalLosses = Math.abs(
    trades
      .filter((t) => t.result === 'LOSS')
      .reduce((sum, t) => sum + (t.pnl || 0), 0)
  );
  const profitFactor = totalLosses > 0 ? totalWins / totalLosses : 0;

  return {
    totalTrades,
    wins,
    losses,
    winRate,
    totalPnL: totalProfit,
    profitFactor,
    maxDrawdown,
  };
};
