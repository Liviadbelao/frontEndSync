import { React } from 'react';
import Modal from '@mui/material/Modal';

const ReservaSala = ({ onClose, onConfirm }) => {
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
          className="flex flex-col items-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-300 rounded-md shadow-lg p-8 w-[300px]"
        >
          <p className="text-black text-lg font-semibold mb-6">Deseja reservar esta sala?</p>
          
          <div className="flex space-x-4">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={onConfirm}
            >
              Reservar
            </button>
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded"
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

export default ReservaSala;
