''
import * as React from 'react';
import Modal from '@mui/material/Modal';
import { useRouter } from "next/navigation";

export default function BasicModal({ nomeSala, imgSala, nif }) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false); // Controle do estado do modal
  const [devolver, setDevolver] = React.useState(false);

  // UseEffect para abrir o modal assim que o componente for montado
  React.useEffect(() => {
    setOpen(true); // Esse código irá abrir o modal ao carregar o componente
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fecharModal = () => {
    handleClose();
    router.push(`/totem/ambientes?nif=${nif}`);
  };

  const cliqueDevolver = () => {
    setDevolver(true);
  };

  const reservarOutraSala = () => {
    handleClose();
    router.push(`/totem/ambientes?nif=${nif}`);
  };

  return (
    <div>
      <Modal
        open={open} // Certifique-se de que `open` está sendo passado corretamente
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
          <img
            onClick={fecharModal}
            src="/images/modal/fechar.png"
            alt="Fechar modal"
            className="absolute -top-6 -left-8 w-14 h-14 "
          />

          {devolver ? (
            <>
              <p className="text-black font-bold text-center text-4xl mb-8">
                Deseja reservar sala pré-definida?
              </p>
              <button
                className="mt-16 rounded-full bg-[#E30613] text-2xl p-4 px-10 text-white"
                onClick={reservarOutraSala}
              >
                Reservar outra sala
              </button>
            </>
          ) : (
            <>
              <p className="text-black font-bold text-center text-4xl mb-8">
                Você tem chaves pendentes!
              </p>
              <div className="flex items-center justify-between">
                <div className="overflow-x-auto whitespace-nowrap w-full no-scrollbar mx-2">
                  <div className="inline-block mr-6 text-center">
                    <img
                      src={imgSala}
                      alt="Imagem da sala"
                      className="object-cover rounded-2xl h-100 w-100" 
                    />
                    <p className="text-black mt-2 text-2xl">{nomeSala}</p>
                  </div>
                </div>
              </div>
              <button
                className="mt-16 rounded-full bg-[#E30613] text-2xl p-3 px-10 text-white"
                onClick={cliqueDevolver}
              >
                Devolver Chave
              </button>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
}
