'use client';

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import api from "../../../src/config/configApi";
import Header from '@/app/components/header/Header';
import Input from "@/app/components/input/input";
import Image from "next/image";
import SendButton from "@/app/components/sendButton/SendButton";
import TelaCarregar from "@/app/components/telaCarregar/telaCarregar";

const EditAmbiente = () => {
    const [nome, setNome] = useState("");
    const [imagem, setImagem] = useState("");
    const [capacidade, setCapacidade] = useState(0);
    const [categorias, setCategorias] = useState([]);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState("");
    const [disponivel, setDisponivel] = useState(true);
    const [numeroAmbiente, setNumeroAmbiente] = useState(1);
    const [chave, setChave] = useState(false);
    const [tipodoambiente, setTipodoambiente] = useState("");
    const [arcondicionado, setArcondicionado] = useState(false);
    const [ventilador, setVentilador] = useState(false);
    const [wifi, setWifi] = useState(false);
    const [projetor, setProjetor] = useState(false);
    const [chaveeletronica, setChaveeletronica] = useState(false);
    const [maquinas, setMaquinas] = useState(0);
    const [numerochave, setNumerochave] = useState(0);
    const [loading, setLoading] = useState(true);
    const [preview, setPreview] = useState(null);

    const router = useRouter();
    const searchParams = useSearchParams();
    const ambienteId = searchParams.get('id');
    const nif = searchParams.get('nif');

    useEffect(() => {
        async function fetchAmbiente() {
            try {
                const response = await api.get(`/ambientes/${ambienteId}`);
                const ambiente = response.data;
                setNome(ambiente.nome);
                setPreview(ambiente.caminho_imagem ? `http://localhost:3033${ambiente.caminho_imagem}` : null);
                setCapacidade(ambiente.capacidadealunos);
                setCategoriaSelecionada(ambiente.categoria);
                setDisponivel(ambiente.disponivel);
                setNumeroAmbiente(ambiente.numero_ambiente);
                setTipodoambiente(ambiente.tipodoambiente);
                setMaquinas(ambiente.maquinas);
                setChave(ambiente.chave);
                setNumerochave(ambiente.numero_ambiente);
                setArcondicionado(ambiente.ar_condicionado);
                setVentilador(ambiente.ventilador);
                setWifi(ambiente.wifi);
                setProjetor(ambiente.projetor);
                setChaveeletronica(ambiente.chave_eletronica);
            } catch (error) {
                console.error("Erro ao buscar o ambiente: ", error);
            } finally {
                setLoading(false);
            }
        }

        if (ambienteId) fetchAmbiente();
    }, [ambienteId]);

    const handleUpdateAmbiente = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append("nome", nome);
        formData.append("numero_ambiente", numeroAmbiente);
        formData.append("chave", chave);
        formData.append("capacidadeAlunos", capacidade || 0);
        formData.append("tipodoambiente", tipodoambiente);
        formData.append("ar_condicionado", arcondicionado);
        formData.append("ventilador", ventilador);
        formData.append("wifi", wifi);
        formData.append("projetor", projetor);
        formData.append("chave_eletronica", chaveeletronica);
        formData.append("maquinas", maquinas || 0);
        formData.append("disponivel", disponivel);
        formData.append("categoria", categoriaSelecionada);
        formData.append("image", imagem);

        try {
            const response = await api.put(`/ambientes/${ambienteId}`, formData);
            console.log(response);
            router.push(`/administracao/gestaoAmbiente?nif=${nif}`);
        } catch (err) {
            console.error("Erro ao atualizar o ambiente:", err);
        } finally {
            setLoading(false);
            limparInputs();
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImagem(file);
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    const limparInputs = () => {
        setNome("");
        setImagem("");
        setCapacidade(0);
        setCategoriaSelecionada("");
        setDisponivel(true);
        setNumeroAmbiente(0);
        setTipodoambiente("");
        setMaquinas(0);
        setNumerochave(0);
        setPreview(null);
    };

    useEffect(() => {
        async function fetchCategorias() {
            try {
                const response = await api.get("/categorias");
                setCategorias(response.data);
            } catch (error) {
                console.error("Erro ao buscar categorias:", error);
            }
        }
        fetchCategorias();
    }, []);

    if (loading) return <TelaCarregar />;

    return (
        <div className="bg-white min-h-screen flex flex-col overflow-y-auto">
            <Header />
            <img
                src="/images/imgMenuAdm/btvoltar.png"
                alt="botao voltar"
                className="mr-10 cursor-pointer w-10 h-10 ml-10 mt-10"
                onClick={() => router.push(`/administracao/gestaoAmbiente?nif=${nif}`)}
            />

            <div className="flex flex-col items-center justify-center">
                <p className="font-normal md:font-bold mt-40 text-2xl">Edição de Ambiente</p>
                <form
                    className="flex flex-col bg-[#D9D9D9] text-black w-[55%] border-2 border-red-500 items-center pt-6 mb-16 rounded-md"
                    onSubmit={handleUpdateAmbiente}
                >
                    <div className="w-[70%] m-2">
                        <label>Nome do ambiente:</label>
                        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
                    </div>

                    <div className="w-[70%] m-2">
                        <label>Imagem:</label>
                        <Input
                            tipo={"file"}
                            placeholder={"image"}
                            onChange={handleImageChange}
                            nome={"imagem"}
                        />
                    </div>
                    {/* Botão Para Envio */}

                    {/* Pré-visualização da Imagem */}
                    {preview && (
                        <div className="m-8">
                            <Image
                                src={preview}
                                alt="Imagem pré-visualizada"
                                width={300}
                                height={300}
                            />
                        </div>
                    )}

                    <div className="w-[70%] m-2">
                        <label>Capacidade de alunos no ambiente:</label>
                        <input type="number" value={capacidade} onChange={(e) => setCapacidade(e.target.value)} />
                    </div>

                    <div className="w-[70%] m-2">
                        <label>Quantidade de máquinas:</label>
                        <input type="number" value={maquinas} onChange={(e) => setMaquinas(e.target.value)} />
                    </div>

                    <div className="w-[70%] m-2">
                        <label>Número do ambiente:</label>
                        <input type="number" value={numeroAmbiente} onChange={(e) => setNumeroAmbiente(e.target.value)} />
                    </div>

                    <div className="w-[70%] m-2">
                        <label>Categoria que o ambiente pertence:</label>
                        <select
                            value={categoriaSelecionada}
                            onChange={(e) => setCategoriaSelecionada(e.target.value)}
                        >
                            <option value="">Selecione uma categoria</option>
                            {categorias.map((categoria) => (
                                <option key={categoria.id} value={categoria.id}>
                                    {categoria.nome}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="w-[70%] m-2">
                        <label>Tipo do Ambiente:</label>
                        <select
                            value={tipodoambiente}
                            onChange={(e) => setTipodoambiente(e.target.value)}
                        >
                            <option value="">Selecione o tipo de ambiente</option>
                            <option value="blocooficina">Bloco Oficina</option>
                            <option value="externo">Externo</option>
                        </select>
                    </div>

                    <div className="w-[70%] m-2">
                        <label>Ar condicionado:</label>
                        <input type="checkbox" checked={arcondicionado} onChange={() => setArcondicionado(!arcondicionado)} />
                    </div>

                    <div className="w-[70%] m-2">
                        <label>Wi-fi:</label>
                        <input type="checkbox" checked={wifi} onChange={() => setWifi(!wifi)} />
                    </div>

                    <div className="w-[70%] m-2">
                        <label>Chave:</label>
                        <input type="checkbox" checked={chave} onChange={() => setChave(!chave)} />
                        {chave && (
                            <div>
                                <label>Número da chave:</label>
                                <input type="number" value={numerochave} onChange={(e) => setNumerochave(e.target.value)} />
                            </div>
                        )}
                    </div>

                    <div className="w-[70%] m-2">
                        <label>Projetor:</label>
                        <input type="checkbox" checked={projetor} onChange={() => setProjetor(!projetor)} />
                    </div>

                    <div className="w-[70%] m-2">
                        <label>Chave eletrônica:</label>
                        <input type="checkbox" checked={chaveeletronica} onChange={() => setChaveeletronica(!chaveeletronica)} />
                    </div>

                    <div className="w-[70%] m-2">
                        <label>Ventilador:</label>
                        <input type="checkbox" checked={ventilador} onChange={() => setVentilador(!ventilador)} />
                    </div>

                    <div className="w-[70%] m-2">
                        <label>Disponível:</label>
                        <input type="checkbox" checked={disponivel} onChange={() => setDisponivel(!disponivel)} />
                    </div>

                    <button type="submit" className="mt-4 p-2 bg-blue-500 text-white rounded-md">Salvar Alterações</button>
                </form>

            </div>
        </div>
    );
}

export default EditAmbiente;
