import React from 'react';
import { placeholderLogo } from '../constants/assets.js';

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

export default Header;