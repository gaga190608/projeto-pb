import React from 'react';
import { timesLogos, placeholderPrime, placeholderSportv } from '../constants/assets.js';

const CalendarioPage = () => (
  <div className="w-full max-w-5xl px-4 py-8 mx-auto">
    <h1 className="text-3xl font-bold text-[#523E6C] mb-8">CALENDÁRIO</h1>

   
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
     
      <div className="rounded-2xl bg-white p-6 shadow-md border border-gray-200 transform transition-transform duration-300 ease-out hover:-translate-y-2 hover:shadow-2xl">
        <div className="flex flex-col items-center">
          <div className="flex items-center space-x-6">
            <img src={timesLogos["São Paulo"]} alt="SPFC" className="h-12 w-12" />
            <span className="text-3xl font-bold text-gray-800">0</span>
            <span className="text-xl font-light text-gray-500">X</span>
            <span className="text-3xl font-bold text-gray-800">0</span>
            <img src={timesLogos.Corinthians} alt="Corinthians" className="h-12 w-12" />
          </div>
          <div className="flex items-center flex-wrap gap-2 text-sm mt-3 text-gray-500">
            <img src={placeholderPrime} alt="Prime Video" className="h-4 w-auto" />
            <img src={placeholderSportv} alt="SporTV" className="h-4 w-auto" />
            <span>Brasileirão</span><span>13/03</span><span>14:30</span>
          </div>
        </div>
      </div>

      {/* Card 2 */}
      <div className="rounded-2xl bg-white p-6 shadow-md border border-gray-200 transform transition-transform duration-300 ease-out hover:-translate-y-2 hover:shadow-2xl">
        <div className="flex flex-col items-center">
          <div className="flex items-center space-x-6">
            <img src={timesLogos.Palmeiras} alt="Palmeiras" className="h-12 w-12" />
            <span className="text-3xl font-bold text-gray-800">0</span>
            <span className="text-xl font-light text-gray-500">X</span>
            <span className="text-3xl font-bold text-gray-800">0</span>
            <img src={timesLogos["América Mineiro"]} alt="América-MG" className="h-12 w-12" />
          </div>
          <div className="flex items-center flex-wrap gap-2 text-sm mt-3 text-gray-500">
            <img src={placeholderPrime} alt="Prime Video" className="h-4 w-auto" />
            <img src={placeholderSportv} alt="SporTV" className="h-4 w-auto" />
            <span>Brasileirão</span><span>13/03</span><span>16:00</span>
          </div>
        </div>
      </div>

      {/* Card 3 */}
      <div className="rounded-2xl bg-white p-6 shadow-md border border-gray-200 transform transition-transform duration-300 ease-out hover:-translate-y-2 hover:shadow-2xl">
        <div className="flex flex-col items-center">
          <div className="flex items-center space-x-6">
            <img src={timesLogos.Flamengo} alt="Flamengo" className="h-12 w-12" />
            <span className="text-3xl font-bold text-gray-800">0</span>
            <span className="text-xl font-light text-gray-500">X</span>
            <span className="text-3xl font-bold text-gray-800">0</span>
            <img src={timesLogos.Cruzeiro} alt="Cruzeiro" className="h-12 w-12" />
          </div>
          <div className="flex items-center flex-wrap gap-2 text-sm mt-3 text-gray-500">
            <img src={placeholderPrime} alt="Prime Video" className="h-4 w-auto" />
            <img src={placeholderSportv} alt="SporTV" className="h-4 w-auto" />
            <span>Brasileirão</span><span>14/03</span><span>17:00</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default CalendarioPage;