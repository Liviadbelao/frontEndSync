// Componente dos cards de gestão de ambientes
const GestaoAmbientes = ({ nome, imgSrc2, onEdit, onDelete, on, children }) => {
    return (
        <div className="w-60 h-65 max-w-sm bg-gray-200 rounded-lg overflow-hidden hover:bg-[#A9A9A9] cursor-pointer" onClick={on}>
            <div className="flex items-center justify-center bg-gray-300 h-32">
                {imgSrc2 && <img src={imgSrc2} alt={nome} className="w-full h-full" />}
            </div>
            <div className="p-4 flex flex-col items-center">
                <h2 className="font-bold text-center text-black">{nome}</h2>
                <div className="w-8 h-0.5 bg-red-500 mb-2"></div>

                {/* Se existir um ícone, coloca-o acima dos botões */}
                <div className="flex justify-center mb-4">
                    {children} {/* O ícone será renderizado aqui */}
                </div>

                <div className="flex justify-between w-full mb-4">
                    <button
                        className="bg-red-600 text-white px-2 rounded-md"
                        onClick={onEdit}
                    >
                        Editar
                    </button>
                    <button
                        className="bg-red-600 text-white px-2 rounded-md"
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
