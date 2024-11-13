'use client'
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import api from "../../../src/config/configApi";
import BasicModal from "@/app/components/modal/modal";
import Header from "@/app/components/header/Header";
import { IoKeyOutline } from "react-icons/io5";
import { TbAirConditioning } from "react-icons/tb";
import { GiComputerFan } from "react-icons/gi";
import { AiOutlineWifi } from "react-icons/ai";
import { LuProjector } from "react-icons/lu";
import { GiStaplerPneumatic } from "react-icons/gi";
import { FaSearch } from "react-icons/fa";
import { GiTheater } from "react-icons/gi";
import ReservaSala from "@/app/components/reservaSala/ReservarSala";
import TelaCarregar from "@/app/components/telaCarregar/TelaCarregar";


const ambientes = () => {
    const [dados, setDados] = useState([]);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [carregando, setCarregando] = useState(false)
    const [filtro, setFiltro] = useState('');
    const [ambienteParaReserva, setAmbienteParaReserva] = useState(false);
    const router = useRouter();
    const [tab, setTab] = useState('ativado');
    const searchParams = useSearchParams();
    const nif = searchParams.get('nif');
    const [ambientesReservados, setAmbientesReservados] = useState([]);
    const [modaisAbertos, setModaisAbertos] = useState([]);  // Controle do estado dos modais

    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await api.get(`/usuarios/${nif}`);
                if (response.data.length > 0) {
                    setUser(response.data[0]);
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

    const reservarAmbiente = async (ambiente) => {
        setAmbienteParaReserva(ambiente)
    };

    const confirmarReservarAmbiente = async (ambiente) => {
        const date = new Date();

        setCarregando(true)


        // Formata o payload conforme esperado pelo servidor
        const data = {
            data_inicio: date.toISOString(),  // Inclui data e hora completos
            funcionario: nif,  // Verifica se `nif` é um valor válido
            ambiente: ambiente.numero_ambiente,  // Usa uma propriedade única para identificar o ambiente
        };

        console.log("Dados a serem enviados:", data); // Log para verificar o conteúdo de `data`

        try {
            const response = await api.post(`/historico`, data);  // Faz a requisição de reserva
            console.log("Reserva realizada com sucesso:", response);
            setAmbienteParaReserva(false);
            router.push(`/totem/contagemRegressivaTela`)
            setCarregando(false)
        } catch (error) {
            console.error("Erro ao reservar o ambiente:", error);  // Log de erro detalhado
        } finally {
            try {
                // Atualiza os dados dos ambientes após a tentativa de reserva
                const response = await api.get(`/ambientes`);
                setDados(response.data);
            } catch (error) {
                console.error("Erro ao buscar dados dos ambientes:", error);
            }
        }
    };

    useEffect(() => {
        const fetchHistoricoFromUser = async () => {
            try {
                const response = await api.get(`/historico/${nif}`);
                setAmbientesReservados(response.data);
                console.log(response.data);
                // Abrir automaticamente os modais para os ambientes reservados
                setModaisAbertos(response.data.map(item => item.ambiente)); // Armazena quais modais devem ser abertos

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        if (nif) {
            fetchHistoricoFromUser();
        }
    }, [nif]);

    useEffect(() => {
        const fetchAmbientes = async () => {
            try {
                const response = await api.get(`/ambientes`);
                setDados(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchAmbientes();
    }, []);


    const handleCloseAndUpdateAmbientes = async (ambienteId) => {
        try {
            // Fecha o modal
            setModaisAbertos(modaisAbertos.filter(id => id !== ambienteId));

            // Atualiza os ambientes
            const response = await api.get(`/ambientes`);
            setDados(response.data);
        } catch (error) {
            console.error("Erro ao atualizar ambientes:", error);
        }
    };

    // Filtrar ambientes com base no texto do filtro
    const ambientesFiltrados = dados.filter(ambiente =>
        ambiente.nome.toLowerCase().includes(filtro.toLowerCase())
    );

    return (
        <div className=" bg-white min-h-screen ">
            <Header />

            {
                ambientesReservados && ambientesReservados.length > 0 ? (
                    <>
                        {ambientesReservados.map((ambiente) => (
                            // Verifica se a data_fim está definida para o ambiente
                            !ambiente.data_fim ? (
                                <BasicModal
                                    id={ambiente.id}
                                    key={ambiente.ambiente_nome}
                                    nomeSala={ambiente.ambiente_nome}
                                    ambienteId={ambiente.ambiente}
                                    usuarioid={nif}
                                    variavel={setAmbientesReservados}
                                    imgSala={`http://localhost:3033${ambiente.ambiente_imagem}`} // Passe a imagem do ambiente
                                    nif={nif} // Passe o nif do usuário
                                    open={modaisAbertos.includes(ambiente.ambiente)}  // Verifica se o modal está aberto para este ambiente
                                    handleClose={() => handleCloseAndUpdateAmbientes(ambiente.ambiente)}  // Chama a função para fechar o modal e atualizar ambientes
                                />

                            ) : null // Se a data_fim não estiver definida, o modal não será renderizado

                        ))}
                    </>
                ) : null
            }


            <div className="p-10 bg-white min-h-screen">
                <p className="text-black text-center font-bold text-2xl">Reserve sua sala:</p>


                <div className="flex gap-2 shadow-lg w-[50%] h-[40%] mx-auto mt-5 mb-8 border border-[#808080]-600 p-2 rounded-full">

                    <FaSearch className="text-[#9A1915] m-auto ml-2" />

                    <input
                        type="text"
                        placeholder="Filtrar por nome do ambiente"
                        value={filtro}
                        onChange={(e) => setFiltro(e.target.value)}
                        className="focus:outline-none w-full text-black4"
                    />


                </div>

                {/* tab ambientes disponivéis e reservados */}
                <div className="gap-2 ml-60 mb-10">
                    <button onClick={() => setTab('ativado')} className={`rounded-l-lg  px-4 py-2 ${tab === 'ativado' ? 'bg-[#9A1915] text-white' : 'bg-gray-200 text-black'}`}>
                        Disponivéis
                    </button>
                    <button onClick={() => setTab('reservado')} className={`rounded-r-lg px-4 py-2 ${tab === 'reservado' ? 'bg-[#9A1915] text-white' : 'bg-gray-200 text-black'}`}>
                        Reservados
                    </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {tab === 'ativado' ? (
                        ambientesFiltrados && ambientesFiltrados.filter((ambiente) => ambiente.disponivel).length > 0 ? (
                            ambientesFiltrados
                                .filter((ambiente) => ambiente.disponivel)
                                .map((ambiente) => (
                                    <div className="bg-[#D9D9D9] w-[60%] h-50 rounded-lg z-10 fixed relative mb-10 ml-16" key={ambiente.numero_ambiente}>
                                        <img src={`http://localhost:3033${ambiente.caminho_imagem}`} className="h-[150px] w-[500px] rounded-lg" alt={ambiente.nome} />
                                        <div className="p-4">
                                            <p className="font-semibold text-xs mb-2 text-black">{ambiente.nome}</p>
                                            <div className="bg-[#9A1915] w-10 h-[2px] m-auto"></div>
                                            {ambiente.tipodoambiente === "blocooficina" ? <GiStaplerPneumatic className="w-8 h-8 m-auto text-black" /> : null}
                                            {ambiente.tipodoambiente === "externo" ? <GiTheater className="w-8 h-8 m-auto text-black" /> : null}
                                            <p className="font-semibold text-xs mt-2 text-black">Capacidade: {ambiente.capacidadealunos}</p>
                                        </div>
                                        <div className="absolute top-[53%] left-[50%] transform -translate-x-1/2 -translate-y-1/2">
                                            <button className="bg-[#9A1915] text-white p-2 rounded-full z-20" onClick={() => reservarAmbiente(ambiente)}>
                                                Reservar
                                            </button>
                                        </div>
                                        <div className="bg-[#9A1915] gap-2 flex text-white z-20 p-2 rounded-full absolute left-[50%] transform -translate-x-1/2 -translate-y-1/2">
                                            {ambiente.chave && <IoKeyOutline />}
                                            {ambiente.ar_condicionado && <TbAirConditioning />}
                                            {ambiente.ventilador && <GiComputerFan />}
                                            {ambiente.wifi && <AiOutlineWifi />}
                                            {ambiente.projetor && <LuProjector />}
                                        </div>
                                    </div>
                                ))
                        ) : (
                            <p className="text-center text-gray-500">Nenhum ambiente disponível</p>
                        )
                    ) : (
                        ambientesFiltrados && ambientesFiltrados.filter((ambiente) => !ambiente.disponivel).length > 0 ? (
                            ambientesFiltrados
                                .filter((ambiente) => !ambiente.disponivel)
                                .map((ambiente) => (
                                    <div className="bg-[#D9D9D9] ml-16 w-[60%] h-50 rounded-lg z-10 fixed relative mb-10" key={ambiente.numero_ambiente}>
                                        <img src={`http://localhost:3033${ambiente.caminho_imagem}`} className="h-[150px] w-[500px] rounded-lg" alt={ambiente.nome} />
                                        <div className="p-4">
                                            <p className="font-semibold text-xs mb-2 text-black">{ambiente.nome}</p>
                                            <div className="bg-[#9A1915] w-10 h-[2px] m-auto"></div>
                                            {ambiente.tipodoambiente === "blocooficina" ? <GiStaplerPneumatic className="w-8 h-8 m-auto text-black" /> : null}
                                            {ambiente.tipodoambiente === "externo" ? <GiTheater className="w-8 h-8 m-auto text-black" /> : null}
                                            <p className="font-semibold text-xs mt-2 text-black">Capacidade: {ambiente.capacidadealunos}</p>
                                        </div>
                                        <div className="absolute top-[53%] left-[50%] transform -translate-x-1/2 -translate-y-1/2">
                                            <p className="bg-[#2e2e2e] text-white p-2 rounded-full z-20">Indisponível</p>
                                        </div>
                                        <div className="bg-[#2e2e2e] gap-2 flex text-white z-20 p-2 rounded-full absolute left-[50%] transform -translate-x-1/2 -translate-y-1/2">
                                            {ambiente.chave && <IoKeyOutline />}
                                            {ambiente.ar_condicionado && <TbAirConditioning />}
                                            {ambiente.ventilador && <GiComputerFan />}
                                            {ambiente.wifi && <AiOutlineWifi />}
                                            {ambiente.projetor && <LuProjector />}
                                        </div>
                                    </div>
                                ))
                        ) : (
                            <p className="text-center text-gray-500">Nenhum ambiente reservado</p>
                        )
                    )}
                </div>
            </div>

            {ambienteParaReserva && (
                <ReservaSala
                    onClose={() => setAmbienteParaReserva(false)}
                    onConfirm={() => confirmarReservarAmbiente(ambienteParaReserva)} // Passa o ID ao confirmar
                    img={`http://localhost:3033${ambienteParaReserva.caminho_imagem}`}
                    name={ambienteParaReserva.nome}
                />

            )}
            {carregando && <TelaCarregar />}
        </div>
    );
};

export default ambientes;
