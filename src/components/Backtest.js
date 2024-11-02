import React, { useState } from 'react';
import axios from 'axios';

const Backtest = () => {
  const [stockName, setStockName] = useState('SPY');
  const [startDate, setStartDate] = useState('2020-01-01');
  const [endDate, setEndDate] = useState('2023-12-31');
  const [cashatrisk, setcashatrisk] = useState(0.5);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setResult(null);

    const data = {
      symbol: stockName,
      start_date: startDate,
      end_date: endDate,
      cash_at_risk: cashatrisk
    };

    console.log('Sending data:', data);

    try {
      const response = await axios.post('http://127.0.0.1:5000/run_strategy', data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setResult(response.data.message);
    } catch (err) {
      setError(err.response ? err.response.data.error : 'Error connecting to the API');
    }
  };

  return (
    <div className="bg-gray-900 text-white max-w-lg mx-auto p-6 rounded-lg shadow-md mt-10 overflow-y-auto flex flex-col h-full">
      <h2 className="text-2xl font-semibold mb-6 text-center">Backtest Trading Strategy</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Stock Symbol</label>
          <input
            type="text"
            value={stockName}
            onChange={(e) => setStockName(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Cash at Risk</label>
          <input
            type="number"
            step="0.01"
            value={cashatrisk}
            onChange={(e) => setcashatrisk(parseFloat(e.target.value))}
            required
            className="w-full p-2 border border-gray-300 rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200"
        >
          Run Backtest
        </button>
      </form>

      {result && (
        <div className="mt-6 p-4 bg-green-600 text-white rounded-lg">
          <h3 className="text-lg font-semibold">Backtest Result:</h3>
          <pre className="whitespace-pre-wrap">{result}</pre>
        </div>
      )}
      {error && (
        <div className="mt-6 p-4 bg-red-600 text-white rounded-lg">
          <h3 className="text-lg font-semibold">Error:</h3>
          <pre className="whitespace-pre-wrap">{error}</pre>
        </div>
      )}
    </div>
  );
};

export default Backtest;
