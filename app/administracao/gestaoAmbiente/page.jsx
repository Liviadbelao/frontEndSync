"use client"
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import Header from "@/app/components/header/Header";
import GestaoAmbientes from "@/app/components/gestaoAmbientes/GestaoAmbientes";
import api from '../../../src/config/configApi';

const handleEdit = () => {
    console.log("Editar ambiente");
}

const handleDelete = async (id) => {
    /*   try {
          await api.delete(`/ambientes/${id}`);
          setAmbientes(ambientes.filter(ambiente => ambiente.id !== id));
          console.log("Ambiente deletado com sucesso");
      } catch (error) {
          console.error("Erro ao deletar ambiente:", error);
      } */
}

const GestaoAmbiente = () => {
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

    useEffect(() => {
        if (!loading) {
            console.log("User:", user);
            if (!user || !user.adm) {
                alert("Nenhum usuário com esse NIF encontrado, redirecionando para login.");
                router.push('/administracao/login');
            }
        }
    }, [loading, user, router]);

    if (loading) {
        return <div>Carregando...</div>;
    }

    return (
        <div>
            <Header />
            {/* botao para voltar para o menu */}
            <img
                src="/images/imgMenuAdm/btvoltar.png"
                alt="botao voltar"
                className="mr-10 cursor-pointer w-10 h-10 mt-2 ml-10"
                onClick={() => router.push("/administracao/telaMenuAdm")}
            />

            <h1 className="text-center text-3xl	font-bold mt-2 mb-6">Gestão de Ambientes</h1>
           

{/* img para add ambiente */}
            <div className="grid lg:grid-cols-4 gap-10 ml-10">
                <div className="flex items-center ml-10 mb-4">
                    <img
                        src="/images/imgMenuAdm/botao-adicionar.png"
                        alt="oi"
                        className="mr-10 cursor-pointer"
                        onClick={() => router.push("/administracao/cadastroAmbiente")}
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
            </div>
        </div>
    );
}

export default GestaoAmbiente;