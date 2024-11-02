// src/components/DropdownMenu.js

import React from 'react';
import { createPortal } from 'react-dom';

const DropdownMenu = ({ options, onSelect, onClose, target, leftOffset = 0 }) => {
    const dropdownStyles = {
        position: 'absolute',
        top: target.getBoundingClientRect().bottom + window.scrollY,
        left: target.getBoundingClientRect().left + leftOffset, // Use leftOffset prop
        backgroundColor: 'white',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
        borderRadius: '4px',
        zIndex: 1000,
    };

    return createPortal(
        <div style={dropdownStyles}>
            <ul className="p-2">
                {options.map((option) => (
                    <li
                        key={option.label}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                            onSelect(option);
                            onClose();
                        }}
                    >
                        {option.label}
                    </li>
                ))}
            </ul>
        </div>,
        document.body // Attach to the body for better positioning
    );
};

export default DropdownMenu;
