import React from 'react';
import Modal from '@mui/material/Modal';
import { IoClose } from 'react-icons/io5';
import api from '../../../src/config/configApi';

export default function BasicModal({
  nomeSala,
  imgSala,
  nif,
  open,
  handleClose,
  atualizarChavesPendentes
}) {
  
  // Função para devolver todas as chaves
  const devolverTodasAsChaves = async () => {
    try {
      // Chama a API para devolver todas as chaves do usuário
      const response = await api.delete(`/historico/${nif}`);  // Chama o endpoint correto para remover todas as chaves

      // Verificar se a requisição foi bem-sucedida
      if (response.status === 200) {
        // Atualiza o estado para refletir que não há mais chaves pendentes
        if (atualizarChavesPendentes && typeof atualizarChavesPendentes === 'function') {
          atualizarChavesPendentes();  // Atualiza o estado no componente pai
        }

        // Fecha o modal após a ação
        handleClose();
      } else {
        console.error("Erro ao devolver as chaves");
      }
    } catch (error) {
      console.error("Erro ao devolver todas as chaves:", error);
      alert("Erro ao tentar devolver as chaves. Tente novamente.");
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      BackdropProps={{
        style: { backgroundColor: 'transparent' } // Desfoque de fundo
      }}
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} // Centraliza o modal
    >
      <div
        onClick={(e) => e.stopPropagation()} // Impede o fechamento ao clicar dentro do modal
        className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative transition-transform transform"
        style={{
          animation: 'fadeIn 0.3s ease-in-out' // Transição suave para abrir
        }}
      >
        {/* Ícone de fechar */}
        <IoClose
          onClick={handleClose}
          className="absolute top-4 right-4 w-6 h-6 cursor-pointer text-gray-600 hover:text-red-600 transition-colors duration-200"
        />

        {/* Imagem do ambiente */}
        <img
          src={imgSala}
          alt={nomeSala}
          className="w-full h-40 object-cover rounded-md mb-4" // Imagem mais estilizada
        />

        {/* Título do ambiente */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          {nomeSala}
        </h2>

        {/* Descrição e detalhes do ambiente */}
        <p className="text-sm text-gray-600 mb-6 text-center">
          Ambiente reservado com sucesso! Aproveite sua reserva e tenha uma ótima experiência.
        </p>

        {/* Botões de ação */}
        <div className="flex justify-center gap-4">
          {/* Botão para devolver uma chave */}
          <button
            onClick={handleClose}
            className="bg-[#9A1915] text-white py-2 px-6 rounded-full hover:bg-[#7a1510] transition-colors duration-300"
          >
            Devolver chave
          </button>

          {/* Botão para devolver todas as chaves */}
          <button
            onClick={devolverTodasAsChaves}
            className="bg-[#9A1915] text-white py-2 px-6 rounded-full hover:bg-[#7a1510] transition-colors duration-300"
          >
            Devolver todas as chaves
          </button>
        </div>
      </div>
    </Modal>
  );
}
  