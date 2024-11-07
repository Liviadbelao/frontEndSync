'use client';

import React, { useState, useEffect } from "react";
import Input from '../../components/input/input';
import { useRouter, useSearchParams } from 'next/navigation';
import api from "../../../src/config/configApi";
import SendButton from '@/app/components/sendButton/SendButton';
import Header from '@/app/components/header/Header';
import TelaCertinho from "@/app/components/telaCertinho/TelaCertinho"; // Importe a TelaCertinho

const Ambiente = () => {
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
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState({});
    const [showSuccess, setShowSuccess] = useState(false); // Estado para controlar a TelaCertinho

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
        if (!numeroAmbiente) newErrors.numeroAmbiente = "O número do ambiente é obrigatório!";
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
            const response = await api.post("/ambientes", formData);
            console.log(response);
            if (chave) {
                const params = {
                    id: numerochave,
                    disponivel: true,
                    salas: numeroAmbiente,
                };
                const chaveResponse = await api.post("/chaves", params);
                console.log(chaveResponse);
            }
            limparInputs();
            setShowSuccess(true); // Exibe a TelaCertinho
            setTimeout(() => setShowSuccess(false), 2000); // Oculta após 2 segundos
            router.push(`/administracao/gestaoAmbiente?nif=${nif}`); // Redireciona após a exibição da TelaCertinho
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
    };

    const limparInputs = () => {
        setNome("");
        setImagem("");
        setCapacidade(0);
        setCategoriaSelecionada("");
        setDisponivel(true);
        setNumeroAmbiente(1);
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
            {showSuccess && <TelaCertinho onClose={() => setShowSuccess(false)} />} {/* Exibe TelaCertinho */}
            <img
                src="/images/imgMenuAdm/btvoltar.png"
                alt="botao voltar"
                className="mr-10 cursor-pointer w-10 h-10 ml-10 mt-10"
                onClick={() => router.push(`/administracao/gestaoAmbiente?nif=${nif}`)}
            />

            <div className="flex flex-col items-center justify-center">
                <p className="font-normal md:font-bold mt-40 text-2xl">Cadastro de Ambiente</p>
                <form
                    className="flex flex-col bg-[#D9D9D9] text-black w-[55%] border-2 border-red-500 items-center pt-6 mb-16 rounded-md"
                    onSubmit={postAmbiente}
                >
                    <div className="w-[70%] m-2">
                        <label>Nome do ambiente:</label>
                        <Input
                            tipo={"text"}
                            placeholder={"Nome"}
                            valor={nome}
                            onChange={(e) => setNome(e.target.value)}
                            nome={"nome"}
                        />
                        {errors.nome && <span className="text-red-500">{errors.nome}</span>}
                    </div>
                    <div className="w-[70%] m-2">
                        <label>Selecione uma imagem do ambiente:</label>
                        <Input
                            tipo={"file"}
                            placeholder={"Imagem"}
                            onChange={handleImageChange}
                            nome={"imagem"}
                        />
                        {errors.imagem && <span className="text-red-500">{errors.imagem}</span>}
                    </div>
                    <div className="w-[70%] m-2">
                        <label>Capacidade de alunos no ambiente:</label>
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
                        <label>Quantidade de máquinas:</label>
                        <Input
                            tipo={"number"}
                            placeholder={"Maquinas"}
                            valor={maquinas}
                            onChange={(e) => setMaquinas(e.target.value)}
                            nome={"maquinas"}
                        />
                    </div>
                    <div className="w-[70%] m-2">
                        <label>Número do ambiente:</label>
                        <Input
                            tipo={"number"}
                            placeholder={"numeroAmbiente"}
                            valor={numeroAmbiente}
                            onChange={(e) => setNumeroAmbiente(e.target.value)}
                            nome={"numeroAmbiente"}
                        />
                        {errors.numeroAmbiente && <span className="text-red-500">{errors.numeroAmbiente}</span>}
                    </div>
                    <div className="w-[70%] m-2">
                        <label>Categoria que o ambiente pertence:</label>
                        <select
                            id="categoria"
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
                        {errors.categoriaSelecionada && <span className="text-red-500">{errors.categoriaSelecionada}</span>}
                    </div>
                    <div className="w-[70%] m-2">
                        <label>Tipo do Ambiente:</label>
                        <select
                            id="tipodoambiente"
                            value={tipodoambiente}
                            onChange={(e) => setTipodoambiente(e.target.value)}
                        >
                            <option value="">Selecione o tipo de ambiente</option>
                            <option value="blocooficina">Bloco Oficina</option>
                            <option value="externo">Externo</option>
                        </select>
                        {errors.tipodoambiente && <span className="text-red-500">{errors.tipodoambiente}</span>}
                    </div>
                    <div className="w-[70%] m-2">
                        <label>Ar condicionado:</label>
                        <Input
                            tipo={"checkbox"}
                            placeholder={"Ar condicionado"}
                            onChange={(e) => setArcondicionado(!arcondicionado)}
                            nome={"arcondicionado"}
                        />
                    </div>
                    <div className="w-[70%] m-2">
                        <label>Wi-fi:</label>
                        <Input
                            tipo={"checkbox"}
                            placeholder={"Wifi"}
                            onChange={(e) => setWifi(!wifi)}
                            nome={"wifi"}
                        />
                    </div>
                    <div className="w-[70%] m-2">
                        <label>Chave:</label>
                        <Input
                            tipo={"checkbox"}
                            placeholder={"Chave"}
                            onChange={(e) => setChave(!chave)}
                            nome={"chave"}
                        />
                        {chave && (
                            <>
                                <label>Número da chave:</label>
                                <Input
                                    tipo={"number"}
                                    placeholder={"N° :"}
                                    valor={numerochave}
                                    onChange={(e) => setNumerochave(e.target.value)}
                                    nome={"Número"}
                                />
                                {errors.numerochave && <span className="text-red-500">{errors.numerochave}</span>}
                            </>
                        )}
                    </div>
                    <div className="w-[70%] m-2">
                        <label>Projetor:</label>
                        <Input
                            tipo={"checkbox"}
                            placeholder={"projetor"}
                            onChange={(e) => setProjetor(!projetor)}
                            nome={"projetor"}
                        />
                    </div>
                    <div className="w-[70%] m-2">
                        <label>Chave eletronica:</label>
                        <Input
                            tipo={"checkbox"}
                            placeholder={"chave eletronica"}
                            onChange={(e) => setChaveeletronica(!chaveeletronica)}
                            nome={"chaveeletronica"}
                        />
                    </div>
                    <div className="w-[70%] m-2">
                        <label>Ventilador:</label>
                        <Input
                            tipo={"checkbox"}
                            placeholder={"ventilador"}
                            onChange={(e) => setVentilador(!ventilador)}
                            nome={"ventilador"}
                        />
                    </div>

                    <SendButton />
                </form>
            </div>
        </div>
    );
};

export default Ambiente;
