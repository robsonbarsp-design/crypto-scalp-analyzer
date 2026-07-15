import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { TechnicalIndicators } from '../types';
import { formatNumber, getConfidenceColor, getConfidenceLabel } from '../utils/formatting';
import { COLORS } from '../utils/constants';

interface IndicatorCardProps {
  indicators: TechnicalIndicators;
}

export const IndicatorCard: React.FC<IndicatorCardProps> = ({ indicators }) => {
  const getIndicatorStatus = (name: string, value: number): 'bullish' | 'bearish' | 'neutral' => {
    switch (name) {
      case 'RSI':
        return value < 30 ? 'bullish' : value > 70 ? 'bearish' : 'neutral';
      case 'MACD':
        return value > 0 ? 'bullish' : 'bearish';
      default:
        return 'neutral';
    }
  };

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.container}>
        {/* EMA */}
        <IndicatorItem
          label="EMA 12"
          value={formatNumber(indicators.ema12, 4)}
          status={indicators.ema12 > indicators.ema26 ? 'bullish' : 'bearish'}
        />
        <IndicatorItem
          label="EMA 26"
          value={formatNumber(indicators.ema26, 4)}
          status="neutral"
        />

        {/* RSI */}
        <IndicatorItem
          label="RSI"
          value={indicators.rsi.toFixed(2)}
          status={getIndicatorStatus('RSI', indicators.rsi)}
          subtext={`${indicators.rsi < 30 ? 'Oversold' : indicators.rsi > 70 ? 'Overbought' : 'Neutral'}`}
        />

        {/* MACD */}
        <IndicatorItem
          label="MACD"
          value={indicators.macd.toFixed(4)}
          status={indicators.macd > indicators.signal ? 'bullish' : 'bearish'}
          subtext={`Hist: ${indicators.histogram.toFixed(4)}`}
        />

        {/* Bollinger Bands */}
        <IndicatorItem
          label="BB Upper"
          value={formatNumber(indicators.bb_upper, 4)}
          status="neutral"
        />
        <IndicatorItem
          label="BB Middle"
          value={formatNumber(indicators.bb_middle, 4)}
          status="neutral"
        />
        <IndicatorItem
          label="BB Lower"
          value={formatNumber(indicators.bb_lower, 4)}
          status="neutral"
        />

        {/* ATR */}
        <IndicatorItem
          label="ATR"
          value={formatNumber(indicators.atr, 4)}
          status="neutral"
        />
      </View>
    </ScrollView>
  );
};

interface IndicatorItemProps {
  label: string;
  value: string;
  status: 'bullish' | 'bearish' | 'neutral';
  subtext?: string;
}

const IndicatorItem: React.FC<IndicatorItemProps> = ({
  label,
  value,
  status,
  subtext,
}) => {
  const getStatusColor = () => {
    switch (status) {
      case 'bullish':
        return COLORS.success;
      case 'bearish':
        return COLORS.danger;
      default:
        return COLORS.neutral;
    }
  };

  return (
    <View style={[styles.item, { borderLeftColor: getStatusColor() }]}>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.value, { color: getStatusColor() }]}>{value}</Text>
      {subtext && <Text style={styles.subtext}>{subtext}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    gap: 8,
  },
  item: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: COLORS.secondary,
    borderRadius: 8,
    borderLeftWidth: 3,
    minWidth: 100,
  },
  label: {
    fontSize: 12,
    color: COLORS.neutral,
    marginBottom: 4,
  },
  value: {
    fontSize: 14,
    fontWeight: '600',
  },
  subtext: {
    fontSize: 10,
    color: COLORS.neutral,
    marginTop: 4,
  },
});
