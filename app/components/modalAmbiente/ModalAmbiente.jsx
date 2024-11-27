import React from "react";

const ModalAmbiente = ({ 
  nome, 
  numero_ambiente, 
  caminho_imagem, 
  chave, 
  capacidadeAlunos, 
  tipodoambiente, 
  ar_condicionado, 
  ventilador, 
  wifi, 
  projetor, 
  chave_eletronica, 
  maquinas, 
  disponivel, 
  categoria, 
  fechar 
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-80 max-w-md relative">
        
        {/* Botão de Fechar */}
        <button
          onClick={fechar}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500 focus:outline-none"
        >
          ✕
        </button>

        {/* Imagem do Ambiente */}
        <div className="flex justify-center mb-4 bg-gray-200 rounded-lg p-4">
          <img
            src={caminho_imagem}
  
            className="w-32 h-32 object-cover border-2 border-gray-300 rounded"
          />
        </div>

        {/* Informações do Ambiente */}
        <div className="text-gray-600 space-y-2 p-6">
          <h2 className="text-center text-xl font-semibold text-gray-800">
            {nome}
          </h2>
          <p><strong>Número do Ambiente:</strong> {numero_ambiente}</p>
          <p><strong>Tipo do Ambiente:</strong> {tipodoambiente}</p>
          <p><strong>Capacidade de Alunos:</strong> {capacidadeAlunos}</p>
          <p><strong>Disponível:</strong> {disponivel ? "Sim" : "Não"}</p>
          <p><strong>Categoria:</strong> {categoria}</p>

          {/* Recursos do Ambiente */}
          <div className="space-y-1 mt-4">
            <p><strong>Recursos:</strong></p>
            <ul className="list-disc pl-5">
              <li>Chave: {chave ? "Sim" : "Não"}</li>
              <li>Ar-Condicionado: {ar_condicionado ? "Sim" : "Não"}</li>
              <li>Ventilador: {ventilador ? "Sim" : "Não"}</li>
              <li>Wi-Fi: {wifi ? "Sim" : "Não"}</li>
              <li>Projetor: {projetor ? "Sim" : "Não"}</li>
              <li>Chave Eletrônica: {chave_eletronica ? "Sim" : "Não"}</li>
              <li>Máquinas: {maquinas || 0}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalAmbiente;