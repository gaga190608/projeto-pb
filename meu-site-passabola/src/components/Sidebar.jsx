import React,{useRef} from 'react';
import { placeholderLogo } from '../constants/assets.js';
import { useOnClickOutside } from '../hooks/useOnClickOutside.js';

const Sidebar = ({ isOpen, onClose, onPageSelect, currentPage }) => {
    
    const sidebarRef = useRef();
    useOnClickOutside(sidebarRef, () => {

        if (isOpen) {
            onClose(); 
        }
    });
    
    
    const menuItems = [
        { name: 'home', label: 'HOME' },
        { name: 'noticias', label: 'NOTÍCIAS' },
        { name: 'brasileirao', label: 'BRASILEIRÃO' },
        { name: 'calendario', label: 'CALENDÁRIO' },
        { name: 'partidas-ao-vivo', label: 'PARTIDAS AO VIVO' },
        { name: 'sobre', label: 'SOBRE' },
    ];
    return (
        <div
        ref={sidebarRef}
         className={`fixed inset-y-0 left-0 w-64 bg-[#839766] text-white transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out z-40`}>
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

export default Sidebar;