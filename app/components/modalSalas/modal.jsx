import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import { IoClose } from 'react-icons/io5';
import api from '../../../src/config/configApi';

export default function ModalSalas({
  id,
  nomeSala,
  imgSala,
  ambienteId,
  usuarioid,
  open,
  handleClose,
  variavel,
  atualizarChavesPendentes
}) {
  const [isDevolucaoUmaChave, setIsDevolucaoUmaChave] = useState(false); // Novo estado

  const devolverTodasReservas = async () => {
    try {
      const date = new Date();

      const usuarioEditado = {
        data_fim: date,
        usuario: usuarioid
      };

      const response = await api.put(`/historico/todos`, usuarioEditado); // Endpoint ajustado
      console.log(response);

      if (response.status === 200) {
        console.log("Chaves devolvidas com sucesso");
        if (atualizarChavesPendentes && typeof atualizarChavesPendentes === 'function') {
          atualizarChavesPendentes();  // Atualiza o estado no componente pai
        }

        // Fecha o modal após a ação
        variavel([]);
        handleClose();
      } else {
        console.error("Erro ao devolver as chaves");
      }
    } catch (error) {
      console.error("Erro ao devolver as chaves:", error);
      alert("Erro ao tentar devolver as chaves. Tente novamente.");
    }
  };

  // Função para devolver 1 ambiente
  const devolverUmaChave = async () => {
    try {
      const date = new Date();

      const usuarioEditado = {
        id: id,
        data_fim: date,
        ambiente: ambienteId,
      }
      // Chama a API para devolver a chave de um ambiente específico
      const response = await api.put(`/historico`, usuarioEditado); // Chama o endpoint correto para devolver a chave

      // Verificar se a requisição foi bem-sucedida
      if (response.status == 200) {
        // Atualiza o estado para refletir que a chave foi devolvida
        if (atualizarChavesPendentes && typeof atualizarChavesPendentes === 'function') {
          atualizarChavesPendentes();  // Atualiza o estado no componente pai
        }

        // Fecha o modal após a ação
        handleClose();
      } else {
        console.error("Erro ao devolver a chave");
      }
    } catch (error) {
      console.error("Erro ao devolver a chave:", error);
      alert("Erro ao tentar devolver a chave. Tente novamente.");
    }
  };

  // Atualiza o estado para marcar a devolução de uma chave específica
  const handleDevolucaoUmaChave = () => {
    setIsDevolucaoUmaChave(true); // Marca a devolução de uma chave específica
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      BackdropProps={{
        style: {  
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.3)', } // Desfoque de fundo
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
        <img
            src="/images/modal/fechar.png"
            alt="botao fechar"
            className="absolute -top-5 -left-3 cursor-pointer w-10 h-10"
            onClick={handleClose}
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
          Deseja devolver este ambiente?
        </p>

        {/* Botões de ação */}
        <div className="flex justify-center gap-4">
          {/* Condicional para exibir o botão de devolver todas as reservas */}
          {!isDevolucaoUmaChave && (
            <button
              onClick={devolverTodasReservas}
              className="bg-[#9A1915] text-white py-2 px-6 rounded-full hover:bg-[#7a1510] transition-colors duration-300"
            >
              Devolver 
            </button>
          )}

          {/* Botão para devolver apenas este ambiente */}
         
        </div>
      </div>
    </Modal>
  );
}
