import "ldrs/ring";
import { hourglass } from "ldrs";
import { useEffect } from "react";

const TelaCertinho = ({ onClose }) => {
  // Registra a animação
  hourglass.register();

  useEffect(() => {
    // Define o tempo em que o modal de confirmação será exibido (3 segundos)
    const timer = setTimeout(() => {
      onClose(); // Fecha o modal chamando a função passada via props
    }, 3000);

    // Limpa o timer se o componente for desmontado antes do tempo
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-60 overflow-hidden">
      <img
        src="/icones/certinho.png"
        className="animate-bounce w-48 h-48" // Adiciona animação de bounce para efeito visual
        alt="Confirmação de Cadastro"
      />
    </div>
  );
};

export default TelaCertinho;
