"use client";

//Importação
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import TopicosMenu from "@/app/components/topicosMenu/TopicosMenu";
import Header from "@/app/components/header/Header";
import api from "../../../src/config/configApi";
import TelaCarregar from "@/app/components/telaCarregar/TelaCarregar";
import Footer from "@/app/components/footer/Footer";

//Iniciando página
const TelaMenuAdm = () => {

  //criando estados
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [carregando, setCarregando] = useState(false)
  const router = useRouter();
  const searchParams = useSearchParams();
  const nif = searchParams.get("nif");

  const redirecionar = (caminhoTela) => {
    setCarregando(true)
     router.push(`${caminhoTela}?nif=${nif}`)
  }

  //Importando dados API
  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await api.get(`/usuarios/${nif}`);
        if (response.data) {
          setUser(response.data);
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

  //Caso nif nn seja de um usuário ADM
  useEffect(() => {
    if (!loading) {
      if (!user || !user.adm) {
        alert(
          "Nenhum usuário com esse NIF encontrado, redirecionando para login."
        );
        router.push("/administracao/login");
      }
    }
  }, [loading, user, router]);

  //Esperando página carregar
  if (loading) {
    return <div>Carregando...</div>;
  }

  return user && user.adm ? (
    <div className="bg-white min-h-full items-center justify-center">
      <Header />
      <h1 className=" text-black font-extrabold text-2xl text-center mt-4">
        O que deseja fazer?
      </h1>
      <div className=" flex justify-center mx-96 mt-4 mb-4 p-10 rounded-md bg-zinc-300 border-4 border-red-500">
        <div className="grid grid-cols-2 gap-10">

        {/* Monitoramento Ambiente */}
          <TopicosMenu
            topicos="Monitoramento de ambientes"
            imgSrc="/images/imgMenuAdm/monitoracao.png"
            onClick={() => redirecionar('/administracao/monitoramentoAmbientes')}
          />

        {/* Gestão Ambiente */}
          <TopicosMenu
            topicos="Gestão de  ambientes"
            imgSrc="/images/imgMenuAdm/gestaol.png"
            onClick={() => redirecionar('/administracao/gestaoAmbiente')}
          />

        {/* Gestão Usuário */}
          <TopicosMenu
            topicos="Gestão de funcionários"
            imgSrc="/images/imgMenuAdm/gestaof.png"
            onClick={() => redirecionar('/administracao/gestaoUsuario')}
          />

        {/* Reserva Ambiente */}
          <TopicosMenu
            topicos="Reserva de ambientes"
            imgSrc="/images/imgMenuAdm/reservaicon.png"
            onClick={() => redirecionar('/administracao/ambientes')}
          />

        {/* Controle de Informações*/}
          <TopicosMenu
            topicos="Gestão de informações"
            imgSrc="/images/imgMenuAdm/painel.png"
            onClick={() => redirecionar('/administracao/gestaoInformacoes')}
          />
        </div>
      </div>
      {carregando && <TelaCarregar />}
      <Footer />
    </div>
  ) : null;
};

export default TelaMenuAdm;
