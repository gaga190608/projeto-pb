// src/hooks/useFiwareData.js
import { useState, useEffect } from "react";
import axios from "axios";


const FIWARE_IP = "20.150.218.100";
const ENTITY_ID = 'urn:ngsi-ld:HeartSensor:pulse001'; 
const ENTITY_TYPE = 'HeartSensor'; 
const ATTRIBUTE_NAME = 'heartRate';


const ORION_HEADERS = {
    'Fiware-Service': 'smart',
    'Fiware-ServicePath': '/'
};


const POLLING_INTERVAL_MS = 2000; 

const HISTORY_POLLING_INTERVAL_MS = 10000; 

const MAX_HISTORY_POINTS = 50; 



export function useHeartRateRealTime() { 
    const [heartRate, setHeartRate] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUrl = `http://${FIWARE_IP}:1026/v2/entities/${ENTITY_ID}?attrs=${ATTRIBUTE_NAME}&options=keyValues`; 

        async function fetchData() {
            try {
                const response = await axios.get(fetchUrl, { headers: ORION_HEADERS });
                const latestValue = response.data[ATTRIBUTE_NAME];

                setHeartRate(latestValue || 0); 
                setError(null);
                setLoading(false);
            } catch (err) {
                let errorMessage = `Erro de conexão com Orion (${err.response?.status || 'Rede'}).`;
                setError(errorMessage);
                setHeartRate(null);
                setLoading(false);
                console.error("Orion Fetch Error:", err);
            }
        }

        fetchData();
        const intervalId = setInterval(fetchData, POLLING_INTERVAL_MS);
        
        return () => clearInterval(intervalId);
    }, []); 

    return { heartRate, loading, error };
}



export function useHeartRateHistory() { 
    const [historyData, setHistoryData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const STH_BASE_URL = `http://${FIWARE_IP}:8666/STH/v1/contextEntities`;
        const fetchUrl = `${STH_BASE_URL}/type/${ENTITY_TYPE}/id/${ENTITY_ID}/attributes/${ATTRIBUTE_NAME}?lastN=${MAX_HISTORY_POINTS}`;

        async function fetchHistory() {
            try {
                const response = await axios.get(fetchUrl, { headers: ORION_HEADERS });
                
                // Checagem segura e formatação do array
                const rawData = response.data.contextResponses?.[0]?.contextElement?.attributes?.[0]?.values || [];
                
                if (rawData.length === 0) {
                    setHistoryData([]);
                    setLoading(false);
                    return; 
                }
                
                const formattedData = rawData
                    .map(item => {
                        const date = new Date(item.recvTime);
                        const timeString = date.toLocaleTimeString('pt-BR'); 

                        return {
                            name: timeString,
                            heartRate: parseFloat(item.attrValue) // Garante que é número
                        };
                    })
                    .reverse(); 

                setHistoryData(formattedData);
                setError(null);
                setLoading(false);

            } catch (err) {
                let errorMessage = `ERRO STH: Não foi possível obter histórico. Verifique STH-Comet (Porta 8666).`;
                setError(errorMessage);
                setHistoryData([]);
                setLoading(false);
                console.error("STH Fetch Error:", err);
            }
        }

        fetchHistory();
        const intervalId = setInterval(fetchHistory, HISTORY_POLLING_INTERVAL_MS); 

        return () => clearInterval(intervalId); 

    }, []); 

    return { historyData, loading, error };
}