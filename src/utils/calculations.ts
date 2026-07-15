// Cálculos matemáticos para indicadores

export const calculateEMA = (data: number[], period: number): number[] => {
  if (data.length === 0) return [];
  
  const ema: number[] = [];
  const multiplier = 2 / (period + 1);
  
  // SMA inicial
  let sum = 0;
  for (let i = 0; i < period; i++) {
    sum += data[i];
  }
  ema[period - 1] = sum / period;
  
  // EMA subsequentes
  for (let i = period; i < data.length; i++) {
    ema[i] = (data[i] - ema[i - 1]) * multiplier + ema[i - 1];
  }
  
  return ema;
};

export const calculateRSI = (data: number[], period: number = 14): number => {
  if (data.length < period + 1) return 50;
  
  const changes: number[] = [];
  for (let i = 1; i < data.length; i++) {
    changes.push(data[i] - data[i - 1]);
  }
  
  let gains = 0;
  let losses = 0;
  
  for (let i = 0; i < period; i++) {
    if (changes[i] > 0) {
      gains += changes[i];
    } else {
      losses += Math.abs(changes[i]);
    }
  }
  
  let avgGain = gains / period;
  let avgLoss = losses / period;
  
  for (let i = period; i < changes.length; i++) {
    if (changes[i] > 0) {
      avgGain = (avgGain * (period - 1) + changes[i]) / period;
      avgLoss = (avgLoss * (period - 1)) / period;
    } else {
      avgGain = (avgGain * (period - 1)) / period;
      avgLoss = (avgLoss * (period - 1) + Math.abs(changes[i])) / period;
    }
  }
  
  const rs = avgGain / avgLoss;
  return 100 - (100 / (1 + rs));
};

export const calculateMACD = (
  data: number[],
  fastPeriod: number = 12,
  slowPeriod: number = 26,
  signalPeriod: number = 9
) => {
  const fastEMA = calculateEMA(data, fastPeriod);
  const slowEMA = calculateEMA(data, slowPeriod);
  
  const macdLine: number[] = [];
  for (let i = 0; i < Math.min(fastEMA.length, slowEMA.length); i++) {
    macdLine.push(fastEMA[i] - slowEMA[i]);
  }
  
  const signalLine = calculateEMA(macdLine, signalPeriod);
  const histogram: number[] = [];
  
  for (let i = 0; i < Math.min(macdLine.length, signalLine.length); i++) {
    histogram.push(macdLine[i] - signalLine[i]);
  }
  
  return {
    macd: macdLine[macdLine.length - 1] || 0,
    signal: signalLine[signalLine.length - 1] || 0,
    histogram: histogram[histogram.length - 1] || 0,
  };
};

export const calculateBollingerBands = (
  data: number[],
  period: number = 20,
  stdDeviation: number = 2
) => {
  if (data.length < period) {
    return { upper: 0, middle: 0, lower: 0 };
  }
  
  // SMA
  let sum = 0;
  const recentData = data.slice(-period);
  for (let i = 0; i < period; i++) {
    sum += recentData[i];
  }
  const middle = sum / period;
  
  // Desvio padrão
  let variance = 0;
  for (let i = 0; i < period; i++) {
    variance += Math.pow(recentData[i] - middle, 2);
  }
  variance = variance / period;
  const stdDev = Math.sqrt(variance);
  
  return {
    upper: middle + stdDev * stdDeviation,
    middle,
    lower: middle - stdDev * stdDeviation,
  };
};

export const calculateATR = (candles: Array<{ high: number; low: number; close: number }>, period: number = 14): number => {
  if (candles.length < 2) return 0;
  
  const tr: number[] = [];
  
  for (let i = 0; i < candles.length; i++) {
    const high = candles[i].high;
    const low = candles[i].low;
    const close = i > 0 ? candles[i - 1].close : candles[i].close;
    
    const tr1 = high - low;
    const tr2 = Math.abs(high - close);
    const tr3 = Math.abs(low - close);
    
    tr.push(Math.max(tr1, tr2, tr3));
  }
  
  let sum = 0;
  for (let i = 0; i < Math.min(period, tr.length); i++) {
    sum += tr[i];
  }
  
  return sum / Math.min(period, tr.length);
};

export const calculateCVD = (candles: Array<{ volume: number; close: number }>, previousCVD: number = 0): number => {
  let cvd = previousCVD;
  
  for (let i = 0; i < candles.length; i++) {
    const volume = candles[i].volume;
    // Simplificado: assume que close alta = buyer volume
    cvd += volume;
  }
  
  return cvd;
};

export const calculatePercentageChange = (from: number, to: number): number => {
  if (from === 0) return 0;
  return ((to - from) / from) * 100;
};

export const calculateRiskReward = (entry: number, stopLoss: number, takeProfit: number): number => {
  const risk = Math.abs(entry - stopLoss);
  const reward = Math.abs(takeProfit - entry);
  
  if (risk === 0) return 0;
  return reward / risk;
};
