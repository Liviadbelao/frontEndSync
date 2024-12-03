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
import { TbEngine } from "react-icons/tb";
import { GiTeePipe } from "react-icons/gi";
import { GiMicrophone } from "react-icons/gi";

import { TbForklift } from "react-icons/tb";
import { GiBookshelf } from "react-icons/gi";
import { VscTools } from "react-icons/vsc";
import { HiMiniArrowPathRoundedSquare } from "react-icons/hi2";

import { RiComputerLine } from "react-icons/ri";
import { FaRegLightbulb } from "react-icons/fa6";

import { GiTheater } from "react-icons/gi";

import { FaBox } from "react-icons/fa";

import { GiSolderingIron } from "react-icons/gi";

import { MdOutlineSportsVolleyball } from "react-icons/md";
import { SiGoogleclassroom } from "react-icons/si";
import { MdOutlineDesignServices } from "react-icons/md";
import { GrTechnology } from "react-icons/gr";

import ReservaSala from "@/app/components/reservaSala/ReservarSala";
import TelaCarregar from "@/app/components/telaCarregar/TelaCarregar";
import TimerInatividade from "@/app/components/TimerInatividade/TimerInatividade";
import Image from 'next/image';
import Footer from "@/app/components/footer/Footer";
import ModalReservarSalaFixa from "@/app/components/modalReservarSalaFixa/ModalReservaSalaFixa";

