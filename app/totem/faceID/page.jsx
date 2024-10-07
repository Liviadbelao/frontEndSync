'use client'

import React, { useEffect, useRef, useState } from 'react';
import Image from "next/image";
import api from "../../../src/config/configApi";
import * as faceapi from "face-api.js";

const faceID = () => {
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
    const startVideo = async () => {
      try {
        const response = await api.get("/usuarios");
        setFuncionarios(response.data);
        console.log("Funcionários carregados", response.data);

        // Iniciar captura do vídeo
        const stream = await navigator.mediaDevices.getUserMedia({
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
  }, []);

  // Função para processar vídeo e fazer reconhecimento de uma única face
  useEffect(() => {
    const recognizeFace = async () => {
      if (!videoRef.current) return;

      const displaySize = { width: videoRef.current.width, height: videoRef.current.height };
      console.log(displaySize)
      console.log(videoRef.current)
      faceapi.matchDimensions(videoRef.current, displaySize);

      // Processar vídeo em intervalos para detectar apenas uma face
      const intervalId = setInterval(async () => {
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
            console.log(`Bem-vindo, ${result.label}!`);
            alert(`Bem-vindo, ${result.label}!`);
          }
        }
      }, 2000); // Verificação a cada 2 segundos

      return () => clearInterval(intervalId);
    };

    recognizeFace();
  }, [funcionarios]);

  return (
    <div className='bg-[#9A1915] h-screen fixed w-screen'>
      <div className='mt-20 '>
        <img src={"/images/logoSenai/logo.png"} width={200} height={300} className='m-auto'/>
        <p className='text-white text-4xl text-center mt-10'>Seja Bem Vindo!</p>
      </div>
      <div className="flex justify-center items-center mt-[20%]">
        <div className="w-[500px] h-[500px] overflow-hidden rounded-full border-4 border-white flex items-center justify-center">
          <video 
            className="w-full h-full object-cover" 
            ref={videoRef} 
            autoPlay 
            muted
            width={200}
            height={200}
          />
        </div>
      </div>
      <p className='text-white text-4xl text-center mt-20'>Aguarde alguns instantes...</p>
    </div>
  );
};

export default faceID;