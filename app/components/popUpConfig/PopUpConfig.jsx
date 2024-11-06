import React, { useState } from 'react';

const PopupConfig = ({ email, whatsapp, osDois }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-40 z-50">
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg text-center relative mb-20">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
          onClick={handleClose}
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4">Atenção!</h2>
        <p>
          Ao ativar as notificações você está concordando em ser notificado via
          Email sobre a devolução das chaves.
        </p>
        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={handleClose}
        >
          Concordo
        </button>
      </div>
    </div>
  );
};

export default PopupConfig;