import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useCryptoContext } from '../context/CryptoContext';
import { ResultsTable } from '../components/ResultsTable';
import { formatPercentage, formatCurrency } from '../utils/formatting';
import { COLORS } from '../utils/constants';

export const HistoryScreen: React.FC = () => {
  const { trades, tradingStats } = useCryptoContext();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>📈 Histórico de Trades</Text>
      </View>

      {/* Stats Cards */}
      <View style={styles.statsGrid}>
        <StatCard
          label="Total de Trades"
          value={tradingStats.totalTrades.toString()}
          color={COLORS.primary}
        />
        <StatCard
          label="Win Rate"
          value={formatPercentage(tradingStats.winRate, 1).replace('%', '') + '%'}
          color={tradingStats.winRate > 50 ? COLORS.success : COLORS.danger}
        />
        <StatCard
          label="Vitórias"
          value={tradingStats.winTrades.toString()}
          color={COLORS.success}
        />
        <StatCard
          label="Perdas"
          value={tradingStats.lossTrades.toString()}
          color={COLORS.danger}
        />
        <StatCard
          label="Lucro Total"
          value={formatCurrency(tradingStats.totalProfit)}
          color={tradingStats.totalProfit > 0 ? COLORS.success : COLORS.danger}
        />
        <StatCard
          label="Profit Factor"
          value={tradingStats.profitFactor.toFixed(2)}
          color={tradingStats.profitFactor > 1 ? COLORS.success : COLORS.danger}
        />
      </View>

      {/* Results Table */}
      <View style={styles.section}>
        <ResultsTable trades={trades} />
      </View>
    </ScrollView>
  );
};

interface StatCardProps {
  label: string;
  value: string;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, color }) => (
  <View style={styles.card}>
    <Text style={styles.cardLabel}>{label}</Text>
    <Text style={[styles.cardValue, { color }]}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.dark,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.primary,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  card: {
    width: '32%',
    backgroundColor: COLORS.secondary,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  cardLabel: {
    fontSize: 11,
    color: COLORS.neutral,
    textAlign: 'center',
  },
  cardValue: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: 6,
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
});
