"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import router from "next/router";
import api from '../../../src/config/configApi';
import MonitorDeInatividade from "@/app/components/timerInatividade/TimerInatividade";
import ContagemRegressiva from "@/app/components/contagemRegressiva/ContagemRegressiva";

const MonitoramentoAmbientes = () => {
  const [dados, setDados] = useState([]);

  useEffect(() => {
    async function fetchInfosAmbientes() {
        try {
            const response = await api.get(`/historico/infos`);
            setDados(response.data); // Armazena todos os registros
            console.log(response.data);
        } catch (error) {
            console.error("Erro ao buscar os dados: ", error);
        } 
    }
    fetchInfosAmbientes();
  }, []);

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

      {/* <MonitorDeInatividade tempoInatividade={6000} /> */}
      <ContagemRegressiva  tempoInicial = {3} />

      {dados.length > 0 ? (
        dados.map((dados) => (
          <div key={dados.id} className="text-black p-6 bg-gray-100 rounded-lg shadow-md mx-10 my-5">
            <h2 className="text-2xl font-semibold mb-2">Ambiente Monitorado</h2>
            
              <img
                src={`http://localhost:3033${dados.imagem_ambiente}`}
                width={200}
                height={150}
                className="rounded mb-4"
              />
            

            <p className="text-black"><strong>Usuário:</strong> {dados.nome_usuario}</p>
            <p className="text-black"><strong>Ambiente:</strong> {dados.nome_ambiente}</p>
            <p className="text-black"><strong>Data Início:</strong> {new Date(dados.data_inicio).toLocaleDateString()}</p>
            <p className="text-black"><strong>Data Fim:</strong> {dados.data_fim ? new Date(dados.data_fim).toLocaleDateString() : "Em aberto"}</p>
          
          
          </div>
        ))
      ) : (
        <p className="text-center">Carregando dados...</p>
      )}
    </div>
  );
};

export default MonitoramentoAmbientes;
