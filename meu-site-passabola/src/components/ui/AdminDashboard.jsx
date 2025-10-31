import React from 'react';

// Dados simulados de telemetria (Batimentos Cardíacos)
const mockContainerData = [
    { athlete: "Marta Silva", container_id: "5f3a2c", bpm: 155, status: "Running", last_update: "00:01:22" },
    { athlete: "Formiga", container_id: "8c9b1d", bpm: 120, status: "Stopped", last_update: "02:15:00" },
    { athlete: "Debinha", container_id: "2e4g6h", bpm: 140, status: "Running", last_update: "00:00:15" },
];

const AdminDashboard = () => {
    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-extrabold text-[#523E6C] border-b pb-2">
                Monitoramento de Telemetria (BPM)
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {mockContainerData.map((data) => {
                    const statusClass = data.status === 'Running' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800';
                    const borderClass = data.status === 'Running' 
                        ? 'border-green-500' 
                        : 'border-red-500';

                    return (
                        <div 
                            key={data.container_id} 
                            // 🔑 Usando classes Tailwind para o estilo preto/escuro
                            className={`p-6 rounded-xl shadow-xl bg-[#1e1e1e] text-white border-l-4 ${borderClass}`}
                        >
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-sm font-medium text-gray-400">Contêiner ID: {data.container_id}</span>
                                <span className={`px-3 py-1 text-xs font-bold rounded-full ${statusClass}`}>
                                    {data.status}
                                </span>
                            </div>
                            
                            <h3 className="text-xl font-bold text-white mb-2">{data.athlete}</h3>
                            
                            <div className="mt-4">
                                <p className="text-4xl font-extrabold text-[#839766]">
                                    {data.bpm} BPM 
                                </p>
                                <p className="text-sm text-gray-400 mt-1">Última atualização: {data.last_update}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
            
            {}
            <div className="mt-8 p-4 bg-gray-200 rounded-lg text-sm text-gray-800 border-l-4 border-gray-400">
                <p>
                    Esta é a simulação de acesso aos dados de telemetria dos contêineres Docker hospedados na Azure.
                </p>
            </div>
        </div>
    );
};

export default AdminDashboard; 