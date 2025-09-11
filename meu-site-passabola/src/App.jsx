import { useState, useEffect } from 'react';
import axios from 'axios';

// Firebase imports
import { initializeApp } from "firebase/app";
import { getAuth, signInWithCustomToken, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, setDoc, onSnapshot } from "firebase/firestore";

import LuanaAle from './assets/LuanaAle.jpg';
import PassaBola from './assets/logo atualizado 1.png';
import Youtube from './assets/youtube.png';
import Instagram from './assets/instagram.png';
import Twiter from './assets/twiter.png';
import Tiktok from './assets/tik-tok.png';
import Prime from './assets/amazon-logo-amazon-icon-free-free-vector.jpg';
import America from './assets/America 1.png';
import Corinthians from './assets/corinthians 1.png';
import Flamengo from './assets/flamengo 1.png';
import Fluminense from './assets/fluminense.jpg';
import Cruzeiro from './assets/image 5.png';
import SaoPaulo from './assets/sao paulo.png';
import Palmeiras from './assets/palmeiras.png';
import Bragantino from './assets/bragantino.png';
import RealBrasilia from './assets/real brasilia.png';
import Internacional from './assets/internacional.jpg';
import Amazonia from './assets/3B_da_Amazônia.png';
import Juventude from './assets/juventude-rs.png';
import Bahia from './assets/bahia.png';
import Ferroviaria from './assets/Ferroviario.png';
import Sportv from './assets/sportv-logo-1-1.png';
import Noticia from './assets/noticia 1 1.jpg';
import Noticia2 from './assets/noticia 2 1.jpg';
import Noticia3 from './assets/noticias 3 1.jpg';
import PB from './assets/passaabola_bg.jpg';
import GE from './assets/FOTOS GE 1 1.jpg'
import Transferencia from './assets/TRANSFERENCIA.jpg'
import Futebol from './assets/futebol feminino 1.jpg'


const placeholderLogo = PassaBola;
const placeholderNews1 = Noticia;
const placeholderNews2 = Noticia2;
const placeholderNews3 = Noticia3;
const placeholderDonaDaBola = LuanaAle;
const placeholderYT = Youtube;
const placeholderX = Twiter;
const placeholderTT = Tiktok;
const placeholderInsta = Instagram;
const placeholderPrime = Prime;
const placeholderSportv = Sportv;
const placeholderBg = PB;

// Mapeamento dos nomes de times da API para os logos locais
const timesLogos = {
    "America Mineiro": America,
    "Bahia": Bahia,
    "Bragantino": Bragantino,
    "Corinthians": Corinthians,
    "Cruzeiro": Cruzeiro,
    "Ferroviaria": Ferroviaria,
    "Flamengo": Flamengo,
    "Fluminense": Fluminense,
    "Internacional": Internacional,
    "Juventude": Juventude,
    "Amazonia": Amazonia,
    "São Paulo": SaoPaulo,
    "Palmeiras": Palmeiras,
    "Real Brasilia": RealBrasilia,
};


