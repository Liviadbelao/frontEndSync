"use client"

import ContagemRegressiva from "@/app/components/contagemRegressiva/ContagemRegressiva";
import Header from "@/app/components/header/Header";
import { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation'; // Importando para pegar o searchParams da URL

const ContagemRegressivaTela = () => {
    const [user, setUser] = useState(null);
    const searchParams = useSearchParams(); // Pega os parâmetros da URL
    const nif = searchParams.get('nif'); // Obtenha o nif da URL

    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await api.get(`/usuarios/${nif}`);
                if (response.data.length > 0) {
                    setUser(response.data[0]);
                } else {
                    setUser(null);
                }
            } catch (error) {
                console.error("Erro ao buscar o usuário: ", error);
                setUser(null);
            }
        }

        if (nif) {
            fetchUser();
        } else {
            setUser(null);
        }
    }, [nif]);

    return (
        <div className="bg-white h-screen">
            {/* Passando o nif corretamente para o componente ContagemRegressiva */}
            <ContagemRegressiva nif={nif} />
        </div>
    );
};

export default ContagemRegressivaTela;
