'use client';

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import api from '../../../src/config/configApi';
import { IoKeyOutline } from "react-icons/io5";
import { TbAirConditioning } from "react-icons/tb";
import { GiComputerFan } from "react-icons/gi";
import { FaSearch } from "react-icons/fa";
import { AiOutlineWifi } from "react-icons/ai";
import { LuProjector } from "react-icons/lu";
import Header from "@/app/components/header/Header";
import Footer from "@/app/components/footer/Footer";

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
            const date = new Date();

            date.setHours(date.getHours() - 3);

            const data = { data_fim: date.toISOString() };
            await api.post(`/historico/devolver/${id}`, data);
            const response = await api.get(`/historico/infos/filtered`);
            setDados(response.data);
        } catch (error) {
            console.error("Erro ao devolver o ambiente: ", error);
        }
    };

    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleString('pt-BR', options);
    };
    

    return (
        <div className="bg-white min-h-full flex flex-col">
            <Header />
            <img
                src="/images/imgMenuAdm/btvoltar.png"
                alt="botao voltar"
                className="w-10 h-10 mb-5 cursor-pointer m-10"
                onClick={() => router.push(`/administracao/telaMenuAdm?nif=${nif}`)}
            />
            <h1 className="text-center text-3xl font-bold text-black mb-10">Monitoramento de Ambientes</h1>

            <div className="flex gap-2 shadow-lg w-[50%] h-[40%] mx-auto mt-5 mb-8 border border-[#808080]-600 p-2 rounded-full">
            <FaSearch className="text-[#9A1915] m-auto ml-2" />
            {/* Campo de busca */}
            <input
                type="text"
                placeholder="Buscar ambiente"
                className="focus:outline-none w-full text-black"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
            />

</div>

            <div className="grid md:grid-cols-4 gap-8 ml-24">
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
                                Data Início: {formatDate(item.data_inicio)}
                            </p>
                            <p className="text-sm font-semibold text-black">Data Fim: Em aberto</p>
                        </div>
                        <button 
                            onClick={() => handleDevolver(item.id)} 
                            className="mt-3 text-white bg-[#b42424] hover:bg-red-700 px-3 py-1 rounded"
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
                                Data Início: {formatDate(item.data_inicio)}
                            </p>
                            <p className="text-sm font-semibold text-black">
                                Data Fim: {formatDate(item.data_fim)}
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
            <Footer />
        </div>
    );
};

export default MonitoramentoAmbientes;
