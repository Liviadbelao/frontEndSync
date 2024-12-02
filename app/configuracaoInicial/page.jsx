"use client";
import Header from "@/app/components/header/Header";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ToggleButton from "@/app/components/togglebotao/ToggleBotao";
import api from "../../src/config/configApi";
import Popup from "@/app/components/popupinical/PopupInicial";
import ModalSalaFixa from "../components/ModalSalaFixa/ModalSalaFixa";

const ConfigInicial = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [whatsappOn, setWhatsappOn] = useState(false);
  const [emailOn, setEmailOn] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [fixedClasses, setFixedClasses] = useState([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const nif = searchParams.get("nif");

  useEffect(() => {
    async function fetchAmbientes() {
      try {
        const response = await api.get(`/ambientes`);
        setDados(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchAmbientes();
  }, []);

  // Buscar dados do usuário
  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await api.get(`/usuarios/${nif}`);
        if (response.data) {
          setUser(response.data);
          const { notiwhere } = response.data;
          setWhatsappOn(notiwhere === 'whatsapp' || notiwhere === 'ambos');
          setEmailOn(notiwhere === 'email' || notiwhere === 'ambos');
        } else {
          setWhatsappOn(false);
          setEmailOn(false);
        }
      } catch (error) {
        console.error("Erro ao buscar o usuário: ", error);
        setWhatsappOn(false);
        setEmailOn(false);
      } finally {
        setLoading(false);
      }
    }

    if (nif) fetchUser();
  }, [nif]);

  // Buscar salas fixas associadas ao usuário
  useEffect(() => {
    async function fetchFixedClasses() {
      if (user) {
        try {
          const response = await api.get(`/salas_fixas/${user.nif}`);
          setFixedClasses(response.data);
        } catch (error) {
          console.error("Erro ao buscar salas fixas:", error);
        }
      }
    }

    fetchFixedClasses();
  }, [user]);

  async function testar() {
    let notiwhere = '';
    if (whatsappOn && emailOn) {
      notiwhere = 'ambos';
    } else if (whatsappOn) {
      notiwhere = 'whatsapp';
    } else if (emailOn) {
      notiwhere = 'email';
    } else {
      notiwhere = 'nenhum';
    }

    try {
      const response = await api.put(`/usuarios/${nif}/notificacoes`, {
        notificacao: whatsappOn || emailOn,
        notiwhere: notiwhere
      });
      console.log("Preferências de notificações atualizadas com sucesso:", response.data);
    } catch (error) {
      console.error("Erro ao atualizar preferências:", error);
    }

    if (loading) {
      return <div>Carregando...</div>;
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      {user && <Popup nome={user.nome} />}

      <img
        src="/images/imgMenuAdm/btvoltar.png"
        alt="botao voltar"
        className="mr-10 cursor-pointer w-10 h-10 mt-8 ml-10"
        onClick={() => router.push(`/administracao/telaMenuAdm?nif=${nif}`)}
      />

      <div className="max-w-3xl mx-auto py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Configurações</h1>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="relative">
            <div className="bg-red-700 h-24"></div>
            <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4">
              <div className="flex items-center space-x-4">
                {user && (
                  <>
                    <img
                      src={`http://localhost:3033${user?.caminho_imagem}`}
                      alt={`imagem do usuario ${user.nome}`}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h2 className="text-xl font-semibold text-white">{user.nome}</h2>
                      <p className="text-sm text-gray-300">
                        {user.adm ? "Administrador" : "Usuário"}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Deseja receber notificações?</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between border-2 p-1 rounded-md">
                  <label htmlFor="whatsapp" className="text-gray-700">Whatsapp</label>
                  <ToggleButton ativado={whatsappOn} setAtivado={setWhatsappOn} />
                </div>
                <div className="flex items-center justify-between border-2 p-1 rounded-md">
                  <label htmlFor="email" className="text-gray-700">Email</label>
                  <ToggleButton ativado={emailOn} setAtivado={setEmailOn} />
                </div>
              </div>
              <button
                className="bg-red-700 mt-10 text-white font-semibold py-2 px-4 rounded-md shadow-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-200"
                onClick={testar}
              >
                Salvar
              </button>
            </div>
          </div>
        </div>

        {/* Salas Fixas */}
        <h1 className="text-3xl font-bold text-gray-800 mt-14">Salas Fixas</h1>
        <img
          src="/images/imgMenuAdm/botao-adicionar.png"
          alt="botao mais"
          className="mr-10 mt-8 cursor-pointer w-24 h-24"
          onClick={() => setShowModal(true)}
        />

        {showModal && (
          <ModalSalaFixa
            nome={user.nome}
            onClose={() => setShowModal(false)}
            usuario_id={user.nif}
          />
        )}

        {/* Exibição das Salas Fixas */}
        <div className="mt-8">
          {fixedClasses.length > 0 ? (
            <div>
              {fixedClasses.map((sala) => (
                <div key={sala.id} className="bg-white p-4 mb-4 shadow-md rounded-lg">
                  <h3 className="text-lg font-semibold">{sala.ambiente_nome}</h3>
                  <p className="text-sm text-gray-600">Número: {sala.numero_ambiente}</p>
                  <p className="text-sm text-gray-600">Capacidade de Alunos: {sala.capacidadeAlunos}</p>
                  <p className="text-sm text-gray-600">Tipo: {sala.tipodoambiente}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">Nenhuma sala fixa associada a este usuário.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfigInicial;
