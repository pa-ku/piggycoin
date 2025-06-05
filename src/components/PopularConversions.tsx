import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { formatCurrency } from '../utils/currencyData';

const popularPairs = [
  {
    from: 'USD',
    to: 'CLP',
    rate: 883.75,
    change: 1.2,
    increasing: true
  },
  {
    from: 'USD',
    to: 'ARS',
    rate: 349.98,
    change: 0.5,
    increasing: true
  },
  {
    from: 'CLP',
    to: 'ARS',
    rate: 0.396,
    change: -0.3,
    increasing: false
  }
];

const PopularConversions: React.FC = () => {
  return (
    <div className="card w-full">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Popular Exchange Rates</h3>
      
      <div className="space-y-3">
        {popularPairs.map((pair, index) => (
          <div 
            key={index} 
            className="flex justify-between items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-sm">
                {pair.from}
              </div>
              <span className="mx-2">→</span>
              <div className="h-8 w-8 rounded-full bg-secondary-100 flex items-center justify-center text-sm">
                {pair.to}
              </div>
              <div className="ml-3">
                <div className="text-sm font-medium text-gray-800">
                  1 {pair.from} = {formatCurrency(pair.rate, pair.to)}
                </div>
              </div>
            </div>
            
            <div className={`flex items-center ${pair.increasing ? 'text-green-600' : 'text-red-600'}`}>
              {pair.increasing ? (
                <TrendingUp className="h-4 w-4 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 mr-1" />
              )}
              <span className="text-sm font-medium">{pair.change}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularConversions;