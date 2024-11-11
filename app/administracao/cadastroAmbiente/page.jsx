'use client';

import React, { useState, useEffect } from "react";
import Input from '../../components/input/input';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import api from "../../../src/config/configApi";
import SendButton from '@/app/components/sendButton/SendButton';
import Header from '@/app/components/header/Header';
import TelaCertinho from "@/app/components/telaCertinho/TelaCertinho";

const Ambiente = () => {
    const [nome, setNome] = useState("");
    const [imagem, setImagem] = useState("");
    const [capacidade, setCapacidade] = useState(0);
    const [categorias, setCategorias] = useState([]);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState("");
    const [disponivel, setDisponivel] = useState(true);
    const [chave, setChave] = useState(false);
    const [tipodoambiente, setTipodoambiente] = useState("");
    const [maquinas, setMaquinas] = useState(0);
    const [numerochave, setNumerochave] = useState(0);

    // Estados dos atributos
    const [arcondicionado, setArcondicionado] = useState(false);
    const [ventilador, setVentilador] = useState(false);
    const [wifi, setWifi] = useState(false);
    const [projetor, setProjetor] = useState(false);
    const [chaveeletronica, setChaveeletronica] = useState(false);

    const [atributePopUp, setAtributePopUp] = useState(false);

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState({});
    const [showSuccess, setShowSuccess] = useState(false);
    const [preview, setPreview] = useState(null);
    const router = useRouter();
    const searchParams = useSearchParams();
    const nif = searchParams.get('nif');

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
        if (!loading) {
            if (!user || !user.adm) {
                alert("Nenhum usuário com esse NIF encontrado, redirecionando para login.");
                router.push('/administracao/login');
            }
        }
    }, [loading, user, router]);

    const validateFields = () => {
        const newErrors = {};
        if (!nome) newErrors.nome = "O campo Nome é obrigatório!";
        if (!imagem) newErrors.imagem = "A imagem é obrigatória!";
        if (!capacidade) newErrors.capacidade = "A capacidade é obrigatória!";
        if (!categoriaSelecionada) newErrors.categoriaSelecionada = "A categoria é obrigatória!";
        if (!tipodoambiente) newErrors.tipodoambiente = "O tipo do ambiente é obrigatório!";
        if (chave && !numerochave) newErrors.numerochave = "O número da chave é obrigatório!";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const postAmbiente = async (e) => {
        e.preventDefault();

        if (!validateFields()) {
            return;
        }

        const formData = new FormData();
        formData.append("nome", nome);
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
            const response = await api.post("/ambientes", formData);
            formData.forEach((value, key) => console.log(key, value));
            if (chave) {
                console.log(response.data);
                let id = response.data.message;
                const params = {
                    id: numerochave,
                    disponivel: true,
                    salas: id
                };
                const chaveResponse = await api.post("/chaves", params);
            }
            limparInputs();
            setShowSuccess(true);

            setTimeout(() => {
                setShowSuccess(false);
                router.push(`/administracao/gestaoAmbiente?nif=${nif}`);
            }, 2000);

        } catch (err) {
            if (err.response) {
                console.log(err.response);
            } else {
                console.log("Erro, tente novamente mais tarde.");
            }
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImagem(file);
        setPreview(URL.createObjectURL(file));
    };

    const limparInputs = () => {
        setNome("");
        setImagem("");
        setCapacidade(0);
        setCategoriaSelecionada("");
        setDisponivel(true);
        setTipodoambiente("");
        setMaquinas(0);
        setNumerochave(0);
        setErrors({});
    };

    useEffect(() => {
        async function fetchCategorias() {
            try {
                const response = await api.get("/categorias");
                setCategorias(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchCategorias();
    }, []);

    return (
        <div className="bg-white min-h-screen flex flex-col overflow-y-auto ">
            <Header />
            {showSuccess && <TelaCertinho onClose={() => setShowSuccess(false)} />}
            <img
                src="/images/imgMenuAdm/btvoltar.png"
                alt="botao voltar"
                className="mr-10 cursor-pointer w-10 h-10 ml-10 mt-10"
                onClick={() => router.push(`/administracao/gestaoAmbiente?nif=${nif}`)}
            />

            <div className="flex flex-col items-center justify-center">
                <p className="font-normal md:font-bold mt-40 text-2xl">Cadastro de Ambiente</p>
                <form
                    className="flex flex-col bg-[#D9D9D9] text-black w-[55%] border-2 border-red-500 items-center pt-6 mb-16 "
                    onSubmit={postAmbiente}
                >
                    <div className="w-[70%] m-2">
                        <label className=" font-semibold">Nome do ambiente:</label>
                        <Input
                            tipo={"text"}
                            placeholder={"Nome"}
                            valor={nome}
                            onChange={(e) => setNome(e.target.value)}
                            nome={"nome"}
                        />
                        {errors.nome && <span className="text-red-500">{errors.nome}</span>}
                    </div>
                    <div className="w-[70%] m-4 p-4 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition relative">
                        <label className="font-semibold text-gray-600 text-center mb-2">
                            Selecione uma imagem do ambiente:
                        </label>
                        {/* Elemento invisível de input de arquivo */}
                        <input
                            type="file"
                            onChange={handleImageChange}
                            name="imagem"
                            className="opacity-0 absolute inset-0 cursor-pointer"
                        />
                        <div className="text-gray-400 flex items-center space-x-2">
                            {/* Ícone da imagem */}
                            {
                                preview ? (
                                    null
                                ) : (
                                    <svg className="w-6 h-6 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                )
                            }
                            {/* Texto e seta à direita */}
                            {preview ? null : <span className="text-gray-500">Clique para selecionar uma imagem</span>}
                            <div className="border-r border-gray-300 h-8 mx-2"></div>
                            {
                                preview ? (
                                    null
                                ) : (
                                    <svg className="w-6 h-6 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                )
                            }
                            {preview && (
                                <div className="m-8 flex justify-center">
                                    <Image
                                        src={preview}
                                        alt="Imagem pré-visualizada"
                                        width={300}
                                        height={300}
                                        className="rounded-lg shadow-lg"
                                    />
                                </div>
                            )}
                        </div>
                        {errors.imagem && <span className="text-red-500 mt-2">{errors.imagem}</span>}
                    </div>

                    <div className="w-[70%] m-2">
                        <label className=" font-semibold">Capacidade de alunos no ambiente:</label>
                        <Input
                            tipo={"number"}
                            placeholder={"Capacidade"}
                            valor={capacidade}
                            onChange={(e) => setCapacidade(e.target.value)}
                            nome={"capacidade"}
                        />
                        {errors.capacidade && <span className="text-red-500">{errors.capacidade}</span>}
                    </div>
                    <div className="w-[70%] m-2">
                        <label className=" font-semibold">Quantidade de máquinas:</label>
                        <Input
                            tipo={"number"}
                            placeholder={"Maquinas"}
                            valor={maquinas}
                            onChange={(e) => setMaquinas(e.target.value)}
                            nome={"maquinas"}
                        />
                    </div>
                    <div className="w-[70%] m-2">
                        <label className="font-semibold">Categoria:</label>
                        <div className="relative">
                            <select
                                value={categoriaSelecionada}
                                onChange={(e) => setCategoriaSelecionada(e.target.value)}
                                className="w-full pl-3 pr-10 py-2 border rounded-lg appearance-none bg-white text-gray-700 focus:outline-none"
                            >
                                <option value="">Selecione uma categoria</option>
                                {categorias.map((categoria) => (
                                    <option key={categoria.id} value={categoria.id}>
                                        {categoria.nome}
                                    </option>
                                ))}
                            </select>
                            <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <div className="border-r border-gray-300 h-5 mr-2"></div>
                                <svg className="w-5 h-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </span>
                        </div>
                        {errors.categoriaSelecionada && (
                            <span className="text-red-500">{errors.categoriaSelecionada}</span>
                        )}
                    </div>
                    <div className="w-[70%] m-2">
                        <label className="font-semibold">Tipo do ambiente:</label>
                        <div className="relative">
                            <select
                                value={tipodoambiente}
                                onChange={(e) => setTipodoambiente(e.target.value)}
                                className="w-full pl-3 pr-10 py-2 border rounded-lg appearance-none bg-white text-gray-700 focus:outline-none"
                            >
                                <option value="">Selecione o tipo do ambiente</option>
                                <option value="externo">Externo</option>
                                <option value="blocooficina">Interno</option>
                            </select>
                            <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <div className="border-r border-gray-300 h-5 mr-2"></div>
                                <svg className="w-5 h-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </span>
                        </div>
                        {errors.tipodoambiente && (
                            <span className="text-red-500">{errors.tipodoambiente}</span>
                        )}
                    </div>
                    <div className="w-[70%] m-2">
                        <label className="font-semibold">Chave:</label>
                        <div className="flex flex-col items-start">
                            <div
                                onClick={() => setChave(!chave)}
                                className={`p-2 rounded-lg font-semibold transition-colors cursor-pointer ${chave ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-red-500 text-gray-700 hover:bg-red-600'
                                    }`}
                            >
                                {chave ? 'Sim' : 'Não'}
                            </div>
                            {chave && (
                                <div className="mt-3 w-full">
                                    <label className="font-semibold">Número da chave:</label>
                                    <input
                                        type="number"
                                        placeholder="Número da chave"
                                        value={numerochave}
                                        onChange={(e) => setNumerochave(e.target.value)}
                                        name="numerochave"
                                        className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                    />
                                </div>
                            )}
                        </div>
                        {errors.numerochave && (
                            <span className="text-red-500 mt-2">{errors.numerochave}</span>
                        )}
                    </div>

                    <div className="w-[70%] m-2">
                        <label className=" font-semibold">Atributos:</label>
                        <hr className="border-0 border-t-2 border-red-500 w-full" />
                        <div className="flex flex-wrap">
                            {arcondicionado &&
                                <div className="flex items-center m-6 border-2 rounded-full border-black shadow-lg w-16">
                                    <Image
                                        src={"/icones/ar-condicionado.png"}
                                        alt="Imagem pré-visualizada"
                                        width={64}
                                        height={64}
                                        className="p-2"
                                    />
                                </div>

                            }
                            {ventilador &&
                                <div className="flex items-center m-6 border-2 rounded-full border-black shadow-lg w-16">
                                    <Image
                                        src={"/icones/ventilador.png"}
                                        alt="Imagem pré-visualizada"
                                        width={64}
                                        height={64}
                                        className="p-2"
                                    />
                                </div>}
                            {wifi &&
                                <div className="flex items-center m-6 border-2 rounded-full border-black shadow-lg w-16">
                                    <Image
                                        src={"/icones/internet.png"}
                                        alt="Imagem pré-visualizada"
                                        width={64}
                                        height={64}
                                        className="p-2"
                                    />
                                </div>}
                            {projetor &&
                                <div className="flex items-center m-6 border-2 rounded-full border-black shadow-lg w-16">
                                    <Image
                                        src={"/icones/projetor.png"}
                                        alt="Imagem pré-visualizada"
                                        width={64}
                                        height={64}
                                        className="p-2"
                                    />
                                </div>}
                            {chaveeletronica &&
                                <div className="flex items-center m-6 border-2 rounded-full border-black shadow-lg w-16">
                                    <Image
                                        src={"/icones/chave-do-cartao.png"}
                                        alt="Imagem pré-visualizada"
                                        width={64}
                                        height={64}
                                        className="p-2"
                                    />
                                </div>}
                            <div className="flex items-center m-6 border-0 rounded-full border-black shadow-lg w-16">
                                <Image
                                    src="/images/imgMenuAdm/botao-adicionar.png" // Replace with the image URL
                                    alt="Configurar Atributos"
                                    onClick={() => setAtributePopUp(true)}
                                    width={64}
                                    height={64}
                                    className="cursor-pointer" // To show the pointer on hover
                                />
                            </div>
                        </div>
                        <hr className="border-0 border-t-2 border-red-500 w-full" />

                    </div>

                    <SendButton />
                </form>
            </div>

            {atributePopUp && (
                <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-75">
                    <div className="bg-white p-6 rounded shadow-md">
                        <p className="font-bold mb-4">Configurar Atributos</p>
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                onClick={() => setArcondicionado(!arcondicionado)}
                                className={`p-2 rounded ${arcondicionado ? 'bg-green-500' : 'bg-gray-300'}`}
                            >
                                {arcondicionado ? 'Ar Condicionado: Sim' : 'Ar Condicionado: Não'}
                            </button>
                            <button
                                onClick={() => setVentilador(!ventilador)}
                                className={`p-2 rounded ${ventilador ? 'bg-green-500' : 'bg-gray-300'}`}
                            >
                                {ventilador ? 'Ventilador: Sim' : 'Ventilador: Não'}
                            </button>
                            <button
                                onClick={() => setWifi(!wifi)}
                                className={`p-2 rounded ${wifi ? 'bg-green-500' : 'bg-gray-300'}`}
                            >
                                {wifi ? 'Wi-Fi: Sim' : 'Wi-Fi: Não'}
                            </button>
                            <button
                                onClick={() => setProjetor(!projetor)}
                                className={`p-2 rounded ${projetor ? 'bg-green-500' : 'bg-gray-300'}`}
                            >
                                {projetor ? 'Projetor: Sim' : 'Projetor: Não'}
                            </button>
                            <button
                                onClick={() => setChaveeletronica(!chaveeletronica)}
                                className={`p-2 rounded ${chaveeletronica ? 'bg-green-500' : 'bg-gray-300'}`}
                            >
                                {chaveeletronica ? 'Chave Eletrônica: Sim' : 'Chave Eletrônica: Não'}
                            </button>

                        </div>
                        <button
                            onClick={() => setAtributePopUp(false)}
                            className="bg-red-500 text-white px-4 py-2 rounded mt-4"
                        >
                            Fechar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Ambiente;
