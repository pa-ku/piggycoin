import React from 'react';
import { DollarSign } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="w-full py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="h-10 w-10 rounded-full bg-primary-600 flex items-center justify-center">
            <DollarSign className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-primary-800">GlobalConvert</h1>
            <p className="text-xs text-gray-500">Currency Exchange Made Simple</p>
          </div>
        </div>
        
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            <li><a href="#" className="text-gray-600 hover:text-primary-600 transition-colors">Home</a></li>
            <li><a href="#" className="text-gray-600 hover:text-primary-600 transition-colors">Rates</a></li>
            <li><a href="#" className="text-gray-600 hover:text-primary-600 transition-colors">About</a></li>
            <li><a href="#" className="text-gray-600 hover:text-primary-600 transition-colors">Contact</a></li>
          </ul>
        </nav>
        
        <div className="hidden md:block">
          <button className="btn-primary">Sign Up</button>
        </div>
      </div>
    </header>
  );
};

export default Header;