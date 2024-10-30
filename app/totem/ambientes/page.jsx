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

const ambientes = () => {
    const [dados, setDados] = useState([]);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const searchParams = useSearchParams();
    const nif = searchParams.get('nif');

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

    const reservarAmbiente = async (id) => {
        const date = new Date();

        const data = {
            data_inicio: date.toISOString().slice(0, 10),
            funcionario: user.nif,
            ambiente: id,
        };

        try {
            const response = await api.post(`/historico`, data);
            console.log(response);
        } catch (error) {
            console.error("Erro ao reservar o ambiente:", error);
        } finally {
            try {
                const response = await api.get(`/ambientes`);
                setDados(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

    }

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
    return (
        <div className="p-10 bg-white min-h-screen ">
            <p>Reserve sua sala:</p>

            <div className="grid grid-cols-2 gap-4">
                {dados && dados.length > 0 ? (
                    dados.map((ambiente) => (

                        <div className="bg-[#D9D9D9] w-[60%] h-50 rounded-lg z-10 fixed relative mb-10" key={ambiente.numero_ambiente}>
                            <img src={`http://localhost:3033${ambiente.caminho_imagem}`} className="h-[150px] w-[500px] rounded-lg" alt={ambiente.nome} />
                            <div className="p-4">
                                <p className="font-semibold text-xs mb-2 text-black">{ambiente.nome}</p>
                                <div className="bg-[#9A1915] w-10 h-[2px] m-auto"></div>
                                {
                                    ambiente.tipodoambiente == "blocooficina" ? <GiStaplerPneumatic className="w-8 h-8 m-auto text-black " /> : null
                                }
                                {
                                    ambiente.tipodoambiente == "externo" ? <GiTheater className="w-8 h-8 m-auto  text-black" /> : null
                                }
                                <p className="font-semibold text-xs mt-2 text-black">Capacidade:{ambiente.capacidadealunos}</p>
                            </div>
                            <div className="absolute top-[53%] left-[50%] transform -translate-x-1/2 -translate-y-1/2">
                                {
                                    ambiente.disponivel ? <button className="bg-[#9A1915] text-white p-2 rounded-full z-20" onClick={() => reservarAmbiente(ambiente.numero_ambiente)}>
                                        Reservar
                                    </button> : <p className="bg-[#2e2e2e] text-white p-2 rounded-full z-20">Indisponível</p>
                                }
                            </div>
                            {
                                    ambiente.disponivel ?   <div className="bg-[#9A1915] gap-2 flex  text-white z-20 p-2 rounded-full absolute  left-[50%] transform -translate-x-1/2 -translate-y-1/2">
                                    {
                                        ambiente.chave === true ? <IoKeyOutline /> : null
    
                                    }
                                    {
                                        ambiente.ar_condicionado ? <TbAirConditioning /> : null
                                    }
                                    {
                                        ambiente.ventilador ? <GiComputerFan /> : null
                                    }
                                    {
                                        ambiente.wifi ? <AiOutlineWifi /> : null
                                    }
                                    {
                                        ambiente.projetor ? <LuProjector /> : null
                                    }
                                </div>
                                     :   <div className="bg-[#2e2e2e] gap-2 flex  text-white z-20 p-2 rounded-full absolute  left-[50%] transform -translate-x-1/2 -translate-y-1/2">
                                     {
                                         ambiente.chave === true ? <IoKeyOutline /> : null
     
                                     }
                                     {
                                         ambiente.ar_condicionado ? <TbAirConditioning /> : null
                                     }
                                     {
                                         ambiente.ventilador ? <GiComputerFan /> : null
                                     }
                                     {
                                         ambiente.wifi ? <AiOutlineWifi /> : null
                                     }
                                     {
                                         ambiente.projetor ? <LuProjector /> : null
                                     }
                                 </div>
                                }
                          
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">Nenhum ambiente encontrado</p>
                )}
            </div>
        </div>


    )
}

export default ambientes;