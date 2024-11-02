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

const StockGraph = () => {
    const [stockData, setStockData] = useState(null);
    const [loading, setLoading] = useState(true);
    const chartRef = useRef(null);

    useEffect(() => {
        // Fetch stock data when component mounts
        fetchStockData();
    }, []);

    const fetchStockData = async () => {
        try {
            const API_KEY = '90EA3KXK86DZLVGQ';  // Replace with your actual API key
            const symbol = 'AAPL'; // Highly grossing stock symbol
            const response = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${API_KEY}`);
            const dailyData = response.data['Time Series (Daily)'];

            // Prepare data for the chart
            const dates = Object.keys(dailyData).slice(0, 30).reverse();
            const prices = dates.map(date => parseFloat(dailyData[date]['4. close'])); // Convert prices to float

            setStockData({
                labels: dates,
                datasets: [
                    {
                        label: `${symbol} Price`,
                        data: prices,
                        fill: false,
                        backgroundColor: 'rgba(75,192,192,0.2)', // Slightly transparent
                        borderColor: 'rgba(75,192,192,1)',
                    },
                ],
            });
            setLoading(false);
        } catch (error) {
            console.error('Error fetching stock data:', error);
            setLoading(false);
        }
    };

    return (
        <div className="p-4 h-auto bg-white rounded-lg shadow-md w-full">
            <h3 className="text-xl font-semibold mb-4">Highly Grossing Stock (AAPL)</h3>
            {loading ? (
                <p>Loading stock data...</p>
            ) : (
                <Line
                    ref={chartRef}
                    data={stockData}
                    options={{
                        responsive: true,
                        scales: {
                            x: {
                                type: 'category', // Ensure x scale is category
                                title: {
                                    display: true,
                                    text: 'Date',
                                },
                            },
                            y: {
                                type: 'linear', // Ensure y scale is linear
                                title: {
                                    display: true,
                                    text: 'Price (USD)',
                                },
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

export default StockGraph;
