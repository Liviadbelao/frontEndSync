"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "@/app/components/header/Header";


//Iniciando página
const gestaoInformacoes = () => {

  const router = useRouter();
  const searchParams = useSearchParams();
  const nif = searchParams.get("nif");

return(
  <div className="bg-white min-h-screen flex flex-col">
    <Header />
    
  <img
      src="/images/imgMenuAdm/btvoltar.png"
      alt="botao voltar"
      className="w-10 h-10 mb-5 cursor-pointer m-10"
      onClick={() => router.push(`/administracao/telaMenuAdm?nif=${nif}`)}
  />

<h1 className="text-center text-3xl font-bold text-black mb-10">Gestão de Informações </h1>

</div>
)
};

export default gestaoInformacoes;
