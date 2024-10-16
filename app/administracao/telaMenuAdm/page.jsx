"use client"
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import TopicosMenu from '@/app/components/topicosMenu/TopicosMenu';
import Header from '@/app/components/header/Header';
import api from '../../../src/config/configApi';




    return (
        user && user.adm ? (
            <div className="items-center justify-center min-h-screen">
                <Header />
          
            {/* menu de opções tela cinza */}
            <div className="flex justify-center ml-40 mr-40 mt-4 mb-4 p-10 rounded-md bg-zinc-300 border-4 border-red-500">
                {/* topicos com navegacao */}
                <div className="grid grid-cols-2 gap-10">
                    <TopicosMenu
                        topicos="Monitoração de ambientes"
                        imgSrc="/images/imgMenuAdm/monitoracao.png"
                    />
                    <TopicosMenu topicos="Gestão de  ambientes" imgSrc="/images/imgMenuAdm/gestaol.png"
                      onClick={() => router.push('/administracao/gestaoAmbiente')}
                     />
                    <TopicosMenu topicos="Gestão de funcionários" imgSrc="/images/imgMenuAdm/gestaof.png" />
                    <TopicosMenu topicos="Reserva de ambientes" imgSrc="/images/imgMenuAdm/reservaicon.png" />
                    <TopicosMenu topicos="Controle de informações" imgSrc="/images/imgMenuAdm/painel.png" />

                <h1 className="font-extrabold text-2xl text-center mt-4">O que deseja fazer?</h1>
                <div className="flex justify-center ml-40 mr-40 mt-4 mb-4 p-10 rounded-md bg-zinc-300 border-4 border-red-500">
                    <div className="grid grid-cols-2 gap-10">
                        <TopicosMenu
                            topicos="Monitoração de ambientes"
                            imgSrc="/images/imgMenuAdm/monitoracao.png"
                            onClick={() => router.push('/administracao/cadastroAmbiente')}
                        />
                        <TopicosMenu topicos="Gestão de  ambientes" imgSrc="/images/imgMenuAdm/gestaol.png" />
                        <TopicosMenu topicos="Gestão de funcionários" imgSrc="/images/imgMenuAdm/gestaof.png" />
                        <TopicosMenu topicos="Reserva de ambientes" imgSrc="/images/imgMenuAdm/reservaicon.png" />
                        <TopicosMenu topicos="Controle de informações" imgSrc="/images/imgMenuAdm/painel.png" />
                    </div>

                </div>
            </div>
        ) : null
    );
}

export default TelaMenuAdm;
