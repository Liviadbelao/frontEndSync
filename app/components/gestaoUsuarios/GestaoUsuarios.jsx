import Image from "next/image";
import ConcluirExclusao from "../concluirExclusao/ConcluirExclusao";

const GestaoUsuarios = ({ nome, cargo, imgGestor, editar, excluir, nif, funcao }) => {
  return (
    <div className="w-60 h-80 max-w-sm bg-gray-200 rounded-lg mb-4 hover:bg-[#A9A9A9]" onClick={funcao}>
      <div className="flex items-center justify-center h-32  " >
        {imgGestor && (
          <Image src={imgGestor} alt={nome} width={480} height={480}  className="w-48 h-48 object-cover  mt-24 rounded"/>
        )}
      </div>
      <h2 className="font-bold mt-24 text-center text-black">{nome}</h2>
      <h2 className="text-center  text-black">{cargo}</h2>
      <div className="p-4">
       

        <div className="flex justify-between  ">
          <button
            className="bg-[#b42424]   text-white px-4 py-2 rounded-md"
            onClick={editar}
          >
            Editar
          </button>
          <button
            className="bg-[#b42424]  text-white px-4 py-2 rounded-md"
            onClick={excluir}
          >
            Excluir
          </button>
        </div>
      </div>
     
    </div>
  );
};

export default GestaoUsuarios;
