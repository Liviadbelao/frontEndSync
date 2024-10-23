"use client";

//Importações
import { useState } from "react";
import api from "../../../src/config/configApi"; // Ajuste o caminho conforme necessário
import Header from "@/app/components/header/Header";
import Input from "@/app/components/input/input";
import SendButton from "@/app/components/sendButton/SendButton";
import { useRouter } from "next/navigation";

//Criando Página
const LoginComponent = () => {

  const router = useRouter();
  //Criando Estados
  const [nif, setNif] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [successImg, setSuccessImg] = useState(false);

  function clearFields() {
    setNif("");
    setEmail("");
  }

  //Função de Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await api.post("/usuarios/login", { email, nif });

      // Verifica se o retorno contém adm = true
      if (response.data[0].adm) {
        console.log("Login bem-sucedido:", response.data);
        clearFields();

        // Atrasar redirecionamento por 2 segundos
        setTimeout(() => {
          router.push(`/administracao/telaMenuAdm?nif=${response.data[0].nif}`)
        }, 2000); // 2 segundos de atraso
      } else {
        setErrorMessage("Acesso negado. O usuário não possui privilégios administrativos.");

        // Remover mensagem de erro após 5 segundos
        setTimeout(() => {
          setErrorMessage("");
        }, 5000); // 5 segundos
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setErrorMessage("Credenciais inválidas. Tente novamente.");

      // Remover mensagem de erro após 5 segundos
      setTimeout(() => {
        setErrorMessage("");
      }, 5000); // 5 segundos
    } finally {
      setLoading(false);
    }
  };

  //Corpo da Página
  return (
    <div className="bg-white min-h-screen flex flex-col overflow-y-auto">
      <Header />
      {successImg ? <Image
        src="/images/success.svg"
        alt="Sucesso"
        width={400}
        height={400}>
      </Image> : null}
      <div className="flex flex-col items-center justify-center">
        <div className="mb-24 mt-10">
          <text className="text-black text-3xl font-black">Login</text>
        </div>
        <form
          className="flex flex-col bg-[#D9D9D9] text-black w-[40%] border-4 border-red-500 items-center pt-6 mb-16 rounded-md"
          onSubmit={handleLogin}
        >
          {/* Campo de Email */}
          <div className="w-[70%] m-6">
            <label className="text-lg font-medium">Email:</label>
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
            <label className="text-lg font-medium">NIF:</label>
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