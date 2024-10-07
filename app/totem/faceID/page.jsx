'use client'

import React, { useEffect, useRef } from 'react';
import Image from "next/image";

const faceID = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const startVideo = async () => {
      try {
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