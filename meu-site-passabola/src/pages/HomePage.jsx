import React from 'react';
import { 
    placeholderLogo, 
    Futebol_Asset, 
    GE_Asset, 
    Transferencia_Asset, 
    placeholderDonaDaBola,
    placeholderYT, 
    placeholderX, 
    placeholderTT, 
    placeholderInsta 
} from '../constants/assets.js';

const HomePage = () => (
    <div className="flex flex-col items-center">
        <div className="flex items-center my-10 space-x-2">
            <h1 className="text-4xl lg:text-5xl font-extrabold text-[#523E6C]">FALA</h1>
            <img src={placeholderLogo} alt="Passa a Bola Icon" className="w-15 h-13 lg:w-20 lg:h-20" />
            <h1 className="text-4xl lg:text-5xl font-extrabold text-[#523E6C]">BEBÊ</h1>
        </div>

        {/* principal grid - cards com hover lift */}
        <div className="w-full max-w-7xl px-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative w-full h-96 md:h-[48rem] rounded-2xl overflow-hidden shadow-md transform transition-transform duration-300 ease-out hover:-translate-y-3 hover:scale-[1.01] hover:shadow-2xl hover:z-10 will-change-transform">
                <img src={Futebol_Asset} alt="Seleção brasileira" className="w-full h-full object-cover" />
                <div className="absolute bottom-0 left-0 p-6 w-full h-full bg-gradient-to-t from-black to-transparent flex flex-col justify-end text-white">
                    <h2 className="text-2xl font-bold">SELEÇÃO BRASILEIRA VENCE EM JOGO DE ESTREIA NA COPA DAS FEDERAÇÕES</h2>
                    <p className="mt-2 text-sm">Com gols de Alice e da Marta o Brasil vence de virada por 2 x 1 a seleção do Uruguai</p>
                </div>
            </div>

            <div className="grid grid-rows-2 gap-4">
                <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-md transform transition-transform duration-300 ease-out hover:-translate-y-3 hover:scale-[1.01] hover:shadow-2xl hover:z-10 will-change-transform">
                    <img src={GE_Asset} alt="Seleção" className="w-full h-full object-cover" />
                    <div className="absolute bottom-0 left-0 p-6 w-full h-full bg-gradient-to-t from-black to-transparent flex flex-col justify-end text-white">
                        <h2 className="text-2xl font-bold">SELEÇÃO</h2>
                        <p className="mt-2 text-sm">Apenas nove atletas continuam em relação à última Copa América Feminina</p>
                    </div>
                </div>
                <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-md transform transition-transform duration-300 ease-out hover:-translate-y-3 hover:scale-[1.01] hover:shadow-2xl hover:z-10 will-change-transform">
                    <img src={Transferencia_Asset} alt="Transferência" className="w-full h-full object-cover" />
                    <div className="absolute bottom-0 left-0 p-6 w-full h-full bg-gradient-to-t from-black to-transparent flex flex-col justify-end text-white">
                        <h2 className="text-2xl font-bold">TRANSFERÊNCIA</h2>
                        <p className="mt-2 text-sm">Chelsea acerta contratação de Mayra Ramirez, Maior transferência do futebol feminino</p>
                    </div>
                </div>
            </div>
        </div>

        {/* bloco destaque - mantive estrutura, adicionei efeito hover à imagem/card */}
        <div className="w-full max-w-7xl px-4 mt-8 bg-[#523E6C] rounded-3xl p-6 md:p-12 flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-12">
            <div className="w-full md:w-1/2 lg:w-1/2 flex flex-col items-center">
                <img src={placeholderDonaDaBola} alt="As Donas da Bola" className="w-full h-auto object-cover rounded-3xl shadow-md transform transition-transform duration-300 ease-out hover:-translate-y-2 hover:scale-[1.01] hover:shadow-2xl hover:z-10 will-change-transform" />
            </div>
            <div className="flex-1 text-white text-center md:text-left">
                <h3 className="text-xl lg:text-3xl font-extrabold mb-4">As Donas da Bola: Conheça a História de Luana Maluf e Alê Xavier, as Forças por Trás do Passa a Bola.</h3>
            </div>
        </div>

        {/* redes sociais - cards pequenos com hover harmônico */}
        <div className="w-full max-w-7xl px-4 mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex flex-col items-center justify-center p-4 bg-white/50 rounded-xl text-center shadow-sm transform transition-transform duration-250 ease-out hover:-translate-y-2 hover:shadow-lg hover:scale-[1.01] hover:z-10 will-change-transform">
                 <a href="https://www.youtube.com/@passabola" target="_blank" className="flex flex-col items-center">
                    <img src={placeholderYT} alt="YouTube" className="h-12 w-12" />
                    <span className="mt-2 text-sm text-gray-800">@passabola</span>
                </a>
            </div>

            <div className="flex flex-col items-center justify-center p-4 bg-white/50 rounded-xl text-center shadow-sm transform transition-transform duration-250 ease-out hover:-translate-y-2 hover:shadow-lg hover:scale-[1.01] hover:z-10 will-change-transform">
                <a href="https://x.com/passaabola" target="_blank" className="flex flex-col items-center">
                    <img src={placeholderX} alt="X" className="h-12 w-12" />
                    <span className="mt-2 text-sm text-gray-800">@passabola</span>
                </a>
            </div>

            <div className="flex flex-col items-center justify-center p-4 bg-white/50 rounded-xl text-center shadow-sm transform transition-transform duration-250 ease-out hover:-translate-y-2 hover:shadow-lg hover:scale-[1.01] hover:z-10 will-change-transform">
                <a href="https://www.tiktok.com/@passabola?lang=pt-BR" target="_blank" className="flex flex-col items-center">
                    <img src={placeholderTT} alt="TikTok" className="h-12 w-12" />
                    <span className="mt-2 text-sm text-gray-800">@passabola</span>
                    <span className="text-sm text-gray-600">@luanamaluf</span>
                    <span className="text-sm text-gray-600">@alexavier</span>
                </a>
            </div>

            <div className="flex flex-col items-center justify-center p-4 bg-white/50 rounded-xl text-center shadow-sm transform transition-transform duration-250 ease-out hover:-translate-y-2 hover:shadow-lg hover:scale-[1.01] hover:z-10 will-change-transform">
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

export default HomePage;