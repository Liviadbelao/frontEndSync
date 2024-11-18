"use client";

// Importações
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import Image from "next/image";
import api from "../../../src/config/configApi";
import * as faceapi from "face-api.js";
import Header from "@/app/components/header/Header";
import Input from "@/app/components/input/input";
import SendButton from "@/app/components/sendButton/SendButton";
import TelaCarregar from "@/app/components/telaCarregar/telaCarregar";

// Criando Página
const EditarUsuarioPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nif = searchParams.get('nif');
  const nifEdit = searchParams.get('nifEdit');

  const [image, setImage] = useState(null);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [notification, setNotification] = useState(false);
  const [notiwhere, setNotiwhere] = useState(0);
  const [adm, setAdm] = useState(true);
  const [preview, setPreview] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [carregando, setCarregando] = useState(false);

  // Importando dados API
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

  // Caso nif não seja de um usuário ADM
  useEffect(() => {
    if (!loading) {
      if (!user || !user.adm) {
        alert("Nenhum usuário com esse NIF encontrado, redirecionando para login.");
        router.push("/administracao/login");
      }
    }
  }, [loading, user, router]);

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const response = await api.get(`/usuarios/${nifEdit}`);
        const usuario = response.data;

        setNome(usuario.nome);
        setEmail(usuario.email);
        setTelefone(usuario.telefone);
        setAdm(usuario.adm);
        setPreview(usuario.caminho_imagem ? `http://localhost:3033${usuario.caminho_imagem}` : null);
      } catch (error) {
        console.error("Erro ao buscar o usuário:", error);
      }
    };

    if (nifEdit) {
      fetchUsuario();
    }
  }, [nifEdit]);

  // Função de Reconhecimento Facial
  useEffect(() => {
    Promise.all([
      faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
      faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
      faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
    ])
      .then(() => {
        console.log("Models loaded");
      })
      .catch((error) => {
        console.error("Failed to load models:", error);
      });
  }, []);

  const LimparInputs = () => {
    setImage(null);
    setNome("");
    setEmail("");
    setTelefone("");
    setAdm(false);
    setPreview("");
  };

  // Função de Registro de Dados
  const uploadImage = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("nome", nome);
    formData.append("email", email);
    formData.append("telefone", telefone);
    formData.append("adm", adm);
    formData.append("notificacao", notification);
    formData.append("notiwhere", notiwhere);
    formData.append("image", image);

    try {
      const img = await faceapi.fetchImage(preview);
      const detection = await faceapi
        .detectSingleFace(img)
        .withFaceLandmarks()
        .withFaceDescriptor();

      if (detection) {
        const descriptor = detection.descriptor.join(",");
        formData.append("descriptor", descriptor);

        await api.put(`/usuarios/${nifEdit}`, formData);
      } else {
        console.log("No face detected");
      }
    } catch (err) {
      console.error("Erro:", err);
    } finally {
      setLoading(false);
      LimparInputs();
    }

    router.push(`/administracao/gestaoUsuario/?nif=${nif}`);
  };

  // Função de Pré-visualização de imagem
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  return (
    <div className="bg-white flex flex-col">
      <Header />
      <img
        src="/images/imgMenuAdm/btvoltar.png"
        alt="botao voltar"
        className="mr-10 cursor-pointer w-10 h-10 ml-10 mt-10"
        onClick={() => router.push(`/administracao/gestaoUsuario?nif=${nif}`)}
        title="Voltar à gestão de usuários"
      />

      <div className="flex flex-col items-center justify-center">
        <div className="mb-24 mt-10">
          <p className="text-black text-3xl font-black">Editar usuário</p>
        </div>
        
        <form
          className="flex flex-col bg-[#D9D9D9] text-black w-[55%] border-2 border-red-500 items-center pt-6 mb-16 rounded-md"
          onSubmit={uploadImage}
        >
          <div className="w-[70%] m-2">
            <label className="font-bold">Nome:</label>
            <Input
              tipo="text"
              placeholder="Nome"
              valor={nome}
              onChange={(e) => setNome(e.target.value)}
              nome="nome"
            />
          </div>

          <div className="w-[70%] m-2">
            <label className="font-bold">Telefone:</label>
            <Input
              tipo="number"
              placeholder="Telefone"
              valor={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              nome="telefone"
            />
          </div>

          <div className="w-[70%] m-2">
            <label className="font-bold">Email:</label>
            <Input
              tipo="email"
              placeholder="Email"
              valor={email}
              onChange={(e) => setEmail(e.target.value)}
              nome="email"
            />
          </div>

          <div className="w-[70%] m-4 p-4 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition relative">
            <label className="text-gray-600 text-center mb-2">
              Selecione uma imagem do ambiente:
            </label>
            {/* Elemento invisível de input de arquivo */}
            <input
              type="file"
              onChange={handleImageChange}
              name="imagem"
              className="opacity-0 absolute inset-0 cursor-pointer"
            />
            <div className="text-gray-400 flex items-center space-x-2">
              {/* Ícone da imagem */}
              {
                preview ? (
                  null
                ) : (
                  <svg className="w-6 h-6 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                )
              }
              {/* Texto e seta à direita */}
              {preview ? null : <span className="text-gray-500">Clique para selecionar uma imagem</span>}
              <div className="border-r border-gray-300 h-8 mx-2"></div>
              {
                preview ? (
                  null
                ) : (
                  <svg className="w-6 h-6 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                )
              }
              {preview && (
                <div className="m-8 flex justify-center">
                  <Image
                    src={preview}
                    alt="Imagem pré-visualizada"
                    width={300}
                    height={300}
                    className="rounded-lg shadow-lg"
                  />
                </div>
              )}
            </div>
          </div>
          <div className="w-[70%] m-10">
            <label className="flex flex-column items-center justify-center cursor-pointer">
              <span className="text-gray-700 font-medium mr-3 text-xl">Administrador:</span>
              <div className="relative">
                <input
                  type="checkbox"
                  checked={adm}
                  onChange={(e) => setAdm(e.target.checked)}
                  className="sr-only" // Esconde o checkbox padrão
                />
                {/* Toggle Background */}
                <div
                  className={`w-12 h-6 bg-gray-300 rounded-full  shadow-inner 
          ${adm ? "bg-green-500" : "bg-gray-300"} transition-colors`}
                ></div>
                {/* Toggle Circle */}
                <div
                  className={` -mt-[20px] w-4 h-4 bg-white rounded-full shadow  left-1
          ${adm ? "transform translate-x-7" : ""} transition-transform`}
                ></div>
              </div>
            </label>
          </div>


          <SendButton />
        </form>
      </div>

      {loading && <TelaCarregar />}
    </div>
  );
};

export default EditarUsuarioPage;
