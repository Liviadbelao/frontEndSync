import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Image from 'next/image';

const ReservaSala = ({ onClose, onConfirm, img, name, typeAmb, startTime, setStartTime, endTime, setEndTime }) => {
  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours();
    if (typeAmb == 'externo') {
      const minutes = now.getMinutes() + 2;
      return { hours, minutes };
    } else {
      const minutes = now.getMinutes();
      return { hours, minutes };
    }
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
    const [startHour, startMinute] = startTime.split(':');
    const [endHour, endMinute] = endTime.split(':');
    const startDateTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), startHour, startMinute);
    const endDateTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), endHour, endMinute);

    if (startDateTime < now || endDateTime < now) {
      setTimeError('Os horários devem ser posteriores ao horário atual.');
    } else if (startDateTime >= endDateTime) {
      setTimeError('O horário de término deve ser posterior ao horário de início.');
    } else {
      setTimeError('');
      setShowTimeSelection(false);
      // Aqui você pode definir os horários de início e término conforme necessário
    }
  };

  const handleClose = () => {
    const currentTime = getCurrentTime();
    setStartTime(formatTime(currentTime.hours, currentTime.minutes));
    setEndTime('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-10 overflow-hidden">
      <Modal open={true} onClose={handleClose} BackdropProps={{
        style: { pointerEvents: 'none' }
      }}>
        <div
          onClick={(e) => e.stopPropagation()}
          className="flex flex-col justify-center items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#d9d9d9] rounded-[10px] shadow-lg w-[50%] h-[55%] p-16"
        >

          <img
            src="/images/modal/fechar.png"
            alt="botao fechar"
            className="absolute -top-5 -left-3 cursor-pointer w-10 h-10"
            onClick={handleClose}
          />

          <p className="text-black text-2xl font-semibold mb-11 ">Confirmar reserva?</p>
          <div className="flex items-center justify-center h-32 mb-6 ">
            <img
              src={img || "/images/default-placeholder.png"} // imagem padrão
              width={480}
              height={480}
              className="w-48 h-48 object-cover rounded mt-7"
              alt={`Imagem de ${name}`}
            />
          </div>

          <p className='mt-16 text-black text-xl font-bold text-center'>{name}</p>
          <p className='text-black text-lg mt-4'>Início: {startTime} {typeAmb === 'externo' && `| Fim: ${endTime}`}</p>
          <button className="rounded-full bg-[#b42424] w-80 mt-10 p-4 px-10 text-white" onClick={onConfirm}>
            Sim
          </button>
          {typeAmb === 'externo' && (
            <button className="rounded-full bg-[#007bff] w-80 p-4 px-10 text-white mt-4" onClick={() => setShowTimeSelection(true)}>
              Definir horários
            </button>
          )}
        </div>
      </Modal>

      {typeAmb === 'externo' && (
        <Modal open={showTimeSelection} onClose={() => setShowTimeSelection(false)} BackdropProps={{
          style: { pointerEvents: 'none' }
        }}>
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex flex-col justify-center items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#d9d9d9] rounded-[10px] shadow-lg w-[35%] w-[45%] h-[50%] p-16"
          >
            <p className="text-black text-2xl font-semibold mb-4">Definir horários</p>
            <input
              type="time"
              value={startTime}
              onChange={handleStartTimeChange}
              className="rounded-full bg-white w-80 p-4 px-10 text-black m-4"
            />
            <input
              type="time"
              value={endTime}
              onChange={handleEndTimeChange}
              className="rounded-full bg-white w-80 p-4 px-10 text-black m-4"
            />
            {timeError && <p className="text-red-500 mt-2">{timeError}</p>}
            <button
              className="rounded-full bg-[#28a745] w-80 p-4 px-10 text-white mt-4"
              onClick={handleConfirmTime}
              disabled={!startTime || !endTime}
            >
              Confirmar horários
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ReservaSala;
