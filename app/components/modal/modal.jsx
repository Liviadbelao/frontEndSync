//Importações
import * as React from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

//Criando página
export default function BasicModal() {

  //Declaranto variável de rotas
  const router = useRouter();

  //Criando estado de variáveis
  const [open, setOpen] = React.useState(false);

  //Abrir o modal automaticamente
  React.useEffect(() => {
    setOpen(true);
  }, []);

  //Declarando variantes de abertura e fechamento de modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //Fechar modal
  const fecharModal = () => {
    handleClose();
    router.push('/');
  }

  //Corpo da página
  return (

    /* Div principal */
    <div>

      {/* Modal */}
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
          {/* Botão de Fechar posicionado parcialmente fora do modal */}

          {/* Imagem de fechar */}
          <img
            onClick={fecharModal}
            src="/images/modal/fechar.png"
            alt="Descrição da Imagem"
            className="absolute -top-8 -left-8 w-16 "
          />

          {/* Texto 1 */}
          <p className='text-black font-bold text-center text-5xl mb-8'>
            Deseja reservar sala pré-definida?
          </p>

          {/* Div com scroll */}
          <div className="flex items-center justify-between">

            {/* Seta esquerda */}
            <IoIosArrowBack className="text-black text-4xl cursor-pointer" />

            {/* Div de imagens */}
            <div className="overflow-x-auto whitespace-nowrap w-full no-scrollbar mx-2  ">
              <div className="inline-block mr-6 text-center">
                <img
                  src="/images/telaSelection/inicioSelection.jpg"
                  alt="Descrição da Imagem"
                  className="object-cover rounded-2xl"
                />
                <p className="text-black mt-2 text-2xl">Sala 1</p>
              </div>

              <div className="inline-block mr-6 text-center">
                <img
                  src="/images/telaSelection/inicioSelection.jpg"
                  alt="Descrição da Imagem"
                  className="object-cover rounded-2xl"
                />
                <p className="text-black mt-2 text-2xl">Sala 2</p>
              </div>
            </div>

            {/* Seta direita */}
            <IoIosArrowForward className="text-black text-4xl cursor-pointer" />
          </div>


          {/* Texto 2 */}
          <p className='text-black text-center text-4xl mt-10'>
            Clique para reservar!
          </p>

          {/* Botão outras salas */}
          <Button className="mt-16 rounded-full bg-[#E30613] text-2xl p-4 px-10 text-white">Reservar outra sala</Button>
        </div>
      </Modal>
    </div>
  );
}
