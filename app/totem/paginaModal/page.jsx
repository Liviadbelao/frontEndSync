"use client"
import BasicModal from "@/app/components/modal/modal";
import Header from "@/app/components/header/Header";
import { useEffect, useState } from "react";
import api from "../../../src/config/configApi";
import { useSearchParams } from "next/navigation";

const PaginaModal = () => {
    const searchParams = useSearchParams();
    const nif = searchParams.get('nif');
    const [user, setUser] = useState({});

    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await api.get(`/usuarios/${nif}`);
                setUser(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Erro ao buscar o usuário: ", error);
            }
        }

        if (nif) {
            fetchUser(); // Apenas chama a função se o `nif` estiver disponível
        }
    }, [nif]); // Adiciona `nif` como dependência para chamar o useEffect quando mudar

    return (
        <div className="bg-white h-screen">
            <Header />
            <BasicModal />
        </div>
    );
};

export default PaginaModal;
