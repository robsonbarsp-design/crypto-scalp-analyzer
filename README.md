# Crypto Scalp Analyzer 🚀📈

## Descrição

Aplicativo React Native/Expo para análise técnica e identificação de oportunidades de scalping em criptomoedas. Utiliza indicadores avançados como SMC, ICT, EMA, RSI, MACD, Open Interest e CVD para gerar sinais com ~80%+ de assertividade.

## 🎯 Funcionalidades

- ✅ **Monitoramento em Tempo Real**: Acompanha preços de criptomoedas via Binance/CoinGecko
- ✅ **Análise Técnica Avançada**:
  - SMC (Smart Money Concepts)
  - ICT (Inner Circle Trader)
  - EMA (Exponential Moving Average)
  - RSI (Relative Strength Index)
  - MACD (Moving Average Convergence Divergence)
  - CVD (Cumulative Volume Delta)
  - Open Interest

- ✅ **Sinais de Scalping**: Identifica setup técnicos com Entrada, SL e TP
- ✅ **Tabela de Resultados**: Exibe histórico com estatísticas de acertos
- ✅ **Interface Intuitiva**: Design otimizado para mobile

## 🛠️ Tech Stack

- **Framework**: Expo 51 + React Native 0.74
- **Linguagem**: TypeScript
- **APIs**: Binance WebSocket, CoinGecko REST
- **Navegação**: React Navigation
- **UI**: React Native Native Components + SVG Charts

## 📦 Instalação

### Pré-requisitos
- Node.js 18+
- npm ou yarn
- Expo CLI (`npm install -g expo-cli`)

### Setup

```bash
# Clonar repositório
git clone https://github.com/robsonbarsp-design/crypto-scalp-analyzer.git
cd crypto-scalp-analyzer

# Instalar dependências
npm install

# Iniciar Expo
npm start

# Ou rodar diretamente
npm run android    # Android
npm run ios        # iOS
npm run web        # Web
```

## 🚀 Como Usar

### 1. Tela Inicial (Home)
- Lista de criptomoedas com baixo valor/market cap
- Filtros por exchange, timeframe
- Indicador de força do sinal

### 2. Análise Detalhada
- Gráfico em tempo real
- Todos os indicadores técnicos
- Recomendações de entrada, SL, TP
- Histórico de operações

### 3. Tabela de Resultados
- Data/Hora
- Moeda
- Preço de entrada
- Stop Loss
- Take Profit
- Resultado (acerto/erro)
- Win Rate

## 📊 Estrutura do Projeto

```
src/
├── screens/
│   ├── HomeScreen.tsx          # Lista de criptomoedas
│   ├── AnalysisScreen.tsx      # Análise detalhada
│   └── HistoryScreen.tsx       # Histórico de trades
├── services/
│   ├── cryptoData.ts           # Fetch dados Binance/CoinGecko
│   ├── indicators.ts           # Cálculo de indicadores
│   ├── signals.ts              # Geração de sinais
│   └── websocket.ts            # Conexão WebSocket
├── components/
│   ├── CryptoTable.tsx         # Tabela de moedas
│   ├── Chart.tsx               # Gráfico com indicadores
│   ├── IndicatorCard.tsx       # Card de indicador
│   ├── SignalCard.tsx          # Card do sinal
│   └── ResultsTable.tsx        # Tabela de resultados
├── utils/
│   ├── calculations.ts         # Funções matemáticas
│   ├── formatting.ts           # Formatação de dados
│   └── constants.ts            # Constantes
├── context/
│   └── CryptoContext.tsx       # State global
├── types/
│   └── index.ts                # TypeScript interfaces
└── App.tsx                     # Componente raiz
```

## 🔧 Configuração

### Variáveis de Ambiente

Crie arquivo `.env.local`:

```env
# APIs
BINANCE_WS_URL=wss://stream.binance.com:9443/ws
BINANCE_REST_URL=https://api.binance.com/api/v3
COINGECKO_API_URL=https://api.coingecko.com/api/v3

# Configuração de Scalping
TIMEFRAME=5m
RSI_OVERBOUGHT=70
RSI_OVERSOLD=30
MACD_SENSITIVITY=0.5
MIN_VOLUME=100000
```

## 📈 Indicadores Técnicos Explicados

### SMC (Smart Money Concepts)
- Identifica níveis de suporte/resistência baseados em volume
- Detecta acumulação/distribuição

### ICT (Inner Circle Trader)
- Reconhece padrões de preço e ordem de mercado
- Identifies liquidity sweeps

### EMA (Exponential Moving Average)
- Suavização de preço com peso maior em dados recentes
- Padrão: EMA 12, EMA 26 para crossovers

### RSI (Relative Strength Index)
- Oscilador 0-100
- Overbought > 70, Oversold < 30

### MACD (Moving Average Convergence Divergence)
- Momentum + Tendência
- Sinal: MACD vs Signal Line

### CVD (Cumulative Volume Delta)
- Volume Buyer - Volume Seller
- Confirma força do movimento

### Open Interest
- Volume de contratos abertos em futuros
- Indica força do trend

## 🎓 Estratégia de Scalping

```
Sinal LONG:
1. EMA 12 > EMA 26 (Trend)
2. RSI 30-50 (Entrada segura)
3. MACD positivo + Volume confirmado
4. CVD crescente (Força)
5. SMC acima do suporte

Entrada: Rompimento de EMA 12
Stop Loss: -1.5% (2 velas)
Take Profit: +3% (scalp rápido)

Sinal SHORT:
(Oposto do LONG)
```

## 📋 Exemplo de Saída

| Moeda | Entrada | SL | TP | Resultado | HR |
|-------|---------|----|----|-----------|----|
| BTC | 43,250 | 42,601 | 44,540 | ✅ | 85% |
| ETH | 2,350 | 2,315 | 2,420 | ✅ | 82% |
| SOL | 125.40 | 123.50 | 129.20 | ❌ | 80% |
| BNB | 620 | 610 | 638 | ✅ | 81% |

## 🤝 Contribuindo

Enviamos PRs! Por favor:

1. Fork o repositório
2. Crie uma branch (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📝 Licença

MIT License - veja `LICENSE` para detalhes

## 📞 Suporte

Para dúvidas ou issues, abra uma [GitHub Issue](https://github.com/robsonbarsp-design/crypto-scalp-analyzer/issues)

---

**Aviso Legal**: Este aplicativo é apenas para fins educacionais. Não é recomendação de investimento. Sempre faça sua própria pesquisa (DYOR) e gerencie seus riscos.
