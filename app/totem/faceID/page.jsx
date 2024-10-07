'use client'

import React, { useEffect, useRef, useState } from 'react';
import Image from "next/image";
import api from "../../../src/config/configApi";
import * as faceapi from "face-api.js";

const faceID = () => {
  const [funcionarios, setFuncionarios] = useState([]);
  const videoRef = useRef(null);

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

  useEffect(() => {
    const startVideo = async () => {
      try {
        const response = await api.get("/usuarios");
        setFuncionarios(response.data)
        console.log(funcionarios)
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
          />
        </div>
      </div>
      <p className='text-white text-4xl text-center mt-20'>Aguarde alguns instantes...</p>
    </div>
  );
};

export default faceID;