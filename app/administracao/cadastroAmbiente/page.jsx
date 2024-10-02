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

    const postAmbiente = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        // nome, numero_ambiente, caminho_imagem, chave, capacidadeAlunos, tipodoambiente, ar_condicionado, ventilador, wifi, projetor, chave_eletronica, maquinas, disponivel, categoria
        formData.append("nome", nome);
        formData.append("numero_ambiente", numero_ambiente)
        formData.append("chave", chave);
        formData.append("capacidadeAlunos", capacidadeAlunos);
        formData.append("tipodoambiente", tipodoambiente);
        formData.append("ar_condicionado", ar_condicionado);
        formData.append("ventilador", ventilador);
        formData.append("wifi", wifi);
        formData.append("projetor", projetor);
        formData.append("chave_eletronica", chave_eletronica);
        formData.append("maquinas", maquinas);
        formData.append("disponivel", disponivel);
        formData.append("categoria", categoria);
        formData.append("image", imagem);
    
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
            <Header/>
            
            <div className="flex flex-col items-center justify-center">
            <p class="font-normal md:font-bold mt-40 text-2xl">Cadastro de Ambiente</p>
            <div  className="flex flex-col bg-[#D9D9D9] text-black w-[55%] border-2 border-red-500 items-center pt-6 mb-16 rounded-md mt-30">
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
                    valor={imagem}
                    onChange={(e) => setImagem(e.target.value)}
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
            <SendButton />
            </div>
            </div>
        </div>
    );
}

export default Ambiente;