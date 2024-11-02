import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
// import './.css'; // Import the CSS file

const Alert = () => {
  // Mock stock data for multiple stocks
  const mockStockData = [
    { time: '2024-10-20 09:30', AAPL: 145.00, GOOGL: 2725.00, TSLA: 780.00 },
    { time: '2024-10-20 10:00', AAPL: 146.50, GOOGL: 2730.00, TSLA: 785.00 },
    { time: '2024-10-20 10:30', AAPL: 147.00, GOOGL: 2740.00, TSLA: 790.00 },
    { time: '2024-10-20 11:00', AAPL: 146.20, GOOGL: 2720.00, TSLA: 775.00 },
    { time: '2024-10-20 11:30', AAPL: 145.80, GOOGL: 2710.00, TSLA: 770.00 },
    { time: '2024-10-20 12:00', AAPL: 148.00, GOOGL: 2750.00, TSLA: 800.00 },
    { time: '2024-10-20 12:30', AAPL: 149.50, GOOGL: 2760.00, TSLA: 805.00 },
    { time: '2024-10-20 13:00', AAPL: 150.00, GOOGL: 2775.00, TSLA: 810.00 },
    { time: '2024-10-20 13:30', AAPL: 151.20, GOOGL: 2780.00, TSLA: 815.00 },
    { time: '2024-10-20 14:00', AAPL: 152.00, GOOGL: 2790.00, TSLA: 820.00 },
  ];

  const [stocks, setStocks] = useState(mockStockData);
  const [alertStocks, setAlertStocks] = useState([]);
  const [buyLimit, setBuyLimit] = useState(null); // Store the Buy Limit
  const [sellLimit, setSellLimit] = useState(null); // Store the Sell Limit

  // Calculate percentage change for bar chart data
  const percentageChangeData = stocks.map((stock, index) => {
    if (index === 0) return { time: stock.time, AAPL: 0, GOOGL: 0, TSLA: 0 };
    const previousStock = stocks[index - 1];
    return {
      time: stock.time,
      AAPL: ((stock.AAPL - previousStock.AAPL) / previousStock.AAPL) * 100,
      GOOGL: ((stock.GOOGL - previousStock.GOOGL) / previousStock.GOOGL) * 100,
      TSLA: ((stock.TSLA - previousStock.TSLA) / previousStock.TSLA) * 100,
    };
  });

  // Mocking an alert for significant price changes
  useEffect(() => {
    const threshold = 5; // 5% change
    const alertingStocks = stocks
      .map((stock, index) => {
        if (index === 0) return null; // Skip first entry
        const previousPrices = stocks[index - 1];
        const alerts = [];

        // Check for significant changes in each stock
        ['AAPL', 'GOOGL', 'TSLA'].forEach((symbol) => {
          const previousPrice = previousPrices[symbol];
          const currentPrice = stock[symbol];
          const percentageChange = ((currentPrice - previousPrice) / previousPrice) * 100;

          // Buy/Sell alert logic based on user-set limits
          if (buyLimit && currentPrice <= buyLimit) {
            alerts.push({ symbol, price: currentPrice, time: stock.time, type: 'Buy' });
          } else if (sellLimit && currentPrice >= sellLimit) {
            alerts.push({ symbol, price: currentPrice, time: stock.time, type: 'Sell' });
          } else if (Math.abs(percentageChange) > threshold) {
            alerts.push({ symbol, price: percentageChange, time: stock.time });
          }
        });

        return alerts.length > 0 ? alerts : null;
      })
      .filter(Boolean); // Filter out null values

    setAlertStocks(alertingStocks.flat());
  }, [stocks, buyLimit, sellLimit]);

  return (
    <div className="flex flex-col w-full max-w-screen-lg p-8 mx-auto bg-gray-900 text-gray-100 h-full overflow-y-auto">
      <h1 className="text-2xl font-semibold mb-6 text-center">Stock Market Alerts</h1>

      {/* Buy/Sell Limit Input Section */}
      <div className="flex gap-8 mb-8">
        <div className="flex flex-col items-start">
          <label className="text-sm font-medium mb-2">Set Buy Limit:</label>
          <input
            type="number"
            placeholder="Enter Buy Limit"
            value={buyLimit !== null ? buyLimit : ''}
            onChange={(e) => setBuyLimit(e.target.value === '' ? null : Number(e.target.value))}
            className="bg-gray-800 text-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col items-start">
          <label className="text-sm font-medium mb-2">Set Sell Limit:</label>
          <input
            type="number"
            placeholder="Enter Sell Limit"
            value={sellLimit !== null ? sellLimit : ''}
            onChange={(e) => setSellLimit(e.target.value === '' ? null : Number(e.target.value))}
            className="bg-gray-800 text-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
      </div>

      {/* Line Chart Section */}
      <div className="mb-10">
        <h2 className="text-xl font-medium mb-4 text-center">Stock Performance Graph</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={stocks} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" tick={{ fill: 'white' }} />
            <YAxis tick={{ fill: 'white' }} />
            <Tooltip />
            <Line type="monotone" dataKey="AAPL" stroke="#82ca9d" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="GOOGL" stroke="#FF7300" />
            <Line type="monotone" dataKey="TSLA" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart Section */}
      <div className="mb-10">
        <h2 className="text-xl font-medium mb-4 text-center">Stock Percentage Change Graph</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={percentageChangeData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" tick={{ fill: 'white' }} />
            <YAxis tick={{ fill: 'white' }} />
            <Tooltip />
            <Bar dataKey="AAPL" fill="#82ca9d" />
            <Bar dataKey="GOOGL" fill="#FF7300" />
            <Bar dataKey="TSLA" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Stock Table Section */}
      <div className="overflow-x-auto mb-10">
        <h2 className="text-xl font-medium mb-4 text-center">Real-Time Stock Data</h2>
        <table className="min-w-full bg-gray-800 text-gray-300 border border-gray-700 rounded-lg">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="px-4 py-2 text-left">Symbol</th>
              <th className="px-4 py-2 text-left">Price</th>
              <th className="px-4 py-2 text-left">Time</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock, index) => (
              <React.Fragment key={index}>
                <tr className="border-b border-gray-700">
                  <td className="px-4 py-2">AAPL</td>
                  <td className="px-4 py-2">{stock.AAPL.toFixed(2)}</td>
                  <td className="px-4 py-2">{stock.time}</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="px-4 py-2">GOOGL</td>
                  <td className="px-4 py-2">{stock.GOOGL.toFixed(2)}</td>
                  <td className="px-4 py-2">{stock.time}</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="px-4 py-2">TSLA</td>
                  <td className="px-4 py-2">{stock.TSLA.toFixed(2)}</td>
                  <td className="px-4 py-2">{stock.time}</td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Alerts Section */}
      <div className="mb-10">
        <h2 className="text-xl font-medium mb-4 text-center">Stock Alerts</h2>
        {alertStocks.length > 0 ? (
          <div className="bg-red-600 p-4 rounded-lg text-gray-100">
            <p className="mb-2">The following stocks have triggered alerts:</p>
            <ul className="list-disc pl-4">
              {alertStocks.map((stock, index) => (
                <li key={index}>
                  {stock.type === 'Buy'
                    ? `${stock.symbol}: Buy Alert at ₹${stock.price.toFixed(2)} (Time: ${stock.time})`
                    : stock.type === 'Sell'
                    ? `${stock.symbol}: Sell Alert at ₹${stock.price.toFixed(2)} (Time: ${stock.time})`
                    : `${stock.symbol}: ${stock.price.toFixed(2)}% change (Time: ${stock.time})`}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>No alerts triggered at this time.</p>
        )}
      </div>
    </div>
  );
};

export default Alert;
