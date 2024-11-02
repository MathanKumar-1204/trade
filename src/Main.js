// src/Main.js

import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Settings from './components/Settings';
import Profile from './components/Profile';
import StockScraper from './components/StockScraper';
import StockSearch from './components/StockSearch';
import PaymentHistory from './components/PaymentHistory';
import Alert from './components/Alert';
import Bought from './components/Bought';
import Backtest from './components/Backtest';
import PaperTrade from './components/PaperTrade';

const Main = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar open/close state
    const [activeOption, setActiveOption] = useState('Dashboard'); // Track selected sidebar option

    const toggleSidebar = () => {
        setIsSidebarOpen((prev) => !prev); // Toggle sidebar visibility
    };

    const handleOptionClick = (option) => {
        setActiveOption(option); // Update selected option
        if (window.innerWidth < 1024) toggleSidebar(); // Close sidebar on small screens after selecting
    };

    // Dynamically render content based on sidebar selection
    const renderContent = () => {
        switch (activeOption) {
            case 'Dashboard':
                return <Dashboard />;
            case 'Settings':
                return <Settings />;
            case 'Profile':
                return <Profile />;
            case 'StockScraper':
                return <StockScraper />;
            case 'Backtest':
                return <Backtest />;
            case 'StockSearch':
                return <StockSearch />;
            case 'PaymentHistory':
                return <PaymentHistory />;
            case 'Graph':
                return <Bought />;
            case 'Alert':
                return <Alert />;
            case 'PaperTrade':
                return <PaperTrade />;
            case 'Logout':
                return <div>Logging out...</div>;
            default:
                return <Dashboard />;
        }
    };

    return (
        <div className="flex flex-col bg-black h-screen">
            {/* Pass activeOption as pageTitle to Header */}
            <Header toggleSidebar={toggleSidebar} pageTitle={activeOption} />
            
            <div className="flex flex-grow overflow-hidden">
                <Sidebar 
                    isOpen={isSidebarOpen} 
                    toggleSidebar={toggleSidebar} 
                    handleOptionClick={handleOptionClick}
                    activeOption={activeOption}
                    username="JoiningIn" // or any other username
                />

                {/* Main content adjusts based on whether sidebar is open or closed */}
                <div className={`transition-all duration-300 p-6 flex-grow h-full ${isSidebarOpen ? 'lg:ml-64' : 'lg:ml-16'}`}>
                    {renderContent()} {/* Display the component based on the selected option */}
                </div>
            </div>
        </div>
    );
};

export default Main;
