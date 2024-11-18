import React, { useState, useEffect } from 'react';

const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
        return 'Bom dia';
    } else if (currentHour < 18) {
        return 'Boa tarde';
    } else {
        return 'Boa noite';
    }
};

const Popup = ({nome}) => {
    const [isVisible, setIsVisible] = useState(true);
    const [greeting, setGreeting] = useState('');

    useEffect(() => {
        setGreeting(getGreeting());

        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 3000); // 3000ms = 3s

        return () => clearTimeout(timer);
    }, []);

    if (!isVisible) {
        return null; 
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-pink-100 p-6 rounded-lg shadow-lg text-center">
                <h2 className="text-xl font-bold mb-4">{greeting}, {nome}</h2>
                <p>Antes de tudo vamos configurar seu perfil.</p>
            </div>
        </div>
    );
};

export default Popup;