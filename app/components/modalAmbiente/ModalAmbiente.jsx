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
      <div className="bg-white rounded-lg shadow-lg w-80 max-w-md relative overflow-hidden">
        
        {/* Botão de Fechar */}
        <button
          onClick={fechar}
          className="absolute top-2 right-2 text-black-500 hover:text-red-500 focus:outline-none"
        >
          ✕
        </button>

        {/* Imagem do Ambiente */}
        <div >
          <img
            src={caminho_imagem}
            alt={`Imagem do ambiente ${nome}`}
            className="w-full h-40 object-cover"
          />
          {/* Borda inferior vinho */}
          <div className="h-[3px] bg-[#9A1915]"></div>
        </div>

        {/* Informações do Ambiente */}
        <div className="text-[#9A1915]-600 space-y-2 p-6">
          <h2 className="text-center text-xl font-semibold text-[#9A1915]">
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
