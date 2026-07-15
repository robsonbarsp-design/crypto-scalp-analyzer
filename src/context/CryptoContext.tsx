import React, { createContext, useState, useCallback, ReactNode } from 'react';
import { Cryptocurrency, Signal, Trade, TradingStats, AppSettings } from '../types';
import { DEFAULT_SETTINGS } from '../utils/constants';

interface CryptoContextType {
  // State
  cryptos: Cryptocurrency[];
  selectedCrypto: Cryptocurrency | null;
  signals: Signal[];
  trades: Trade[];
  settings: AppSettings;
  loading: boolean;

  // Actions
  setCryptos: (cryptos: Cryptocurrency[]) => void;
  setSelectedCrypto: (crypto: Cryptocurrency | null) => void;
  addSignal: (signal: Signal) => void;
  addTrade: (trade: Trade) => void;
  updateTrade: (id: string, trade: Partial<Trade>) => void;
  setSettings: (settings: AppSettings) => void;
  setLoading: (loading: boolean) => void;
  clearOldSignals: () => void;

  // Computed
  tradingStats: TradingStats;
}

const CryptoContext = createContext<CryptoContextType | undefined>(undefined);

export const CryptoProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cryptos, setCryptos] = useState<Cryptocurrency[]>([]);
  const [selectedCrypto, setSelectedCrypto] = useState<Cryptocurrency | null>(
    null
  );
  const [signals, setSignals] = useState<Signal[]>([]);
  const [trades, setTrades] = useState<Trade[]>([]);
  const [settings, setSettings] = useState<AppSettings>({
    selectedPair: 'bitcoin',
    ...DEFAULT_SETTINGS,
  });
  const [loading, setLoading] = useState(false);

  const addSignal = useCallback((signal: Signal) => {
    setSignals((prev) => [...prev, signal].slice(-50)); // Manter últimos 50
  }, []);

  const addTrade = useCallback((trade: Trade) => {
    setTrades((prev) => [...prev, trade]);
  }, []);

  const updateTrade = useCallback((id: string, updates: Partial<Trade>) => {
    setTrades((prev) =>
      prev.map((trade) => (trade.id === id ? { ...trade, ...updates } : trade))
    );
  }, []);

  const clearOldSignals = useCallback(() => {
    const now = Date.now();
    const oneHourAgo = now - 60 * 60 * 1000;

    setSignals((prev) =>
      prev.filter((signal) => signal.timestamp.getTime() > oneHourAgo)
    );
  }, []);

  // Calcular estatísticas
  const tradingStats: TradingStats = React.useMemo(() => {
    const completedTrades = trades.filter((t) => t.result);
    const winTrades = completedTrades.filter((t) => t.result === 'WIN');
    const lossTrades = completedTrades.filter((t) => t.result === 'LOSS');

    const totalProfit = trades.reduce((sum, t) => sum + (t.pnl || 0), 0);
    const avgWin =
      winTrades.length > 0
        ? winTrades.reduce((sum, t) => sum + (t.pnl || 0), 0) / winTrades.length
        : 0;
    const avgLoss =
      lossTrades.length > 0
        ? lossTrades.reduce((sum, t) => sum + (t.pnl || 0), 0) / lossTrades.length
        : 0;

    const profitFactor = avgWin !== 0 ? Math.abs(avgWin / avgLoss) : 0;

    // Calcular max drawdown
    let maxDrawdown = 0;
    let peak = 0;
    let runningProfit = 0;

    for (const trade of trades) {
      runningProfit += trade.pnl || 0;
      if (runningProfit > peak) {
        peak = runningProfit;
      }
      const drawdown = peak - runningProfit;
      if (drawdown > maxDrawdown) {
        maxDrawdown = drawdown;
      }
    }

    return {
      totalTrades: trades.length,
      winTrades: winTrades.length,
      lossTrades: lossTrades.length,
      winRate:
        trades.length > 0
          ? (winTrades.length / completedTrades.length) * 100
          : 0,
      averageWin: avgWin,
      averageLoss: avgLoss,
      profitFactor,
      totalProfit,
      maxDrawdown,
    };
  }, [trades]);

  const value: CryptoContextType = {
    cryptos,
    selectedCrypto,
    signals,
    trades,
    settings,
    loading,
    setCryptos,
    setSelectedCrypto,
    addSignal,
    addTrade,
    updateTrade,
    setSettings,
    setLoading,
    clearOldSignals,
    tradingStats,
  };

  return (
    <CryptoContext.Provider value={value}>
      {children}
    </CryptoContext.Provider>
  );
};

export const useCryptoContext = () => {
  const context = React.useContext(CryptoContext);
  if (!context) {
    throw new Error(
      'useCryptoContext deve ser usado dentro de CryptoProvider'
    );
  }
  return context;
};
