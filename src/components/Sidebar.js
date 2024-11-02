import React from 'react';
import { FaUserCircle } from 'react-icons/fa'; // User icon

const Sidebar = ({ isOpen, toggleSidebar, handleOptionClick, activeOption, username }) => {
    const menuItems = [
        { name: 'Dashboard', label: 'Dashboard' },
        { name: 'StockScraper', label: 'Stock Scraper' },
        { name: 'Backtest', label: 'Backtest' },
        { name: 'StockSearch', label: 'Stock Search' },
        { name: 'PaperTrade', label: 'Paper Trade' },
        { name: 'PaymentHistory', label: 'Payment History' },
        { name: 'Graph', label: 'Graph' },
        { name: 'Alert', label: 'Alert' },
    ];

    return (
        <aside 
            className={`fixed inset-y-0 left-0 bg-gray-900 text-white shadow-xl w-64 p-6 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out z-10`}
        >
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Menu</h2>
                <button 
                    className="text-gray-400 hover:text-white focus:outline-none" 
                    onClick={toggleSidebar}
                >
                   ☰
                </button>
            </div>

            {/* Account Section */}
            <div className="flex items-center space-x-3 mb-4">
                <FaUserCircle size={32} className="text-gray-400" />
                <span className="text-lg font-semibold">{username || 'User'}</span>
            </div>
            <hr className="border-gray-700 mb-6" />

            <ul className="space-y-4">
                {menuItems.map((item) => (
                    <li 
                        key={item.name}
                        onClick={() => handleOptionClick(item.name)}
                        className={`p-3 rounded-lg cursor-pointer transition-colors duration-200 font-semibold text-sm 
                            ${activeOption === item.name 
                                ? 'bg-blue-600 text-white' 
                                : 'hover:bg-gray-700 hover:text-white text-gray-400'
                            }
                        `}
                    >
                        {item.label}
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default Sidebar;
