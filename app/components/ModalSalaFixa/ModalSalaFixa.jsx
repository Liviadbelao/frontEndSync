import React, { useState } from "react";
import api from "../../../src/config/configApi"; // Certifique-se de ajustar o caminho corretamente

const ModalSalaFixa = ({ nome, onClose, ambiente_id, usuario_id }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fixarSala = async () => {
        setLoading(true);
        setError(null);
        
        try {
            await api.post("/salas_fixas", { ambiente_id, usuario_id });
            onClose(); // Fechar o modal após a sala ser fixada
        } catch (err) {
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
