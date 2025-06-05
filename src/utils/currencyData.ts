import { Currency, CurrencyCode } from '../types/currency'

export const currencies: Record<CurrencyCode, Currency> = {
  CLP: { code: 'CLP', name: 'Chilean Peso', symbol: '$', flag: '🇨🇱' },
  USD: { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
  ARS: { code: 'ARS', name: 'Argentine Peso', symbol: '$', flag: '🇦🇷' },
}

export const formatCurrency = (amount: number): string => {
  const formatter = new Intl.NumberFormat('es-CL', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: true,
  })

  return formatter.format(amount)
}

// Dummy exchange rates for demonstration
const exchangeRates: Record<CurrencyCode, Record<CurrencyCode, number>> = {
  CLP: { CLP: 1, USD: 0.0011, ARS: 0.396 },
  USD: { CLP: 883.75, USD: 1, ARS: 349.98 },
  ARS: { CLP: 2.53, USD: 0.0029, ARS: 1 },
}

export function convertCurrency(
  amount: number,
  from: CurrencyCode,
  to: CurrencyCode
): number {
  if (from === to) return amount
  const rate = exchangeRates[from][to]
  return amount * rate
}

export function getExchangeRate(from: CurrencyCode, to: CurrencyCode): number {
  if (from === to) return 1
  return exchangeRates[from][to]
}
