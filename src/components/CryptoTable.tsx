import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Cryptocurrency } from '../types';
import { formatCurrency, formatPercentage, formatNumber } from '../utils/formatting';
import { COLORS } from '../utils/constants';

interface CryptoTableProps {
  cryptos: Cryptocurrency[];
  onSelectCrypto?: (crypto: Cryptocurrency) => void;
}

export const CryptoTable: React.FC<CryptoTableProps> = ({
  cryptos,
  onSelectCrypto,
}) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={cryptos}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <CryptoRow crypto={item} onPress={() => onSelectCrypto?.(item)} />
        )}
        ListHeaderComponent={() => <TableHeader />}
      />
    </View>
  );
};

const TableHeader: React.FC = () => (
  <View style={styles.headerRow}>
    <Text style={[styles.cell, styles.nameCell, styles.headerText]}>Moeda</Text>
    <Text style={[styles.cell, styles.priceCell, styles.headerText]}>Preço</Text>
    <Text style={[styles.cell, styles.changeCell, styles.headerText]}>24h</Text>
    <Text style={[styles.cell, styles.volumeCell, styles.headerText]}>Volume</Text>
  </View>
);

interface CryptoRowProps {
  crypto: Cryptocurrency;
  onPress?: () => void;
}

const CryptoRow: React.FC<CryptoRowProps> = ({ crypto, onPress }) => {
  const isPositive = crypto.priceChangePercent24h >= 0;

  return (
    <View
      style={[
        styles.row,
        {
          backgroundColor: isPositive ? COLORS.dark : COLORS.dark,
          borderLeftColor: isPositive ? COLORS.success : COLORS.danger,
        },
      ]}
    >
      <View style={[styles.cell, styles.nameCell]}>
        <Text style={styles.symbol}>{crypto.symbol}</Text>
        <Text style={styles.name}>{crypto.name}</Text>
      </View>

      <Text style={[styles.cell, styles.priceCell, styles.valueText]}>
        {formatCurrency(crypto.currentPrice, 4)}
      </Text>

      <Text
        style={[
          styles.cell,
          styles.changeCell,
          {
            color: isPositive ? COLORS.success : COLORS.danger,
          },
        ]}
      >
        {formatPercentage(crypto.priceChangePercent24h)}
      </Text>

      <Text style={[styles.cell, styles.volumeCell, styles.volumeText]}>
        {formatNumber(crypto.volume24h, 0)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.secondary,
    borderRadius: 8,
    overflow: 'hidden',
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: COLORS.dark,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.neutral,
  },
  headerText: {
    fontWeight: '700',
    color: COLORS.neutral,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.dark,
    borderLeftWidth: 3,
  },
  cell: {
    flex: 1,
  },
  nameCell: {
    flex: 1.2,
  },
  priceCell: {
    flex: 1,
  },
  changeCell: {
    flex: 0.8,
  },
  volumeCell: {
    flex: 0.8,
  },
  symbol: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.light,
  },
  name: {
    fontSize: 11,
    color: COLORS.neutral,
    marginTop: 2,
  },
  valueText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.light,
  },
  volumeText: {
    fontSize: 12,
    color: COLORS.neutral,
  },
});
