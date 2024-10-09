//Necessários
"use client";

//Importações
import { useState } from "react";
import api from "../../../src/config/configApi"; // Ajuste o caminho conforme necessário
import Header from "@/app/components/header/Header";
import Input from "@/app/components/input/input";
import SendButton from "@/app/components/sendButton/SendButton";

//Criando Página
const LoginComponent = () => {
  //Criando Estados
  const [nif, setNif] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  //Função de Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await api.post("/usuarios/login", { email, nif });
      
      // Verifica se o retorno contém adm = true
      if (response.data[0].adm) {
        // Aqui você pode redirecionar o usuário ou armazenar informações de sessão
        console.log("Login bem-sucedido:", response.data);
        // Redirecionar para a página desejada, ex: /dashboard
      } else {
        setErrorMessage("Acesso negado. O usuário não possui privilégios administrativos.");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setErrorMessage("Credenciais inválidas. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  //Corpo da Página
  return (
    <div className="bg-white min-h-screen flex flex-col overflow-y-auto">
      <Header />
      <div className="flex flex-col items-center justify-center">
        <div className="mb-24 mt-10">
          <text className="text-black text-3xl font-black">Login</text>
        </div>
        <form
          className="flex flex-col bg-[#D9D9D9] text-black w-[55%] border-2 border-red-500 items-center pt-6 mb-16 rounded-md"
          onSubmit={handleLogin}
        >
          {/* Campo de Email */}
          <div className="w-[70%] m-2">
            <label>Email:</label>
            <Input
              tipo={"email"}
              placeholder={"Email"}
              valor={email}
              onChange={(e) => setEmail(e.target.value)}
              nome={"email"}
            />
          </div>

          {/* Campo de NIF */}
          <div className="w-[70%] m-2">
            <label>NIF:</label>
            <Input
              tipo={"number"}
              placeholder={"NIF"}
              valor={nif}
              onChange={(e) => setNif(e.target.value)}
              nome={"nif"}
            />
          </div>

          {/* Mensagem de erro */}
          {errorMessage && (
            <div className="text-red-500">{errorMessage}</div>
          )}

          {/* Botão Para Envio */}
          <SendButton loading={loading} />
        </form>
      </div>
    </div>
  );
};

export default LoginComponent;
