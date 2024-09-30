//Necessários
"use client";

//Importações
import { useState, useEffect } from "react";
import Image from "next/image";
import api from "../src/config/configApi";
import * as faceapi from "face-api.js";

//Criando Página
const InputComponent = () => {
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

  //Função de Registro de Dados
  const uploadImage = async (e) => {
    e.preventDefault();
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
      } else {
        console.log("No face detected");
      }
    } catch (err) {
      if (err.response) {
        console.log(err.response);
      } else {
        console.log("Erro, tente novamente mais tarde.");
      }
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
    <div style={styles.container}>
      {/* Formulário de Cadastro de Usuário */}
      <form onSubmit={uploadImage}>
        {/* Campo de Imagem */}
        <label style={styles.label}>Imagem:</label>
        <input
          type="file"
          name="image"
          onChange={handleImageChange}
          style={styles.input}
        />

        {/* Campo de Nif */}
        <label style={styles.label}>Nif:</label>
        <input
          type="number"
          name="nif"
          value={nif}
          onChange={(e) => setNif(e.target.value)}
          style={styles.input}
        />

        {/* Campo de Nome */}
        <label style={styles.label}>Nome:</label>
        <input
          type="text"
          name="nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          style={styles.input}
        />

        {/* Campo de Telefone */}
        <label style={styles.label}>Telefone:</label>
        <input
          type="number"
          name="telefone"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          style={styles.input}
        />

        {/* Campo de Email */}
        <label style={styles.label}>Email:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        {/* Botão Para Envio */}
        <button type="submit">Enviar</button>

        {/* Pré-visualização da Imagem */}
        {preview && (
          <div style={styles.imageContainer}>
            <Image
              src={preview}
              alt="Imagem pré-visualizada"
              width={300}
              height={300}
              style={styles.image}
            />
          </div>
        )}
      </form>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
  },
  label: {
    fontSize: "16px",
    marginBottom: "10px",
    display: "block",
  },
  input: {
    height: "30px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "5px 10px",
    marginBottom: "20px",
    width: "100%",
    maxWidth: "300px",
  },
  imageContainer: {
    marginTop: "20px",
  },
  image: {
    borderRadius: "10px",
  },
};

export default InputComponent;
