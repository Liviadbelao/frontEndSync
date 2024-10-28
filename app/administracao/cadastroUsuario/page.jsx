//Necessários
"use client";

//Importações
import { useState, useEffect } from "react";
import Image from "next/image";
import api from "../../../src/config/configApi";
import * as faceapi from "face-api.js";
import Header from "@/app/components/header/Header";
import Input from "@/app/components/input/input";
import SendButton from "@/app/components/sendButton/SendButton";
import "ldrs/ring";
import { hourglass } from "ldrs";
import TelaCarregar from "@/app/components/telaCarregar/telaCarregar";

//Criando Página
const InputComponent = () => {
  hourglass.register();
  //Criando Estados
  const [image, setImage] = useState(null);
  const [nif, setNif] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [notification, setNotification] = useState(false);
  const [notiwhere, setNotiwhere] = useState(0);
  const [adm, setAdm] = useState(false);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  //Função de Reconhecimento Facial
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
 setNif("");
 setNome("");
 setEmail("");
setTelefone("");
  setAdm(false);
 setPreview("");


  }
  //Função de Registro de Dados
  const uploadImage = async (e) => {
    e.preventDefault();
    setLoading(true); // Inicia o loader

    const formData = new FormData();
    formData.append("nif", nif);
    formData.append("nome", nome);
    formData.append("email", email);
    formData.append("telefone", telefone);
    formData.append("adm", adm);
    formData.append("notification", notification);
    formData.append("notiwhere", notiwhere);
    formData.append("image", image);

    try {
      const img = await faceapi.fetchImage(preview);
      const detection = await faceapi
        .detectSingleFace(img)
        .withFaceLandmarks()
        .withFaceDescriptor();

      if (detection) {
        const descriptors = detection.descriptor;

        const descriptor = descriptors.join(",");

        formData.append("descriptor", descriptor);
        console.log("Face descriptors:", descriptors.join(","));
        const response = await api.post("/usuarios", formData);
        console.log(response);
    setLoading(false); // Inicia o loader

      } else {
        console.log("No face detected");
      }
    } catch (err) {
      if (err.response) {
        console.log(err.response);
      } else {
        console.log("Erro, tente novamente mais tarde." + err);
      }
    } finally {
      setLoading(false);
      LimparInputs(); // Para o loader após completar o envio
    }
  };

  //Função de Pré-visualização de imagem
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    console.log(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  //Corpo da Página
  return (
    /* Div Principal */

    <div className="bg-white flex flex-col">
      <Header />
      <div className="flex flex-col items-center justify-center">
        {/* Formulário de Cadastro de Usuário */}
        <div className="mb-24 mt-10">
          <text className="text-black text-3xl font-black">
            Cadastrar usuário
          </text>
        </div>
        <form
          className="flex flex-col bg-[#D9D9D9] text-black w-[55%] border-2 border-red-500 items-center pt-6 mb-16 rounded-md"
          onSubmit={uploadImage}
        >
          {/* Campo de Nome */}
          <div className="w-[70%] m-2">
            <label>Nome:</label>

            <Input
              tipo={"text"}
              placeholder={"Nome"}
              valor={nome}
              onChange={(e) => setNome(e.target.value)}
              nome={"nome"}
            />
          </div>

          {/* Campo de Telefone */}
          <div className="w-[70%] m-2">
            <label>Telefone:</label>
            <Input
              tipo={"number"}
              placeholder={"telefone"}
              valor={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              nome={"telefone"}
            />
          </div>

          {/* Campo de Email */}
          <div className="w-[70%] m-2">
            <label>Email:</label>
            <Input
              tipo={"email"}
              placeholder={"email"}
              valor={email}
              onChange={(e) => setEmail(e.target.value)}
              nome={"email"}
            />
          </div>

          {/* Campo de Nif */}
          <div className="w-[70%] m-2">
            <label>Nif:</label>
            <Input
              tipo={"number"}
              placeholder={"nif"}
              valor={nif}
              onChange={(e) => setNif(e.target.value)}
              nome={"nif"}
            />
          </div>

          {/* Campo de Imagem */}
          <div className="w-[70%] m-2">
            <label>Imagem:</label>
            <Input
              tipo={"file"}
              placeholder={"image"}
              onChange={handleImageChange}
              nome={"imagem"}
            />
          </div>
          {/* Botão Para Envio */}

          {/* Pré-visualização da Imagem */}
          {preview && (
            <div className="m-8">
              <Image
                src={preview}
                alt="Imagem pré-visualizada"
                width={300}
                height={300}
              />
            </div>
          )}

          <label>Administrador : </label>
          <Input
            tipo={"checkbox"}
            placeholder={"Administrador"}
            onChange={(e) => {
              if (adm) {
                setAdm(false);
              } else {
                setAdm(true);
              }
            }}
            nome={"ADM"}
          />
          {/* Loader */}
          <SendButton />
        </form>

      </div>
      {loading && <TelaCarregar />}
    </div>
  );
};

export default InputComponent;
