import React from 'react'

interface CurrencyInputProps {
  value: string
  onChange: (value: string) => void
  currency: 'CLP' | 'USD' | 'ARS'
  onCurrencyChange: (currency: 'CLP' | 'USD' | 'ARS') => void
  otherCurrency: 'CLP' | 'USD' | 'ARS'
  readOnly?: boolean
  inputClassName?: string // nueva prop para estilos personalizados
}

const currencies = {
  USD: { name: 'US Dollar', symbol: '$' },
  ARS: { name: 'Argentine Peso', symbol: '$' },
  CLP: { name: 'Chilean Peso', symbol: '$' },
}

const CurrencyInput: React.FC<CurrencyInputProps> = ({
  value,
  onChange,
  currency,
  onCurrencyChange,
  otherCurrency,
  readOnly = false,
  inputClassName = '',
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^\d]/g, '')
    if (rawValue === '') {
      onChange('')
      return
    }

    const number = parseInt(rawValue, 10)
    const formattedValue = number.toLocaleString('es-CL')
    onChange(formattedValue)
  }

  return (
    <div className='relative'>
      <div className='absolute left-0 top-0 h-full flex justify-center items-center pl-3 gap-2'>
        {Object.entries(currencies).map(([code, { name }]) => (
          <label
            key={code}
            className={`flex items-center space-x-1 cursor-pointer duration-200 justify-center select-none ${
              code === otherCurrency
                ? 'duration-200 opacity-30 scale-90 cursor-not-allowed'
                : ''
            }`}
          >
            <input
              type='radio'
              name={`currency-${otherCurrency}`}
              value={code}
              checked={currency === code}
              onChange={() => onCurrencyChange(code as 'CLP' | 'USD' | 'ARS')}
              className='sr-only peer'
              disabled={code === otherCurrency}
            />
            <span
              className={`
                w-4 h-4 rounded-full border-2
                duration-300 
                border-zinc-400 dark:border-zinc-500 
                flex items-center justify-center
                transition-colors
                peer-checked:bg-zinc-700 peer-checked:border-zinc-700
                peer-checked:dark:bg-zinc-200 peer-checked:dark:border-zinc-200
                bg-white dark:bg-zinc-800
              `}
            >
              <span
                className={`
                  block w-2 h-2 rounded-full
                  bg-zinc-900 dark:bg-zinc-100
                  opacity-0 peer-checked:opacity-100 transition-opacity
                `}
              ></span>
            </span>
            <span className='text-xs font-medium text-zinc-700 dark:text-zinc-200'>
              {code}
            </span>
          </label>
        ))}
      </div>
      <input
        type='text'
        value={value}
        onChange={handleChange}
        readOnly={readOnly}
        className={`w-full pl-32 pr-4 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg text-right ${
          readOnly
            ? 'text-zinc-400 dark:text-zinc-400'
            : 'text-zinc-900 dark:text-zinc-100'
        } focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:focus:ring-zinc-700 transition-shadow ${inputClassName}`}
        placeholder='0,00'
      />
    </div>
  )
}

export default CurrencyInput
