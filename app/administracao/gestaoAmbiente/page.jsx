"use client"
import React from "react";
import { useRouter } from "next/navigation";
import Header from "@/app/components/header/Header";
import GestaoAmbientes from "@/app/components/gestaoAmbientes/GestaoAmbientes";

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
    const router = useRouter();

    return (
        <div>
            <Header />
            <img
                src="/images/imgMenuAdm/btvoltar.png"
                alt="botao voltar"
                className="mr-10 cursor-pointer w-10 h-10 mt-2 ml-10"
                onClick={() => router.push("/administracao/telaMenuAdm")}
            />

            <h1 className="text-center text-3xl	font-bold mt-2 mb-6">Gestão de Ambientes</h1>
           


            <div className="grid lg:grid-cols-4 gap-10 ml-10">
                <div className="flex items-center ml-10 mb-4">
                    <img
                        src="/images/imgMenuAdm/botao-adicionar.png"
                        alt="oi"
                        className="mr-10 cursor-pointer"
                        onClick={() => router.push("/administracao/cadastroAmbiente")}
                    />
                </div>
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