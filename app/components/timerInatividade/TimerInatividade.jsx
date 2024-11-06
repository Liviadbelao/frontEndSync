import { useEffect, useRef, useState } from 'react';

function MonitorDeInatividade({ tempoInatividade = 10000 }) {
  const timerRef = useRef(null);
  const [inativo, setInativo] = useState(false);

  useEffect(() => {
    const resetTimer = () => {
      clearTimeout(timerRef.current);
      setInativo(false); // Esconde a mensagem quando o usuário interage
      startTimer();
    };

    const startTimer = () => {
      timerRef.current = setTimeout(() => {
        setInativo(true); // Mostra a mensagem quando o usuário está inativo
      }, tempoInatividade);
    };

    const events = ['mousemove', 'keydown', 'click'];
    events.forEach((event) => window.addEventListener(event, resetTimer));

    startTimer();

    return () => {
      clearTimeout(timerRef.current);
      events.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, [tempoInatividade]);

  return (
    <div>
      <h1>Monitor de Inatividade</h1>
      {inativo && <p>Você ainda está na página deste componente?</p>}
    </div>
  );
}

export default MonitorDeInatividade;