const ambientes = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [dados, setDados] = useState([]);
    const [user, setUser] = useState('');
    const [loading, setLoading] = useState(true);
    const [carregando, setCarregando] = useState(false)
    const [filtro, setFiltro] = useState('');
    const [ambienteParaReserva, setAmbienteParaReserva] = useState(false);
    const [showModal, setShowModal] = useState(true);
    const router = useRouter();
    const [tab, setTab] = useState('ativado');
    const searchParams = useSearchParams();
    const nif = searchParams.get('nif');
    const [ambientesReservados, setAmbientesReservados] = useState([]);
    const [modaisAbertos, setModaisAbertos] = useState([]);  // Controle do estado dos modais
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [open, setOpen] = useState(false);
    const [salasFixas, setSalasFixas] = useState([]);
    const renderIcons = (categoria) => {
        switch (categoria) {
            case 23:
                return <MdOutlineSportsVolleyball className="w-8 h-8 m-auto text-black" />;
            case 2:
                return <SiGoogleclassroom className="w-8 h-8 m-auto text-black" />;
            case 3:
                return <MdOutlineDesignServices className="w-8 h-8 m-auto text-black" />;
            case 7:
                return <GrTechnology className="w-8 h-8 m-auto text-black" />;
            case 18:
                return <GiSolderingIron className="w-8 h-8 m-auto text-black" />;
            case 19:
                return <TbEngine className="w-8 h-8 m-auto text-black" />;
            case 20:
                return <TbForklift className="w-8 h-8 m-auto text-black" />;
            case 25:
                return <GiBookshelf className="w-8 h-8 m-auto text-black" />;
            case 1:
                return <RiComputerLine className="w-8 h-8 m-auto text-black" />;
            case 8:
                return <FaRegLightbulb className="w-8 h-8 m-auto text-black" />;
            case 9:
                return <VscTools className="w-8 h-8 m-auto text-black" />;
            case 10:
                return <FaRegLightbulb className="w-8 h-8 m-auto text-black" />;
            case 14:
                return <HiMiniArrowPathRoundedSquare className="w-8 h-8 m-auto text-black" />;
            case 15:
                return <GiTeePipe className="w-8 h-8 m-auto text-black" />;
            case 16:
                return <FaRegLightbulb className="w-8 h-8 m-auto text-black" />;
            case 17:
                return <VscTools className="w-8 h-8 m-auto text-black" />;
            case 24:
                return <GiMicrophone className="w-8 h-8 m-auto text-black" />;
            case 4:
                return <FaBox className="w-8 h-8 m-auto text-black" />;
            default:
                return null;
        }
    };

    const getGreeting = () => {
        const currentHour = new Date().getHours();
        if (currentHour < 12) {
            return 'Bom dia';
        } else if (currentHour < 18) {
            return 'Boa tarde';
        } else {
            return 'Boa noite';
        }
    };


    const handleOpen = (ambienteId) => {
        setModaisAbertos((prev) => [...prev, ambienteId]);  // Adiciona o ambienteId ao array
    };


    const handleClose = () => {
        setOpenModal(false);
    };
    const handleOpenModal = () => {
        setShowModal(true);
        console.log('showModal', showModal);

    };

    const handleCloseModal = () => {
        setShowModal(false);
    };
    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await api.get(`/usuarios/${nif}`);
                if (response.data.length > 0) {
                    setUser(response.data[0]);
                    console.log('user', user);
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

    const handleButtonClick = (ambienteId) => {
        setModaisAbertos((prev) => [...prev, ambienteId]);
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
                router.push(`/totem/contagemRegressivaTela?nif=${nif}`);
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

    const fetchSalasFixas = async () => {
        try {
            const response = await api.get(`/salas_fixas/${nif}`);
            setSalasFixas(response.data); // Armazena as salas fixas no estado
        } catch (error) {
            console.error("Erro ao buscar salas fixas:", error);
        }
    };

    useEffect(() => {
        fetchSalasFixas(); // Chama a função para buscar as salas fixas assim que o componente for montado
    }, [nif]);



    const handleCloseAndUpdateAmbientes = (ambienteId) => {
        setModaisAbertos((prev) => prev.filter((id) => id !== ambienteId));
        // Aqui você pode também atualizar os ambientes reservados se necessário
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
                                    imgSala={`${process.env.NEXT_PUBLIC_API_URL}${ambiente.ambiente_imagem}`} // Passe a imagem do ambiente
                                    nif={nif} // Passe o nif do usuário
                                    open={modaisAbertos.includes(ambiente.ambiente)}  // Verifica se o modal está aberto para este ambiente
                                    handleClose={() => handleCloseAndUpdateAmbientes(ambiente.ambiente)}  // Chama a função para fechar o modal e atualizar ambientes
                                />

                            ) : null // Se a data_fim não estiver definida, o modal não será renderizado

                        ))}
                    </>
                ) : null
            }
            {/*    <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                onClick={() => handleOpenModal()}
            >
                Reservar Sala Fixa
            </button> */}
            {showModal && salasFixas.length > 0 && (
                <ModalReservarSalaFixa
                    usuario_id={nif}
                    salasFixas={salasFixas}
                    onClose={handleCloseModal}
                />
            )}

            <div className="p-10 bg-white min-h-screen">
                {/*  <TimerInatividade /> */}

                <p className="text-black text-center font-bold text-2xl">{getGreeting()}, Reserve sua sala:</p>


                <div className="flex gap-2 shadow-lg w-[50%] h-[40%] mx-auto mt-5 mb-8 border border-[#808080]-600 p-2 text-black rounded-full">

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
                <div className="w-full justify-center itens certer flex mb-10">
                    <button
                        onClick={() => setTab('ativado')}
                        className={`rounded-l-lg px-4 py-2 ${tab === 'ativado' ? 'bg-[#9A1915] text-white' : 'bg-gray-200 text-black'}`}
                    >
                        Disponíveis
                    </button>
                    <button
                        onClick={() => setTab('reservado')}
                        className={`px-4 py-2 ${tab === 'reservado' ? 'bg-[#9A1915] text-white' : 'bg-gray-200 text-black'}`}
                    >
                        Reservados
                    </button>
                    <button
                        onClick={() => setTab('minhasSalas')}
                        className={`rounded-r-lg px-4 py-2 ${tab === 'minhasSalas' ? 'bg-[#9A1915] text-white' : 'bg-gray-200 text-black'}`}
                    >
                        Minhas Salas
                    </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {tab === 'ativado' ? (
                        ambientesFiltrados && ambientesFiltrados.filter((ambiente) => ambiente.disponivel).length > 0 ? (
                            ambientesFiltrados
                                .filter((ambiente) => ambiente.disponivel)
                                .map((ambiente) => (
                                    <div
                                        className="bg-[#D9D9D9] w-[60%] h-50 rounded-lg z-10 fixed relative mb-10 ml-16"
                                        key={ambiente.numero_ambiente}
                                    >
                                        {/* Renderização de ambientes disponíveis */}
                                        <img src={`http://localhost:3033${ambiente.caminho_imagem}`} className="h-[150px] w-[500px] rounded-lg" alt={ambiente.nome} />
                                        <div className="p-4">
                                            <p className="font-semibold text-xs mb-2 text-black">{ambiente.nome}</p>
                                            <div className="bg-[#9A1915] w-10 h-[2px] m-auto"></div>
                                            {ambiente.categoria && renderIcons(ambiente.categoria) && (
                                                <div className="w-8 h-8 m-auto text-black mt-2">
                                                    {renderIcons(ambiente.categoria)}
                                                </div>
                                            )}
                                            {ambiente.capacidadealunos >= 0 && (
                                                <p
                                                    className={`font-semibold text-xs mt-2 ${ambiente.capacidadealunos === 0 ? 'text-[#D9D9D9]' : 'text-black'}`}
                                                >
                                                    Capacidade: {ambiente.capacidadealunos}
                                                </p>
                                            )}
                                        </div>
                                        <div className="absolute top-[53%] left-[50%] transform -translate-x-1/2 -translate-y-1/2">
                                            <button
                                                className="bg-[#9A1915] text-white p-2 rounded-full z-20"
                                                onClick={() => reservarAmbiente(ambiente)}
                                            >
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
                    ) : tab === 'reservado' ? (
                        ambientesFiltrados && ambientesFiltrados.filter((ambiente) => !ambiente.disponivel).length > 0 ? (
                            ambientesFiltrados
                                .filter((ambiente) => !ambiente.disponivel)
                                .map((ambiente) => (
                                    <div
                                        className="bg-[#D9D9D9] ml-16 w-[60%] h-50 rounded-lg z-10 fixed relative mb-10"
                                        key={ambiente.numero_ambiente}
                                    >
                                        {/* Renderização de ambientes reservados */}
                                        <img src={`http://localhost:3033${ambiente.caminho_imagem}`} className="h-[150px] w-[500px] rounded-lg" alt={ambiente.nome} />
                                        <div className="p-4">
                                            <p className="font-semibold text-xs mb-2 text-black">{ambiente.nome}</p>
                                            <div className="bg-[#9A1915] w-10 h-[2px] m-auto"></div>
                                            {ambiente.categoria && renderIcons(ambiente.categoria) && (
                                                <div className="w-8 h-8 m-auto text-black mt-2">
                                                    {renderIcons(ambiente.categoria)}
                                                </div>
                                            )}
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
                    ) : tab === 'minhasSalas' ? (
                        ambientesFiltrados && ambientesFiltrados.filter((ambiente) => {



                            return ambientesReservados.some((reserva) =>
                                reserva.ambiente === ambiente.numero_ambiente && !reserva.data_fim
                            );
                        }).length > 0 ? (
                            ambientesFiltrados
                                .filter((ambiente) =>
                                    ambientesReservados.some((reserva) =>
                                        reserva.ambiente === ambiente.numero_ambiente && !reserva.data_fim
                                    )
                                )
                                .map((ambiente) => (
                                    <div
                                        className="bg-[#D9D9D9] ml-16 w-[60%] h-50 rounded-lg z-10 fixed relative mb-10"
                                        key={ambiente.numero_ambiente}
                                    >
                                        <img
                                            src={`http://localhost:3033${ambiente.caminho_imagem}`}
                                            className="h-[150px] w-[500px] rounded-lg"
                                            alt={ambiente.nome}
                                        />

                                        <button
                                            className="bg-red-700 mb-2 text-white font-semibold py-2 px-4 rounded-md shadow-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-200 absolute left-1/2 transform -translate-x-1/2 -translate-y-8" // Alterei -translate-y-16 para -translate-y-8
                                            onClick={() => handleButtonClick(ambiente.numero_ambiente)}
                                        >
                                            Devolver
                                        </button>


                                        <div className="p-4">
                                            <p className="font-semibold text-xs mb-2 text-black">{ambiente.nome}</p>
                                            <div className="bg-[#9A1915] w-10 h-[2px] m-auto"></div>
                                            {ambiente.categoria && renderIcons(ambiente.categoria) && (
                                                <div className="w-8 h-8 m-auto text-black mt-2">
                                                    {renderIcons(ambiente.categoria)}
                                                </div>
                                            )}

                                            <p className="font-semibold text-xs mt-2 text-black">Capacidade: {ambiente.capacidadealunos}</p>
                                        </div>

                                        <BasicModal
                                            id={ambiente.id}
                                            key={ambiente.ambiente_nome}
                                            nomeSala={ambiente.ambiente_nome}
                                            ambienteId={ambiente.ambiente}
                                            usuarioid={nif}
                                            variavel={setAmbientesReservados}
                                            imgSala={`${process.env.NEXT_PUBLIC_API_URL}${ambiente.ambiente_imagem}`} // Passe a imagem do ambiente
                                            nif={nif} // Passe o nif do usuário
                                            open={modaisAbertos.includes(ambiente.ambiente)}  // Verifica se o modal está aberto para este ambiente
                                            handleClose={() => handleCloseAndUpdateAmbientes(ambiente.ambiente)}  // Chama a função para fechar o modal e atualizar ambientes
                                        />

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
                            <p className="text-center text-gray-500">Você não reservou nenhum ambiente</p>
                        )
                    ) : null}

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
            {carregando && <TelaCarregar />}
            <Footer />
        </div>
    );
};

export default ambientes;