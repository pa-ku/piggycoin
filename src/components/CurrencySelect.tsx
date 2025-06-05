import React from 'react';
import { ChevronDown } from 'lucide-react';
import { CurrencyCode } from '../types/currency';
import { currencies } from '../utils/currencyData';

interface CurrencySelectProps {
  value: CurrencyCode;
  onChange: (currency: CurrencyCode) => void;
  excludeCurrency?: CurrencyCode;
}

const CurrencySelect: React.FC<CurrencySelectProps> = ({ 
  value, 
  onChange,
  excludeCurrency 
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value as CurrencyCode);
  };

  return (
    <div className='relative'>
      <select
        value={value}
        onChange={handleChange}
        className='w-full appearance-none  bg-white border border-gray-200 rounded-lg py-3 pl-4 pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 cursor-pointer'
      >
        {Object.values(currencies)
          .filter((currency) => currency.code !== excludeCurrency)
          .map((currency) => (
            <option key={currency.code} value={currency.code}>
              {currency.flag} {currency.code} - {currency.name}
            </option>
          ))}
      </select>
      <div className='absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none'>
        <ChevronDown className='h-5 w-5 text-gray-400' />
      </div>
    </div>
  )
};

export default CurrencySelect;