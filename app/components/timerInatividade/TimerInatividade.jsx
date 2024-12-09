import { useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function MonitorDeInatividade({ tempoInatividade = 10000 }) {
  const timerRef = useRef(null);
  const modalTimeoutRef = useRef(null); // Novo ref para o timeout do modal
  const [showModal, setShowModal] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [isInactive, setIsInactive] = useState(false);

  const searchParams = useSearchParams();
  const nif = searchParams.get("nif");
  const router = useRouter();

  const redirecionar = (caminhoTela) => {
    setCarregando(true);
    router.push(`${caminhoTela}?nif=${nif}`);
  };

  const startTimer = () => {
    timerRef.current = setTimeout(() => {
      setIsInactive(true);
      setShowModal(true);
    }, tempoInatividade);
  };

  useEffect(() => {
    const resetTimer = () => {
      clearTimeout(timerRef.current);
      startTimer();
    };

    const events = ['mousemove', 'keydown', 'click'];
    events.forEach((event) => window.addEventListener(event, resetTimer));

    startTimer();

    return () => {
      clearTimeout(timerRef.current);
      events.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, [tempoInatividade]);

  const handleSim = () => {
    console.log("Usuário clicou em 'Sim', fechando modal e reiniciando contador.");
    setShowModal(false);
    setIsInactive(false);
    clearTimeout(timerRef.current);
    clearTimeout(modalTimeoutRef.current); // Limpa o timeout do redirecionamento
    startTimer();
  };

  useEffect(() => {
    if (showModal) {
      modalTimeoutRef.current = setTimeout(() => {
        redirecionar('/totem/faceID');
      }, 5000);

      return () => clearTimeout(modalTimeoutRef.current); // Limpa o timeout ao desmontar
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
