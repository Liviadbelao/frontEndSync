import { useEffect, useRef } from 'react';

function MonitorDeInatividade({ tempoInatividade = 10000 }) {
  const timerRef = useRef(null);

  //Reseta o contador quando tem interatividade com a tela
  useEffect(() => {
    const resetTimer = () => {
      clearTimeout(timerRef.current);
      startTimer();
    };

    //Alerta de inatividade
    const startTimer = () => {
      timerRef.current = setTimeout(() => {
        alert('Você ainda está na páginsa deste componente?');
      }, tempoInatividade);
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

  return null; // Componente não precisa renderizar nada
}

export default MonitorDeInatividade;
