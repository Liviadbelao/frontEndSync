"use client";

//Importações
import React, { useState, useEffect } from "react";
import Header from "@/app/components/header/Header";
import { useRouter, useSearchParams } from 'next/navigation';
import GestaoUsuarios from "@/app/components/gestaoUsuarios/GestaoUsuarios";
import api from "../../../src/config/configApi"; // Ajuste o caminho conforme necessário
import ConcluirExclusao from "@/app/components/concluirExclusao/concluirExclusao";

import { FaSearch } from "react-icons/fa";
import ModalUsuario from "@/app/components/modalUsuario/ModalUsuario";

//Iniciando página
const GestaoUsuariosPage = () => {
  const [dados, setDados] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [excluirClicado, setExcluirClicado] = useState(false);
  const [usuarioParaExcluir, setUsuarioParaExcluir] = useState(null); // Usuário selecionado para exclusão
  const router = useRouter();
  const [abrirModal, setAbrirModal] = useState(null);
  const [filtro, setFiltro] = useState('');
  const searchParams = useSearchParams();
  const nif = searchParams.get('nif');

    //Const para abertura do modal
    const openModal = (id) => {
      setAbrirModal(id);
    };
  
  
    //Const para fechamento do modal
    const closeModal = () => {
      setAbrirModal(null);
    };

  //Resgatando dados API
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

  //Verificando se o nif é ADM
  useEffect(() => {
    if (!loading) {
      if (!user || !user.adm) {
        alert("Nenhum usuário com esse NIF encontrado, redirecionando para login.");
        router.push('/administracao/login');
      }
    }
  }, [loading, user, router]);

  //Resgatando dados API
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

  //Função de deletar usuário
  const handleDeleteClick = (usuario) => {
    setUsuarioParaExcluir(usuario);
    setExcluirClicado(true);
  };

  //Confirmação de deletar usuário
  const handleConfirmDelete = async () => {
    try {
      await api.delete(`/usuarios/${usuarioParaExcluir.nif}`);
      setDados(dados.filter((u) => u.nif !== usuarioParaExcluir.nif));
    } catch (error) {
      console.error("Erro ao excluir o usuário: ", error);
    } finally {
      setExcluirClicado(false);
    }
  };

  // Função para redirecionar para a página de cadastro/edição
  const handleEditClick = (usuario) => {
    // router.push(`/administracao/cadastroUsuario?nif=${usuario.nif}&isEdit=true`);
    router.push(`/administracao/editarUsuario/?nif=${nif}&nifEdit=${usuario.nif}`);
    console.log('nif passado', usuario.nif);

  };

  //Esperando dados
  if (loading) {
    return <div>Carregando...</div>;
  }

  // Filtrar usuarios com base no texto do filtro
  const usuariosFiltrados = dados.filter(usuario =>
    usuario.nome.toLowerCase().includes(filtro.toLowerCase())

  );

  return (
    <div className="bg-white min-h-screen flex flex-col overflow-y-auto">
      <Header />
      <img
        src="/images/imgMenuAdm/btvoltar.png"
        alt="botao voltar"
        className="mr-10 cursor-pointer w-10 h-10 mt-8 ml-10"
        onClick={() => router.push(`/administracao/telaMenuAdm?nif=${nif}`)}
      />

      <h1 className="text-center text-3xl text-black font-bold mt-2 mb-8">
        Gestão de Usuarios
      </h1>

   
        {/* filtro */}
        <div className="flex gap-2 shadow-lg w-[50%] h-[40%] mx-auto mt-5 border border-[#808080]-600 p-2 rounded-full mb-10">

          <FaSearch className="text-[#9A1915] m-auto ml-2" />
          <input
            type="text"
            placeholder="Filtrar por nome do usuario"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            className="focus:outline-none w-full text-black"
          />
        </div>
    

      <div className="grid lg:grid-cols-4 gap-10 ml-16">
        <div className="flex items-center ml-10 mb-4">
          <img
            src="/images/imgGestores/pessoa.png"
            alt="oi"
            className="mr-10 h-42 cursor-pointer"
            onClick={() => router.push(`/administracao/cadastroUsuario?nif=${nif}`)}
          />
        </div>

        {usuariosFiltrados && usuariosFiltrados.length > 0 ? (
          usuariosFiltrados.map((usuario) => (
            <GestaoUsuarios
              key={usuario.id}
              nome={usuario.nome}
              cargo={usuario.cargo}
              imgGestor={`http://localhost:3033${usuario.caminho_imagem}`}
              editar={() => handleEditClick(usuario)} // Chama a função de edição
              excluir={() => handleDeleteClick(usuario)}
              funcao={() => openModal(usuario.nif)} 
            />
          ))
        ) : (
          <p className="text-center text-gray-500">Nenhum usuário encontrado</p>
        )}
      </div>

      {excluirClicado && (
        <ConcluirExclusao
          onClose={() => setExcluirClicado(false)}
          onConfirm={handleConfirmDelete}
          img={`http://localhost:3033${usuarioParaExcluir.caminho_imagem}`}
          name={usuarioParaExcluir.nome}
        />
      )}

{
  abrirModal && (
    dados.filter((usuario) => usuario.nif === abrirModal) // Filtra o usuário correto
      .map((usuario) => (
        <div key={usuario.id}>
          <ModalUsuario
            nome={usuario.nome} 
            imagem={`http://localhost:3033${usuario.caminho_imagem}`} // Corrige o caminho para a imagem
            adm={usuario.adm} 
            nif={usuario.nif} 
            celular={usuario.telefone} 
            email={usuario.email} 
            fechar={closeModal} 
          />
        </div>
      ))
  )
}
    </div>
  );
};

export default GestaoUsuariosPage;
