"use client"
import BasicModal from "@/app/components/modal/modal";
import Header from "@/app/components/header/Header";
import { useEffect, useState } from "react";
import api from "../../../src/config/configApi";

const PaginaModal = ({ params }) => {
    const { nif } = params;
    const [user, setUser] = useState({})

    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await api.get("/usuarios/" + nif)
                setUser(response.data)
            } catch (error) {
                console.error("Erro ao acessar a câmera: ", err);
            }
        }
    })

    return(
    <div className=" bg-white h-screen">
        <Header />
        
        <BasicModal/>
    </div>

    
    )
};

export default PaginaModal