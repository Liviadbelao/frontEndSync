"use client";
import Header from "@/app/components/header/Header";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ToggleButton from "@/app/components/togglebotao/ToggleBotao";
import api from "../../src/config/configApi";
import Popup from "@/app/components/popupinical/PopupInicial";


const ConfigInicial = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [whatsappOn, setWhatsappOn] = useState(false)
  const [emailOn, setEmailOn] = useState(false)
  const router = useRouter();
  const searchParams = useSearchParams();
  const nif = searchParams.get("nif");

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await api.get(`/usuarios/${nif}`);
        if (response.data) {
          setUser(response.data);
        } else {
          setUser(null); // API não retornou dados
        }
      } catch (error) {
        console.error("Erro ao buscar o usuário:", error);
        setUser(null); // Tratar como usuário não encontrado
      } finally {
        setLoading(false);
      }
    }

    if (nif) {
      fetchUser();
    } else {
      setLoading(false);
      setUser(null); // Garante um estado consistente
    }
  }, [nif]);

  async function atualizarNotificacoes() {
    const {nif} = req.params;  
    const notificacao = { email: true, whatsapp: false };  
    try {
        const response = await axios.put(`http://localhost:3033/usuarios/${nif}/notificacoes`, {
            notificacao: notificacao,
            notiwhere: notificacao.whatsapp ? 'whatsapp' : (notificacao.email ? 'email' : 'ambos'),
        });

        console.log('Preferências de notificações atualizadas com sucesso:', response.data);
    } catch (error) {
        console.error('Erro ao atualizar preferências:', error);
    }
} 
  async function testar() {
    console.log('whatsapp:', whatsappOn);
    console.log('email:', emailOn);

    // Determinar o valor de 'notiwhere'
    let notiwhere = '';
    if (whatsappOn && emailOn) {
      notiwhere = 'ambos';
    } else if (whatsappOn) {
      notiwhere = 'whatsapp';
    } else if (emailOn) {
      notiwhere = 'email';
    }

    // Salvar preferências no backend
    try {
      // Corrigido para usar crases e remover espaços desnecessários
      const response = await api.put(`/usuarios/${nif}/notificacoes`, {
        notificacao: whatsappOn || emailOn, // true se qualquer uma estiver ativa
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
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Deseja receber notificações?
              </h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between border-2 p-1 rounded-md">
                  <label htmlFor="whatsapp" className="text-gray-700">
                    Whatsapp
                  </label>
                  <ToggleButton ativado={whatsappOn} setAtivado={setWhatsappOn} />
                </div>
                <div className="flex items-center justify-between border-2 p-1 rounded-md">
                  <label htmlFor="email" className="text-gray-700">
                    Email
                  </label>
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
        <h1 className="text-3xl font-bold text-gray-800 mt-14">Salas Fixas</h1>
        <img
          src="/images/imgMenuAdm/botao-adicionar.png"
          alt="botao mais"
          className="mr-10 mt-8 cursor-pointer w-24 h-24"
          onClick={() =>
            router.push(`/administracao/cadastroAmbiente?nif=${nif}`)
          }
        />
      </div>
    </div >
  );
};

export default ConfigInicial; 