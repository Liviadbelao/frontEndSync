import { useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function MonitorDeInatividade({ tempoInatividade = 10000 }) {
  const timerRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [isInactive, setIsInactive] = useState(false);

  const searchParams = useSearchParams(); // Definido antes de usá-lo
  const nif = searchParams.get("nif"); // Agora 'nif' pode ser obtido corretamente
  const router = useRouter();

  const redirecionar = (caminhoTela) => {
    setCarregando(true);
    router.push(`${caminhoTela}?nif=${nif}`);
  };

  // Função de iniciar o temporizador
  const startTimer = () => {
    timerRef.current = setTimeout(() => {
      setIsInactive(true); // Mostra o modal de inatividade
      setShowModal(true);  // Exibe o modal
    }, tempoInatividade);
  };

  // Reseta o contador quando tem interatividade com a tela
  useEffect(() => {
    const resetTimer = () => {
      clearTimeout(timerRef.current);
      startTimer();  // Agora startTimer está disponível
    };

    // Ouvintes de eventos para detectar atividade dentro do componente
    const events = ['mousemove', 'keydown', 'click'];
    events.forEach((event) => window.addEventListener(event, resetTimer));

    // Inicia o temporizador
    startTimer();

    // Limpeza ao desmontar o componente
    return () => {
      clearTimeout(timerRef.current);
      events.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, [tempoInatividade]);

  // Funções de resposta ao modal
  const handleSim = () => {
    setShowModal(false);
    setIsInactive(false);
    clearTimeout(timerRef.current);
    startTimer();
  };

  // Quando o modal está visível, inicia um timeout para redirecionar
  useEffect(() => {
    if (showModal) {
      const modalTimeout = setTimeout(() => {
        redirecionar('/totem/faceID'); // Redireciona para a tela configurada no botão "Não"
      }, 5000); // 5 segundos

      // Limpa o timeout ao desmontar ou ao fechar o modal
      return () => clearTimeout(modalTimeout);
    }
  }, [showModal]);

  return (
    <>
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg text-center h-52 w-96 shadow-lg">
            <p className="mt-4 text-3xl text-black">Continuar reservando?</p>
            <div className="flex justify-between mt-20">
              <button
                onClick={handleSim}
                className="px-6 py-2 text-lg font-semibold bg-[#9A1915] text-white rounded-lg hover:bg-red-600 transition"
              >
                Sim
              </button>
              <button
                onClick={() => redirecionar('/totem/faceID')}
                className="px-6 py-2 text-lg font-semibold bg-[#9A1915] text-white rounded-lg hover:bg-red-600 transition"
              >
                Não
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MonitorDeInatividade;
