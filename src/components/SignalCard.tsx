import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Signal } from '../types';
import { formatCurrency, formatPercentage, getConfidenceColor, getConfidenceLabel } from '../utils/formatting';
import { calculateRiskReward } from '../utils/calculations';
import { COLORS } from '../utils/constants';

interface SignalCardProps {
  signal: Signal;
}

export const SignalCard: React.FC<SignalCardProps> = ({ signal }) => {
  const riskReward = calculateRiskReward(signal.entry, signal.stopLoss, signal.takeProfit);
  const riskAmount = Math.abs(signal.entry - signal.stopLoss);
  const rewardAmount = Math.abs(signal.takeProfit - signal.entry);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.symbol}>{signal.symbol}</Text>
        <View
          style={[
            styles.typeBadge,
            {
              backgroundColor:
                signal.type === 'LONG' ? COLORS.success : COLORS.danger,
            },
          ]}
        >
          <Text style={styles.typeText}>{signal.type}</Text>
        </View>
      </View>

      {/* Confidence */}
      <View style={styles.confidenceRow}>
        <Text style={styles.label}>Confiança:</Text>
        <View
          style={[
            styles.confidenceBar,
            {
              backgroundColor: getConfidenceColor(signal.confidence),
            },
          ]}
        >
          <Text style={styles.confidenceText}>
            {signal.confidence}% {getConfidenceLabel(signal.confidence)}
          </Text>
        </View>
      </View>

      {/* Entry, SL, TP */}
      <View style={styles.priceGrid}>
        <PriceItem
          label="Entrada"
          value={formatCurrency(signal.entry)}
          color={COLORS.light}
        />
        <PriceItem
          label="Stop Loss"
          value={formatCurrency(signal.stopLoss)}
          color={COLORS.danger}
          riskPercent={(
            (Math.abs(signal.entry - signal.stopLoss) / signal.entry) *
            100
          ).toFixed(2)}
        />
        <PriceItem
          label="Take Profit"
          value={formatCurrency(signal.takeProfit)}
          color={COLORS.success}
          profitPercent={(
            (Math.abs(signal.takeProfit - signal.entry) / signal.entry) *
            100
          ).toFixed(2)}
        />
      </View>

      {/* Risk/Reward */}
      <View style={styles.riskRewardRow}>
        <View style={styles.riskRewardItem}>
          <Text style={styles.label}>Risco</Text>
          <Text style={styles.riskRewardValue}>{formatCurrency(riskAmount)}</Text>
        </View>
        <View style={styles.riskRewardItem}>
          <Text style={styles.label}>Recompensa</Text>
          <Text style={styles.riskRewardValue}>{formatCurrency(rewardAmount)}</Text>
        </View>
        <View style={styles.riskRewardItem}>
          <Text style={styles.label}>R:R</Text>
          <Text style={[styles.riskRewardValue, { color: COLORS.primary }]}>
            1:{riskReward.toFixed(2)}
          </Text>
        </View>
      </View>

      {/* Reason */}
      <View style={styles.reasonBox}>
        <Text style={styles.reasonLabel}>Motivo:</Text>
        <Text style={styles.reasonText}>{signal.reason}</Text>
      </View>
    </View>
  );
};

interface PriceItemProps {
  label: string;
  value: string;
  color: string;
  riskPercent?: string;
  profitPercent?: string;
}

const PriceItem: React.FC<PriceItemProps> = ({
  label,
  value,
  color,
  riskPercent,
  profitPercent,
}) => (
  <View style={styles.priceItem}>
    <Text style={styles.label}>{label}</Text>
    <Text style={[styles.priceValue, { color }]}>{value}</Text>
    {riskPercent && (
      <Text style={[styles.percent, { color: COLORS.danger }]}>-{riskPercent}%</Text>
    )}
    {profitPercent && (
      <Text style={[styles.percent, { color: COLORS.success }]}>+{profitPercent}%</Text>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.secondary,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  symbol: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.light,
  },
  typeBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  typeText: {
    color: COLORS.dark,
    fontWeight: '600',
    fontSize: 12,
  },
  confidenceRow: {
    marginBottom: 12,
  },
  label: {
    fontSize: 12,
    color: COLORS.neutral,
    marginBottom: 4,
  },
  confidenceBar: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  confidenceText: {
    color: COLORS.dark,
    fontWeight: '600',
    fontSize: 13,
  },
  priceGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    gap: 8,
  },
  priceItem: {
    flex: 1,
    backgroundColor: COLORS.dark,
    borderRadius: 8,
    padding: 8,
    alignItems: 'center',
  },
  priceValue: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 4,
  },
  percent: {
    fontSize: 11,
    marginTop: 4,
    fontWeight: '500',
  },
  riskRewardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.dark,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    gap: 8,
  },
  riskRewardItem: {
    flex: 1,
    alignItems: 'center',
  },
  riskRewardValue: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.light,
    marginTop: 4,
  },
  reasonBox: {
    backgroundColor: COLORS.dark,
    borderRadius: 8,
    padding: 12,
  },
  reasonLabel: {
    fontSize: 12,
    color: COLORS.neutral,
    marginBottom: 4,
  },
  reasonText: {
    fontSize: 13,
    color: COLORS.light,
  },
});
