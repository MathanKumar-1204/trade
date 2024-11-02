// src/components/StockGraph.js

import React, { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    LineController,
    Tooltip,
    Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, LineController, Tooltip, Legend);

const Graph = ({ symbol = 'AAPL', title = 'Highly Grossing Stock (AAPL)' }) => {
    const [stockData, setStockData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const chartRef = useRef(null);
    const API_KEY = 'QUG5DJW3H8QR2PF1'; // API key from .env file

    useEffect(() => {
        fetchStockData();
    }, [symbol]);

    const fetchStockData = async () => {
        try {
            const response = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${API_KEY}`);
            const dailyData = response.data['Time Series (Daily)'];

            if (!dailyData) {
                throw new Error('No data available for this stock symbol.');
            }

            const dates = Object.keys(dailyData).slice(0, 30).reverse();
            const prices = dates.map(date => parseFloat(dailyData[date]['4. close']));

            setStockData({
                labels: dates,
                datasets: [
                    {
                        label: `${symbol} Price`,
                        data: prices,
                        fill: false,
                        backgroundColor: 'rgba(75,192,192,0.2)',
                        borderColor: 'rgba(75,192,192,1)',
                    },
                ],
            });
            setLoading(false);
        } catch (error) {
            console.error('Error fetching stock data:', error);
            setError(error.message);
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-full p-6 bg-white overflow-y-auto">
            <h3 className="text-xl font-semibold mb-4">{title}</h3>
            {loading ? (
                <div className="flex justify-center items-center">
                    <div className="animate-spin h-5 w-5 border-4 border-t-transparent border-blue-600 rounded-full"></div>
                </div>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <Line
                    ref={chartRef}
                    data={stockData}
                    options={{
                        responsive: true,
                        scales: {
                            x: {
                                type: 'category',
                                title: {
                                    display: true,
                                    text: 'Date',
                                },
                            },
                            y: {
                                type: 'linear',
                                title: {
                                    display: true,
                                    text: 'Price (USD)',
                                },
                                beginAtZero: false,
                            },
                        },
                        plugins: {
                            legend: {
                                display: true,
                                position: 'top',
                            },
                        },
                    }}
                />
            )}
        </div>
    );
};

export default Graph;
