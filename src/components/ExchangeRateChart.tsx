import React from 'react';

// This is a simplified chart component. In a real app, you would use a library like Chart.js or Recharts
const ExchangeRateChart: React.FC = () => {
  // Generate some mock data points
  const mockData = [
    { date: 'Oct 1', rate: 0.00110 },
    { date: 'Oct 2', rate: 0.00109 },
    { date: 'Oct 3', rate: 0.00111 },
    { date: 'Oct 4', rate: 0.00112 },
    { date: 'Oct 5', rate: 0.00113 },
  ];

  // Find the min and max values to scale the chart
  const minRate = Math.min(...mockData.map(d => d.rate));
  const maxRate = Math.max(...mockData.map(d => d.rate));
  const range = maxRate - minRate;

  // Calculate the height for each bar
  const getHeight = (rate: number) => {
    return ((rate - minRate) / range) * 100;
  };

  return (
    <div className="card w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">CLP to USD - Last 5 Days</h3>
        <button className="text-sm text-primary-600 hover:text-primary-700">View More</button>
      </div>
      
      <div className="h-40 flex items-end justify-between">
        {mockData.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <div 
              className="w-12 bg-primary-500 hover:bg-primary-600 transition-colors rounded-t"
              style={{ height: `${getHeight(item.rate)}%` }}
            ></div>
            <div className="text-xs text-gray-500 mt-2">{item.date}</div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex justify-between text-sm text-gray-500">
          <span>Current: {mockData[mockData.length - 1].rate.toFixed(5)} USD</span>
          <span className="text-green-600">+0.89%</span>
        </div>
      </div>
    </div>
  );
};

export default ExchangeRateChart;