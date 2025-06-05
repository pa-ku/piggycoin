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

  // Solo permitir valores mayores a 0
  const handleAmountChange = (val: string) => {
    // Eliminar puntos y convertir a número
    const num = parseFloat(val.replace(/\./g, '').replace(',', '.'))
    if (isNaN(num) || num <= 0) {
      setAmount('1')
    } else {
      setAmount(val)
    }
  }

  const handleSwap = () => {
    const fromAmount =
      parseFloat(amount.replace(/\./g, '').replace(',', '.')) || 1
    const convertedAmount = convert(fromAmount, fromCurrency, toCurrency)

    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
    setAmount(formatCurrency(convertedAmount, toCurrency))
  }

  const convertedAmount = rates
    ? convert(
        parseFloat(amount.replace(/\./g, '').replace(',', '.')) || 1,
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
    <div className='w-full max-w-md bg-white dark:bg-zinc-800 rounded-2xl shadow-lg border border-zinc-100 dark:border-zinc-700 p-8'>
      <div className='space-y-6'>
        <CurrencyInput
          value={amount}
          onChange={handleAmountChange}
          currency={fromCurrency}
          onCurrencyChange={setFromCurrency}
          otherCurrency={toCurrency}
          // Mejorar el estilo del input desde aquí
          inputClassName='!bg-zinc-50 !bg-gray-100 dark:!bg-zinc-900 !border-none !shadow-none !rounded-xl !text-2xl !font-semibold !py-4 !pl-36  !pr-6 focus:!ring-2 focus:!ring-gray-400 transition-all'
        />

        <div className='flex justify-center'>
          <button
            onClick={handleSwap}
            className='p-2 hover:bg-primary-50 dark:hover:bg-zinc-700 rounded-full transition-colors   dark:border-zinc-600 shadow-sm'
            aria-label='Swap currencies'
          >
            <ArrowUpDown className='h-5 w-5 ' />
          </button>
        </div>

        <CurrencyInput
          value={formatCurrency(convertedAmount, toCurrency)}
          onChange={() => {}}
          currency={toCurrency}
          onCurrencyChange={setToCurrency}
          otherCurrency={fromCurrency}
          readOnly
          inputClassName='!bg-zinc-50 dark:!bg-zinc-900 !border-none !shadow-none !rounded-xl !text-2xl !font-semibold !py-4 !pl-36 !pr-6'
        />
      </div>

      <div className='mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-700'>
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
