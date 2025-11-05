import React from 'react';
import { placeholderNews1, placeholderNews2, placeholderNews3 } from '../constants/assets.js';

const items = [
  { img: placeholderNews1, title: 'Copa do Brasil feminina 2025: veja confrontos da segunda fase do torneio', desc: 'Nesta etapa da competição, equipes da Série A2 do Campeonato Brasileiro entram na disputa. Ao todo, 32 clubes brigam por vaga na terceira fase' },
  { img: placeholderNews2, title: 'Do início em projeto social à convocação: lateral realiza sonho na Seleção e ao lado de Marta', desc: 'Fátima Dutra, da Ferroviária, foi convocada pela primeira vez para Seleção principal e entrou em campo na primeira partida contra o Japão; times voltam a se enfrentar nesta segunda' },
  { img: placeholderNews3, title: 'Como é a reformulação promovida por Arthur Elias para trabalhar novas joias da Seleção sem pressa', desc: 'Brasil enfrenta o Japão nesta segunda, em Bragança Paulista, em amistoso preparatório para Copa América Feminina; primeira partida foi 3 a 1 para Seleção' },
];

const NewsPage = () => (
  <div className="w-full max-w-5xl px-4 py-8 mx-auto">
    <h1 className="text-3xl font-bold text-[#523E6C] mb-8">NOTÍCIAS</h1>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((n, i) => (
        <article
          key={i}
          className="rounded-2xl overflow-hidden bg-white shadow-md border border-gray-200 transform transition-transform duration-300 ease-out hover:-translate-y-2 hover:shadow-2xl"
        >
          <img src={n.img} alt={n.title} className="w-full h-44 object-cover" />
          <div className="p-5">
            <h2 className="text-lg font-bold text-[#523E6C]">{n.title}</h2>
            <p className="mt-2 text-gray-600 text-sm">{n.desc}</p>
          </div>
        </article>
      ))}
    </div>
  </div>
);

export default NewsPage;