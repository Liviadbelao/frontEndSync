import React from 'react';

const CardUsuario = ({ nome, imagem, adm, nif, celular, email, plataforma, fechar }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg  w-80 max-w-md relative">
        
        {/* Botão de Fechar */}
        <button 
          onClick={fechar} 
          className="absolute top-2 right-2 text-[#fff] text-gray-500 hover:text-red-500 focus:outline-none"
        >
          ✕
        </button>

        {/* Imagem do Usuário */}
        <div className="flex justify-center mb-4 bg-[#9A1915] rounded-lg p-4 gap-2">
          <img 
            src={imagem} 
            alt={`${nome}'s profile`} 
            className="w-32 h-32 rounded-full object-cover border-2 border-gray-300"
          />
          <h2 className="text-center text-xl font-semibold text-white-800 mt-10 text-[#fff] ">{nome}</h2>
        </div>

        {/* Informações do Usuário */}
       
        <div className="text-gray-600 space-y-2 p-6">
          <p><strong>Função:</strong> {adm ? "Administrador" : "Usuário"}</p>
          <p><strong>NIF:</strong> {nif}</p>
          <p><strong>Celular:</strong> {celular}</p>
          <p><strong>Email:</strong> {email}</p>
          {plataforma && <p><strong>Plataforma:</strong> {plataforma}</p>}
        </div>
      </div>
    </div>
  );
};

export default CardUsuario;
