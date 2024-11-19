"use client";

import { useRouter } from "next/navigation";

const telaDescanso = () => {
  const router = useRouter();

  const clicou = async () => {
    router.push(`/totem/faceID`);
  };

  return (
    <div
      onClick={clicou}
      className="h-screen bg-cover bg-no-repeat flex flex-col items-center justify-start relative"
      style={{
        backgroundImage: 'url("/images/telaDescanso/imagemDescanso.jpg")',
        backgroundPosition: "center 56%",
      }}
    >
      <img
        src="/images/logoSenai/logo.png"
        className="w-[50%] border-[14px] border-white rounded-lg mb-12 mt-9"
      />

      {/* Seção com opacidade na parte inferior */}
      <div
        className="w-full h-1/3 bg-white bg-opacity-60 absolute bottom-0 flex justify-center items-center"
      >
        <div className="flex items-center justify-center space-x-4">
          <p className="text-5xl text-black">Toque na</p>
          <p className="text-5xl text-black font-bold">tela</p>
          <p className="text-5xl text-black">para</p>
          <p className="text-5xl text-black font-bold">iniciar</p>
        </div>
      </div>
    </div>
  );
};

export default telaDescanso;
