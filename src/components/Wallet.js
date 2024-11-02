import React from 'react';
import { FaWallet, FaDollarSign } from 'react-icons/fa'; // Import wallet and dollar sign icons

const Wallet = () => {
    const profit = 2500; // Example profit amount

    return (
        <div className="flex flex-col justify-center items-center space-y-4 p-4 h-[400px]">
            {/* Profit Section */}
            <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-md p-4 w-[300px] h-[200px]">
                <FaDollarSign className="text-6xl text-green-500 mb-2" /> {/* Large dollar sign icon */}
                <p className="text-3xl font-bold text-green-600">${profit.toLocaleString()}</p> {/* Formatted profit amount */}
                <p className="text-lg text-gray-500">Total Profit</p>
            </div>

            {/* Wallet Section */}
            <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-md p-4 w-[300px] h-[200px]">
                <FaWallet className="text-6xl text-gray-600 mb-2" /> {/* Large wallet icon */}
                <h3 className="text-xl font-semibold mb-2">Wallet</h3>
                <p className="text-lg text-green-600 font-bold">${profit.toLocaleString()}</p> {/* Formatted wallet balance */}
            </div>
        </div>
    );
};

export default Wallet;
