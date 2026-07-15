#!/bin/bash
echo "🚀 Crypto Scalp Analyzer - Setup"
echo "================================="
echo ""

if ! command -v node &> /dev/null; then
    echo "❌ Node.js não instalado"
    exit 1
fi

echo "✅ Node.js $(node --version)"
echo "✅ npm $(npm --version)"

if ! command -v expo &> /dev/null; then
    echo "⚠️ Instalando Expo CLI..."
    npm install -g expo-cli
fi

echo "📦 Instalando dependências..."
npm install

echo ""
echo "✅ Setup concluído!"
echo ""
echo "Próximos passos:"
echo "  npm start       # Inicia Expo"
echo "  npm run android # Abre no Android"
echo "  npm run ios     # Abre no iOS"
echo ""
