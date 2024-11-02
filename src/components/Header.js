// src/components/Header.js

import React, { useState, useEffect, useRef } from 'react';
import { FaUserCircle, FaCog } from 'react-icons/fa';
import DropdownMenu from './DropdownMenu';

const Header = ({ toggleSidebar, pageTitle }) => {
    const [isAccountMenuOpen, setAccountMenuOpen] = useState(false);
    const [isSettingsMenuOpen, setSettingsMenuOpen] = useState(false);

    const accountRef = useRef(null);
    const settingsRef = useRef(null);

    // Close dropdowns if clicked outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (accountRef.current && !accountRef.current.contains(event.target)) {
                setAccountMenuOpen(false);
            }
            if (settingsRef.current && !settingsRef.current.contains(event.target)) {
                setSettingsMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-lg sticky top-0 z-10">
            <button 
                className="bg-blue-500 text-white p-2 rounded-full focus:outline-none shadow-lg"
                onClick={toggleSidebar}
            >
                ☰
            </button>

            {/* Display pageTitle here */}
            <h1 className="text-2xl font-semibold">{pageTitle}</h1>

            <div className="flex space-x-4 items-center relative">
                <button 
                    ref={accountRef}
                    className="text-white hover:text-gray-200 focus:outline-none"
                    onClick={() => setAccountMenuOpen((prev) => !prev)}
                >
                    <FaUserCircle size={24} />
                </button>

                {isAccountMenuOpen && (
                    <DropdownMenu
                        options={[
                            { label: 'Profile', value: 'profile' },
                            { label: 'Logout', value: 'logout' },
                        ]}
                        onSelect={(option) => console.log(option.value)}
                        onClose={() => setAccountMenuOpen(false)}
                        target={accountRef.current}
                        leftOffset={-30}
                    />
                )}

                <button 
                    ref={settingsRef}
                    className="text-white hover:text-gray-200 focus:outline-none"
                    onClick={() => setSettingsMenuOpen((prev) => !prev)}
                >
                    <FaCog size={24} />
                </button>

                {isSettingsMenuOpen && (
                    <DropdownMenu
                        options={[
                            { label: 'Settings', value: 'settings' },
                            { label: 'Help', value: 'help' },
                        ]}
                        onSelect={(option) => console.log(option.value)}
                        onClose={() => setSettingsMenuOpen(false)}
                        target={settingsRef.current}
                        leftOffset={-60}
                    />
                )}
            </div>
        </header>
    );
};

export default Header;
