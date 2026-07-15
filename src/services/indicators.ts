import {
  calculateEMA,
  calculateRSI,
  calculateMACD,
  calculateBollingerBands,
  calculateATR,
  calculateCVD,
} from '../utils/calculations';
import { TechnicalIndicators, Candle } from '../types';

export const indicatorService = {
  // Calcular todos os indicadores técnicos
  calculateIndicators(candles: Candle[]): TechnicalIndicators {
    if (candles.length < 30) {
      return {
        ema12: 0,
        ema26: 0,
        rsi: 50,
        macd: 0,
        signal: 0,
        histogram: 0,
        cvd: 0,
        openInterest: 0,
        atr: 0,
        bb_upper: 0,
        bb_lower: 0,
        bb_middle: 0,
      };
    }

    const closes = candles.map((c) => c.close);
    const highs = candles.map((c) => c.high);
    const lows = candles.map((c) => c.low);
    const volumes = candles.map((c) => c.volume);

    // EMA
    const ema12Array = calculateEMA(closes, 12);
    const ema26Array = calculateEMA(closes, 26);
    const ema12 = ema12Array[ema12Array.length - 1] || 0;
    const ema26 = ema26Array[ema26Array.length - 1] || 0;

    // RSI
    const rsi = calculateRSI(closes, 14);

    // MACD
    const macd = calculateMACD(closes);

    // Bollinger Bands
    const bb = calculateBollingerBands(closes, 20, 2);

    // ATR
    const atr = calculateATR(candles, 14);

    // CVD
    const cvd = calculateCVD(candles);

    return {
      ema12,
      ema26,
      rsi,
      macd: macd.macd,
      signal: macd.signal,
      histogram: macd.histogram,
      cvd,
      openInterest: 0, // Será preenchido separadamente
      atr,
      bb_upper: bb.upper,
      bb_lower: bb.lower,
      bb_middle: bb.middle,
    };
  },

  // Análise SMC (Smart Money Concepts)
  analyzeSMC(candles: Candle[]) {
    if (candles.length < 5) return { supportLevels: [], resistanceLevels: [] };

    const lows = candles.map((c) => c.low);
    const highs = candles.map((c) => c.high);

    // Encontrar mínimos e máximos locais
    const supportLevels = [];
    const resistanceLevels = [];

    for (let i = 2; i < lows.length - 2; i++) {
      // Suporte: mínimo local
      if (
        lows[i] < lows[i - 1] &&
        lows[i] < lows[i + 1] &&
        lows[i - 2] > lows[i] &&
        lows[i + 2] > lows[i]
      ) {
        supportLevels.push(lows[i]);
      }

      // Resistência: máximo local
      if (
        highs[i] > highs[i - 1] &&
        highs[i] > highs[i + 1] &&
        highs[i - 2] < highs[i] &&
        highs[i + 2] < highs[i]
      ) {
        resistanceLevels.push(highs[i]);
      }
    }

    // Remover duplicatas próximas
    const tolerance = candles[candles.length - 1].close * 0.001; // 0.1%

    const uniqueSupport = supportLevels.filter(
      (level, index) =>
        index === 0 ||
        Math.abs(level - supportLevels[index - 1]) > tolerance
    );

    const uniqueResistance = resistanceLevels.filter(
      (level, index) =>
        index === 0 ||
        Math.abs(level - resistanceLevels[index - 1]) > tolerance
    );

    return {
      supportLevels: uniqueSupport.sort((a, b) => b - a).slice(0, 5),
      resistanceLevels: uniqueResistance.sort((a, b) => a - b).slice(0, 5),
    };
  },

  // Análise ICT (Inner Circle Trader)
  analyzeICT(candles: Candle[]) {
    if (candles.length < 10) return { liquiditySweeps: [], orderBlocks: [] };

    const closes = candles.map((c) => c.close);
    const highs = candles.map((c) => c.high);
    const lows = candles.map((c) => c.low);

    const liquiditySweeps = [];
    const orderBlocks = [];

    // Detectar liquidity sweeps (quebra de extremos)
    for (let i = 2; i < candles.length; i++) {
      // Higher high break
      if (highs[i] > Math.max(...highs.slice(Math.max(0, i - 5), i))) {
        liquiditySweeps.push({
          type: 'bullish_break',
          level: highs[i],
          index: i,
        });
      }

      // Lower low break
      if (lows[i] < Math.min(...lows.slice(Math.max(0, i - 5), i))) {
        liquiditySweeps.push({
          type: 'bearish_break',
          level: lows[i],
          index: i,
        });
      }
    }

    // Identificar order blocks
    for (let i = 5; i < candles.length - 2; i++) {
      // Bullish order block: vela de alta seguida de pullback
      if (
        candles[i].close > candles[i].open &&
        candles[i + 1].close < candles[i + 1].open
      ) {
        orderBlocks.push({
          type: 'bullish',
          level: candles[i].high,
          strength: (candles[i].close - candles[i].open) / candles[i].close,
        });
      }

      // Bearish order block: vela de baixa seguida de rally
      if (
        candles[i].close < candles[i].open &&
        candles[i + 1].close > candles[i + 1].open
      ) {
        orderBlocks.push({
          type: 'bearish',
          level: candles[i].low,
          strength: (candles[i].open - candles[i].close) / candles[i].close,
        });
      }
    }

    return {
      liquiditySweeps: liquiditySweeps.slice(-5),
      orderBlocks: orderBlocks.slice(-5),
    };
  },
};
