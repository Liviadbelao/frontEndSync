'use client';
import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import api from '../../../src/config/configApi';

const HistoricoSala = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

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

      // Usar o campo `ambiente_nome` para contar as ocorrências de cada sala
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
    };
  };

  const chartData = data.length ? aggregateData(data) : null;

  return (
    <div className="p-10">
      <h2 className="text-center font-bold text-2xl mb-5">Uso das Salas nos Últimos 6 Meses</h2>
      <div className="flex justify-center min-h-[300px] min-w-[300px]">
        {loading ? (
          <p>Carregando...</p>
        ) : (
          chartData ? (
            <Pie data={chartData} />
          ) : (
            <p>Sem dados para exibir</p>
          )
        )}
      </div>
    </div>
  );
};

export default HistoricoSala;
