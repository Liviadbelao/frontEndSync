import React from 'react';

const ToggleButton = ({ ativado, setAtivado }) => {

    const handleClick = () => {
        setAtivado(prevState => !prevState); // Alterna o estado
    };

    return (
        <button
            className={`relative w-12 h-6 rounded-full flex items-center ${ativado ? 'bg-green-500' : 'bg-gray-500'}`}
            onClick={handleClick}
        >
            <div
                className={`absolute w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${ativado ? 'translate-x-8' : 'translate-x-1'}`}
            ></div>
        </button>
    );
};

export default ToggleButton;
