const GestaoUsuarios = ({ nome, cargo, imgGestor, editar, excluir }) => {
  return (
    <div className="w-60 h-72 max-w-sm bg-gray-200 rounded-lg overflow-hidden">
      <div className="flex items-center justify-center bg-[#D9D9D9] h-32">
        {imgGestor && (
          <img src={imgGestor} alt={nome} className="w-full  h-[170%]" />
        )}
      </div>
      <h2 className="font-bold mt-12 text-center text-black">{nome}</h2>
      <h2 className="text-center  text-black">{cargo}</h2>
      <div className="p-4">
       

        <div className="flex justify-between  ">
          <button
            className="bg-[#D23333] text-white px-4 py-2 rounded-md"
            onClick={editar}
          >
            Editar
          </button>
          <button
            className="bg-[#D23333] text-white px-4 py-2 rounded-md"
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
