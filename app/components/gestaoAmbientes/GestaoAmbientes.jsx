//componente dos cards de gestao de ambientes
const GestaoAmbientes = ({ nome, imgSrc, imgSrc2, onEdit, onDelete }) => {

    return (
        <div className="w-60 h-60  max-w-sm bg-gray-200 rounded-lg overflow-hidden">
            <div className="flex items-center justify-center bg-gray-300 h-32">
                {imgSrc2 && <img src={imgSrc2} alt={nome} className="w-full h-full" />}
            </div>
            <div className="p-4">
                <h2 className=" font-bold mb-2 text-center">{nome}</h2>
                <div className="w-8 h-0.5 bg-red-500 mb--12 ml-20 "></div>
                {imgSrc && <img src={imgSrc} alt={nome} className="w-full h-32 object-cover mb-4" />}
                <div className="flex justify-between">
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-md"
                        onClick={onEdit}
                    >
                        Editar
                    </button>
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded-md"
                        onClick={onDelete}
                    >
                        Excluir
                    </button>
                </div>
            </div>
        </div>
    );
}
export default GestaoAmbientes;