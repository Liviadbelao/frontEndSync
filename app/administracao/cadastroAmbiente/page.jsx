'use client'

import { useEffect, useState } from 'react';
import Input from '../../components/input/input';
import api from "../../../src/config/configApi";
import SendButton from '@/app/components/sendButton/SendButton';
import Header from '@/app/components/header/Header';

const Ambiente = () => {
    const [nome, setNome] = useState("");
    const [imagem, setImagem] = useState("");
    const [capacidade, setCapacidade] = useState(0);
    const [categorias, setCategorias] = useState([]);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState("");
    const [disponivel, setDisponivel] = useState(true)
    const [numeroAmbiente, setNumeroAmbiente] = useState(1)
    const [chave, setChave] = useState(false)
    const [tipodoambiente, setTipodoambiente] = useState("");
    const [arcondicionado, setArcondicionado] = useState(false)
    const [ventilador, setVentilador] = useState(false)
    const [wifi, setWifi] = useState(false)
    const [projetor, setProjetor] = useState(false)
    const [chaveeletronica, setChaveeletronica] = useState(false)
    const [maquinas, setMaquinas] = useState(0)

    const postAmbiente = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        // nome, numero_ambiente, caminho_imagem, chave, capacidadeAlunos, tipodoambiente, ar_condicionado, ventilador, wifi, projetor, chave_eletronica, maquinas, disponivel, categoria
        formData.append("nome", nome); // tem
        formData.append("numero_ambiente", numeroAmbiente)//tem
        formData.append("chave", chave);//tem
        formData.append("capacidadeAlunos", capacidade); // tem
        formData.append("tipodoambiente", tipodoambiente); //tem
        formData.append("ar_condicionado", arcondicionado);//tem
        formData.append("ventilador", ventilador);//tem
        formData.append("wifi", wifi);//tem
        formData.append("projetor", projetor);//tem
        formData.append("chave_eletronica", chaveeletronica);//tem
        formData.append("maquinas", maquinas);//tem
        formData.append("disponivel", disponivel); // tem
        formData.append("categoria", categoriaSelecionada); // tem
        formData.append("image", imagem); // tem

        for (let pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }

        try {
            const response = await api.post("/ambientes", formData);
            console.log(response)
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

    useEffect(() => {
        async function fetchCategorias() {
            try {
                const response = await api.get("/categorias");
                setCategorias(response.data);  // Supondo que a resposta tenha um array de categorias no 'data'
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchCategorias();
    }, []);

    return (
        <div className="bg-white min-h-screen flex flex-col overflow-y-auto ">
            <Header />

            <div className="flex flex-col items-center justify-center">
                <p class="font-normal md:font-bold mt-40 text-2xl">Cadastro de Ambiente</p>
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
                    </div>
                    <div className="w-[70%] m-2">
                        <label>Selecione uma imagem do ambiente:</label>
                        <Input
                            tipo={"file"}
                            placeholder={"Imagem"}
                            onChange={handleImageChange}
                            nome={"imagem"}
                        />
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
                    </div>
                    <div className="w-[70%] m-2">
                        <label>Tipo do Ambiente:</label>
                        <select
                            id="tipodoambiente"
                            value={tipodoambiente}
                            onChange={(e) => setTipodoambiente(e.target.value)}
                        >
                            <option value="">Selecione o tipo de ambiente</option>
                            <option value="interno">Interno</option>
                            <option value="externo">Externo</option>
                        </select>
                    </div>
                    <div className="w-[70%] m-2">
                        <label>Ar condicionado:</label>
                        <Input
                            tipo={"checkbox"}
                            placeholder={"Ar condicionado"}
                            onChange={(e) => {
                                if (arcondicionado) {
                                    setArcondicionado(false)
                                } else {
                                    setArcondicionado(true)
                                }
                            }}
                            nome={"arcondicionado"}
                        />
                    </div>
                    <div className="w-[70%] m-2">
                        <label>Wi-fi:</label>
                        <Input
                            tipo={"checkbox"}
                            placeholder={"Wifi"}
                            onChange={(e) => {
                                if (wifi) {
                                    setWifi(false)
                                } else {
                                    setWifi(true)
                                }
                            }}
                            nome={"wifi"}
                        />
                    </div>
                    <div className="w-[70%] m-2">
                        <label>Chave:</label>
                        <Input
                            tipo={"checkbox"}
                            placeholder={"Chave"}
                            onChange={(e) => {
                                if (chave) {
                                    setChave(false)
                                } else {
                                    setChave(true)
                                }
                            }}
                            nome={"chave"}
                        />
                    </div>
                    <div className="w-[70%] m-2">
                        <label>Projetor:</label>
                        <Input
                            tipo={"checkbox"}
                            placeholder={"projetor"}
                            onChange={(e) => {
                                if (projetor) {
                                    setProjetor(false)
                                } else {
                                    setProjetor(true)
                                }
                            }}
                            nome={"projetor"}
                        />
                    </div>
                    <div className="w-[70%] m-2">
                        <label>Chave eletronica:</label>
                        <Input
                            tipo={"checkbox"}
                            placeholder={"chave eletronica"}
                            onChange={(e) => {
                                if (chaveeletronica) {
                                    setChaveeletronica(false)
                                } else {
                                    setChaveeletronica(true)
                                }
                            }}
                            nome={"chaveeletronica"}
                        />
                    </div>
                    <div className="w-[70%] m-2">
                        <label>Ventilador:</label>
                        <Input
                            tipo={"checkbox"}
                            placeholder={"ventilador"}
                            onChange={(e) => {
                                if (ventilador) {
                                    setVentilador(false)
                                } else {
                                    setVentilador(true)
                                }
                            }}
                            nome={"ventilador"}
                        />
                    </div>

                    <SendButton />
                </form>
            </div>
        </div>
    );
}

export default Ambiente;