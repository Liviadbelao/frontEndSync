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
import { useRouter, useSearchParams } from "next/navigation";
import TelaCertinho from "@/app/components/telaCertinho/TelaCertinho";
import Footer from "@/app/components/footer/Footer";


//Criando Página
const InputComponent = () => {
  hourglass.register();
  //Criando Estados
  const [image, setImage] = useState(null);
  const [nif, setNif] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const [notification, setNotification] = useState(false);
  const [notiwhere, setNotiwhere] = useState(0);
  const [adm, setAdm] = useState(false);
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({}); // Estado para armazenar mensagens de erro
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [carregando, setCarregando] = useState(false)
  const router = useRouter();
  const searchParams = useSearchParams();
  const nif2 = searchParams.get("nif");

  //Importando dados API
  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await api.get(`/usuarios/${nif2}`);
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

    if (nif2) {
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
    setErrors({});
  };

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
      LimparInputs(); // Limpa os campos após o envio
      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
        router.push(`/administracao/gestaoUsuario?nif=${nif2}`);
      }, 2000);
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
      {showSuccess && <TelaCertinho onClose={() => setShowSuccess(false)} />}
      <img
        src="/images/imgMenuAdm/btvoltar.png"
        alt="botao voltar"
        className="mr-10 cursor-pointer w-10 h-10 ml-10 mt-10"
        onClick={() => router.push(`/administracao/gestaoUsuario?nif=${nif2}`)}
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
            <label className="font-bold">Nome:</label>
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
            <label className="font-bold">Telefone:</label>
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
            <label className="font-bold">Email:</label>
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
            <label className="font-bold">Nif:</label>
            <Input
              tipo={"number"}
              placeholder={"nif"}
              valor={nif}
              onChange={(e) => setNif(e.target.value)}
              nome={"nif"}
            />
            {errors.nif && <span className="text-red-500">{errors.nif}</span>}
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
          {/* Campo de Administrador */}
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


          {/* Loader */}
          <SendButton />
        </form>
      </div>
      {loading && <TelaCarregar />}
      <Footer/>
    </div>
  );
};

export default InputComponent;
