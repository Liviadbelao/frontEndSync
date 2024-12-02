import React, { useState, useEffect } from "react";
import api from "../../../src/config/configApi";

const ModalReservarSalaFixa = ({ usuario_id, onClose }) => {
    const [loading, setLoading] = useState(true);
    const [salasFixas, setSalasFixas] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSalasFixas = async () => {
            try {
                const response = await api.get(`/salas_fixas/${usuario_id}`);
                setSalasFixas(response.data);
            } catch (err) {
                console.error("Erro ao buscar salas fixas:", err);
                setError("Erro ao carregar salas fixas.");
            } finally {
                setLoading(false);
            }
        };
        fetchSalasFixas();
    }, [usuario_id]);

    if (loading) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white p-4 rounded-lg shadow-lg w-1/3">
                    <h2 className="text-xl font-bold">Carregando...</h2>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                <button
                    className="absolute top-2 right-2 text-red-600 font-bold text-xl"
                    onClick={onClose}
                >
                    X
                </button>

                <h2 className="text-xl font-bold mb-4">
                    Deseja reservar alguma de suas salas fixas?
                </h2>

                {error && <div className="text-red-500">{error}</div>}

                {salasFixas.length > 0 ? (
                    <div className="space-y-2">
                        {salasFixas.map((sala) => (
                            <div
                                key={sala.id}
                                className="border p-3 rounded-lg cursor-pointer hover:bg-gray-200"
                                onClick={() => alert(`Sala ${sala.numero_ambiente} reservada!`)}
                            >
                                <h3 className="text-lg font-semibold">
                                    {sala.nome} (Nº {sala.numero_ambiente})
                                </h3>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-700">
                        Você não possui salas fixas. Deseja buscar outra sala?
                    </p>
                )}

                <div className="mt-4 flex space-x-4">
                    <button
                        className="px-4 py-2 bg-red-600 text-white rounded-lg"
                        onClick={onClose}
                    >
                        Fechar
                    </button>
                    {salasFixas.length === 0 && (
                        <button
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                            onClick={() => alert("Ir para busca de salas!")}
                        >
                            Buscar outra sala
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ModalReservarSalaFixa;