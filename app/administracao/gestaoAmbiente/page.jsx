"use client"
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import Header from "@/app/components/header/Header";
import GestaoAmbientes from "@/app/components/gestaoAmbientes/GestaoAmbientes";
import ConcluirExclusao from "@/app/components/concluirExclusao/concluirExclusao";
import api from '../../../src/config/configApi';
import { FaSearch } from "react-icons/fa";
import Footer from "@/app/components/footer/Footer";
import ModalAmbiente from "@/app/components/modalAmbiente/ModalAMbiente";
const handleEdit = () => {
    console.log("Editar ambiente");
}

const GestaoAmbiente = () => {
    const [dados, setDados] = useState([]); // Dados dos ambientes
    const [selectedAmbiente, setSelectedAmbiente] = useState(null); // Ambiente selecionado para o modal
    const [excluirClicado, setExcluirClicado] = useState(false);
    const [ambienteParaExcluir, setAmbienteParaExcluir] = useState(null);
    const [filtro, setFiltro] = useState('');
    const [user, setUser] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);

    const router = useRouter();
    const searchParams = useSearchParams();
    const nif = searchParams.get("nif");

    const abrirModal = (ambiente) => {
        setSelectedAmbiente(ambiente); // Configura o ambiente selecionado
        setShowModal(true); // Exibe o modal
    };

    const fecharModal = () => {
        setShowModal(false); // Fecha o modal
        setSelectedAmbiente(null); // Reseta os dados do ambiente
    };

    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await api.get(`/usuarios/${nif}`);
                if (response.data) {
                    setUser(response.data);
                } else {
                    setUser(null);
                }
            } catch (error) {
                console.error("Erro ao buscar o usuário: ", error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        }

        if (nif) {
            fetchUser();
        } else {
            setLoading(false);
        }
    }, [nif]);

    useEffect(() => {
        async function fetchAmbientes() {
            try {
                const response = await api.get(`/ambientes`);
                setDados(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchAmbientes();
    }, []);

    const handleDeleteClick = (ambientes) => {
        if (ambientes.disponivel == false) {
            alert("O ambiente não está disponível para exclusão.");
            return;
        }
        setAmbienteParaExcluir(ambientes);
        setExcluirClicado(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await api.delete(`/ambientes/${ambienteParaExcluir.numero_ambiente}`);
            setDados(dados.filter((u) => u.numero_ambiente !== ambienteParaExcluir.numero_ambiente));
        } catch (error) {
            console.error("Erro ao excluir o ambiente: ", error);
        } finally {
            setExcluirClicado(false);
        }
    };

    const handleEditClick = (ambiente) => {
        router.push(`/administracao/editarAmbiente/?nif=${nif}&id=${ambiente.numero_ambiente}`);
    };

    const ambientesFiltrados = dados.filter(ambiente =>
        ambiente.nome.toLowerCase().includes(filtro.toLowerCase())
    );

    if (loading) {
        return <div>Carregando...</div>;
    }

    return (
        <div className="bg-white min-h-screen">
            <Header />
            <img
                src="/images/imgMenuAdm/btvoltar.png"
                alt="botao voltar"
                className="mr-10 cursor-pointer w-10 h-10 mt-10 ml-10"
                onClick={() => router.push(`/administracao/telaMenuAdm?nif=${nif}`)}
            />
            <h1 className="text-black text-center text-3xl font-bold mt-2 mb-6">Gestão de Ambientes</h1>

            <div className="flex gap-2 shadow-lg w-[50%] h-[40%] mx-auto my-10 mb-8 border border-[#808080]-600 p-2 rounded-full">
                <FaSearch className="text-[#9A1915] m-auto ml-2" />
                <input
                    type="text"
                    placeholder="Filtrar por nome do ambiente"
                    value={filtro}
                    onChange={(e) => setFiltro(e.target.value)}
                    className="focus:outline-none w-full text-black"
                />
            </div>
            <div className="grid lg:grid-cols-4 gap-10 ml-16">

        <div className="flex items-center ml-10 mb-4">
          <img
             src="/images/imgMenuAdm/botao-adicionar.png"
            alt="botao mais"
            className="mr-10 mt-8 cursor-pointer w-32 h-32"
          onClick={() => router.push(`/administracao/cadastroAmbiente?nif=${nif}`)} 
          />
        </div>
           

                {ambientesFiltrados && ambientesFiltrados.length > 0 ? (
                    ambientesFiltrados.map((ambiente) => (
                        <GestaoAmbientes
                            key={ambiente.numero_ambiente}
                            nome={ambiente.nome}
                            imgSrc2={`http://localhost:3033${ambiente.caminho_imagem}`}
                            onEdit={(event) => {
                                event.stopPropagation(); // Previne a abertura do modal
                                handleEditClick(ambiente);
                            }}
                            onDelete={(event) => {
                                event.stopPropagation(); // Previne a abertura do modal
                                handleDeleteClick(ambiente);
                            }}
                            on={() => abrirModal(ambiente)} // Apenas o card abre o modal
                        />
                    ))
                ) : (
                    <p className="text-center text-gray-500">Nenhum ambiente encontrado</p>
                )}
        
                 </div>


            {excluirClicado && (
                <ConcluirExclusao
                    onClose={() => setExcluirClicado(false)}
                    onConfirm={handleConfirmDelete}
                    img={`http://localhost:3033${ambienteParaExcluir.caminho_imagem}`}
                    name={ambienteParaExcluir.nome}
                />
            )}

            {showModal && selectedAmbiente && (
                <ModalAmbiente
                    nome={selectedAmbiente.nome}
                    numero_ambiente={selectedAmbiente.numero_ambiente}
                    caminho_imagem={`http://localhost:3033${selectedAmbiente.caminho_imagem}`}
                    chave={selectedAmbiente.chave}
                    capacidadeAlunos={selectedAmbiente.capacidadeAlunos}
                    tipodoambiente={selectedAmbiente.tipodoambiente}
                    ar_condicionado={selectedAmbiente.ar_condicionado}
                    ventilador={selectedAmbiente.ventilador}
                    wifi={selectedAmbiente.wifi}
                    projetor={selectedAmbiente.projetor}
                    chave_eletronica={selectedAmbiente.chave_eletronica}
                    disponivel={selectedAmbiente.disponivel}
                    categoria={selectedAmbiente.categoria}
                    fechar={fecharModal}
                />
            )}

            <Footer />
        </div>
    );
};

export default GestaoAmbiente;
