export type CurrencyCode = 'CLP' | 'USD' | 'ARS';

export interface Currency {
  code: CurrencyCode;
  name: string;
  symbol: string;
  flag: string;
}

export interface ConversionPair {
  from: CurrencyCode;
  to: CurrencyCode;
}

export interface ConversionResult {
  fromAmount: number;
  fromCurrency: CurrencyCode;
  toAmount: number;
  toCurrency: CurrencyCode;
  rate: number;
}