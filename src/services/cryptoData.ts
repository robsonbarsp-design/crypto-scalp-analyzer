import axios from 'axios';
import { Cryptocurrency, Candle } from '../types';
import { API_ENDPOINTS, TOP_CRYPTOS } from '../utils/constants';

const coingeckoApi = axios.create({
  baseURL: API_ENDPOINTS.coingecko,
});

const binanceApi = axios.create({
  baseURL: API_ENDPOINTS.binance,
});

export const cryptoDataService = {
  // Buscar dados de criptomoedas do CoinGecko
  async fetchCryptos(limit: number = 50): Promise<Cryptocurrency[]> {
    try {
      const response = await coingeckoApi.get('/coins/markets', {
        params: {
          vs_currency: 'usd',
          order: 'market_cap_desc',
          per_page: limit,
          page: 1,
          sparkline: false,
          locale: 'pt-BR',
        },
      });

      return response.data.map((crypto: any) => ({
        id: crypto.id,
        symbol: crypto.symbol.toUpperCase(),
        name: crypto.name,
        currentPrice: crypto.current_price || 0,
        marketCap: crypto.market_cap || 0,
        marketCapRank: crypto.market_cap_rank || 0,
        volume24h: crypto.total_volume || 0,
        priceChange24h: crypto.price_change_24h || 0,
        priceChangePercent24h: crypto.price_change_percentage_24h || 0,
        ath: crypto.ath || 0,
        atl: crypto.atl || 0,
        circulatingSupply: crypto.circulating_supply || 0,
        totalSupply: crypto.total_supply || 0,
        image: crypto.image,
      }));
    } catch (error) {
      console.error('Erro ao buscar criptomoedas:', error);
      return [];
    }
  },

  // Buscar candles do Binance
  async fetchCandles(
    symbol: string,
    interval: string = '5m',
    limit: number = 100
  ): Promise<Candle[]> {
    try {
      // Converter símbolo para formato Binance (ex: BTC -> BTCUSDT)
      const binanceSymbol = `${symbol.toUpperCase()}USDT`;

      const response = await binanceApi.get('/klines', {
        params: {
          symbol: binanceSymbol,
          interval,
          limit,
        },
      });

      return response.data.map((kline: any[]) => ({
        timestamp: kline[0],
        open: parseFloat(kline[1]),
        high: parseFloat(kline[2]),
        low: parseFloat(kline[3]),
        close: parseFloat(kline[4]),
        volume: parseFloat(kline[7]),
      }));
    } catch (error) {
      console.error(`Erro ao buscar candles para ${symbol}:`, error);
      return [];
    }
  },

  // Buscar moedas com baixo valor comparado ao market cap
  async fetchLowValueCryptos(): Promise<Cryptocurrency[]> {
    try {
      const cryptos = await this.fetchCryptos(100);

      // Filtrar moedas com baixo preço mas bom market cap
      return cryptos.filter((crypto) => {
        const mcRatio = (crypto.marketCap || 1) / (crypto.currentPrice || 1);
        // Moedas com market cap > 1M e preço < 100
        return (
          crypto.marketCap &&
          crypto.marketCap > 1000000 &&
          crypto.currentPrice < 100 &&
          crypto.volume24h &&
          crypto.volume24h > 1000000
        );
      });
    } catch (error) {
      console.error('Erro ao buscar moedas com baixo valor:', error);
      return [];
    }
  },

  // Buscar histórico de preço
  async fetchPriceHistory(
    cryptoId: string,
    days: number = 7
  ): Promise<[number, number][]> {
    try {
      const response = await coingeckoApi.get(`/coins/${cryptoId}/market_chart`, {
        params: {
          vs_currency: 'usd',
          days,
          interval: 'daily',
        },
      });

      return response.data.prices;
    } catch (error) {
      console.error('Erro ao buscar histórico de preço:', error);
      return [];
    }
  },

  // Buscar dados em tempo real via Binance Ticker
  async fetchTicker(symbol: string) {
    try {
      const binanceSymbol = `${symbol.toUpperCase()}USDT`;
      const response = await binanceApi.get('/ticker/24hr', {
        params: {
          symbol: binanceSymbol,
        },
      });

      return {
        price: parseFloat(response.data.lastPrice),
        volume: parseFloat(response.data.volume),
        change24h: parseFloat(response.data.priceChange),
        changePercent24h: parseFloat(response.data.priceChangePercent),
        high24h: parseFloat(response.data.highPrice),
        low24h: parseFloat(response.data.lowPrice),
      };
    } catch (error) {
      console.error(`Erro ao buscar ticker de ${symbol}:`, error);
      return null;
    }
  },

  // Buscar volume de juros abertos (Open Interest)
  async fetchOpenInterest(symbol: string): Promise<number> {
    try {
      const binanceSymbol = `${symbol.toUpperCase()}USDT`;
      const response = await binanceApi.get('/openInterest', {
        params: {
          symbol: binanceSymbol,
        },
      });

      return parseFloat(response.data.openInterest);
    } catch (error) {
      console.error(`Erro ao buscar open interest de ${symbol}:`, error);
      return 0;
    }
  },
};
