import React, { useState } from 'react'

import { auth, db, appId } from '../services/FirebaseConfig.js';

import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

import { doc, setDoc } from "firebase/firestore";

import { placeholderBg } from '../constants/assets.js';

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

export default LoginPage;