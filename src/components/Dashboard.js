// src/components/Dashboard.js

import React from 'react';
import StockGraph from './StockGraph';
import Wallet from './Wallet';
import Carousel from './Carousel'; // Import the Carousel component

const Dashboard = () => {
    return (
      <div className="flex flex-col h-full p-6 bg-black overflow-y-auto">
      <div className="flex w-full space-x-4 mb-4">
          {/* StockGraph on the top left */}
          <div className="w-1/2 h-1/2">
              <StockGraph />
          </div>
  
          {/* Wallet on the top right */}
          <div className="w-1/2 h-1/2">
              <Wallet />
          </div>
      </div>
  
      {/* Carousel for top profitable stocks at the bottom */}
      <div className="w-full h-auto p-4">
          <Carousel />
      </div>
  </div>
  
    );
};

export default Dashboard;
