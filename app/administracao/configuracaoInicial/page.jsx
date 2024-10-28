"use client";
import Header from "@/app/components/header/Header";
import React from "react";
import { useRouter } from "next/navigation";
import ToggleButton from "@/app/components/togglebotao/ToggleBotao";
import Popup from "@/app/components/popupinical/PopupInicial";

const ConfigInicial = () => {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <Popup />
      <div className="max-w-3xl mx-auto py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Configurações
        </h1>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          {/* Faixa vermelha cobrindo a parte do professor */}
          <div className="relative">
            <div className="bg-red-700 h-24"></div> {/* Faixa vermelha */}
            <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                  <img
                    src="/images/editar.png"
                    alt="botao editar"
                    className="mr-10 cursor-pointer w-6 h-6 mt-10"
                    onClick={() =>
                      router.push(`/administracao/telaMenuAdm?nif=${nif}`)
                    }
                  />
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-white">
                    Thiago Ferreira
                  </h2>
                  <p className="text-sm text-gray-300">Professor</p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Deseja receber notificações?
              </h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between border-2 p-1 rounded-md">
                  <label htmlFor="whatsapp" className="text-gray-700">
                    Whatsapp
                  </label>
                  <ToggleButton />
                </div>
                <div className="flex items-center justify-between border-2 p-1 rounded-md">
                  <label htmlFor="email" className="text-gray-700">
                    Email
                  </label>
                  <ToggleButton />
                </div>
              </div>
            </div>
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mt-14">Salas Fixas</h1>
        <img
          src="/images/imgMenuAdm/botao-adicionar.png"
          alt="botao mais"
          className="mr-10 mt-8 cursor-pointer"
          onClick={() =>
            router.push(`/administracao/cadastroAmbiente?nif=${nif}`)
          }
        />
      </div>
    </div>
  );
};

export default ConfigInicial;
