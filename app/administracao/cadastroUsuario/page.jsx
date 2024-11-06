//Necessários
"use client";

//Importações
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
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
  const [nif01, setNif01] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [notification, setNotification] = useState(false);
  const [notiwhere, setNotiwhere] = useState(0);
  const [adm, setAdm] = useState(false);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const nif = searchParams.get('nif');

  const [errors, setErrors] = useState({}); // Estado para armazenar mensagens de erro

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
    setNif01("");
    setNome("");
    setEmail("");
    setTelefone("");
    setAdm(false);
    setPreview("");


  }
  //Função de Registro de Dados
  setImage(null);
  setNif("");
  setNome("");
  setEmail("");
  setTelefone("");
  setAdm(false);
  setPreview("");
  setErrors({});


// Função para validar os campos antes de enviar
const validateFields = () => {
  const newErrors = {};
  if (!nif) newErrors.nif = "O campo NIF é obrigatório!";
  if (!nome) newErrors.nome = "O campo Nome é obrigatório!";
  if (!email) newErrors.email = "O campo Email é obrigatório!";
  if (!telefone) {
    newErrors.telefone = "O campo Telefone é obrigatório!";
  } else if (telefone.length !== 11) {
    newErrors.telefone = "O telefone deve conter 11 números!";
  }
  if (!image) newErrors.image = "A imagem é obrigatória!";
  setErrors(newErrors);

  // Retorna true se não houver erros
  return Object.keys(newErrors).length === 0;
};

// Função de Registro de Dados
const uploadImage = async (e) => {
  e.preventDefault();

  // Verifica se os campos estão válidos antes de prosseguir
  if (!validateFields()) {
    return;
  }

  setLoading(true); // Inicia o loader

  const formData = new FormData();
  formData.append("nif", nif01);
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

      setLoading(false);
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
    LimparInputs(); // Limpa os campos após o envio
  }
};

// Função de Pré-visualização de imagem
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

// Limitar o campo de telefone a 11 dígitos
const handleTelefoneChange = (e) => {
  const value = e.target.value.replace(/\D/g, ""); // Remove qualquer caractere não numérico
  if (value.length <= 11) {
    setTelefone(value);
  }
};

// Corpo da Página
return (
  <div className="bg-white flex flex-col">
    <Header />
    <img
      src="/images/imgMenuAdm/btvoltar.png"
      alt="botao voltar"
      className="mr-10 cursor-pointer w-10 h-10 mt-2 ml-10"
      onClick={() => router.push(`/administracao/gestaoUsuario?nif=${nif}`)}
    />

    <div className="flex flex-col items-center justify-center">
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
          {errors.nome && <span className="text-red-500">{errors.nome}</span>}
        </div>

        {/* Campo de Telefone */}
        <div className="w-[70%] m-2">
          <label>Telefone:</label>
          <Input
            tipo={"number"}
            placeholder={"telefone"}
            valor={telefone}
            onChange={handleTelefoneChange} // Usa a função para limitar os dígitos
            nome={"telefone"}
          />
          {errors.telefone && <span className="text-red-500">{errors.telefone}</span>}
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
          {errors.email && <span className="text-red-500">{errors.email}</span>}
        </div>

        {/* Campo de Nif */}
        <div className="w-[70%] m-2">
          <label>Nif:</label>
          <Input
            tipo={"number"}
            placeholder={"nif"}
            valor={nif01}
            onChange={(e) => setNif01(e.target.value)}
            nome={"nif"}
          />
          {errors.nif && <span className="text-red-500">{errors.nif}</span>}
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
          {errors.image && <span className="text-red-500">{errors.image}</span>}
        </div>

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

        {/* Campo de Administrador */}
        <label>Administrador : </label>
        <Input
          tipo={"checkbox"}
          placeholder={"Administrador"}
          onChange={(e) => setAdm(!adm)}
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
