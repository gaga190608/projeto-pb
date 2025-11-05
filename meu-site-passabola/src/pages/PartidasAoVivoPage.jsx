import React, { useEffect, useState } from "react";
import axios from "axios";

const PartidasAoVivoPage = () => {
  const [partidas, setPartidas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLiveMatches = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await axios.get(
          "https://v3.football.api-sports.io/fixtures?live=all",
          { headers: { "x-apisports-key": "850b59b06aa60ec37f4cbbfbbfe06b51" } }
        );
        const liveMatches = data?.response?.map((match) => ({
          id: match.fixture.id,
          time1: match.teams.home.name,
          logo1: match.teams.home.logo,
          placar1: match.goals.home ?? "-",
          time2: match.teams.away.name,
          logo2: match.teams.away.logo,
          placar2: match.goals.away ?? "-",
          tempo: match.fixture.status.elapsed || "LIVE",
        }));
        setPartidas(liveMatches || []);
      } catch (err) {
        console.error("Erro ao buscar partidas ao vivo:", err);
        setError(err.response?.data?.message || "Não foi possível carregar as partidas. Verifique sua chave de API ou limite de uso.");
      } finally {
        setLoading(false);
      }
    };

    fetchLiveMatches();
    const interval = setInterval(fetchLiveMatches, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-5xl px-4 py-8 mx-auto">
      <h1 className="text-3xl font-bold text-[#523E6C] mb-8">Partidas ao Vivo</h1>

      <div className="bg-transparent">
        {loading ? (
          <p className="text-lg text-gray-600 text-center">Sincronizando dados em tempo real...</p>
        ) : error ? (
          <p className="text-lg text-red-500 text-center">{error}</p>
        ) : partidas.length === 0 ? (
          <p className="text-lg text-gray-600 text-center">Nenhuma partida ao vivo no momento.</p>
        ) : (
          // GRID DE JOGOS
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {partidas.map((partida) => (
              <div
                key={partida.id}
                className="rounded-2xl bg-white p-6 shadow-md border border-gray-200 transform transition-transform duration-300 ease-out hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 min-w-0">
                    <img src={partida.logo1} alt={partida.time1} className="w-10 h-10 rounded-full" />
                    <span className="text-base md:text-lg font-medium text-gray-800 truncate">{partida.time1}</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-[#523E6C]">{partida.placar1}</span>
                    <span className="text-lg font-light text-gray-500">x</span>
                    <span className="text-2xl font-bold text-[#523E6C]">{partida.placar2}</span>
                  </div>

                  <div className="flex items-center space-x-2 min-w-0 justify-end">
                    <span className="text-base md:text-lg font-medium text-gray-800 truncate">{partida.time2}</span>
                    <img src={partida.logo2} alt={partida.time2} className="w-10 h-10 rounded-full" />
                  </div>
                </div>

                <div className="text-xs md:text-sm text-gray-600 mt-3 text-right">
                  {partida.tempo}' · LIVE
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PartidasAoVivoPage;