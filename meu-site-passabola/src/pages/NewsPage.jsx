import React from 'react';
import { placeholderNews1, placeholderNews2, placeholderNews3 } from '../constants/assets.js';

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

export default NewsPage;
