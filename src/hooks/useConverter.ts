import { useState, useCallback } from 'react';
import { ConversionResult, CurrencyCode } from '../types/currency';
import { convertCurrency, getExchangeRate } from '../utils/currencyData';

export function useConverter() {
  const [fromCurrency, setFromCurrency] = useState<CurrencyCode>('CLP');
  const [toCurrency, setToCurrency] = useState<CurrencyCode>('USD');
  const [amount, setAmount] = useState<string>('1000');
  const [result, setResult] = useState<ConversionResult | null>(null);

  const handleAmountChange = useCallback((value: string) => {
    // Only allow numeric input with decimal point
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  }, []);

  const handleFromCurrencyChange = useCallback((currency: CurrencyCode) => {
    setFromCurrency(currency);
  }, []);

  const handleToCurrencyChange = useCallback((currency: CurrencyCode) => {
    setToCurrency(currency);
  }, []);

  const swapCurrencies = useCallback(() => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  }, [fromCurrency, toCurrency]);

  const convert = useCallback(() => {
    const numAmount = parseFloat(amount) || 0;
    const convertedAmount = convertCurrency(numAmount, fromCurrency, toCurrency);
    const rate = getExchangeRate(fromCurrency, toCurrency);
    
    setResult({
      fromAmount: numAmount,
      fromCurrency,
      toAmount: convertedAmount,
      toCurrency,
      rate,
    });
  }, [amount, fromCurrency, toCurrency]);

  return {
    fromCurrency,
    toCurrency,
    amount,
    result,
    handleAmountChange,
    handleFromCurrencyChange,
    handleToCurrencyChange,
    swapCurrencies,
    convert,
  };
}