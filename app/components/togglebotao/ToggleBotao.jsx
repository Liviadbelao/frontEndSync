import React from 'react';

const ToggleButton = ({ ativado, setAtivado }) => { // Desestruturando as props

    const handleClick = () => {
        setAtivado(!ativado);
    };

    return (
        <button
            className={`relative w-12 h-6 rounded-full flex items-center ${!ativado ? 'bg-gray-500' : 'bg-green-500'}`}
            onClick={handleClick}
        >
            <div
                className={`absolute w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${!ativado ? 'translate-x-1' : 'translate-x-8'}`}
            ></div>
        </button>
    );
};

export default ToggleButton;