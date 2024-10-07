"use client";

import { useRouter } from "next/navigation";


const telaDescanso = () => {

  const router = useRouter();


  const clicou= async () => {
    router.push(`/totem/paginaModal`)
  }

  return (
    <div
    onClick={clicou}
      className="h-screen bg-cover bg-no-repeat flex flex-col items-center justify-start"
      style={{
        backgroundImage: 'url("/images/telaDescanso/imagemDescanso.jpg")',
        backgroundPosition: "center 56%",
      }}
    >
      <img
        src="/images/logoSenai/logo.png"
        className="w-[50%] border-[14px] border-white rounded-lg mb-12 mt-9" // Aumentei a margem superior da imagem
      />


      

      
    </div>


  );
};

export default telaDescanso;
