import React, { useState } from 'react'
import { ArrowUpDown } from 'lucide-react'
import useSWR from 'swr'
import CurrencyInput from './CurrencyInput'
import { formatCurrency } from '../utils/currencyData'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

const ConverterCard: React.FC = () => {
  const [fromCurrency, setFromCurrency] = useState<'CLP' | 'USD' | 'ARS'>('CLP')
  const [toCurrency, setToCurrency] = useState<'CLP' | 'USD' | 'ARS'>('USD')
  const [amount, setAmount] = useState('1.000')

  const { data: rates, error } = useSWR(
    'https://api.exchangerate-api.com/v4/latest/USD',
    fetcher,
    { refreshInterval: 60000 }
  )

  const convert = (value: number, from: string, to: string): number => {
    if (!rates) return 0
    const usdValue = from === 'USD' ? value : value / rates.rates[from]
    return to === 'USD' ? usdValue : usdValue * rates.rates[to]
  }

  const handleSwap = () => {
    const fromAmount = parseFloat(amount.replace(/\./g, '')) || 0
    const convertedAmount = convert(fromAmount, fromCurrency, toCurrency)

    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
    setAmount(formatCurrency(convertedAmount, toCurrency))
  }

  const convertedAmount = rates
    ? convert(
        parseFloat(amount.replace(/\./g, '')) || 0,
        fromCurrency,
        toCurrency
      )
    : 0

  if (error)
    return (
      <div className='text-red-500 dark:text-red-400'>
        Failed to load exchange rates
      </div>
    )
  if (!rates)
    return (
      <div className='text-zinc-500 dark:text-zinc-400'>
        Loading exchange rates...
      </div>
    )

  return (
    <div className='w-full max-w-md bg-white dark:bg-zinc-800 rounded-xl shadow-sm border border-zinc-100 dark:border-zinc-700 p-6'>
      <div className='space-y-4'>
        <CurrencyInput
          value={amount}
          onChange={setAmount}
          currency={fromCurrency}
          onCurrencyChange={setFromCurrency}
          otherCurrency={toCurrency}
        />

        <div className='flex justify-center'>
          <button
            onClick={handleSwap}
            className='p-2 hover:bg-zinc-50 rounded-full transition-colors'
            aria-label='Swap currencies'
          >
            <ArrowUpDown className='h-5 w-5 text-zinc-400' />
          </button>
        </div>

        <CurrencyInput
          value={formatCurrency(convertedAmount, toCurrency)}
          onChange={() => {}}
          currency={toCurrency}
          onCurrencyChange={setToCurrency}
          otherCurrency={fromCurrency}
          readOnly
        />
      </div>

      <div className='mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-700'>
        <p className='text-sm text-zinc-500 dark:text-zinc-400'>
          1 {fromCurrency} ={' '}
          {formatCurrency(convert(1, fromCurrency, toCurrency), toCurrency)}{' '}
          {toCurrency}
        </p>
      </div>
    </div>
  )
}

export default ConverterCard
