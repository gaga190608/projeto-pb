// src/pages/AdminPage.jsx

import React, { useState, useEffect } from 'react';
import AdminDashboard from '../components/ui/AdminDashboard.jsx';

const AdminPage = () => {
    
    
    return (
        <div className="w-full max-w-7xl px-4 py-8 mx-auto">
            <h1 className="text-4xl font-bold text-[#523E6C] mb-8 border-b-2 pb-2">
                Painel de Administração
            </h1>
            <p className="text-lg text-gray-600 mb-6">
                Monitoramento de Telemetria de Atletas (Docker/Azure)
            </p>

            <AdminDashboard />
        </div>
    );
};

export default AdminPage;