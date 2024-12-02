import React, { useState, useEffect } from "react";
import api from "../../../src/config/configApi";

const ModalSalaFixa = ({ nome, onClose, usuario_id }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [ambientes, setAmbientes] = useState([]);
    const [selectedAmbiente, setSelectedAmbiente] = useState(null);

    useEffect(() => {
        const fetchAmbientes = async () => {
            try {
                const response = await api.get("/ambientes");
                setAmbientes(response.data);
            } catch (err) {
                console.error("Erro ao buscar ambientes:", err);
                setError("Erro ao carregar ambientes.");
            }
        };
        fetchAmbientes();
    }, []);
    const handleAddFixedClass = async (newClass) => {
        try {
          const response = await api.post(`/salas_fixas`, newClass); // Adiciona a nova sala ao backend
          const addedClass = response.data;
      
          // Atualize o estado de salas fixas com a nova sala
          setFixedClasses((prevClasses) => [...prevClasses, addedClass]);
      
          // Feche o modal
          setShowModal(false);
        } catch (error) {
          console.error('Erro ao adicionar sala fixa:', error);
        }
      };

    const fixarSala = async () => {
        if (!selectedAmbiente) {
            setError("Selecione um ambiente para fixar.");
            return;
        }
    
        setLoading(true);
        setError(null);
    
        try {
            const response = await api.post("/salas-fixas", {
                ambiente_id: selectedAmbiente,
                usuario_id
            });
            console.log("Resposta do servidor:", response.data);  // Usar a variável `response` corretamente aqui
            onClose();
        } catch (err) {
            console.error("Erro ao fixar a sala:", err.response?.data || err.message);
            setError("Erro ao fixar a sala. Tente novamente.");
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-4 rounded-lg shadow-lg w-1/3">
                <h2 className="text-xl font-bold">Fixar Sala</h2>
                <p>{nome}</p>

                {error && <div className="text-red-500">{error}</div>}

                <div className="mt-4">
                    <h3 className="font-semibold">Selecione uma sala:</h3>
                    <ul className="max-h-60 overflow-y-auto">
                        {ambientes.map((ambiente) => (
                            <li
                                key={ambiente.numero_ambiente}
                                className={`p-2 cursor-pointer rounded ${
                                    selectedAmbiente === ambiente.numero_ambiente
                                        ? "bg-blue-200"
                                        : "hover:bg-gray-200"
                                }`}
                                onClick={() => setSelectedAmbiente(ambiente.numero_ambiente)}
                            >
                                {ambiente.nome} (Nº {ambiente.numero_ambiente})
                            </li>
                        ))}
                    </ul>
                </div>

                <button
                    className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
                    onClick={fixarSala}
                    disabled={loading}
                >
                    {loading ? "Fixando..." : "Fixar Sala"}
                </button>

                <button
                    className="mt-4 px-4 py-2 bg-gray-500 text-white rounded"
                    onClick={onClose}
                >
                    Fechar
                </button>
            </div>
        </div>
    );
};

export default ModalSalaFixa;
