"use client";

import Image from "next/image";

         

const monitoramentoAmbientes = () => {
  return (

    <div className="bg-white min-h-screen flex flex-col overflow-y-auto">


      <img
        src="/images/imgMenuAdm/btvoltar.png"
        alt="botao voltar"
        className="mr-10 cursor-pointer w-10 h-10 mt-2 ml-10"
        onClick={() => router.push("/administracao/telaMenuAdm")}
      />

      <h1 className="text-center text-3xl text-black font-bold mt-2 mb-8">
        Gestão de Ambientes
      </h1>

      
      
       

      
      </div>
     
   
  

        
  );
};

export default monitoramentoAmbientes;
