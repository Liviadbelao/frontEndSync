"use client"
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import Header from "@/app/components/header/Header";
import GestaoAmbientes from "@/app/components/gestaoAmbientes/GestaoAmbientes";
import ConcluirExclusao from "@/app/components/concluirExclusao/concluirExclusao";
import api from '../../../src/config/configApi';

const handleEdit = () => {
    console.log("Editar ambiente");
}

const GestaoAmbiente = () => {
    const [dados, setDados] = useState([]);
    const [excluirClicado, setExcluirClicado] = useState(false);
    const [ambienteParaExcluir, setAmbienteParaExcluir] = useState(null); // Usuário selecionado para exclusão
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
                console.error("Erro ao buscar o ambiente: ", error);
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

    useEffect(() => {
        async function fetchAmbientes() {
            try {
                const response = await api.get(`/ambientes`);
                setDados(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchAmbientes();
    }, []);

    // useEffect(() => {
    //     if (!loading && !user) {
    //         router.push('/administracao/telaMenuAdm');
    //     }
    // }, [loading, user, router]);

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

    if (loading) {
        return <div>Carregando...</div>;
    }

    const handleDeleteClick = (ambientes) => {
        setAmbienteParaExcluir(ambientes);
        setExcluirClicado(true);
    };

    const handleConfirmDelete = async () => {
        try {
          await api.delete(`/ambientes/${ambienteParaExcluir.numero_ambiente}`);
          setDados(dados.filter((u) => u.numero_ambiente !== ambienteParaExcluir.numero_ambiente));
        } catch (error) {
          console.error("Erro ao excluir o ambiete: ", error);
        } finally {
          setExcluirClicado(false);
        }
      };
    
      // Função para redirecionar para a página de cadastro/edição
      const handleEditClick = (ambiente) => {
        // Substitui duplicação de `id` e utiliza um único identificador
        router.push(`/administracao/editarAmbiente/?nif=${nif}&id=${ambiente.numero_ambiente}`);
        console.log('ID do ambiente passado:', ambiente.id);
    };
    

    if (loading) {
        return <div>Carregando...</div>;
    }

    return (
        <div className="bg-white min-h-screen">
            <Header />
            {/* botao para voltar para o menu */}
            <img
                src="/images/imgMenuAdm/btvoltar.png"
                alt="botao voltar"
                className="mr-10 cursor-pointer w-10 h-10 mt-2 ml-10"
                onClick={() => router.push(`/administracao/telaMenuAdm?nif=${nif}`)}
            />

            <h1 className=" text-black text-center text-3xl	font-bold mt-2 mb-6">Gestão de Ambientes</h1>
           


            {/* img para add ambiente */}
            <div className="grid lg:grid-cols-4 gap-10 ml-10">
                <div className="flex items-center ml-10 mb-4">
                    <img
                        src="/images/imgMenuAdm/botao-adicionar.png"
                        alt="oi"
                        className="mr-10 cursor-pointer"
                        onClick={() => router.push(`/administracao/cadastroAmbiente?nif=${nif}`)}
                    />
                </div>
                {/* componentes */}
                <GestaoAmbientes
                    nome="Sala de Reuniões"
                    imgSrc="/images/imgMenuAdm/gestaof.png"
                    imgSrc2="/images/imgMenuAdm/senaimaquina2.jpg"
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    
                />
                <GestaoAmbientes
                    nome="Sala de Reuniões"
                    imgSrc="/images/imgMenuAdm/gestaof.png"
                    imgSrc2="/images/imgMenuAdm/senaimaquina2.jpg"
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
                <GestaoAmbientes
                    nome="Sala de Reuniões"
                    imgSrc="/images/imgMenuAdm/gestaof.png"
                    imgSrc2="/images/imgMenuAdm/senaimaquina2.jpg"
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
                <GestaoAmbientes
                    nome="Sala de Reuniões"
                    imgSrc="/images/imgMenuAdm/gestaof.png"
                    imgSrc2="/images/imgMenuAdm/senaimaquina2.jpg"
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
                <GestaoAmbientes
                    nome="Sala de Reuniões"
                    imgSrc="/images/imgMenuAdm/gestaof.png"
                    imgSrc2="/images/imgMenuAdm/senaimaquina2.jpg"
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />

                {dados && dados.length > 0 ? (
                    dados.map((ambiente) => (
                        <GestaoAmbientes
                            key={ambiente.numero_ambiente}
                            nome={ambiente.nome}
                            imgSrc2={`http://localhost:3033${ambiente.caminho_imagem}`}
                            onEdit={() => handleEditClick(ambiente)} // Chama a função de edição
                            onDelete={() => handleDeleteClick(ambiente)}
                        />
                    ))
                ) : (
                    <p className="text-center text-gray-500">Nenhum usuário encontrado</p>
                )}
            </div>

            {excluirClicado && (
                <ConcluirExclusao
                    onClose={() => setExcluirClicado(false)}
                    onConfirm={handleConfirmDelete}
                />
            )}

        </div>
    );
}

export default GestaoAmbiente;