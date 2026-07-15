# TODO - Roadmap de Desenvolvimento

## 🎯 Phase 1: MVP (✅ Concluído)
- [x] Estrutura base React Native/Expo
- [x] Integração Binance + CoinGecko APIs
- [x] Indicadores técnicos (EMA, RSI, MACD, BB, ATR)
- [x] SMC + ICT analysis
- [x] Geração de sinais
- [x] UI com 3 telas (Home, Analysis, History)
- [x] Context global para state management
- [x] Cálculo de estatísticas de trading

## 📋 Phase 2: Features Essenciais
- [ ] WebSocket em tempo real (substituir REST)
- [ ] Notificações push para novos sinais
- [ ] Persistência de dados (AsyncStorage)
- [ ] Gráficos interativos (react-native-svg-charts)
- [ ] Dark/Light mode toggle
- [ ] Exportar relatórios (PDF/CSV)
- [ ] Filtros avançados de moedas
- [ ] Histórico de 30 dias

## 🚀 Phase 3: Trading Automático
- [ ] Conectar com API de exchange (Binance, Bybit)
- [ ] Autenticação segura (OAuth, 2FA)
- [ ] Execução automática de orders
- [ ] Stop Loss + Take Profit automáticos
- [ ] Trail do SL com lucro
- [ ] Alerts em tempo real

## 📊 Phase 4: Machine Learning
- [ ] Treinar modelo para otimizar confiance
- [ ] Backtesting de 1 ano
- [ ] Otimização de parâmetros
- [ ] Detecção de anomalias
- [ ] Previsão de breakouts

## 🎨 Phase 5: UX/UI Melhorias
- [ ] Redesign com Figma
- [ ] Animações suaves
- [ ] Gestos de swipe
- [ ] Tema customizável
- [ ] Tutorial onboarding
- [ ] Dark mode automático

## 🔒 Phase 6: Segurança
- [ ] Criptografia local (keys)
- [ ] Validação 2FA
- [ ] Rate limiting nas APIs
- [ ] Audit logs
- [ ] Backup automático

## 📱 Phase 7: Plataformas
- [ ] Build Android completo
- [ ] Build iOS completo
- [ ] App Web (Vercel)
- [ ] Desktop app (Electron)
- [ ] Sincronização entre plataformas

## 🌍 Phase 8: Comunidade
- [ ] Leaderboard de traders
- [ ] Compartilhar sinais
- [ ] Social trading
- [ ] API pública
- [ ] Webhooks

## ⚙️ Tarefas Imediatas

### Curto Prazo (2 semanas)
- [ ] Adicionar WebSocket Binance
- [ ] Implementar AsyncStorage para persistência
- [ ] Melhorar visualização de gráficos
- [ ] Adicionar mais pares de moedas
- [ ] Validação de confiance melhorada

### Médio Prazo (1 mês)
- [ ] Trading automático básico
- [ ] Notificações push
- [ ] Backtesting de 1 semana
- [ ] Exportar relatórios
- [ ] Otimizar performance

### Longo Prazo (3 meses)
- [ ] Machine Learning
- [ ] App Store/Play Store
- [ ] Community features
- [ ] Versão empresarial

## 🐛 Bugs Conhecidos
- API rate limit pode bloquear em picos
- Indicadores precisam de 30 candles mínimos
- Performance em dispositivos antigos

## 📝 Notas
- Testar em múltiplos dispositivos
- Validar com dados reais de mercado
- Coletar feedback de usuários
- Manter documentação atualizada
