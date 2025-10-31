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
          {
            headers: {
              "x-apisports-key": "850b59b06aa60ec37f4cbbfbbfe06b51",
            },
          }
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
        setError(
          err.response?.data?.message ||
            "Não foi possível carregar as partidas. Verifique sua chave de API ou limite de uso."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchLiveMatches();
    const interval = setInterval(fetchLiveMatches, 60000); // atualiza a cada 1 min
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-5xl px-4 py-8 mx-auto">
      <h1 className="text-3xl font-bold text-[#523E6C] mb-8">
        Partidas ao Vivo
      </h1>
      <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-200">
        {loading ? (
          <p className="text-lg text-gray-600 text-center">
            Sincronizando dados em tempo real...
          </p>
        ) : error ? (
          <p className="text-lg text-red-500 text-center">{error}</p>
        ) : partidas.length === 0 ? (
          <p className="text-lg text-gray-600 text-center">
            Nenhuma partida ao vivo no momento.
          </p>
        ) : (
          partidas.map((partida) => (
            <div
              key={partida.id}
              className="flex flex-col md:flex-row items-center justify-between my-4 py-4 border-b border-gray-300 last:border-b-0"
            >
              {/* Linha de jogo */}
              <div className="flex items-center justify-between w-full">
                {/* Time da casa */}
                <div className="flex items-center space-x-2 w-1/3">
                  <img
                    src={partida.logo1}
                    alt={partida.time1}
                    className="w-10 h-10 rounded-full"
                  />
                  <span className="text-xl font-medium text-gray-800 truncate">
                    {partida.time1}
                  </span>
                </div>

                {/* Placar */}
                <div className="flex items-center space-x-2 w-1/3 justify-center">
                  <span className="text-2xl font-bold text-[#523E6C]">
                    {partida.placar1}
                  </span>
                  <span className="text-lg font-light text-gray-500">x</span>
                  <span className="text-2xl font-bold text-[#523E6C]">
                    {partida.placar2}
                  </span>
                </div>

            
                <div className="flex items-center space-x-2 w-1/3 justify-end">
                  <span className="text-xl font-medium text-gray-800 truncate">
                    {partida.time2}
                  </span>
                  <img
                    src={partida.logo2}
                    alt={partida.time2}
                    className="w-10 h-10 rounded-full"
                  />
                </div>
              </div>

              {/* Tempo do jogo */}
              <div className="text-sm text-gray-600 flex flex-col items-center mt-2 md:mt-0">
                <span>{partida.tempo}'</span>
                <span>LIVE</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
export default PartidasAoVivoPage;


