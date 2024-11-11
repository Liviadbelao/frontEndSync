import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../header/Header';
import TelaCarregar from '../telaCarregar/TelaCarregar';

function ContagemRegressiva({ tempoInicial = 3 }) {
  const [tempoRestante, setTempoRestante] = useState(tempoInicial);
  const [ativo, setAtivo] = useState(true); // Novo estado para controlar a contagem
  const [loading, setLoading] = useState(false); // Novo estado para controlar a contagem
  const router = useRouter();

  useEffect(() => {
    if (tempoRestante > 0 && ativo) {
      // Configura um temporizador para atualizar a contagem regressiva a cada segundo
      const timerId = setTimeout(() => {
        setTempoRestante(tempoRestante - 1);
      }, 1000);

      // Limpa o temporizador quando o componente é desmontado ou o tempo é atualizado
      return () => clearTimeout(timerId);
    } else if (tempoRestante === 0) {
      // Redireciona para a rota especificada quando o tempo chega a zero
      // router.push('/totem/telaDescanso');
    }
  }, [tempoRestante, ativo, router]);

  const handleReservarOutraChave = () => {
    setAtivo(false); // Para o contador
    setLoading(true)
    router.push(`/totem/ambientes`);
  };

  return (
    <div className="h-screen">
      <Header /> {/* Header fica no topo da página */}

      {/* Container centralizado verticalmente */}
      <div className="flex flex-col items-center justify-center mt-64">
        <h1 className="text-[#EA2626] text-5xl">Finalizando...</h1>
        <div className="bg-[#EA2626] w-96 h-96 flex items-center justify-center rounded-full mt-10">
          <h2 className="text-white text-8xl">{tempoRestante}</h2>
        </div>
        {tempoRestante === 0 && <p>Tempo esgotado!</p>}
      </div>
      <button
        className="mt-16 rounded-full bg-[#E30613] text-2xl p-4 px-10 text-white"
        onClick={handleReservarOutraChave}
      >
        Reservar outra chave
      </button>
      {loading && <TelaCarregar/>}
    </div>
  );
}

export default ContagemRegressiva;
