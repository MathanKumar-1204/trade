import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const Carousel = () => {
    const [stocksData, setStocksData] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const API_KEY = 'XAS7WHHXG1Z0DWNN'; // Your API key
    const o = "<";
    const c = ">";

    useEffect(() => {
        const fetchStocks = async () => {
            try {
                const stockSymbols = ['NFLX', 'TSLA', 'MSFT', 'GOOGL'];
                const stockDataPromises = stockSymbols.map((symbol) =>
                    axios.get(
                        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${API_KEY}`
                    )
                );

                const stockResponses = await Promise.all(stockDataPromises);

                const stocks = stockResponses.map((response, index) => {
                    const stockSymbol = stockSymbols[index];
                    const data = response.data['Time Series (Daily)'];

                    if (!data) {
                        throw new Error(`Data not found for symbol: ${stockSymbol}`);
                    }

                    const formattedData = [];
                    for (const [date, value] of Object.entries(data)) {
                        formattedData.push({
                            date,
                            close: parseFloat(value['4. close']),
                        });
                    }

                    const lastDaysData = formattedData.slice(0, 10).reverse();

                    return {
                        name: stockSymbol,
                        price: lastDaysData.map(item => item.close),
                        labels: lastDaysData.map(item => item.date),
                    };
                });

                setStocksData(stocks);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching stocks data:', error);
                setError('Failed to load stock data.');
                setLoading(false);
            }
        };

        fetchStocks();
    }, [API_KEY]);

    useEffect(() => {
        if (stocksData.length > 0) {
            const interval = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % stocksData.length);
            }, 3000);

            return () => clearInterval(interval);
        }
    }, [stocksData.length]);

    if (loading) {
        return <p className="text-white">Loading...</p>;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    return (
        <div className="w-full flex flex-col items-start relative overflow-hidden">
            <h2 className="text-xl font-bold text-white p-1 absolute top-0 left-0 z-10 ">Trending Stocks</h2>
            <div className="w-full flex justify-center items-center mt-10 relative">
                <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{
                        transform: `translateX(-${currentIndex * (100 / stocksData.length)}%)`,
                        width: `${stocksData.length * 100}%`,
                    }}
                >
                    {stocksData.map((stock, index) => (
                        <div
                            key={index}
                            className={`flex flex-col items-center justify-center bg-black w-full`}
                        >
                            <h3 className="text-lg font-bold text-white mb-4">{stock.name}</h3>

                            <Line
                                data={{
                                    labels: stock.labels,
                                    datasets: [
                                        {
                                            label: 'Stock Price',
                                            data: stock.price,
                                            borderColor: 'rgba(75, 192, 192, 1)',
                                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                                            fill: true,
                                        },
                                    ],
                                }}
                                options={{
                                    responsive: true,
                                    plugins: {
                                        legend: {
                                            display: false,
                                        },
                                    },
                                    scales: {
                                        y: {
                                            beginAtZero: false,
                                        },
                                    },
                                }}
                                height={200}
                            />
                        </div>
                    ))}
                </div>

                <button
                    onClick={() =>
                        setCurrentIndex((prevIndex) =>
                            prevIndex === 0 ? stocksData.length - 1 : prevIndex - 1
                        )
                    }
                    className="absolute left-4 text-white bg-indigo-500 p-2 rounded-full hover:bg-indigo-600"
                >
                    {o}
                </button>

                <button
                    onClick={() =>
                        setCurrentIndex((prevIndex) =>
                            (prevIndex + 1) % stocksData.length
                        )
                    }
                    className="absolute right-4 text-white bg-indigo-500 p-2 rounded-full hover:bg-indigo-600"
                >
                    {c}
                </button>
            </div>
        </div>
    );
};

export default Carousel;
