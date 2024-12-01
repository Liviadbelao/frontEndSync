import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';

const ReservaSala = ({ onClose, onConfirm, img, name, typeAmb, startTime, setStartTime, endTime, setEndTime }) => {
  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = typeAmb === 'externo' ? now.getMinutes() + 2 : now.getMinutes();
    return { hours, minutes };
  };

  const formatTime = (hours, minutes) => {
    return `${hours}:${minutes < 10 ? `0${minutes}` : minutes}`;
  };

  const currentTime = getCurrentTime();
  const [error, setError] = useState('');
  const [showTimeSelection, setShowTimeSelection] = useState(false);
  const [timeError, setTimeError] = useState('');

  useEffect(() => {
    const initialStartTime = formatTime(currentTime.hours, currentTime.minutes);
    setStartTime(initialStartTime);
    const initialEndTime = formatTime(currentTime.hours + 1, currentTime.minutes);
    setEndTime(initialEndTime);
  }, []);

  const handleStartTimeChange = (e) => {
    setStartTime(e.target.value);
  };

  const handleEndTimeChange = (e) => {
    setEndTime(e.target.value);
  };

  const handleConfirmTime = () => {
    const now = new Date();
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);
    const startDateTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), startHour, startMinute);
    const endDateTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), endHour, endMinute);

    const minStartTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 7, 30); // 07:30
    const maxEndTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 22, 0);  // 22:00

    if (startDateTime < minStartTime || endDateTime > maxEndTime) {
      setTimeError('Reservas devem ser entre 07:30am e 22:00pm.');
    } else if (startDateTime >= endDateTime) {
      setTimeError('O horário de término deve ser posterior ao horário de início.');
    } else {
      setTimeError('');
      setShowTimeSelection(false);
    }
  };

  const handleClose = () => {
    const currentTime = getCurrentTime();
    setStartTime(formatTime(currentTime.hours, currentTime.minutes));
    setEndTime('');
    onClose();
  };

  const handleShowTimeSelection = () => {
    setShowTimeSelection(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-10 overflow-hidden">
      <Modal open={true} onClose={handleClose} BackdropProps={{ style: { pointerEvents: 'none' } }}>
        <div
          onClick={(e) => e.stopPropagation()}
          className="flex flex-col justify-center  items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#d9d9d9] rounded-[10px] shadow-lg w-[30%] h-[75%] p-16"
        >
          <img
            src="/images/modal/fechar.png"
            alt="botao fechar"
            className="absolute -top-5 -left-3 cursor-pointer w-10 h-10"
            onClick={handleClose}
          />

          <p className="text-black text-2xl font-semibold mb-8 ">Confirmar reserva?</p>
          <div className="flex items-center justify-center h-32 mb-6 ">
            <img
              src={img || "/images/default-placeholder.png"}
              width={480}
              height={480}
              className="w-48 h-48 object-cover rounded mt-7"
              alt={`Imagem de ${name}`}
            />
          </div>

          <p className='mt-10 text-black text-xl font-bold text-center'>{name}</p>
          <p className='text-black text-lg mt-4'>Início: {startTime} {typeAmb === 'externo' && `| Fim: ${endTime}`}</p>
          
          {typeAmb === 'externo' && (
            <button 
              className="rounded-full bg-[#b42424]  hover:bg-[#9A1915] transition duration-300 w-60 p-4 px-10 text-white mt-4" 
              onClick={handleShowTimeSelection} // Exibir opções de horário ao clicar
            >
              Definir horários
            </button>
          )}
          
          <button className="rounded-full bg-[#b42424] w-60 mt-5 p-4 px-10 text-white" onClick={onConfirm}>
            Sim
          </button>
        </div>
      </Modal>

      {typeAmb === 'externo' && (
        <Modal open={showTimeSelection} onClose={() => setShowTimeSelection(false)} BackdropProps={{ style: { pointerEvents: 'none' } }}>
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex flex-col justify-center items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl w-[60%] sm:w-[50%] md:w-[20%] lg:w-[20%] p-8 transition-all ease-in-out duration-300"
          >
            <p className="text-[#333] text-2xl font-semibold mb-6">Definir horários</p>

            {/* Início */}
            <div className="w-1/2 mb-4">
              <p className="text-[#555] text-center text-lg mb-2">Início</p>
              <input
                type="time"
                value={startTime}
                onChange={handleStartTimeChange}
                className="rounded-lg bg-[#f0f0f0] w-full p-3 text-[#333] border border-[#ccc] focus:ring-2 focus:ring-[#007bff] transition duration-300"
              />
            </div>

            {/* Fim */}
            <div className="w-1/2 mb-6">
              <p className="text-[#555] text-center text-lg mb-2">Fim</p>
              <input
                type="time"
                value={endTime}
                onChange={handleEndTimeChange}
                className="rounded-lg bg-[#f0f0f0] w-full p-3 text-[#333] border border-[#ccc] focus:ring-2 focus:ring-[#z] transition duration-300"
              />
            </div>

            {/* Erro de horário */}
            {timeError && <p className="text-red-500 text-sm mt-2">{timeError}</p>}

            <div className="flex justify-center w-full mt-4">
              <button
                className="rounded-full bg-[#b42424] w-60 py-3 text-white font-semibold hover:bg-[#9A1915] transition duration-300 disabled:bg-[#ccc]"
                onClick={handleConfirmTime}
                disabled={!startTime || !endTime}
              >
                Confirmar horários
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ReservaSala;
