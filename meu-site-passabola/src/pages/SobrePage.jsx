import React from 'react';

import { 
    placeholderDonaDaBola, 
    placeholderYT, 
    placeholderX, 
    placeholderTT, 
    placeholderInsta 
} from '../constants/assets.js';

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
                <a href="https://www.instagram.com/passaabola/" target="_blank" className="flex flex-col items-center">
                    <img src={placeholderInsta} alt="Instagram" className="h-12 w-12" />
                    <span className="mt-2 text-sm text-gray-800">@alexavier</span>
                    <span className="text-sm text-gray-600">@luanamaluf</span>
                    <span className="text-sm text-gray-600">@passabola</span>
                </a>
            </div>
        </div>
    </div>
);
export default SobrePage;