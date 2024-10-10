"use client";
import React from "react";
import Header from "@/app/components/header/Header";
import { useRouter } from "next/navigation";
import GestaoUsuarios from "@/app/components/gestaoUsuarios/GestaoUsuarios";

const handleEdit = () => {
  console.log("Editar usuario");
};

const handleDelete = () => {
  console.log("Deletar usuario");
};

const gestaoUsuarios = () => {
  const router = useRouter();

  return (
    <div className=" bg-white min-h-screen flex flex-col overflow-y-auto ">
      <Header />

      {/* botao para voltar para o menu */}
      <img
        src="/images/modal/fechar.png"
        alt="botao voltar"
        className="mr-10 cursor-pointer w-10 h-10 mt-2 ml-10"
        onClick={() => router.push("/administracao/telaMenuAdm")}
      />

      <h1 className="text-center text-3xl text-black font-bold mt-2 mb-6">
        Gestão de Usuarios
      </h1>

{/* img para add ambiente */}
<div className="grid lg:grid-cols-4 gap-10 ml-10">

                <div className="flex items-center ml-10 mb-4">
                    <img
                        src="/images/imgGestores/pessoa.png"
                        alt="oi"
                        className="mr-10 h-42  cursor-pointer"
                        onClick={() => router.push("/administracao/cadastroUsuario")}
                    />
                </div>

                


      <GestaoUsuarios
        nome="Felipe Santos"
        cargo="Instrutor de ADS"
        imgGestor="/images/imgGestores/DEVMASTER.jpg"
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
    </div>
  );
};

export default gestaoUsuarios;
