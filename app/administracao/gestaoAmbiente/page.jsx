"use client"
import React from "react";
import Header from "@/app/components/header/Header";
import GestaoAmbientes from "@/app/components/gestaoAmbientes/GestaoAmbientes";

const handleEdit = () => {
    console.log("Editar ambiente");
}

const handleDelete = () => {
    console.log("Deletar ambiente");
}

const GestaoAmbiente = () => {
    return (
        <div>
            <Header />
            <h1>Gestão de Ambientes</h1>
            <GestaoAmbientes 
                    nome="Sala de Reuniões"
                    imgSrc="/images/imgMenuAdm/gestaof.png" 
                    imgSrc2="/images/imgMenuAdm/senaimaquina2.jpg" 
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
        </div>
    );
}

export default GestaoAmbiente;