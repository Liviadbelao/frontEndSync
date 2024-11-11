'use client'

import React, { useEffect, useRef, useState } from 'react';
import Image from "next/image";
import api from "../../../src/config/configApi";
import * as faceapi from "face-api.js";
import { useRouter } from 'next/navigation';

const faceID = () => {

  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [funcionarios, setFuncionarios] = useState([]);
  const videoRef = useRef(null);

  // Carregar modelos do face-api.js
  useEffect(() => {
    const loadModels = async () => {
      try {
        await Promise.all([
          faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
          faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
          faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
        ]);
        console.log("Modelos carregados com sucesso");
      } catch (error) {
        console.error("Erro ao carregar os modelos:", error);
      }
    };
    loadModels();
  }, []);

  // Função para capturar o vídeo
  useEffect(() => {
    let stream;
    
    const startVideo = async () => {
      try {
        const response = await api.get("/usuarios");
        setFuncionarios(response.data);
        console.log("Funcionários carregados", response.data);
  
        // Iniciar captura do vídeo
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Erro ao acessar a câmera: ", err);
      }
    };
  
    startVideo();
  
    // Função de limpeza para parar o stream da câmera
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // Função para processar vídeo e fazer reconhecimento de uma única face
  useEffect(() => {
    let intervalId;
    
    const recognizeFace = async () => {
      if (!videoRef.current) return;
  
      const displaySize = { width: videoRef.current.width, height: videoRef.current.height };
      console.log(displaySize);
      console.log(videoRef.current);
      faceapi.matchDimensions(videoRef.current, displaySize);
  
      // Processar vídeo em intervalos para detectar apenas uma face
      intervalId = setInterval(async () => {
        if (!videoRef.current) return;  // Verifique se o vídeo ainda existe
  
        const detection = await faceapi.detectSingleFace(videoRef.current)
          .withFaceLandmarks()
          .withFaceDescriptor();
  
        if (detection && funcionarios.length > 0) {
          // Converter os descritores de string para array de números
          const faceMatcher = new faceapi.FaceMatcher(
            funcionarios.map(func => new faceapi.LabeledFaceDescriptors(
              func.nome,
              [new Float32Array(func.descriptor.split(",").map(Number))]
            ))
          );
  
          const resizedDetection = faceapi.resizeResults(detection, displaySize);
          const result = faceMatcher.findBestMatch(resizedDetection.descriptor);
  
          if (result.label !== "unknown") {
            console.log(`Bem-vindo, ${result}!`);
            // alert(`Bem-vindo, ${result.label}!`);
            const funcionario = funcionarios.find((f) => f.nome == result.label);
            
            router.push(`/totem/ambientes?nif=${funcionario.nif}`);
          }
        }
      }, 1000); // Verificação a cada 1 segundo
    };
  
    recognizeFace();
  
    // Limpeza ao desmontar o componente ou ao mudar de página
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [funcionarios]);  

  return (
    <div className="bg-[#9A1915] h-screen fixed w-screen">
    <div className="mt-20">
      <img src={"/images/logoSenai/logo.png"} width={200} height={300} className="m-auto" />
      <p className="text-white text-4xl text-center mt-10">Seja Bem Vindo!</p>
    </div>

    <div className="flex justify-center items-center mt-[20%] relative">
      {/* Loader sobre o vídeo */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="relative w-[540px] h-[540px] flex justify-center items-center">
            {/* Loader Circular com rotação */}
            <div className="relative w-[540px] h-[540px] border-4 border-[#3c3c3c] border-t-4 border-t-[#fff] border-solid rounded-full animate-spin">
              {/* Ponto no centro */}
              <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#fff] rounded-full shadow-lg"></span>
            </div>
          </div>
        </div>
      )}

      {/* Câmera visível o tempo todo, com z-index maior que o loader */}
      <div className="relative w-[500px] h-[500px] overflow-hidden rounded-full flex items-center justify-center z-20">
        <video
          className="relative z-30 w-full h-full object-cover rounded-full"
          ref={videoRef}
          autoPlay
          muted
          width={500}
          height={500}
        />
      </div>
    </div>

    <p className="text-white text-4xl text-center mt-20">
      {loading ? 'Aguarde alguns instantes...' : 'Reconhecimento em andamento...'}
    </p>
  </div>
  );
};

export default faceID;