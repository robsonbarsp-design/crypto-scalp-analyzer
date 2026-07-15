import { Signal, TechnicalIndicators, Candle } from '../types';
import { indicatorService } from './indicators';
import { calculateRiskReward, calculatePercentageChange } from '../utils/calculations';
import { DEFAULT_SETTINGS } from '../utils/constants';

export const signalService = {
  // Gerar sinal baseado em indicadores
  generateSignal(
    symbol: string,
    candles: Candle[],
    indicators: TechnicalIndicators
  ): Signal | null {
    if (candles.length < 2) return null;

    const lastCandle = candles[candles.length - 1];
    const prevCandle = candles[candles.length - 2];
    const currentPrice = lastCandle.close;

    // Análise SMC
    const smc = indicatorService.analyzeSMC(candles);

    // Análise ICT
    const ict = indicatorService.analyzeICT(candles);

    let signalType: 'LONG' | 'SHORT' | null = null;
    let confidence = 0;
    let reason = '';
    let entry = currentPrice;
    let stopLoss = 0;
    let takeProfit = 0;

    // === LONG SIGNAL ===
    const emaAbove = indicators.ema12 > indicators.ema26;
    const rsiConfirm = indicators.rsi > DEFAULT_SETTINGS.rsiOversold && indicators.rsi < 70;
    const macdPositive = indicators.macd > indicators.signal;
    const cvdPositive = indicators.cvd > 0;
    const priceAboveBB = currentPrice > indicators.bb_middle;

    if (emaAbove && rsiConfirm && macdPositive && priceAboveBB) {
      signalType = 'LONG';

      // Calcular confiança
      let longConfidence = 0;

      // EMA (30%)
      const emaStrength = Math.min(
        ((indicators.ema12 - indicators.ema26) / indicators.ema26) * 100,
        30
      );
      longConfidence += Math.min(emaStrength, 30);

      // RSI (25%)
      const rsiStrength =
        indicators.rsi > DEFAULT_SETTINGS.rsiOversold &&
        indicators.rsi < 50
          ? 25
          : 15;
      longConfidence += rsiStrength;

      // MACD (25%)
      const macdStrength =
        indicators.histogram > 0 ? 25 : indicators.histogram > -0.5 ? 15 : 5;
      longConfidence += macdStrength;

      // CVD (20%)
      const cvdStrength = cvdPositive ? 20 : 10;
      longConfidence += cvdStrength;

      confidence = Math.min(longConfidence, 100);

      // Calcular SL e TP
      stopLoss = currentPrice - indicators.atr * 1.5;
      takeProfit = currentPrice + indicators.atr * 3;

      reason = `EMA Bullish, RSI ${indicators.rsi.toFixed(2)}, MACD positivo`;
    }

    // === SHORT SIGNAL ===
    const emaBelow = indicators.ema12 < indicators.ema26;
    const rsiOverbought = indicators.rsi > 70;
    const macdNegative = indicators.macd < indicators.signal;
    const cvdNegative = indicators.cvd < 0;
    const priceBelowBB = currentPrice < indicators.bb_middle;

    if (emaBelow && rsiOverbought && macdNegative && priceBelowBB) {
      signalType = 'SHORT';

      // Calcular confiança
      let shortConfidence = 0;

      // EMA (30%)
      const emaStrength = Math.min(
        Math.abs((indicators.ema12 - indicators.ema26) / indicators.ema26) * 100,
        30
      );
      shortConfidence += Math.min(emaStrength, 30);

      // RSI (25%)
      const rsiStrength =
        indicators.rsi > 70 && indicators.rsi < 100 ? 25 : 15;
      shortConfidence += rsiStrength;

      // MACD (25%)
      const macdStrength =
        indicators.histogram < 0 ? 25 : indicators.histogram < 0.5 ? 15 : 5;
      shortConfidence += macdStrength;

      // CVD (20%)
      const cvdStrength = cvdNegative ? 20 : 10;
      shortConfidence += cvdStrength;

      confidence = Math.min(shortConfidence, 100);

      // Calcular SL e TP
      stopLoss = currentPrice + indicators.atr * 1.5;
      takeProfit = currentPrice - indicators.atr * 3;

      reason = `EMA Bearish, RSI ${indicators.rsi.toFixed(2)}, MACD negativo`;
    }

    if (signalType && confidence >= DEFAULT_SETTINGS.minConfidence) {
      return {
        symbol,
        type: signalType,
        entry,
        stopLoss,
        takeProfit,
        confidence: Math.round(confidence),
        reason,
        timestamp: new Date(lastCandle.timestamp),
        indicators,
      };
    }

    return null;
  },

  // Validar qualidade do sinal
  validateSignal(signal: Signal): boolean {
    // Validações de risco/recompensa
    const riskReward = calculateRiskReward(
      signal.entry,
      signal.stopLoss,
      signal.takeProfit
    );

    // Mínimo de 1:1 de risco/recompensa
    if (riskReward < 1) return false;

    // Máximo de risco por operação
    const riskPercent =
      (Math.abs(signal.entry - signal.stopLoss) / signal.entry) * 100;
    if (riskPercent > 5) return false; // Máximo 5% de risco

    // Confiança mínima
    if (signal.confidence < 70) return false;

    return true;
  },

  // Calcular PnL de um trade
  calculatePnL(
    entry: number,
    exit: number,
    type: 'LONG' | 'SHORT'
  ): { pnl: number; pnlPercent: number } {
    let pnl = 0;
    let pnlPercent = 0;

    if (type === 'LONG') {
      pnl = exit - entry;
      pnlPercent = ((exit - entry) / entry) * 100;
    } else {
      pnl = entry - exit;
      pnlPercent = ((entry - exit) / entry) * 100;
    }

    return {
      pnl: parseFloat(pnl.toFixed(2)),
      pnlPercent: parseFloat(pnlPercent.toFixed(2)),
    };
  },
};
