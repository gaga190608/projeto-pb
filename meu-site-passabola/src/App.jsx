import { useState, useEffect } from 'react';
import axios from 'axios';

//components
import Header from './components/Header.jsx';
import Sidebar from './components/Sidebar.jsx';

//pages
import BrasileiraoPage from './pages/BrasileiraoPage.jsx';
import CalendarioPage from './pages/CalendarioPage.jsx';
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import NewsPage from './pages/NewsPage.jsx';
import PartidasAoVivoPage from './pages/PartidasAoVivoPage.jsx';
import SobrePage from './pages/SobrePage.jsx';
import AdminPage from './pages/AdminPage.jsx';

//firebase
import { signInWithCustomToken, signOut, onAuthStateChanged } from "firebase/auth";
import { auth, db, appId } from './services/FirebaseConfig.js';
import { doc, onSnapshot } from "firebase/firestore";

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

          
                const profileRef = doc(db, `artifacts/${appId}/users/${user.uid}/profiles`, 'userProfile');
                const unsubProfile = onSnapshot(profileRef, (doc) => {
                    if (doc.exists()) {
                        console.log("Perfil do usuário atualizado:", doc.data());
                    }
                }, (error) => {
                    console.error("Erro ao ouvir o perfil do usuário:", error);
                });

                return () => unsubProfile();
            } else {
                setUserId(null);
                setCurrentPage('login');
                console.log("Usuário deslogado");
            }
        });

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
            case 'admin':
                return <AdminPage />;
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