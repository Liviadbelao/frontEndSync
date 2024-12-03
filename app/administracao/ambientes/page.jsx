'use client'
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import api from "../../../src/config/configApi";
import { IoKeyOutline } from "react-icons/io5";
import { TbAirConditioning } from "react-icons/tb";
import { GiComputerFan } from "react-icons/gi";
import { AiOutlineWifi } from "react-icons/ai";
import { LuProjector } from "react-icons/lu";
import { GiStaplerPneumatic } from "react-icons/gi";
import { GiTheater } from "react-icons/gi";
import { FaSearch } from "react-icons/fa";


// import BasicModal from "@/app/components/modal/modal"; 

import Header from "@/app/components/header/Header";
import ReservaSala from "@/app/components/reservaSala/ReservarSala";

const ambientes = () => {
    const [dados, setDados] = useState([]);
    const [user, setUser] = useState(null);
    const [ambienteParaReserva, setAmbienteParaReserva] = useState(false);
    const [carregar, setCarregar] = useState(true);
    const [filtro, setFiltro] = useState('');
    const router = useRouter();
    const [tab, setTab] = useState('ativado')
    const searchParams = useSearchParams();
    const nif = searchParams.get('nif');
    const [ambientesReservados, setAmbientesReservados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

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
                setCarregar(false);
            }
        }

        if (nif) {
            fetchUser();
        } else {
            setCarregar(false);
        }
    }, [nif]);

    const reservarAmbiente = async (ambiente) => {
        setAmbienteParaReserva(ambiente); // Armazena o ID do ambiente para a reserva

    };


    const confirmarReservarAmbiente = async (ambiente) => {
        const date = new Date();

        if (startTime) {
            date.setHours(startTime.split(":")[0] - 3);
            date.setMinutes(startTime.split(":")[1]);
        }

        console.log(date);
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

            // Se o tipo do ambiente for "externo", faz a devolução automática
            if (ambiente.tipodoambiente === "externo") {
                const date = new Date();

                if (endTime) {
                    date.setHours(endTime.split(":")[0] - 3);
                    date.setMinutes(endTime.split(":")[1]);
                }

                const dataDevolucao = {
                    data_fim: date,  // Usa o endTime para a devolução
                };
                console.log(ambiente)
                await api.post(`/historico/devolver/${response.data.id}`, dataDevolucao);
                console.log("Devolução realizada com sucesso");
            }
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
    // Filtrar ambientes com base no texto do filtro
    const ambientesFiltrados = dados.filter(ambiente =>
        ambiente.nome.toLowerCase().includes(filtro.toLowerCase())
    );

    return (

        <div className=" bg-white min-h-screen ">
            <Header />


            <img
                src="/images/imgMenuAdm/btvoltar.png"
                alt="botao voltar"
                className="mr-10 cursor-pointer w-10 h-10 mt-8 ml-10"
                onClick={() => router.push(`/administracao/telaMenuAdm?nif=${nif}`)}
            />
            {/* {
            ambientesReservados && ambientesReservados.length > 0 ? (
                <>
                    {ambientesReservados.map((ambiente) => (
                        <BasicModal
                            key={ambiente.ambiente_nome}
                            nomeSala={ambiente.ambiente_nome}
                            imgSala={`${process.env.NEXT_PUBLIC_API_URL}${ambiente.ambiente_imagem}`} // Passe a imagem do ambiente
                            nif={nif} // Passe o nif do usuário
                        />
                    ))}
                </>
            ) : null
        } */}

            <p className="text-black text-center text-4xl font-bold">Reserve sua sala :</p>

            <div className="flex gap-2 shadow-lg w-[50%] h-[40%] mx-auto mt-5 border border-[#808080]-600 p-2 rounded-full">


                <FaSearch className="text-[#9A1915] m-auto ml-2" />


                <input
                    type="text"
                    placeholder="Filtrar por nome do ambiente"
                    value={filtro}
                    onChange={(e) => setFiltro(e.target.value)}
                    className="focus:outline-none w-full text-black"
                />
            </div>
            {/* tab ambientes disponivéis e reservados */}
            <div className="gap-2 ml-[42%] mb-10 mt-10">
                <button onClick={() => setTab('ativado')} className={`rounded-l-lg  px-4 py-2 ${tab === 'ativado' ? 'bg-[#9A1915] text-white' : 'bg-gray-200 text-black'}`}>
                    Disponivéis
                </button>
                <button onClick={() => setTab('reservado')} className={`rounded-r-lg px-4 py-2 ${tab === 'reservado' ? 'bg-[#9A1915] text-white' : 'bg-gray-200 text-black'}`}>
                    Reservados
                </button>
            </div>
            <div className="p-10 bg-white min-h-screen mb-14  ">

                <div className="grid grid-cols-4 gap-4 gap-y-20 ">
                    {tab === 'ativado' ? (
                        ambientesFiltrados && ambientesFiltrados.filter((ambiente) => ambiente.disponivel).length > 0 ? (
                            ambientesFiltrados
                                .filter((ambiente) => ambiente.disponivel)
                                .map((ambiente) => (
                                    <div className="bg-[#D9D9D9] w-[60%] h-50 rounded-lg z-10 fixed relative mb-10 ml-16" key={ambiente.numero_ambiente}>
                                        <img src={`${process.env.NEXT_PUBLIC_API_URL}${ambiente.caminho_imagem}`} className="h-[150px] w-[500px] rounded-lg" alt={ambiente.nome} />
                                        <div className="p-4">
                                            <p className="font-semibold text-xs mb-2 text-black">{ambiente.nome}</p>
                                            <div className="bg-[#9A1915] w-10 h-[2px] m-auto"></div>
                                            {ambiente.tipodoambiente === "blocooficina" ? <GiStaplerPneumatic className="w-8 h-8 m-auto text-black" /> : null}
                                            {ambiente.tipodoambiente === "externo" ? <GiTheater className="w-8 h-8 m-auto text-black" /> : null}
                                            {ambiente.capacidadealunos > 0 && (
                                                <p className="font-semibold text-xs mt-2 text-black">Capacidade: {ambiente.capacidadealunos}</p>
                                            )}

                                        </div>
                                        <div className="absolute top-[53%] left-[50%] transform -translate-x-1/2 -translate-y-1/2">
                                            <button className="bg-[#9A1915] text-white p-2 rounded-full z-20" onClick={() => reservarAmbiente(ambiente)}>
                                                Reservar
                                            </button>
                                        </div>

                                        {(ambiente.chave || ambiente.ar_condicionado || ambiente.ventilador || ambiente.wifi || ambiente.projetor) && (
                                            <div className="bg-[#9A1915] gap-2 flex text-white z-20 p-2 rounded-full absolute left-[50%] transform -translate-x-1/2 -translate-y-1/2">
                                                {ambiente.chave && <IoKeyOutline />}
                                                {ambiente.ar_condicionado && <TbAirConditioning />}
                                                {ambiente.ventilador && <GiComputerFan />}
                                                {ambiente.wifi && <AiOutlineWifi />}
                                                {ambiente.projetor && <LuProjector />}
                                            </div>
                                        )}
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
                                        <img src={`${process.env.NEXT_PUBLIC_API_URL}${ambiente.caminho_imagem}`} className="h-[150px] w-[500px] rounded-lg" alt={ambiente.nome} />
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
                    img={`${process.env.NEXT_PUBLIC_API_URL}${ambienteParaReserva.caminho_imagem}`}
                    name={ambienteParaReserva.nome}
                    typeAmb={ambienteParaReserva.tipodoambiente}
                    startTime={startTime}
                    endTime={endTime}
                    setStartTime={setStartTime}
                    setEndTime={setEndTime}
                />

            )}
        </div>
    );
};

export default ambientes;