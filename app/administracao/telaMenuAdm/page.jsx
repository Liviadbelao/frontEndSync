"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import TopicosMenu from "@/app/components/topicosMenu/TopicosMenu";
import Header from "@/app/components/header/Header";
import api from "../../../src/config/configApi";

const TelaMenuAdm = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const nif = searchParams.get("nif");

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
      if (!user || !user.adm) {
        alert(
          "Nenhum usuário com esse NIF encontrado, redirecionando para login."
        );
        router.push("/administracao/login");
      }
    }
  }, [loading, user, router]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return user && user.adm ? (
    <div className="items-center justify-center min-h-screen">
      <Header />
      <h1 className="font-extrabold text-2xl text-center mt-4">
        O que deseja fazer?
      </h1>
      <div className="flex justify-center ml-40 mr-40 mt-4 mb-4 p-10 rounded-md bg-zinc-300 border-4 border-red-500">
        <div className="grid grid-cols-2 gap-10">
          <TopicosMenu
            topicos="Monitoração de ambientes"
            imgSrc="/images/imgMenuAdm/monitoracao.png"
            onClick={() => router.push(`/administracao?nif=${nif}`)}
          />
          <TopicosMenu
            topicos="Gestão de  ambientes"
            imgSrc="/images/imgMenuAdm/gestaol.png"
            onClick={() =>
              router.push(`/administracao/gestaoAmbiente?nif=${nif}`)
            }
          />
          <TopicosMenu
            topicos="Gestão de funcionários"
            imgSrc="/images/imgMenuAdm/gestaof.png"
            onClick={() =>
              router.push(`/administracao/gestaoUsuario?nif=${nif}`)
            }
          />
          <TopicosMenu
            topicos="Reserva de ambientes"
            imgSrc="/images/imgMenuAdm/reservaicon.png"
            onClick={() => router.push("/administracao/")}
          />
          <TopicosMenu
            topicos="Controle de informações"
            imgSrc="/images/imgMenuAdm/painel.png"
            onClick={() => router.push("/administracao/")}
          />
          <TopicosMenu
            topicos="Configuracaoes inicial"
            imgSrc="/images/imgMenuAdm/painel.png"
            onClick={() => router.push(`/administracao/configInicial?nif=${nif}`)}
          />
        </div>
      </div>
    </div>
  ) : null;
};

export default TelaMenuAdm;
