import React from 'react';
import Modal from '@mui/material/Modal';
import Image from 'next/image';

const ReservaSala = ({ onClose, onConfirm, img, name }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-10 overflow-hidden">
      <Modal open={true} onClose={onClose}   BackdropProps={{
          style: { pointerEvents: 'none' }
        }}>
        <div
          onClick={(e) => e.stopPropagation()}
          className="flex flex-col justify-center items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#d9d9d9] rounded-[3%] shadow-lg w-[25%] h-[65%] p-16"
        >
          <p className="text-black text-2xl font-semibold mb-14 ">Confirmar reserva?</p>
          <div className="flex items-center justify-center h-32 mb-6 ">
            <Image
              src={img || "/images/default-placeholder.png"} // imagem padrão
              width={480}
              height={480}
              className="w-48 h-48 object-cover rounded mt-7"
              alt={`Imagem de ${name}`}
            />
          </div>

          <p className='mt-16 text-black text-xl font-bold text-center'>{name}</p>
          <div className="flex flex-row space-x-4 mt-5 ">
            <button className="rounded-full bg-[#b42424]  p-4 px-10 text-white" onClick={onConfirm}>
              Sim
            </button>
            <button className=" rounded-full bg-[#b42424]     p-4 px-10 text-white" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ReservaSala;
