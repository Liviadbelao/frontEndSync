'use client';

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import api from '../../../src/config/configApi';
import { IoKeyOutline } from "react-icons/io5";
import { TbAirConditioning } from "react-icons/tb";
import { GiComputerFan } from "react-icons/gi";
import { AiOutlineWifi } from "react-icons/ai";
import { LuProjector } from "react-icons/lu";

const MonitoramentoAmbientes = () => {
    const [searchName, setSearchName] = useState('');
    const [dados, setDados] = useState([]);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const searchParams = useSearchParams();
    const nif = searchParams.get("nif");

    useEffect(() => {
        async function fetchUser() {
          try {
            const response = await api.get(`/usuarios/${nif}`);
            if (response.data) {
              setUser(response.data);
            } else {
              setUser(null);
            }
          } catch (error) {
            console.error("Erro ao buscar o usuário: ", error);
            setUser(null);
          } finally {
            setLoading(false);
          }
        }
    
        if (nif) {
          fetchUser();
        } else {
          setLoading(false);
        }
      }, [nif]);
    
      //Caso nif nn seja de um usuário ADM
      useEffect(() => {
        if (!loading) {
          if (!user || !user.adm) {
            alert(
              "Nenhum usuário com esse NIF encontrado, redirecionando para login."
            );
            router.push("/administracao/login");
          }
        }
      }, [loading, user, router]);

    useEffect(() => {
        async function fetchInfosAmbientes() {
            try {
                const response = await api.get(`/historico/infos/filtered`);
                setDados(response.data);
                console.log(response)
            } catch (error) {
                console.error("Erro ao buscar os dados: ", error);
            }
        }
        fetchInfosAmbientes();
    }, []);

    const handleDevolver = async (id) => {
        try {
            const data = { data_fim: new Date().toISOString().slice(0, 10) };
            await api.post(`/historico/devolver/${id}`, data);
        } catch (error) {
            console.error("Erro ao devolver o ambiente: ", error);
        }
    };
    

    return (
        <div className="bg-white min-h-screen flex flex-col p-10">
            <img
                src="/images/imgMenuAdm/btvoltar.png"
                alt="botao voltar"
                className="w-10 h-10 mb-5 cursor-pointer"
                onClick={() => router.push(`/administracao/telaMenuAdm?nif=${nif}`)}
            />
            <h1 className="text-center text-3xl font-bold text-black mb-10">Monitoramento de Ambientes</h1>

            {/* Campo de busca */}
            <input
                type="text"
                placeholder="Buscar ambiente"
                className="bg-gray-100 p-2 rounded-lg mb-5"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
            />

            <div className="grid md:grid-cols-4 gap-8">
                {/* Ambientes em aberto */}
                {dados.filter(item => !item.data_fim && item.nome_ambiente.toLowerCase().includes(searchName.toLowerCase())).map((item) => (
                    <div key={item.id} className="bg-gray-100 w-64 shadow-md rounded-lg p-5 flex flex-col">
                        <img
                            src={`http://localhost:3033${item.imagem_ambiente}`}
                            alt={item.nome_ambiente}
                            className="h-40 w-22 rounded-lg object-cover mb-4"
                        />
                        <div className="flex-col items-center">
                            <p className="text-lg font-semibold text-black mb-2">{item.nome_ambiente}</p>
                            <div className="bg-red-700 w-15 h-1 mb-2"></div>
                            <p className="text-sm font-semibold text-black mt-2">Usuário: {item.nome_usuario}</p>
                            <p className="text-sm font-semibold text-black mt-2">
                                Data Início: {new Date(item.data_inicio).toLocaleDateString()}
                            </p>
                            <p className="text-sm font-semibold text-black">Data Fim: Em aberto</p>
                        </div>
                        <button 
                            onClick={() => handleDevolver(item.id)} 
                            className="mt-3 text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded"
                        >
                            Devolver
                        </button>
                        <div className="flex gap-3 text-white p-2 rounded-full bg-red-700 absolute bottom-4 right-4">
                            {item.chave && <IoKeyOutline />}
                            {item.ar_condicionado && <TbAirConditioning />}
                            {item.ventilador && <GiComputerFan />}
                            {item.wifi && <AiOutlineWifi />}
                            {item.projetor && <LuProjector />}
                        </div>
                    </div>
                ))}

                {/* Ambientes já devolvidos */}
                {dados.filter(item => item.data_fim && item.nome_ambiente.toLowerCase().includes(searchName.toLowerCase())).map((item) => (
                    <div key={item.id} className="bg-gray-100 w-64 shadow-md rounded-lg p-5 flex flex-col">
                        <img
                            src={`http://localhost:3033${item.imagem_ambiente}`}
                            alt={item.nome_ambiente}
                            className="h-40 w-22 rounded-lg object-cover mb-4"
                        />
                        <div className="flex-col items-center">
                            <p className="text-lg font-semibold text-black mb-2">{item.nome_ambiente}</p>
                            <div className="bg-red-700 w-15 h-1 mb-2"></div>
                            <p className="text-sm font-semibold text-black mt-2">Usuário: {item.nome_usuario}</p>
                            <p className="text-sm font-semibold text-black mt-2">
                                Data Início: {new Date(item.data_inicio).toLocaleDateString()}
                            </p>
                            <p className="text-sm font-semibold text-black">
                                Data Fim: {new Date(item.data_fim).toLocaleDateString()}
                            </p>
                        </div>
                        <div className="flex gap-3 text-white p-2 rounded-full bg-red-700 absolute bottom-4 right-4">
                            {item.chave && <IoKeyOutline />}
                            {item.ar_condicionado && <TbAirConditioning />}
                            {item.ventilador && <GiComputerFan />}
                            {item.wifi && <AiOutlineWifi />}
                            {item.projetor && <LuProjector />}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MonitoramentoAmbientes;
