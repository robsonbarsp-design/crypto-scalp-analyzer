import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Trade } from '../types';
import { formatCurrency, formatTime, formatShortTime } from '../utils/formatting';
import { COLORS } from '../utils/constants';

interface ResultsTableProps {
  trades: Trade[];
}

export const ResultsTable: React.FC<ResultsTableProps> = ({ trades }) => {
  const sortedTrades = [...trades].sort(
    (a, b) => new Date(b.entryTime).getTime() - new Date(a.entryTime).getTime()
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={sortedTrades}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        renderItem={({ item }) => <ResultRow trade={item} />}
        ListHeaderComponent={() => <TableHeader />}
        ListEmptyComponent={() => (
          <View style={styles.empty}>
            <Text style={styles.emptyText}>Nenhum trade registrado</Text>
          </View>
        )}
      />
    </View>
  );
};

const TableHeader: React.FC = () => (
  <View style={styles.headerRow}>
    <Text style={[styles.cell, styles.moedaCell, styles.headerText]}>Moeda</Text>
    <Text style={[styles.cell, styles.entradaCell, styles.headerText]}>Entrada</Text>
    <Text style={[styles.cell, styles.slCell, styles.headerText]}>SL</Text>
    <Text style={[styles.cell, styles.tpCell, styles.headerText]}>TP</Text>
    <Text style={[styles.cell, styles.resultCell, styles.headerText]}>Resultado</Text>
  </View>
);

interface ResultRowProps {
  trade: Trade;
}

const ResultRow: React.FC<ResultRowProps> = ({ trade }) => {
  const isWin = trade.result === 'WIN';
  const isPending = trade.result === 'PENDING';

  return (
    <View
      style={[
        styles.row,
        {
          borderLeftColor: isWin
            ? COLORS.success
            : isPending
            ? COLORS.warning
            : COLORS.danger,
        },
      ]}
    >
      <View style={[styles.cell, styles.moedaCell]}>
        <Text style={styles.symbol}>{trade.symbol}</Text>
        <Text style={styles.type}>{trade.type}</Text>
      </View>

      <Text style={[styles.cell, styles.entradaCell, styles.valueText]}>
        {formatCurrency(trade.entry, 4)}
      </Text>

      <Text style={[styles.cell, styles.slCell, styles.slText]}>
        {formatCurrency(trade.stopLoss, 4)}
      </Text>

      <Text style={[styles.cell, styles.tpCell, styles.tpText]}>
        {formatCurrency(trade.takeProfit, 4)}
      </Text>

      <View style={[styles.cell, styles.resultCell]}>
        <Text
          style={[
            styles.resultText,
            {
              color: isWin
                ? COLORS.success
                : isPending
                ? COLORS.warning
                : COLORS.danger,
            },
          ]}
        >
          {trade.result === 'WIN' ? '✓' : trade.result === 'LOSS' ? '✗' : '○'}
        </Text>
        {trade.pnl !== undefined && (
          <Text
            style={[
              styles.pnlText,
              {
                color:
                  (trade.pnl || 0) >= 0 ? COLORS.success : COLORS.danger,
              },
            ]}
          >
            {formatCurrency(trade.pnl, 2)}
          </Text>
        )}
      </View>
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
    fontSize: 11,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.dark,
    borderLeftWidth: 3,
  },
  cell: {
    flex: 1,
  },
  moedaCell: {
    flex: 0.8,
  },
  entradaCell: {
    flex: 0.9,
  },
  slCell: {
    flex: 0.9,
  },
  tpCell: {
    flex: 0.9,
  },
  resultCell: {
    flex: 0.8,
    alignItems: 'center',
  },
  symbol: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.light,
  },
  type: {
    fontSize: 10,
    color: COLORS.neutral,
    marginTop: 2,
  },
  valueText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.light,
  },
  slText: {
    fontSize: 12,
    color: COLORS.danger,
  },
  tpText: {
    fontSize: 12,
    color: COLORS.success,
  },
  resultText: {
    fontSize: 16,
    fontWeight: '700',
  },
  pnlText: {
    fontSize: 10,
    fontWeight: '600',
    marginTop: 2,
  },
  empty: {
    paddingVertical: 24,
    alignItems: 'center',
  },
  emptyText: {
    color: COLORS.neutral,
    fontSize: 14,
  },
});
