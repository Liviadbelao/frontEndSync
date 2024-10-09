"use client"
import React from "react";
import Header from "@/app/components/header/Header";
import GestaoUsuarios from "@/app/components/gestaoUsuarios/GestaoUsuarios";

const handleEdit = () => {
    console.log("Editar usuario");
}

const handleDelete = () => {
    console.log("Deletar usuario");
}

const gestaoUsuarios = () => {
    return (
        <div className=" bg-white min-h-screen flex flex-col overflow-y-auto ">
            <Header />
            <h1 className="text-black">Gestão de Usuarios</h1>

            <GestaoUsuarios 
              nome="Felipe Santos"
              cargo="Instrutor de ADS"
              imgGestor= "/images/imgGestores/DEVMASTER.jpg"
              onEdit={handleEdit}
              onDelete={handleDelete}/>
                </div>
    );
}

export default gestaoUsuarios;