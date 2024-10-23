"use client";
import React, { useState, useEffect } from "react";
import Header from "@/app/components/header/Header";
import { useRouter, useSearchParams } from 'next/navigation';
import GestaoUsuarios from "@/app/components/gestaoUsuarios/GestaoUsuarios";
import api from "../../../src/config/configApi"; // Ajuste o caminho conforme necessário
import ConcluirExclusao from "@/app/components/concluirExclusao/concluirExclusao";



const GestaoUsuariosPage = () => {
  const [dados, setDados] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const nif = searchParams.get('nif');

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
        alert("Nenhum usuário com esse NIF encontrado, redirecionando para login.");
        router.push('/administracao/login');
      }
    }
  }, [loading, user, router]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await api.get(`/usuarios`);
        setDados(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUsuarios();
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  const handleEdit = (id) => {
    console.log("Editar usuario", id);
  };

  const deletarUsuario = (item, set, id) => {
    set(item.filter((item) => item.id !== id));
  };

  const deletar = async (nif) => {
    const url = `/usuarios/${nif}`;
    try {
      await api.delete(url);
      deletarUsuario(dados, setDados, nif);
      const response = await api.get(`/usuarios`);
      setDados(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="bg-white min-h-screen flex flex-col overflow-y-auto">
      <Header />

      {/* botao para voltar para o menu */}
      <img
        src="/images/modal/fechar.png"
        alt="botao voltar"
        className="mr-10 cursor-pointer w-10 h-10 mt-2 ml-10"
        onClick={() => router.push("/administracao/telaMenuAdm")}
      />

      <h1 className="text-center text-3xl text-black font-bold mt-2 mb-8">
        Gestão de Usuarios
      </h1>

      {/* img para add ambiente */}
      <div className="grid lg:grid-cols-4 gap-10 ml-16">
        <div className="flex items-center ml-10 mb-4">
          <img
            src="/images/imgGestores/pessoa.png"
            alt="oi"
            className="mr-10 h-42 cursor-pointer"
            onClick={() => router.push("/administracao/cadastroUsuario")}
          />
        </div>

        {/* Renderização dos usuários */}
        {dados && dados.length > 0 ? (
          dados.map((usuario) => (
            <GestaoUsuarios
              key={usuario.id}
              nome={usuario.nome}
              cargo={usuario.cargo}
              imgGestor={`http://localhost:3033${usuario.caminho_imagem}`}
              editar={() => handleEdit(usuario.id)}
              excluir={() => deletar(usuario.nif)}
            />
          ))
        ) : (
          <p className="text-center text-gray-500">Nenhum usuário encontrado</p>
        )}
          </div>
          <ConcluirExclusao/>
      </div>
  );
};

export default GestaoUsuariosPage;
