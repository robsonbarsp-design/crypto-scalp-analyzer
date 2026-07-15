import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useCryptoContext } from '../context/CryptoContext';
import { cryptoDataService } from '../services/cryptoData';
import { indicatorService } from '../services/indicators';
import { signalService } from '../services/signals';
import { IndicatorCard } from '../components/IndicatorCard';
import { SignalCard } from '../components/SignalCard';
import { formatCurrency, formatPercentage } from '../utils/formatting';
import { Signal } from '../types';
import { COLORS } from '../utils/constants';

export const AnalysisScreen: React.FC = () => {
  const { selectedCrypto, addSignal, loading, setLoading } = useCryptoContext();
  const [signal, setSignal] = useState<Signal | null>(null);
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);

  useEffect(() => {
    if (selectedCrypto) {
      analyzeSelected();
    }
  }, [selectedCrypto]);

  const analyzeSelected = async () => {
    if (!selectedCrypto) return;

    setLoadingAnalysis(true);
    try {
      // Buscar candles
      const candles = await cryptoDataService.fetchCandles(
        selectedCrypto.symbol,
        '5m',
        100
      );

      if (candles.length < 30) {
        console.warn('Candles insuficientes');
        setLoadingAnalysis(false);
        return;
      }

      // Calcular indicadores
      const indicators = indicatorService.calculateIndicators(candles);

      // Buscar open interest
      const openInterest = await cryptoDataService.fetchOpenInterest(
        selectedCrypto.symbol
      );
      indicators.openInterest = openInterest;

      // Gerar sinal
      const newSignal = signalService.generateSignal(
        selectedCrypto.symbol,
        candles,
        indicators
      );

      if (newSignal && signalService.validateSignal(newSignal)) {
        setSignal(newSignal);
        addSignal(newSignal);
      } else {
        setSignal(null);
      }
    } catch (error) {
      console.error('Erro ao analisar:', error);
    } finally {
      setLoadingAnalysis(false);
    }
  };

  if (!selectedCrypto) {
    return (
      <View style={styles.container}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Selecione uma moeda para analisar</Text>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.symbol}>{selectedCrypto.symbol}</Text>
          <Text style={styles.name}>{selectedCrypto.name}</Text>
        </View>
        <View style={styles.priceInfo}>
          <Text style={styles.price}>
            {formatCurrency(selectedCrypto.currentPrice, 4)}
          </Text>
          <Text
            style={[
              styles.change,
              {
                color:
                  selectedCrypto.priceChangePercent24h >= 0
                    ? COLORS.success
                    : COLORS.danger,
              },
            ]}
          >
            {formatPercentage(selectedCrypto.priceChangePercent24h)}
          </Text>
        </View>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <StatRow
          label="Market Cap"
          value={formatCurrency(selectedCrypto.marketCap / 1e6, 2) + 'M'}
        />
        <StatRow
          label="Volume 24h"
          value={formatCurrency(selectedCrypto.volume24h / 1e6, 2) + 'M'}
        />
        <StatRow
          label="ATH"
          value={formatCurrency(selectedCrypto.ath, 4)}
        />
        <StatRow
          label="ATL"
          value={formatCurrency(selectedCrypto.atl, 4)}
        />
      </View>

      {/* Análise */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📊 Indicadores Técnicos</Text>

        {loadingAnalysis ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={COLORS.primary} />
          </View>
        ) : signal ? (
          <>
            <IndicatorCard indicators={signal.indicators} />
            <SignalCard signal={signal} />
          </>
        ) : (
          <View style={styles.noSignalContainer}>
            <Text style={styles.noSignalText}>
              Nenhum sinal válido no momento
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

interface StatRowProps {
  label: string;
  value: string;
}

const StatRow: React.FC<StatRowProps> = ({ label, value }) => (
  <View style={styles.statRow}>
    <Text style={styles.statLabel}>{label}</Text>
    <Text style={styles.statValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.dark,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.secondary,
  },
  symbol: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.primary,
  },
  name: {
    fontSize: 13,
    color: COLORS.neutral,
    marginTop: 4,
  },
  priceInfo: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.light,
  },
  change: {
    fontSize: 13,
    fontWeight: '600',
    marginTop: 4,
  },
  statsContainer: {
    backgroundColor: COLORS.secondary,
    marginHorizontal: 16,
    marginVertical: 12,
    borderRadius: 8,
    overflow: 'hidden',
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.dark,
  },
  statLabel: {
    fontSize: 13,
    color: COLORS.neutral,
  },
  statValue: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.light,
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.light,
    marginBottom: 12,
  },
  loadingContainer: {
    paddingVertical: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noSignalContainer: {
    backgroundColor: COLORS.secondary,
    borderRadius: 8,
    paddingVertical: 24,
    alignItems: 'center',
  },
  noSignalText: {
    color: COLORS.neutral,
    fontSize: 14,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: COLORS.neutral,
    fontSize: 16,
  },
});
