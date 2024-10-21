import { React, useState, useEffect} from 'react';
import Modal from '@mui/material/Modal';


const ConcluirExclusao = () => {
  //Criando estado de variáveis
  const [open, setOpen] = useState(false);
  const [devolver, setDevolver] = useState(false)
  //Abrir o modal automaticamente
useEffect(() => {
    setOpen(true);
  }, []);

    //Fechar modal
    const fecharModal = () => {
      handleClose();
      router.push('/totem/telaDescanso');
    }
    const cliqueDevolver = () => {
      setDevolver(true);
    }
  
  //Declarando variantes de abertura e fechamento de modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-10 overflow-hidden">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        BackdropProps={{
          style: { pointerEvents: 'none' }
        }}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="flex flex-col justify-center items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#d9d9d9] rounded-[3%] shadow-lg w-[70%] h-[60%] p-16"
        >
          <button className="mt-16 rounded-full bg-[#E30613] text-2xl p-4 px-10 text-white" onClick={cliqueDevolver}>Devolver Chave</button>
          <button className="mt-16 rounded-full bg-[#E30613] text-2xl p-4 px-10 text-white">Reservar outra sala</button>
        </div>
      </Modal>
    </div>
  );
};

export default ConcluirExclusao;
