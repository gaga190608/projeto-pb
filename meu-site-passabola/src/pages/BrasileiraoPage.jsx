import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import { timesLogos } from '../constants/assets.js';

const BrasileiraoPage = () => {
    const [view, setView] = useState('primeiraFase');
    const [tabelaData, setTabelaData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStandings = async () => {
            setLoading(true);
            setError(null);
            try {
               
                const mockData = [
                    { posicao: 1, nome: "Corinthians", p: 35, j: 13, v: 11, e: 2, d: 0, gp: 38, gc: 9 },
                    { posicao: 2, nome: "Ferroviária", p: 29, j: 13, v: 9, e: 2, d: 2, gp: 28, gc: 11 },
                    { posicao: 3, nome: "Palmeiras", p: 28, j: 13, v: 8, e: 4, d: 1, gp: 27, gc: 10 },
                    { posicao: 4, nome: "Cruzeiro", p: 25, j: 13, v: 7, e: 4, d: 2, gp: 22, gc: 12 },
                    { posicao: 5, nome: "São Paulo", p: 24, j: 13, v: 7, e: 3, d: 3, gp: 23, gc: 13 },
                    { posicao: 6, nome: "Flamengo", p: 22, j: 13, v: 6, e: 4, d: 3, gp: 25, gc: 16 },
                    { posicao: 7, nome: "América Mineiro", p: 21, j: 13, v: 6, e: 3, d: 4, gp: 19, gc: 15 },
                    { posicao: 8, nome: "Bragantino", p: 18, j: 13, v: 5, e: 3, d: 5, gp: 14, gc: 14 },
                    { posicao: 9, nome: "Internacional", p: 16, j: 13, v: 4, e: 4, d: 5, gp: 12, gc: 18 },
                    { posicao: 10, nome: "Bahia", p: 14, j: 13, v: 4, e: 2, d: 7, gp: 10, gc: 20 },
                    { posicao: 11, nome: "Juventude", p: 12, j: 13, v: 3, e: 3, d: 7, gp: 9, gc: 21 },
                    { posicao: 12, nome: "Real Brasília", p: 11, j: 13, v: 3, e: 2, d: 8, gp: 11, gc: 24 },
                    { posicao: 13, nome: "Botafogo", p: 10, j: 13, v: 2, e: 4, d: 7, gp: 8, gc: 23 },
                    { posicao: 14, nome: "Avaí Kindermann", p: 9, j: 13, v: 2, e: 3, d: 8, gp: 7, gc: 26 },
                    { posicao: 15, nome: "Goiás", p: 8, j: 13, v: 2, e: 2, d: 9, gp: 6, gc: 28 },
                    { posicao: 16, nome: "Ceará", p: 7, j: 13, v: 1, e: 4, d: 8, gp: 5, gc: 29 }
                ];

                setTabelaData(mockData);
                setLoading(false);

            } catch (err) {
                console.error("Erro ao buscar dados da API Football-Data:", err);
                setError(err.response?.data?.message || "Não foi possível carregar a tabela. Verifique sua chave de API ou o limite de uso.");
            } finally {
                setLoading(false);
            }
        };
        fetchStandings();
    }, []);

    const quartasDeFinalData = [
        { time1: { nome: '8º colocado', logo: timesLogos['Bragantino'] }, time2: { nome: '1º colocado', logo: timesLogos.Corinthians }, quartas: 1 },
        { time1: { nome: '5º colocado', logo: timesLogos.Ferroviaria }, time2: { nome: '4º colocado', logo: timesLogos.Palmeiras }, quartas: 2 },
        { time1: { nome: '7º colocado', logo: timesLogos.Bahia }, time2: { nome: '2º colocado', logo: timesLogos["São Paulo"] }, quartas: 3 },
        { time1: { nome: '6º colocado', logo: timesLogos.Flamengo }, time2: { nome: '3º colocado', logo: timesLogos.Cruzeiro }, quartas: 4 },
    ];

    return (
        <div className="w-full max-w-5xl px-4 py-8 mx-auto">
            <h1 className="text-3xl font-bold text-[#523E6C] mb-8">Brasileirão Série A</h1>
            <div className="flex items-center justify-center space-x-4 mb-8">
                <button onClick={() => setView('primeiraFase')} className="text-gray-500 hover:text-[#523E6C] transition-colors duration-300">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" /> {/* seta esquerda */}
    </svg>
</button>

<span className="text-lg font-semibold text-gray-800 uppercase">
    {view === 'primeiraFase' ? 'PRIMEIRA FASE' : 'QUARTAS DE FINAL'}
</span>

<button onClick={() => setView('quartasDeFinal')} className="text-gray-500 hover:text-[#523E6C] transition-colors duration-300">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" /> {/* seta direita */}
    </svg>
</button>
            </div>
            {loading ? (
                <div className="text-center text-lg text-gray-600">Carregando tabela...</div>
            ) : error ? (
                <div className="text-center text-red-500 text-lg">{error}</div>
            ) : view === 'primeiraFase' ? (
                <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-200 overflow-x-auto">
                    <h2 className="text-xl font-bold mb-4">TABELA</h2>
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Classificação</th>
                                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">P</th>
                                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">J</th>
                                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">V</th>
                                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">E</th>
                                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">D</th>
                                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">GP</th>
                                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">GC</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {tabelaData.map((time, i) => (
                                <tr key={i} className={`${i < 4 ? 'bg-green-50' : i < 8 ? 'bg-yellow-50' : i > 11 ? 'bg-red-50' : ''}`}>
                                    <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900 flex items-center">
                                        <span className="w-5 text-center">{time.posicao}</span> - {time.nome}
                                    </td>
                                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">{time.p}</td>
                                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">{time.j}</td>
                                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">{time.v}</td>
                                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">{time.e}</td>
                                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">{time.d}</td>
                                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">{time.gp}</td>
                                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">{time.gc}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-200">
                    {quartasDeFinalData.map((partida, i) => (
                        <div key={i} className="flex items-center justify-between my-4 border-b pb-4">
                            <div className="flex items-center">
                                <img src={partida.time1.logo} alt={partida.time1.nome} className="w-10 h-10 rounded-full mr-2" />
                                <span className="text-gray-800">{partida.time1.nome}</span>
                            </div>
                            <span className="text-xl text-gray-500 mx-4">x</span>
                            <div className="flex items-center">
                                <img src={partida.time2.logo} alt={partida.time2.nome} className="w-10 h-10 rounded-full mr-2" />
                                <span className="text-gray-800">{partida.time2.nome}</span>
                            </div>
                            <div className="text-sm text-gray-600 ml-auto">
                                quartas {partida.quartas}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BrasileiraoPage;