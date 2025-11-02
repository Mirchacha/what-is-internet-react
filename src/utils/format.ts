// Форматування чисел
export function formatNumber(num: number, decimals = 2): string {
  return num.toLocaleString('uk-UA', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

// Форматування валюти
export function formatCurrency(
  num: number,
  currency = 'USD',
  decimals = 2
): string {
  return num.toLocaleString('uk-UA', {
    style: 'currency',
    currency,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

// Форматування відсотків
export function formatPercent(num: number, decimals = 2): string {
  return `${num >= 0 ? '+' : ''}${num.toFixed(decimals)}%`;
}

// Форматування дати
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleString('uk-UA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

// Форматування температури
export function formatTemperature(temp: number): string {
  return `${temp > 0 ? '+' : ''}${temp.toFixed(1)}°C`;
}

