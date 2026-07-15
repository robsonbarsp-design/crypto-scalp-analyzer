import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import { useCryptoContext } from '../context/CryptoContext';
import { cryptoDataService } from '../services/cryptoData';
import { CryptoTable } from '../components/CryptoTable';
import { COLORS } from '../utils/constants';

export const HomeScreen: React.FC = () => {
  const { cryptos, setCryptos, setSelectedCrypto, loading, setLoading } = useCryptoContext();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadCryptos();
  }, []);

  const loadCryptos = async () => {
    setLoading(true);
    try {
      const data = await cryptoDataService.fetchLowValueCryptos();
      setCryptos(data);
    } catch (error) {
      console.error('Erro ao carregar criptomoedas:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      const data = await cryptoDataService.fetchLowValueCryptos();
      setCryptos(data);
    } catch (error) {
      console.error('Erro ao atualizar:', error);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing || loading}
          onRefresh={onRefresh}
          tintColor={COLORS.primary}
        />
      }
    >
      <View style={styles.header}>
        <Text style={styles.title}>🚀 Scalp Analyzer</Text>
        <Text style={styles.subtitle}>Moedas com Baixo Valor</Text>
      </View>

      {loading && !cryptos.length ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Carregando moedas...</Text>
        </View>
      ) : cryptos.length > 0 ? (
        <View style={styles.content}>
          <View style={styles.statsRow}>
            <StatCard label="Total" value={cryptos.length.toString()} />
            <StatCard
              label="Bullish"
              value={cryptos.filter((c) => c.priceChangePercent24h > 0).length.toString()}
              color={COLORS.success}
            />
            <StatCard
              label="Bearish"
              value={cryptos.filter((c) => c.priceChangePercent24h < 0).length.toString()}
              color={COLORS.danger}
            />
          </View>

          <CryptoTable
            cryptos={cryptos}
            onSelectCrypto={(crypto) => setSelectedCrypto(crypto)}
          />
        </View>
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Nenhuma moeda encontrada</Text>
        </View>
      )}
    </ScrollView>
  );
};

interface StatCardProps {
  label: string;
  value: string;
  color?: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, color = COLORS.primary }) => (
  <View style={styles.statCard}>
    <Text style={styles.statLabel}>{label}</Text>
    <Text style={[styles.statValue, { color }]}>{value}</Text>
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
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.primary,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.neutral,
    marginTop: 4,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
    gap: 8,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.secondary,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.neutral,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    color: COLORS.neutral,
    marginTop: 12,
    fontSize: 14,
  },
  emptyContainer: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  emptyText: {
    color: COLORS.neutral,
    fontSize: 16,
  },
});
