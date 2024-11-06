import { React, useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Image from 'next/image';

const ConcluirExclusao = ({ onClose, onConfirm, img, name }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-10 overflow-hidden">
      <Modal
        open={true}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        BackdropProps={{
          style: { pointerEvents: 'none' }
        }}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="flex flex-col justify-center items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#d9d9d9] rounded-[3%] shadow-lg w-[25%] h-[65%] p-16"
        >
          <p className="text-black text-2xl mb-16">Deseja excluir {name}?</p>

          <div classname={"flex items-center justify-center h-32"}>
            <Image src={img} width={480} height={480} className="w-48 h-48 object-cover mt-24"/>
          </div>

          <div className="flex flex-row space-x-4 mt-24">
            <button
              className="rounded-full bg-[#660b0b] text-2xl p-4 px-10 text-white"
              onClick={onConfirm}
            >
              Sim
            </button>
            <button
              className="rounded-full bg-[#660b0b] text-2xl p-4 px-10 text-white"
              onClick={onClose}
            >
              Cancelar
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default ConcluirExclusao;