const appId = (typeof globalThis !== 'undefined' && typeof globalThis.__app_id !== 'undefined') ? globalThis.__app_id : 'default-app-id';
const firebaseConfig = {
    apiKey: "AIzaSyC88Krj44x3aI2AZBMIOpVuvUC1ox8Kh0I",
    authDomain: "passabola-41f9b.firebaseapp.com",
    projectId: "passabola-41f9b",
    storageBucket: "passabola-41f9b.firebasestorage.app",
    messagingSenderId: "854386151912",
    appId: "1:854386151912:web:47ef285dacd2e63c09945d",
    measurementId: "G-X2N34FJ3SE"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Componentes da UI (inalterados)
const Header = ({ onMenuClick, onPageSelect, onLogout }) => {
    return (
        <header className="sticky top-0 z-50 w-full bg-[#839766] text-white py-4 shadow-lg flex items-center justify-between px-6 lg:px-12">
            <button onClick={onMenuClick} className="flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                <span className="hidden md:inline text-lg font-semibold cursor-pointer">MENU</span>
            </button>
            <button onClick={() => onPageSelect('home')} className="flex items-center space-x-2 cursor-pointer">
                <img src={placeholderLogo} alt="Passa a Bola Icon" className="w-10 h-10 rounded-full" />
                <span className="text-xl lg:text-2xl font-bold cursor-pointer">PASSA BOLA</span>
            </button>
            <button onClick={onLogout} className="flex items-center space-x-2">
                <span className="hidden md:inline text-lg font-semibold cursor-pointer">SAIR</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            </button>
        </header>
    );
};

const Sidebar = ({ isOpen, onClose, onPageSelect, currentPage }) => {
    const menuItems = [
        { name: 'home', label: 'HOME' },
        { name: 'noticias', label: 'NOTÍCIAS' },
        { name: 'brasileirao', label: 'BRASILEIRÃO' },
        { name: 'calendario', label: 'CALENDÁRIO' },
        { name: 'partidas-ao-vivo', label: 'PARTIDAS AO VIVO' },
        { name: 'sobre', label: 'SOBRE' },
    ];
    return (
        <div className={`fixed inset-y-0 left-0 w-64 bg-[#839766] text-white transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out z-40`}>
            <div className="p-6">
                <button onClick={onClose} className="absolute top-4 right-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                <ul className="mt-12 space-y-4">
                    {menuItems.map(item => (
                        <li key={item.name}>
                            <button
                                className={`block w-full text-left py-2 px-4 rounded-xl text-xl font-bold transition-colors duration-300 hover:bg-black/10 relative ${currentPage === item.name ? 'bg-black/20' : ''}`}
                                onClick={() => {
                                    onPageSelect(item.name);
                                    onClose();
                                }}
                            >
                                {item.label}
                                {currentPage === item.name && (
                                    <div className="absolute left-0 top-0 h-full w-1 bg-white rounded-r-full"></div>
                                )}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center space-x-2 text-white">
                <img src={placeholderLogo} alt="Passa a Bola App" className="w-17 h-16 rounded-full" />
                <span className="text-sm">Baixe o app PB</span>
            </div>
        </div>
    );
};
const HomePage = () => (
    <div className="flex flex-col items-center">
        <div className="flex items-center my-10 space-x-2">
            <h1 className="text-4xl lg:text-5xl font-extrabold text-[#523E6C]">FALA</h1>
            <img src={placeholderLogo} alt="Passa a Bola Icon" className="w-15 h-13 lg:w-20 lg:h-20" />
            <h1 className="text-4xl lg:text-5xl font-extrabold text-[#523E6C]">BEBÊ</h1>
        </div>
        <div className="w-full max-w-7xl px-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative w-full h-96 md:h-[48rem] rounded-2xl overflow-hidden shadow-lg">
                <img src={Futebol} alt="Seleção brasileira" className="w-full h-full object-cover" />
                <div className="absolute bottom-0 left-0 p-6 w-full h-full bg-gradient-to-t from-black to-transparent flex flex-col justify-end text-white">
                    <h2 className="text-2xl font-bold">SELEÇÃO BRASILEIRA VENCE EM JOGO DE ESTREIA NA COPA DAS FEDERAÇÕES</h2>
                    <p className="mt-2 text-sm">Com gols de Alice e da Marta o Brasil vence de virada por 2 x 1 a seleção do Uruguai</p>
                </div>
            </div>
            <div className="grid grid-rows-2 gap-4">
                <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-lg">
                    <img src={GE} alt="Seleção" className="w-full h-full object-cover" />
                    <div className="absolute bottom-0 left-0 p-6 w-full h-full bg-gradient-to-t from-black to-transparent flex flex-col justify-end text-white">
                        <h2 className="text-2xl font-bold">SELEÇÃO</h2>
                        <p className="mt-2 text-sm">Apenas nove atletas continuam em relação à última Copa América Feminina</p>
                    </div>
                </div>
                <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-lg">
                    <img src={Transferencia} alt="Transferência" className="w-full h-full object-cover" />
                    <div className="absolute bottom-0 left-0 p-6 w-full h-full bg-gradient-to-t from-black to-transparent flex flex-col justify-end text-white">
                        <h2 className="text-2xl font-bold">TRANSFERÊNCIA</h2>
                        <p className="mt-2 text-sm">Chelsea acerta contratação de Mayra Ramirez, Maior transferência do futebol feminino</p>
                    </div>
                </div>
            </div>
        </div>
        <div className="w-full max-w-7xl px-4 mt-8 bg-[#523E6C] rounded-3xl p-6 md:p-12 flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-12">
            <div className="w-full md:w-1/2 lg:w-1/2 flex flex-col items-center">
                <img src={placeholderDonaDaBola} alt="As Donas da Bola" className="w-full h-auto object-cover rounded-3xl shadow-lg" />
            </div>
            <div className="flex-1 text-white text-center md:text-left">
                <h3 className="text-xl lg:text-3xl font-extrabold mb-4">As Donas da Bola: Conheça a História de Luana Maluf e Alê Xavier, as Forças por Trás do Passa a Bola.</h3>
            </div>
        </div>
        <div className="w-full max-w-7xl px-4 mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex flex-col items-center justify-center p-4 bg-white/50 rounded-xl text-center shadow-md">
                <a href="https://www.youtube.com/@passabola" target="_blank" className="flex flex-col items-center">
                    <img src={placeholderYT} alt="YouTube" className="h-12 w-12" />
                    <span className="mt-2 text-sm text-gray-800">@passabola</span>
                </a>
            </div>
            <div className="flex flex-col items-center justify-center p-4 bg-white/50 rounded-xl text-center shadow-md">
                <a href="https://x.com/passaabola" target="_blank" className="flex flex-col items-center">
                    <img src={placeholderX} alt="X" className="h-12 w-12" />
                    <span className="mt-2 text-sm text-gray-800">@passabola</span>
                </a>
            </div>
            <div className="flex flex-col items-center justify-center p-4 bg-white/50 rounded-xl text-center shadow-md">
                <a href="https://www.tiktok.com/@passabola?lang=pt-BR" target="_blank" className="flex flex-col items-center">
                    <img src={placeholderTT} alt="TikTok" className="h-12 w-12" />
                    <span className="mt-2 text-sm text-gray-800">@passabola</span>
                    <span className="text-sm text-gray-600">@luanamaluf</span>
                    <span className="text-sm text-gray-600">@alexavier</span>
                </a>
            </div>
            <div className="flex flex-col items-center justify-center p-4 bg-white/50 rounded-xl text-center shadow-md">
                <a href="https://www.instagram.com/passaabola?igsh=anZjZjVxM3h1YTAy" target="_blank" className="flex flex-col items-center">
                    <img src={placeholderInsta} alt="Instagram" className="h-12 w-12" />
                    <span className="mt-2 text-sm text-gray-800">@alexavier</span>
                    <span className="text-sm text-gray-600">@luanamaluf</span>
                    <span className="text-sm text-gray-600">@passabola</span>
                </a>
            </div>
        </div>
    </div>
);

const NewsPage = () => (
    <div className="w-full max-w-5xl px-4 py-8 mx-auto">
        <h1 className="text-3xl font-bold text-[#523E6C] mb-8">NOTÍCIAS</h1>
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-8 pb-4 border-b border-gray-300">
                <img src={placeholderNews1} alt="Copa do Brasil feminina" className="w-full md:w-64 rounded-xl shadow-lg" />
                <div className="flex-1">
                    <h2 className="text-xl font-bold text-[#523E6C]">Copa do Brasil feminina 2025: veja confrontos da segunda fase do torneio</h2>
                    <p className="mt-2 text-gray-600 text-sm">Nesta etapa da competição, equipes da Série A2 do Campeonato Brasileiro entram na disputa. Ao todo, 32 clubes brigam por vaga na terceira fase</p>
                </div>
            </div>
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-8 pb-4 border-b border-gray-300">
                <img src={placeholderNews2} alt="Fátima Dutra" className="w-full md:w-64 rounded-xl shadow-lg" />
                <div className="flex-1">
                    <h2 className="text-xl font-bold text-[#523E6C]">Do início em projeto social à convocação: lateral realiza sonho na Seleção e ao lado de Marta</h2>
                    <p className="mt-2 text-gray-600 text-sm">Fátima Dutra, da Ferroviária, foi convocada pela primeira vez para Seleção principal e entrou em campo na primeira partida contra o Japão; times voltam a se enfrentar nesta segunda</p>
                </div>
            </div>
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-8">
                <img src={placeholderNews3} alt="Arthur Elias" className="w-full md:w-64 rounded-xl shadow-lg" />
                <div className="flex-1">
                    <h2 className="text-xl font-bold text-[#523E6C]">Como é a reformulação promovida por Arthur Elias para trabalhar novas joias da Seleção sem pressa</h2>
                    <p className="mt-2 text-gray-600 text-sm">Brasil enfrenta o Japão nesta segunda, em Bragança Paulista, em amistoso preparatório para Copa América Feminina; primeira partida foi 3 a 1 para Seleção</p>
                </div>
            </div>
        </div>
    </div>
);

// Componentes refatorados com a nova lógica
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
                // ID da Liga Brasileira Feminina (WOF). Esse ID pode mudar.
                const leagueCode = 'WOF';

                const response = await axios.get(`https://api.football-data.org/v4/competitions/${leagueCode}/standings`, {
                    headers: {
                        'X-Auth-Token': import.meta.env.VITE_FOOTBALL_DATA_API_KEY,
                    },
                });

                if (response.data.standings && response.data.standings.length > 0) {
                    const standings = response.data.standings[0].table;
                    const formattedData = standings.map(team => ({
                        posicao: team.position,
                        nome: team.team.name,
                        p: team.points,
                        j: team.playedGames,
                        v: team.won,
                        e: team.draw,
                        d: team.lost,
                        gp: team.goalsFor,
                        gc: team.goalsAgainst,
                        // A API Football-Data não oferece o histórico de últimos jogos de forma simples, então usamos um mock.
                        ultimosJogos: ["green", "green", "red", "green", "red"],
                    }));
                    setTabelaData(formattedData);
                } else {
                    setTabelaData([]);
                }
            } catch (err) {
                console.error("Erro ao buscar dados da API Football-Data:", err);
                setError("Não foi possível carregar a tabela. Verifique sua chave de API e o código da liga.");
            } finally {
                setLoading(false);
            }
        };
        fetchStandings();
    }, []);

    const quartasDeFinalData = [
        { time1: { nome: '8º colocado', logo: timesLogos["América-MG"] }, time2: { nome: '1º colocado', logo: timesLogos.Corinthians }, quartas: 1 },
        { time1: { nome: '5º colocado', logo: timesLogos.Ferroviaria }, time2: { nome: '4º colocado', logo: timesLogos.Palmeiras }, quartas: 2 },
        { time1: { nome: '7º colocado', logo: timesLogos.Bahia }, time2: { nome: '2º colocado', logo: timesLogos["São Paulo"] }, quartas: 3 },
        { time1: { nome: '6º colocado', logo: timesLogos.Flamengo }, time2: { nome: '3º colocado', logo: timesLogos.Cruzeiro }, quartas: 4 },
    ];

    // ... (restante do componente, mantido)

    return (
        <div className="w-full max-w-5xl px-4 py-8 mx-auto">
            <h1 className="text-3xl font-bold text-[#523E6C] mb-8">Brasileirão Série A</h1>
            <div className="flex items-center justify-center space-x-4 mb-8">
                <button onClick={() => setView('quartasDeFinal')} className="text-gray-500 hover:text-[#523E6C] transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" /></svg>
                </button>
                <span className="text-lg font-semibold text-gray-800 uppercase">
                    {view === 'primeiraFase' ? 'PRIMEIRA FASE' : 'QUARTAS DE FINAL'}
                </span>
                <button onClick={() => setView('primeiraFase')} className="text-gray-500 hover:text-[#523E6C] transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor"><path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" /></svg>
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
                                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Últ. Jogos</th>
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
                                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {time.ultimosJogos.map((resultado, idx) => (
                                            <span key={idx} className={`inline-block w-3 h-3 rounded-full mx-0.5 ${resultado === 'green' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                        ))}
                                    </td>
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

const CalendarioPage = () => (
    <div className="w-full max-w-5xl px-4 py-8 mx-auto">
        <h1 className="text-3xl font-bold text-[#523E6C] mb-8">CALENDÁRIO</h1>
        <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-200">
            <div className="flex flex-col items-center py-4 border-b border-gray-300">
                <div className="flex items-center space-x-6">
                    <img src={timesLogos["São Paulo"]} alt="SPFC" className="h-12 w-12" />
                    <span className="text-3xl font-bold text-gray-800">0</span>
                    <span className="text-xl font-light text-gray-500">X</span>
                    <span className="text-3xl font-bold text-gray-800">0</span>
                    <img src={timesLogos.Corinthians} alt="Corinthians" className="h-12 w-12" />
                </div>
                <div className="flex items-center space-x-2 text-sm mt-2 text-gray-500">
                    <img src={placeholderPrime} alt="Prime Video" className="h-4 w-auto" />
                    <img src={placeholderSportv} alt="SporTV" className="h-4 w-auto" />
                    <span>Brasileirão</span>
                    <span>13/03</span>
                    <span>14:30</span>
                </div>
            </div>
            <div className="flex flex-col items-center py-4 border-b border-gray-300">
                <div className="flex items-center space-x-6">
                    <img src={timesLogos.Palmeiras} alt="Palmeiras" className="h-12 w-12" />
                    <span className="text-3xl font-bold text-gray-800">0</span>
                    <span className="text-xl font-light text-gray-500">X</span>
                    <span className="text-3xl font-bold text-gray-800">0</span>
                    <img src={America} alt="América-MG" className="h-12 w-12" />
                </div>
                <div className="flex items-center space-x-2 text-sm mt-2 text-gray-500">
                    <img src={placeholderPrime} alt="Prime Video" className="h-4 w-auto" />
                    <img src={placeholderSportv} alt="SporTV" className="h-4 w-auto" />
                    <span>Brasileirão</span>
                    <span>13/03</span>
                    <span>16:00</span>
                </div>
            </div>
            <div className="flex flex-col items-center py-4">
                <div className="flex items-center space-x-6">
                    <img src={timesLogos.Flamengo} alt="Flamengo" className="h-12 w-12" />
                    <span className="text-3xl font-bold text-gray-800">0</span>
                    <span className="text-xl font-light text-gray-500">X</span>
                    <span className="text-3xl font-bold text-gray-800">0</span>
                    <img src={timesLogos.Cruzeiro} alt="Cruzeiro" className="h-12 w-12" />
                </div>
                <div className="flex items-center space-x-2 text-sm mt-2 text-gray-500">
                    <img src={placeholderPrime} alt="Prime Video" className="h-4 w-auto" />
                    <img src={placeholderSportv} alt="SporTV" className="h-4 w-auto" />
                    <span>Brasileirão</span>
                    <span>14/03</span>
                    <span>17:00</span>
                </div>
            </div>
        </div>
    </div>
);

const SobrePage = () => (
    <div className="w-full max-w-5xl px-4 py-8 mx-auto">
        <h1 className="text-3xl font-bold text-[#523E6C] mb-8">SOBRE</h1>
        <div className="bg-[#523E6C] rounded-3xl p-6 md:p-12 flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-12">
            <div className="w-full md:w-1/2 lg:w-1/2 flex flex-col items-center">
                <img src={placeholderDonaDaBola} alt="As Donas da Bola" className="w-full h-auto object-cover rounded-3xl shadow-lg" />
            </div>
            <div className="flex-1 text-white text-center md:text-left">
                <h3 className="text-xl lg:text-3xl font-extrabold mb-4">As Donas da Bola: Conheça a História de Luana Maluf e Alê Xavier, as Forças por Trás do Passa a Bola.</h3>
            </div>
        </div>
        <div className="w-full max-w-7xl px-4 mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex flex-col items-center justify-center p-4 bg-white/50 rounded-xl text-center shadow-md">
                <a href="#" className="flex flex-col items-center">
                    <img src={placeholderYT} alt="YouTube" className="h-12 w-12" />
                    <span className="mt-2 text-sm text-gray-800">@passabola</span>
                </a>
            </div>
            <div className="flex flex-col items-center justify-center p-4 bg-white/50 rounded-xl text-center shadow-md">
                <a href="#" className="flex flex-col items-center">
                    <img src={placeholderX} alt="X" className="h-12 w-12" />
                    <span className="mt-2 text-sm text-gray-800">@passabola</span>
                </a>
            </div>
            <div className="flex flex-col items-center justify-center p-4 bg-white/50 rounded-xl text-center shadow-md">
                <a href="#" className="flex flex-col items-center">
                    <img src={placeholderTT} alt="TikTok" className="h-12 w-12" />
                    <span className="mt-2 text-sm text-gray-800">@passabola</span>
                    <span className="text-sm text-gray-600">@luanamaluf</span>
                    <span className="text-sm text-gray-600">@alexavier</span>
                </a>
            </div>
            <div className="flex flex-col items-center justify-center p-4 bg-white/50 rounded-xl text-center shadow-md">
                <a href="#" className="flex flex-col items-center">
                    <img src={placeholderInsta} alt="Instagram" className="h-12 w-12" />
                    <span className="mt-2 text-sm text-gray-800">@alexavier</span>
                    <span className="text-sm text-gray-600">@luanamaluf</span>
                    <span className="text-sm text-gray-600">@passabola</span>
                </a>
            </div>
        </div>
    </div>
);

const PartidasAoVivoPage = () => {
    const [partidas, setPartidas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLiveMatches = async () => {
            setLoading(true);
            setError(null);

            try {
                // A URL base da API do football-data.org é https://api.football-data.org/v4/
                // O endpoint para buscar partidas ao vivo é /v4/matches com o parâmetro status=LIVE
                const response = await axios.get('https://api.football-data.org/v4/matches?status=LIVE', {
                    headers: {
                        'X-Auth-Token': import.meta.env.VITE_FOOTBALL_DATA_API_KEY,
                    },
                });

                // A resposta da API do football-data.org retorna um array de partidas
                // diretamente na propriedade `matches` da resposta.
                const liveMatches = (response.data.matches || [])
                    .filter(match => match.status === 'IN_PLAY' || match.status === 'PAUSED')
                    .map(match => ({
                        id: match.id,
                        time1: match.homeTeam?.name || '—',
                        placar1: match.score?.fullTime?.home ?? '-',
                        time2: match.awayTeam?.name || '—',
                        placar2: match.score?.fullTime?.away ?? '-',
                        // Verificamos o status para exibir "LIVE" ou "Intervalo"
                        tempo: match.status === 'IN_PLAY' ? 'LIVE' : 'Intervalo',
                        status: match.status,
                    }));

                setPartidas(liveMatches);

            } catch (err) {
                console.error("Erro ao buscar partidas ao vivo:", err);
                // A mensagem de erro da API pode ser mais útil para o usuário
                setError(err.response?.data?.message || "Não foi possível carregar as partidas. Verifique sua chave de API ou o limite de uso.");
            } finally {
                setLoading(false);
            }
        };

        // Chama a função de busca a cada 60 segundos
        fetchLiveMatches();
        const interval = setInterval(fetchLiveMatches, 60000);

        // Limpa o intervalo quando o componente é desmontado
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full max-w-5xl px-4 py-8 mx-auto">
            <h1 className="text-3xl font-bold text-[#523E6C] mb-8">Partidas ao Vivo</h1>
            <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-200">
                {loading ? (
                    <p className="text-lg text-gray-600 text-center">Sincronizando dados em tempo real...</p>
                ) : error ? (
                    <p className="text-lg text-red-500 text-center">{error}</p>
                ) : partidas.length === 0 ? (
                    <p className="text-lg text-gray-600 text-center">Nenhuma partida ao vivo no momento.</p>
                ) : (
                    partidas.map(partida => (
                        <div key={partida.id} className="flex flex-col md:flex-row items-center justify-between my-4 py-4 border-b border-gray-300 last:border-b-0">
                            <div className="flex items-center space-x-2">
                                <img src={timesLogos[partida.time1]} alt={partida.time1} className="w-10 h-10 rounded-full" />
                                <span className="text-xl font-medium text-gray-800">{partida.time1}</span>
                            </div>
                            <div className="flex items-center space-x-4 my-2 md:my-0">
                                <span className="text-2xl font-bold text-[#523E6C]">{partida.placar1}</span>
                                <span className="text-lg font-light text-gray-500">x</span>
                                <span className="text-2xl font-bold text-[#523E6C]">{partida.placar2}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="text-xl font-medium text-gray-800">{partida.time2}</span>
                                <img src={timesLogos[partida.time2]} alt={partida.time2} className="w-10 h-10 rounded-full" />
                            </div>
                            <div className="text-sm text-gray-600 md:ml-auto flex flex-col items-center mt-2 md:mt-0">
                                <span>{partida.tempo}</span>
                                <span>LIVE</span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

const LoginPage = ({ onLoginSuccess }) => {
    const [isLoginView, setIsLoginView] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('error');
    const [loading, setLoading] = useState(false);

    const showMessage = (text, type = 'error') => {
        setMessage(text);
        setMessageType(type);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            await signInWithEmailAndPassword(auth, email, password);
            showMessage("Login realizado com sucesso! Redirecionando...", 'success');
            onLoginSuccess();
        } catch (error) {
            console.error("Erro no login:", error);
            showMessage(`Erro no login: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const userId = user.uid;

            // Insere o perfil do usuário no banco de dados Firestore
            const profileRef = doc(db, `artifacts/${appId}/users/${userId}/profiles`, 'userProfile');
            await setDoc(profileRef, {
                id: userId,
                email: user.email,
                createdAt: new Date().toISOString()
            });

            showMessage("Cadastro realizado com sucesso! Você já pode entrar.", 'success');
        } catch (error) {
            console.error("Erro no cadastro:", error);
            showMessage(`Erro no cadastro: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative flex items-center justify-center min-h-screen">
            <div
                className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out transform scale-100"
                style={{ backgroundImage: `url(${placeholderBg})`, filter: 'blur(8px)' }}
            ></div>
            <div className="relative z-10 w-full max-w-sm p-8 space-y-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg text-center transition-all duration-500 ease-in-out opacity-100 scale-100">
                {message && (
                    <div className={`px-4 py-3 rounded relative ${messageType === 'error' ? 'bg-red-100 text-red-700 border border-red-400' : 'bg-green-100 text-green-700 border border-green-400'}`}>
                        {message}
                    </div>
                )}
                {isLoginView ? (
                    <>
                        <h2 className="text-2xl font-bold text-center text-[#523E6C]">Acesse o Passa a Bola</h2>
                        <form onSubmit={handleLogin} className="space-y-4">
                            <input
                                type="email"
                                placeholder="E-mail"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-3 rounded-md shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#839766]"
                            />
                            <input
                                type="password"
                                placeholder="Senha"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-3 rounded-md shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#839766]"
                            />
                            <button
                                type="submit"
                                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#839766] hover:bg-[#687a55] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#839766]"
                                disabled={loading}
                            >
                                {loading ? 'Carregando...' : 'Entrar'}
                            </button>
                        </form>
                        <p className="text-gray-600">
                            Não tem uma conta? <button onClick={() => setIsLoginView(false)} className="text-[#839766] font-semibold hover:underline">Cadastre-se</button>
                        </p>
                    </>
                ) : (
                    <>
                        <h2 className="text-2xl font-bold text-center text-[#523E6C]">Crie sua conta</h2>
                        <form onSubmit={handleSignup} className="space-y-4">
                            <input
                                type="email"
                                placeholder="E-mail"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-3 rounded-md shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#839766]"
                            />
                            <input
                                type="password"
                                placeholder="Senha"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-3 rounded-md shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#839766]"
                            />
                            <button
                                type="submit"
                                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#523E6C] hover:bg-[#3f3152] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#523E6C]"
                                disabled={loading}
                            >
                                {loading ? 'Carregando...' : 'Cadastrar'}
                            </button>
                        </form>
                        <p className="text-gray-600">
                            Já tem uma conta? <button onClick={() => setIsLoginView(true)} className="text-[#839766] font-semibold hover:underline">Entrar</button>
                        </p>
                    </>
                )}
            </div>
        </div>
    );
};

// Componente principal App
const App = () => {
    const [currentPage, setCurrentPage] = useState('login');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUserId(user.uid);
                setCurrentPage('home');
                console.log("Usuário autenticado:", user.uid);

                // Assinar o perfil do usuário para atualizações em tempo real
                const profileRef = doc(db, `artifacts/${appId}/users/${user.uid}/profiles`, 'userProfile');
                const unsubProfile = onSnapshot(profileRef, (doc) => {
                    if (doc.exists()) {
                        console.log("Perfil do usuário atualizado:", doc.data());
                    }
                }, (error) => {
                    console.error("Erro ao ouvir o perfil do usuário:", error);
                });

                // Retornar a função de cancelamento da inscrição para limpeza
                return () => unsubProfile();
            } else {
                setUserId(null);
                setCurrentPage('login');
                console.log("Usuário deslogado");
            }
        });

        // Tentar autenticar com o token customizado se existir (usando globalThis para evitar erros em build/linters)
        const initialAuthToken = (typeof globalThis !== 'undefined' && typeof globalThis.__initial_auth_token !== 'undefined') ? globalThis.__initial_auth_token : null;
        if (initialAuthToken && !userId) {
            signInWithCustomToken(auth, initialAuthToken)
                .then(() => console.log("Autenticação customizada bem-sucedida"))
                .catch((error) => console.error("Erro na autenticação customizada:", error));
        }

        return () => unsubscribe();
    }, [userId]);


    const handleLogout = async () => {
        try {
            await signOut(auth);
            setCurrentPage('login');
        } catch (error) {
            console.error("Erro ao sair:", error);
        }
    };

    const renderPage = () => {
        if (currentPage === 'login') {
            return <LoginPage onLoginSuccess={() => setCurrentPage('home')} />;
        }

        switch (currentPage) {
            case 'home':
                return <HomePage />;
            case 'noticias':
                return <NewsPage />;
            case 'brasileirao':
                return <BrasileiraoPage />;
            case 'calendario':
                return <CalendarioPage />;
            case 'partidas-ao-vivo':
                return <PartidasAoVivoPage />;
            case 'sobre':
                return <SobrePage />;
            default:
                return <HomePage />;
        }
    };

    return (
        <div className="min-h-screen bg-[#F0EEED] font-sans relative">
            <style>
                {`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
                body {
                    font-family: 'Inter', sans-serif;
                }
                .filter {
                    filter: blur(8px) brightness(.4);
                }`}
            </style>
            <div className="relative">
                {currentPage !== 'login' && (
                    <Header onMenuClick={() => setIsMenuOpen(true)} onPageSelect={setCurrentPage} onLogout={handleLogout} />
                )}
                {currentPage !== 'login' && (
                    <Sidebar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} onPageSelect={setCurrentPage} currentPage={currentPage} />
                )}
                <main className={`p-6 lg:p-12 transition-filter duration-300 ease-in-out ${isMenuOpen ? 'filter' : ''}`}>
                    {renderPage()}
                </main>
            </div>
            {currentPage !== 'login' && (
                <footer className="w-full bg-[#839766] text-center text-white py-4 shadow-inner mt-8">
                    <p className="text-sm">&copy; Copyright 2025- Passa a Bola S.A.</p>
                </footer>
            )}
        </div>
    );
};

export default App;
