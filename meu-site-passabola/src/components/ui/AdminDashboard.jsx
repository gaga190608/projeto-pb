// src/components/AdminDashboard.jsx
import { useHeartRateRealTime, useHeartRateHistory } from "../../hooks/useFiwareData"; 
import { Button } from "./button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./tabs";
import { TotalVisitorsChart } from "../AreaChartComponent"; 
import { AtletaTelemetryChart } from "../AtletaTelemetryChart"; 
import { cn } from "@/lib/utils"; 
import { Heart } from "lucide-react"; 
import React from 'react'; 

export default function AdminDashboard() {
   
    const { 
        heartRate, 
        loading: hrLoading, 
        error: hrError 
    } = useHeartRateRealTime(); 
    
    const {
        historyData,
        loading: historyLoading,
        error: historyError
    } = useHeartRateHistory(); 

  
    const displayHeartRate = hrLoading 
        ? "..." 
        : hrError 
          ? "ERRO" 
          : heartRate !== null && heartRate !== undefined 
            ? `${heartRate} BPM` 
            : "-- BPM";
            
    const statusMessage = hrError 
        ? "ERRO: Verifique o servidor FIWARE (Porta 1026)." 
        : hrLoading 
          ? "Conectando ao Context Broker..." 
          : "Sensor pulse001 ativo e enviando.";

    return (
        <div className={cn("p-8")}> 
          
            <Tabs defaultValue="overview" className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-bold tracking-tight text-black">Dashboard de Monitoramento Cardíaco</h2>
                </div>
                
                <TabsContent value="overview" className="space-y-4">
                    
                    
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        
                       
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Batimento Cardíaco (Atual)</CardTitle>
                                <Heart className="h-4 w-4 text-red-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-4xl font-extrabold" style={{ color: hrError ? 'red' : 'green' }}>
                                    {displayHeartRate}
                                </div>
                                <p className={`text-xs mt-1 text-muted-foreground`}>
                                    {statusMessage}
                                </p>
                            </CardContent>
                        </Card>
                       
                        <Card><CardHeader><CardTitle>Velocidade Média</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">18.5 km/h</div></CardContent></Card>
                        <Card><CardHeader><CardTitle>Distância Total</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">4.2 km</div></CardContent></Card>
                        <Card><CardHeader><CardTitle>Calorias Queimadas</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">350 kcal</div></CardContent></Card>
                    </div>

                   
                    <h3 className="text-2xl font-bold tracking-tight mt-6 mb-2 text-black">Telemetria Recente (Histórico)</h3>
                    <Card>
                         <CardHeader>
                            <CardTitle>Histórico de BPM</CardTitle>
                            <CardDescription>
                                {historyError 
                                ? `Erro de Histórico: ${historyError}`
                                : historyLoading 
                                  ? "Carregando dados históricos do STH-Comet..."
                                  : `Mostrando os últimos ${historyData.length} pontos de dados.`
                                }
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                                {
                                    historyData.length > 0 ? (
                                        
                                        <AtletaTelemetryChart data={historyData} dataKey="heartRate" name="Batimentos" /> 
                                    ) : (
                                        !historyLoading && <p>Nenhum dado histórico encontrado. Verifique a Subscription e o Wokwi.</p>
                                    )
                                }
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}