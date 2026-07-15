# Estrutura do Projeto - Árvore Completa

```
crypto-scalp-analyzer/
├── src/
│   ├── App.tsx                          # Componente raiz com navegação
│   ├── screens/
│   │   ├── HomeScreen.tsx               # Lista de moedas
│   │   ├── AnalysisScreen.tsx           # Análise técnica
│   │   └── HistoryScreen.tsx            # Histórico de trades
│   ├── services/
│   │   ├── cryptoData.ts                # APIs Binance/CoinGecko
│   │   ├── indicators.ts                # Cálculo de indicadores
│   │   └── signals.ts                   # Geração de sinais
│   ├── components/
│   │   ├── IndicatorCard.tsx            # Card de indicadores
│   │   ├── SignalCard.tsx               # Card de sinal
│   │   ├── CryptoTable.tsx              # Tabela de moedas
│   │   └── ResultsTable.tsx             # Tabela de resultados
│   ├── context/
│   │   └── CryptoContext.tsx            # State global
│   ├── types/
│   │   └── index.ts                     # TypeScript interfaces
│   ├── utils/
│   │   ├── constants.ts                 # Constantes
│   │   ├── calculations.ts              # Funções matemáticas
│   │   ├── formatting.ts                # Formatação de dados
│   │   └── tests.ts                     # Testes unitários
│   └── config/
│       └── tradingConfig.ts             # Configuração avançada
├── scripts/
│   └── setup.sh                         # Script de setup
├── index.js                             # Entry point
├── App.tsx                              # Wrapper com SafeArea
├── app.json                             # Expo config
├── package.json                         # Dependências
├── tsconfig.json                        # TypeScript config
├── .babelrc                             # Babel config
├── .gitignore                           # Git ignore
├── .env.example                         # Variáveis de ambiente
├── README.md                            # Documentação principal
├── GUIDE.md                             # Guia completo
├── SETUP.md                             # Setup local
├── TODO.md                              # Roadmap
└── ARCHITECTURE.md                      # Este arquivo
```

## 🏗️ Fluxo de Dados

```
┌─────────────────┐
│  CoinGecko API  │
│  Binance API    │
└────────┬────────┘
         │
         ▼
  ┌──────────────┐
  │ cryptoData   │
  │ Service      │
  └──────┬───────┘
         │
         ├─→ fetchCryptos()
         ├─→ fetchCandles()
         └─→ fetchOpenInterest()
         │
         ▼
  ┌──────────────┐
  │ Indicadores  │
  │ Service      │
  └──────┬───────┘
         │
         ├─→ EMA 12/26
         ├─→ RSI
         ├─→ MACD
         ├─→ Bollinger Bands
         ├─→ ATR
         ├─→ analyzeSMC()
         └─→ analyzeICT()
         │
         ▼
  ┌──────────────┐
  │ Signals      │
  │ Service      │
  └──────┬───────┘
         │
         ├─→ generateSignal()
         └─→ validateSignal()
         │
         ▼
  ┌──────────────┐
  │ CryptoContext│
  │ (Global)     │
  └──────┬───────┘
         │
         ├─→ cryptos[]
         ├─→ signals[]
         ├─→ trades[]
         └─→ stats
         │
         ▼
  ┌──────────────┐
  │ Screens      │
  │ (UI)         │
  └──────────────┘
```

## 📊 Estados Principais

```typescript
interface CryptoContextState {
  // Dados
  cryptos: Cryptocurrency[];           // Todas as moedas
  selectedCrypto: Cryptocurrency;      // Moeda selecionada
  signals: Signal[];                   // Sinais gerados
  trades: Trade[];                     // Trades históricos
  settings: AppSettings;               // Configurações
  
  // UI
  loading: boolean;                    // Carregando?
  
  // Computed
  tradingStats: TradingStats;          // Win rate, PnL, etc
}
```

## 🔄 Fluxo de Análise

```
1. Usuário seleciona moeda (HomeScreen)
   ↓
2. Busca candles dos últimos 100 períodos (5m)
   ↓
3. Calcula indicadores (EMA, RSI, MACD, etc)
   ↓
4. Analisa SMC + ICT patterns
   ↓
5. Gera sinal (entry, SL, TP, confiance)
   ↓
6. Valida sinal (risco/recompensa mínimo)
   ↓
7. Se válido:
   - Mostra em AnalysisScreen
   - Adiciona ao contexto
   - Calcula estatísticas
   ↓
8. Usuário vê tabela de resultados em HistoryScreen
```

## 🧪 Teste de Indicadores

```typescript
import { runTests, validateIndicators } from './src/utils/tests';

// Rodar testes
runTests();

// Validar indicadores
const issues = validateIndicators(indicators);
if (issues.length > 0) {
  console.warn('Problemas encontrados:', issues);
}
```

## 📱 Responsividade

- HomeScreen: Tabela scrollável
- AnalysisScreen: Indicadores em scroll horizontal
- HistoryScreen: Grid responsivo de cards

## 🎨 Temas de Cor

```
Primeiro: #00D084 (Verde - Sucesso)
Danger: #FF6B6B (Vermelho - Perda)
Warning: #FFB800 (Laranja - Aviso)
Neutral: #666666 (Cinza)
Secondary: #1a1a1a (Cinza escuro)
Dark: #0a0a0a (Preto)
Light: #f5f5f5 (Branco)
```

## 🚀 Performance Otimizações

- Memoização com useMemo/useCallback
- Lazy loading de imagens
- Virtualização de listas longas (já usa FlatList)
- Cache de API requests
- Debounce de búsquedas

## 🔐 Segurança

- Sem armazenamento de keys privadas
- HTTPS apenas
- Rate limiting nas APIs
- Validação de entrada
- Sanitização de dados

---

**Última atualização: 15/07/2026**
