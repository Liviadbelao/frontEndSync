//Importações
import * as React from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { GiHouseKeys } from "react-icons/gi";

//Criando página
export default function BasicModal() {

  //Declaranto variável de rotas
  const router = useRouter();

  //Criando estado de variáveis
  const [open, setOpen] = React.useState(false);
  const [devolver, setDevolver] = React.useState(false)

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
    router.push('/totem/telaDescanso');
  }
  const cliqueDevolver = () => {
    setDevolver(true);
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

{
  devolver ? (
    <p className='text-black font-bold text-center text-5xl mb-8'>
            Deseja reservar sala pré-definida?
          </p>
  ) : (
    <p className='text-black font-bold text-center text-5xl mb-8'>
            Você tem chaves pendentes!
          </p>
  )
}

          {/* Caso 1: não tem chaves pendentes e tem ambientes pré-definidos */}
          {/* Div com scroll */}
          {/* Apenas aparecer setas caso tenha mais de um item */}
          <div className="flex items-center justify-between">

            {/* Seta esquerda */}
            {/* <IoIosArrowBack className="text-black text-4xl cursor-pointer" /> */}

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
            {/* <IoIosArrowForward className="text-black text-4xl cursor-pointer" /> */}
          </div>

{/* Caso 2: Tem chaves pendentes */}


          {/* Texto 2 */}
          {/* <p className='text-black text-center text-4xl mt-10'>
            Clique para reservar!
          </p> */}

          {/* Botão outras salas */}
          <button className="mt-16 rounded-full bg-[#E30613] text-2xl p-4 px-10 text-white" onClick={cliqueDevolver}>Devolver Chave</button>
          <button className="mt-16 rounded-full bg-[#E30613] text-2xl p-4 px-10 text-white">Reservar outra sala</button>
        </div>
      </Modal>
    </div>
  );
}
