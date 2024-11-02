import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

const PaperTrade = () => {
  const [account, setAccount] = useState(null);
  const [positions, setPositions] = useState([]);
  const [historicalData, setHistoricalData] = useState([]);
  const stockSymbol = 'AAPL'; // Example stock symbol

  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        const accountResponse = await fetch('http://127.0.0.1:5002/api/account');
        const accountData = await accountResponse.json();
        setAccount(accountData);

        const positionsResponse = await fetch('http://127.0.0.1:5002/api/positions');
        const positionsData = await positionsResponse.json();
        setPositions(positionsData);

        // Fetch historical data for the specified stock symbol
        const historicalResponse = await fetch(`http://127.0.0.1:5002/api/historical-data/${stockSymbol}`);
        const historicalData = await historicalResponse.json();
        
        // Ensure historicalData is an array before setting it
        setHistoricalData(Array.isArray(historicalData) ? historicalData : []);
      } catch (error) {
        console.error('Error fetching data from Flask:', error);
      }
    };

    fetchAccountData();
  }, []);

  if (!account) {
    return <div className="flex justify-center items-center h-screen text-white">Loading account data...</div>;
  }

  // Prepare chart data
  const chartData = {
    labels: historicalData.map(data => data.time),
    datasets: [
      {
        label: `${stockSymbol} Closing Price`,
        data: historicalData.map(data => data.close),
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  return (
    <div className="flex flex-col h-full p-6 bg-black overflow-y-auto">
      <h1 className="text-3xl font-bold mb-4 text-center text-white">Alpaca Paper Trading Dashboard</h1>
      <div className="mb-6 p-4 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-2 text-white">Account Information</h2>
        <p className="text-lg text-gray-300">Cash: <span className="font-bold">${account.cash}</span></p>
        <p className="text-lg text-gray-300">Buying Power: <span className="font-bold">${account.buying_power}</span></p>
        <p className="text-lg text-gray-300">Status: <span className="font-bold">{account.status}</span></p>
      </div>

      <div className="mb-6 p-4 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-2 text-white">Open Positions</h2>
        {positions.length === 0 ? (
          <p className="text-lg text-gray-300">No open positions.</p>
        ) : (
          <table className="min-w-full text-left text-gray-200">
            <thead>
              <tr className="bg-gray-700">
                <th className="p-2">Symbol</th>
                <th className="p-2">Qty</th>
                <th className="p-2">Market Price</th>
                <th className="p-2">Cost Basis</th>
              </tr>
            </thead>
            <tbody>
              {positions.map((position) => (
                <tr key={position.symbol} className="bg-gray-800 hover:bg-gray-700">
                  <td className="p-2">{position.symbol}</td>
                  <td className="p-2">{position.qty}</td>
                  <td className="p-2">${position.market_price}</td>
                  <td className="p-2">${position.cost_basis}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="mb-6 p-4 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-2 text-white">{stockSymbol} Historical Data</h2>
        {historicalData.length > 0 ? (
          <Line data={chartData} />
        ) : (
          <p className="text-gray-300">No historical data available.</p>
        )}
      </div>

      <a
        href="https://alpaca.markets/"
        className="mt-4 p-2 bg-green-500 hover:bg-green-600 text-white font-bold rounded shadow-md text-center"
      >
        Go to Alpaca Dashboard
      </a>
    </div>
  );
};

export default PaperTrade;
