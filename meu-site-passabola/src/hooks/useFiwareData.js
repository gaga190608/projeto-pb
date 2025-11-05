import { useState, useEffect } from "react";
import axios from "axios";

// 🚨 IP e PORTA do STH COMET (Serviço de Histórico)
const FIWARE_STH_BASE = "http://20.150.210.54:8666/STH/v1/contextEntities";

// Configurações de Polling e Entidade
const ENTITY_TYPE = 'Atleta';
const ENTITY_ID = 'Atleta:001';
const POLLING_INTERVAL_MS = 5000; // Atualiza a cada 5 segundos

// Headers de Serviço Fiware (STH Comet exige)
const STH_HEADERS = {
    'Fiware-Service': 'passabola', // Este header é necessário para o STH Comet
    'Fiware-ServicePath': '/'      
};

// Esta função busca dados históricos no STH Comet e usa Polling
export function useFiwareData(limit = 50) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 🚨 URL precisa ser precisa para buscar o histórico da Entidade no STH Comet
    const fetchUrl = `${FIWARE_STH_BASE}/type/${ENTITY_TYPE}/id/${ENTITY_ID}/attributes?lastN=${limit}`;
    
    async function fetchData() {
      try {
        if (!data) setLoading(true);

        // Faz a requisição para o STH Comet (porta 8666)
        const response = await axios.get(fetchUrl, { headers: STH_HEADERS });
        
        const attributes = response.data.attributes;

        if (!attributes || attributes.length === 0) {
            setData([]);
            return;
        }
        
        // --- LÓGICA DE MAPEAMENTO STH COMET (Processa a Série Temporal) ---
        const historicoMap = {};

        attributes.forEach(attr => {
            const attrName = attr.attrName;
            
            // Itera sobre o array de valores históricos
            attr.values.forEach(val => {
                const timestamp = val.recvTime; // Tempo que o dado foi recebido
                
                if (!historicoMap[timestamp]) {
                    historicoMap[timestamp] = { 
                        timestamp: timestamp,
                        // Formata a hora para o eixo X do gráfico
                        date: new Date(timestamp).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) 
                    };
                }
                
                // Mapeia os valores (frequencia ou velocidade)
                if (attrName === 'frequenciaCardiaca') {
                    historicoMap[timestamp].frequencia = parseFloat(val.attrValue) || 0;
                } else if (attrName === 'velocidadeMaxima') {
                    historicoMap[timestamp].velocidade = parseFloat(val.attrValue) || 0;
                }
            });
        });

        // Converte o mapa para array, garantindo que o gráfico use o formato correto.
        const formattedData = Object.values(historicoMap)
            .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)); // Ordena por tempo

        setData(formattedData);
        setError(null);
      } catch (err) {
        // Se a busca falhar, o erro é no STH/Assinatura
        setError(`Erro STH. Verifique se o STH/QuantumLeap está ativo e a Assinatura (Subscription).`);
        console.error("STH Comet Fetch Error:", err);
        setData(null);
      } finally {
        setLoading(false);
      }
    }

    // Executa a primeira busca e configura o Polling
    fetchData();
    const intervalId = setInterval(fetchData, POLLING_INTERVAL_MS);
    return () => clearInterval(intervalId);

  }, [limit]);

  return { data, loading, error };
}
