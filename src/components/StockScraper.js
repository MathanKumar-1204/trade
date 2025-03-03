import React, { useState } from 'react';
import axios from 'axios';

const StockScraper = () => {
    const [stockSymbol, setStockSymbol] = useState('');
    const [newsHeadlines, setNewsHeadlines] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [analysis, setAnalysis] = useState(''); // New state for Buy/Sell recommendation

    const handleInputChange = (e) => {
        setStockSymbol(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setNewsHeadlines([]);
        setAnalysis(''); // Clear previous recommendation

        try {
            const response = await axios.post('https://tradestockscrape.onrender.com/api/get_news', { stockSymbol });
            setNewsHeadlines(response.data.newsHeadlines || []);
            setAnalysis(response.data.analysis); // Set the recommendation
        } catch (err) {
            setError('Failed to retrieve news.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-gray-800 rounded-lg shadow-lg text-white flex flex-col h-full overflow-y-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">Stock News</h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Enter stock symbol (e.g., GOOGL)"
                    value={stockSymbol}
                    onChange={handleInputChange}
                    className="p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <button
                    type="submit"
                    className={`p-3 rounded-lg font-semibold ${
                        loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500'
                    }`}
                    disabled={loading}
                >
                    {loading ? 'Fetching News...' : 'Get News'}
                </button>
            </form>

            {error && <div className="text-red-500 text-center mb-4">{error}</div>}
{/* Display Buy/Sell Recommendation */}
            {analysis && (
                <div className="mt-6 text-center">
                    <h3 className="text-2xl font-semibold mb-4">Recommendation:</h3>
                    <p className="text-3xl font-bold text-green-500">{analysis}</p>
                </div>
            )}
            {newsHeadlines.length > 0 && (
                <div className="mt-6">
                    <h3 className="text-2xl font-semibold mb-4 text-center">Recent News for {stockSymbol}:</h3>
                    <ul className="space-y-2 pl-4 list-disc list-inside">
                        {newsHeadlines.map((headline, index) => (
                            <li key={index} className="text-gray-200">{headline}</li>
                        ))}
                    </ul>
                </div>
            )}

            
        </div>
    );
};

export default StockScraper;
