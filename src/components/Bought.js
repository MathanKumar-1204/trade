import React, { useState } from 'react';
import Graph from './Graph';

const Bought = () => {
    const [selectedGraph, setSelectedGraph] = useState({ symbol: 'AAPL', title: 'Highly Grossing Stock (AAPL)' });
    const [smallGraphs, setSmallGraphs] = useState([
        { symbol: 'GOOGL', title: 'Google (GOOGL)' },
        { symbol: 'RELIANCE.BSE', title: 'Reliance (RELIANCE)' },
    ]);

    const swapGraphs = (clickedGraphIndex) => {
        const temp = selectedGraph;
        setSelectedGraph(smallGraphs[clickedGraphIndex]);

        const newSmallGraphs = [...smallGraphs];
        newSmallGraphs[clickedGraphIndex] = temp;
        setSmallGraphs(newSmallGraphs);
    };

    return (
        <div className="flex flex-col h-full p-6 bg-black overflow-y-auto">
            {/* Header */}
            {/* <div className="flex items-center justify-between mb-8">
                <button className="p-2 bg-gray-200 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-8 w-8">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
                <h2 className="text-2xl font-bold">Stock Market Dashboard</h2>
            </div> */}

            {/* Large Graph - Dynamically changing based on selection */}
            <div className="mb-8">
                <Graph symbol={selectedGraph.symbol} title={selectedGraph.title} />
            </div>

            {/* Small graphs and + button inline */}
            <div className="flex flex-col md:flex-row md:space-x-8 justify-center items-center">
                {/* Small Graph 1 - Google */}
                <div className="flex-1 cursor-pointer" onClick={() => swapGraphs(0)}>
                    <Graph symbol={smallGraphs[0].symbol} title={smallGraphs[0].title} />
                </div>

                {/* Small Graph 2 - Reliance */}
                <div className="flex-1 cursor-pointer" onClick={() => swapGraphs(1)}>
                    <Graph symbol={smallGraphs[1].symbol} title={smallGraphs[1].title} />
                </div>

                {/* + Button directly after small graphs */}
                <div className="flex justify-center items-center ml-4 mt-4 md:mt-0">
                    <button className="p-6 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-8 w-8">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Bought;
