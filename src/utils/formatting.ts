// Funções de formatação de dados

export const formatCurrency = (value: number, decimals: number = 2): string => {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
};

export const formatPercentage = (value: number, decimals: number = 2): string => {
  const formatted = new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
  return `${value >= 0 ? '+' : ''}${formatted}%`;
};

export const formatNumber = (value: number, decimals: number = 2): string => {
  if (Math.abs(value) >= 1e9) {
    return (value / 1e9).toFixed(2) + 'B';
  }
  if (Math.abs(value) >= 1e6) {
    return (value / 1e6).toFixed(2) + 'M';
  }
  if (Math.abs(value) >= 1e3) {
    return (value / 1e3).toFixed(2) + 'K';
  }
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: Math.min(decimals, 8),
    maximumFractionDigits: decimals,
  }).format(value);
};

export const formatTime = (date: Date): string => {
  return new Intl.DateTimeFormat('pt-BR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(date);
};

export const formatShortTime = (date: Date): string => {
  return new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

export const getConfidenceColor = (confidence: number): string => {
  if (confidence >= 85) return '#00D084'; // Very Strong - Green
  if (confidence >= 70) return '#7C3AED'; // Strong - Purple
  if (confidence >= 50) return '#FFB800'; // Moderate - Orange
  if (confidence >= 30) return '#FF6B6B'; // Weak - Red
  return '#666666'; // Very Weak - Gray
};

export const getConfidenceLabel = (confidence: number): string => {
  if (confidence >= 85) return 'Muito Forte';
  if (confidence >= 70) return 'Forte';
  if (confidence >= 50) return 'Moderado';
  if (confidence >= 30) return 'Fraco';
  return 'Muito Fraco';
};

export const formatPnL = (pnl: number, pnlPercent: number): string => {
  const sign = pnl >= 0 ? '+' : '';
  return `${sign}${formatCurrency(pnl)} (${formatPercentage(pnlPercent)})`;
};
