import React, { useState } from 'react';

const ToggleButton = () => {
    const [isOn, setIsOn] = useState(false);

    const handleClick = () => {
        setIsOn(!isOn);
    };

    return (
        <button 
            className={`relative w-12 h-6 rounded-full flex items-center ${isOn ? 'bg-gray-500' : 'bg-green-500'}`} 
            onClick={handleClick}
        >
            <div 
                className={`absolute w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${isOn ? 'translate-x-1' : 'translate-x-8'}`}
            ></div>
        </button>
    );
};

export default ToggleButton;