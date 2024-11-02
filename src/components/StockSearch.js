import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import Chart from 'react-apexcharts';

// Predefined stock data for search and recommendations
const predefinedStocks = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 140, change: 1.5, changePercent: 1.08, volume: 80000000, marketCap: '2.3T', high: 145, low: 138, chartData: [138, 142, 140, 145, 150], news: ['Apple launches new product', 'Apple hits record stock price'] },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 1600, change: -5, changePercent: -0.31, volume: 1200000, marketCap: '1.6T', high: 1625, low: 1580, chartData: [1600, 1580, 1590, 1610, 1620], news: ['Google updates search algorithm', 'Alphabet Q3 results'] },
  { symbol: 'AMZN', name: 'Amazon.com, Inc.', price: 3300, change: 12, changePercent: 0.36, volume: 5000000, marketCap: '1.7T', high: 3350, low: 3280, chartData: [3280, 3300, 3320, 3340, 3350], news: ['Amazon Black Friday sales', 'Amazon cloud services growth'] },
  { symbol: 'MSFT', name: 'Microsoft Corporation', price: 220, change: 3, changePercent: 1.38, volume: 30000000, marketCap: '1.9T', high: 225, low: 218, chartData: [218, 222, 221, 223, 225], news: ['Microsoft acquires new AI startup', 'Windows 11 released'] },
  { symbol: 'TSLA', name: 'Tesla, Inc.', price: 740, change: -10, changePercent: -1.32, volume: 10000000, marketCap: '800B', high: 760, low: 735, chartData: [735, 738, 740, 742, 750], news: ['Tesla hits new EV sales record', 'Tesla to launch robotaxi'] },
  { symbol: 'NVDA', name: 'NVIDIA Corporation', price: 550, change: 15, changePercent: 2.8, volume: 9000000, marketCap: '1.3T', high: 565, low: 540, chartData: [540, 545, 550, 552, 560], news: ['NVIDIA AI breakthrough', 'Record sales for NVIDIA GPUs'] },
  { symbol: 'FB', name: 'Meta Platforms Inc.', price: 300, change: 6, changePercent: 2.04, volume: 1200000, marketCap: '900B', high: 310, low: 295, chartData: [295, 298, 305, 308, 310], news: ['Meta announces VR headset', 'Meta stock surges on earnings'] },
  { symbol: 'NFLX', name: 'Netflix, Inc.', price: 580, change: -10, changePercent: -1.69, volume: 7000000, marketCap: '250B', high: 590, low: 570, chartData: [570, 575, 580, 582, 588], news: ['Netflix subscriber growth slows', 'New content partnership with studios'] },
  { symbol: 'AMD', name: 'Advanced Micro Devices, Inc.', price: 90, change: 2.5, changePercent: 2.87, volume: 3500000, marketCap: '150B', high: 95, low: 88, chartData: [88, 89, 92, 93, 95], news: ['AMD launches new chip', 'AMD stock rises on earnings'] },
  { symbol: 'DIS', name: 'The Walt Disney Company', price: 140, change: 3, changePercent: 2.19, volume: 11000000, marketCap: '240B', high: 145, low: 138, chartData: [138, 140, 143, 145, 148], news: ['Disney launches new streaming service', 'Disney stock surges after earnings'] },
];

// Separate dataset for today's trending stocks
const trendingStocks = [
  { symbol: 'NFLX', name: 'Netflix, Inc.', chartData: [570, 575, 580, 585, 590], news: ['Netflix subscriber growth slows', 'Netflix launches new series'] },
  { symbol: 'AMD', name: 'Advanced Micro Devices, Inc.', chartData: [88, 89, 90, 92, 95], news: ['AMD launches new chip', 'AMD stock rises on earnings'] },
  { symbol: 'DIS', name: 'The Walt Disney Company', chartData: [138, 139, 140, 143, 145], news: ['Disney launches new streaming service', 'Disney stock surges after earnings'] },
  { symbol: 'NVDA', name: 'NVIDIA Corporation', chartData: [540, 545, 550, 555, 565], news: ['NVIDIA AI breakthrough', 'NVIDIA stock hits new highs'] },
];

const StockSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStock, setSelectedStock] = useState(null);
  const [stockNews, setStockNews] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [recentSearches, setRecentSearches] = useState([]);
  const [showRecentSearches, setShowRecentSearches] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch recent searches from localStorage on component mount
  useEffect(() => {
    const storedSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
    setRecentSearches(storedSearches);
  }, []);

  // Handle selecting a stock from the search results or recent searches
  const handleStockSelect = (stock) => {
    setSelectedStock(stock);
    setChartData(stock.chartData);
    setStockNews(stock.news);

    // Update recent searches and store them in localStorage
    const updatedRecentSearches = [stock, ...recentSearches.filter(s => s.symbol !== stock.symbol)].slice(0, 5);
    setRecentSearches(updatedRecentSearches);
    localStorage.setItem('recentSearches', JSON.stringify(updatedRecentSearches));
    setShowRecentSearches(false);
    setErrorMessage('');
  };

  // Handle searching for a stock by pressing Enter
  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter') {
      const foundStock = predefinedStocks.find(stock => stock.symbol.toLowerCase() === searchTerm.toLowerCase());

      if (foundStock) {
        handleStockSelect(foundStock);
      } else {
        setErrorMessage("The stock you're seeking is not available right now. Why not try searching for something else?");
        setSelectedStock(null);
      }
    }
  };

  return (
    <div className="flex flex-col h-full p-6 bg-black overflow-y-auto">
      <h1 className="text-3xl font-bold text-center overflow-y-auto">LOOKING FOR?</h1>

      {/* Search Input */}
      <div className="relative flex justify-center mt-4">
        <div className="relative w-1/2">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Search for stocks by name or symbol"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setShowRecentSearches(true)}
            onKeyDown={handleSearchSubmit}
          />
        </div>
      </div>

      {/* Show recent searches when the search bar is focused and searchTerm is empty */}
      {showRecentSearches && !searchTerm && recentSearches.length > 0 && (
        <div className="mt-4 flex justify-center">
          <div className="w-1/2 bg-white border rounded-lg shadow-lg p-4">
            <h2 className="text-lg font-semibold">Recent Searches</h2>
            <ul>
              {recentSearches.map((stock, index) => (
                <li
                  key={index}
                  className="cursor-pointer p-2 border-b hover:bg-gray-100"
                  onClick={() => handleStockSelect(stock)}
                >
                  <strong>{stock.symbol}</strong>: {stock.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Display Stock Details and Charts if a stock is selected */}
      {selectedStock && (
        <div className="mt-8 w-1/2 mx-auto bg-black rounded-lg shadow-lg p-4">
          <h2 className="text-2xl font-semibold text-white text-center">Details for {selectedStock.symbol}</h2>

          {/* Stock Chart */}
          <div className="mt-4 p-4">
            <h3 className="text-xl text-white text-center">Real-Time Stock Analysis</h3>
            {chartData ? (
              <Chart
                options={{
                  chart: {
                    id: selectedStock.symbol,
                    type: 'line',
                    zoom: { enabled: false },
                  },
                  stroke: {
                    curve: 'smooth',
                    width: 2,
                  },
                  xaxis: {
                    categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
                    labels: {
                      style: {
                        colors: '#ffffff', // Change to white for visibility on black background
                        fontSize: '12px',
                      },
                    },
                  },
                  yaxis: {
                    labels: {
                      style: {
                        colors: '#ffffff', // Change to white for visibility on black background
                        fontSize: '12px',
                      },
                    },
                  },
                  dataLabels: {
                    enabled: true,
                    style: {
                      colors: ['#ffffff'], // Change to white for visibility on black background
                    },
                  },
                }}
                series={[{ name: selectedStock.name, data: chartData }]}
                type="line"
                height={300}
                className="rounded-lg"
              />
            ) : (
              'Loading chart...'
            )}
          </div>

          {/* Stock Information */}
          <div className="mt-4 text-black h-auto">
            <h3 className="text-xl">Stock Information</h3>
            <ul className="text-sm bg-white p-4 rounded-lg">
              <li><strong>Price:</strong> ${selectedStock.price}</li>
              <li><strong>Change:</strong> {selectedStock.change} ({selectedStock.changePercent}%)</li>
              <li><strong>Volume:</strong> {selectedStock.volume}</li>
              <li><strong>Market Cap:</strong> {selectedStock.marketCap}</li>
              <li><strong>High:</strong> ${selectedStock.high}</li>
              <li><strong>Low:</strong> ${selectedStock.low}</li>
            </ul>
          </div>

          {/* Stock News */}
          <div className="mt-4 bg-white p-4 rounded-lg h-auto">
            <h3 className="text-xl">Recent News</h3>
            <ul>
              {stockNews.map((news, index) => (
                <li key={index} className="text-sm text-gray-600">{news}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Error Message */}
      {errorMessage && (
        <div className="mt-4 p-4 bg-yellow-100 border border-yellow-500 rounded-lg text-center h-auto">
          {errorMessage}
          <h2 className="text-lg font-semibold mt-4">Recommended Stocks</h2>
          <ul className="mt-2">
            {predefinedStocks.map(stock => (
              <li
                key={stock.symbol}
                className="cursor-pointer p-2 border-b hover:bg-gray-100"
                onClick={() => handleStockSelect(stock)}
              >
                <strong>{stock.symbol}</strong>: {stock.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Today's Trending Stocks */}
      <div className="mt-8 bg-black p-4 rounded-lg h-auto">
        <h2 className="text-lg font-semibold text-white">Today's Trending</h2>
        <div className="flex space-x-10 overflow-x-auto mt-4">
          {trendingStocks.map((stock) => (
            <div key={stock.symbol} className="bg-white rounded-lg shadow-md p-4 w-64">
              <h3 className="text-xl font-bold">{stock.name} ({stock.symbol})</h3>
              <Chart
                options={{
                  chart: { id: stock.symbol },
                  xaxis: {
                    categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
                    labels: {
                      style: {
                        colors: '#000', // Change to black for better visibility
                        fontSize: '12px',
                      },
                    },
                  },
                  yaxis: {
                    labels: {
                      style: {
                        colors: '#000', // Change to black for better visibility
                        fontSize: '12px',
                      },
                    },
                  },
                }}
                series={[{ name: stock.name, data: stock.chartData }]}
                type="line"
                height={160}
              />
              <ul className="mt-2">
                {stock.news.map((news, index) => (
                  <li key={index} className="text-sm text-gray-600">{news}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StockSearch;
