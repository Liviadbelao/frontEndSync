import * as React from 'react';
import Modal from '@mui/material/Modal';
import { useRouter } from "next/navigation";

export default function BasicModal({ nomeSala, imgSala, nif, open, handleClose }) {
  const router = useRouter();  // Hook do Next.js para navegar entre rotas

  return (
    <div>
      {/* Componente Modal do Material UI, aberto se open=true */}
      <Modal
        open={open}  // Controla se o modal está visível
        onClose={handleClose}  // Função para fechar o modal ao clicar fora
        aria-labelledby="modal-modal-title"  // Acessibilidade: título do modal
        aria-describedby="modal-modal-description"  // Acessibilidade: descrição do modal
        BackdropProps={{
          style: { backgroundColor: 'transparent' } // Define o fundo do modal como transparente
        }}
      >
        <div
          onClick={(e) => e.stopPropagation()}  // Evita fechar o modal ao clicar na div
          className="flex flex-col justify-center items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg w-full max-w-md p-8"
        >
          {/* Imagem de fechar modal */}
          <img
            onClick={handleClose}  // Fecha o modal ao clicar na imagem
            src="/images/modal/fechar.png"  // Ícone de fechar modal
            className="absolute top-4 right-4 w-8 h-8 cursor-pointer"
            alt="Fechar"
          />
          <div>
            <img src={imgSala} alt="Imagem do ambiente" className="h-[150px] w-[500px] rounded-lg" />
            <div className="p-4">
              <p className="font-semibold text-xl">{nomeSala}</p>
            </div>
            <button onClick={handleClose} className="bg-[#9A1915] text-white p-2 rounded-full">
              Fechar Modal
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
