'use client';
import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import { useRouter, useSearchParams } from 'next/navigation';
import api from '../../../src/config/configApi';
import Header from '@/app/components/header/Header';
import Footer from '@/app/components/footer/Footer';

const HistoricoSala = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const nif = searchParams.get('nif');
  useEffect(() => {
    async function fetchHistorico() {
      try {
        const response = await api.get('/historico/full/infos');
        console.log("API Response Data: ", response.data); // Verifique os dados completos da API
        setData(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados: ", error);
      } finally {
        setLoading(false);
      }
    }
    fetchHistorico();
  }, []);

  const aggregateData = (data) => {
    const aggregated = data.reduce((acc, item) => {
      console.log("Item individual:", item); // Verifique o item completo

      // Usar o campo ambiente_nome para contar as ocorrências de cada sala
      if (acc[item.ambiente_nome]) {
        acc[item.ambiente_nome] += 1; // Incrementa a contagem para a sala
      } else {
        acc[item.ambiente_nome] = 1; // Inicia a contagem para a sala
      }
      return acc;
    }, {});

    console.log("Aggregated Data: ", aggregated); // Verifique os dados agregados

    const totalUsage = Object.values(aggregated).reduce((acc, count) => acc + count, 0) || 1;

    return {
        labels: Object.keys(aggregated),
      datasets: [
        {
          label: 'Room Usage Count',
          data: Object.values(aggregated).map(count => (count / totalUsage) * 100),
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF',
            '#FF9F40',
          ],
        },
      ],
      // Adicionando as opções de configuração do gráfico
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'right', 
            labels: {
              boxWidth: 10,  
              padding: 20,   
            },
          },
        },
        layout: {
          padding: 20, 
        },
      },
    };
  };
  const chartData = data.length ? aggregateData(data) : null;

  return (
    <div>
<Header/>
<img
        src="/images/imgMenuAdm/btvoltar.png"
        alt="botao voltar"
        className="mr-10 cursor-pointer w-10 h-10 mt-8 ml-10"
        onClick={() => router.push(`/administracao/telaMenuAdm?nif=${nif}`)}
      />
      <h2 className="text-center font-bold text-2xl mb-5">Uso das Salas nos Últimos 6 Meses</h2>
      <div className="flex justify-center min-h-[300px] min-w-[300px]">
        {loading ? (
          <p>Carregando...</p>
        ) : (
          chartData ? (
            <div className='w-[40%] h-[40%]'>
            <Pie data={chartData} />
            </div>
          ) : (
            <p>Sem dados para exibir</p>
          )
        )}
      </div>
      <Footer/>
    </div>
  );
};

export default HistoricoSala;