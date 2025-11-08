import React from 'react'; 
import { useHeartRateRealTime, useHeartRateHistory } from "../../hooks/useFiwareData"; 
import { Button } from "./button"; 
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./tabs"; 
import { TotalVisitorsChart } from "../AreaChartComponent"; 
import { AtletaTelemetryChart } from "../AtletaTelemetryChart"; 
import { cn } from "@/lib/utils"; 
import { Heart } from "lucide-react"; 

export default function AdminDashboard() {
    const { heartRate, loading: hrLoading, error: hrError } = useHeartRateRealTime(); 
    const { historyData, loading: historyLoading, error: historyError } = useHeartRateHistory(); 

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
        <div className={cn("p-4 md:p-8 w-full")}> 
            <Tabs defaultValue="overview" className="space-y-4">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-800">Dashboard de Monitoramento Cardíaco</h2>
                    <div className="flex items-center space-x-2">
                         <TabsList>
                            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
                            <TabsTrigger value="analytics">Análise</TabsTrigger>
                            <TabsTrigger value="reports">Relatórios</TabsTrigger>
                        </TabsList>
                        <Button className="hidden sm:inline-flex" variant="secondary" size="sm">Novo Relatório</Button>
                    </div>
                </div>
                
                <TabsContent value="overview" className="space-y-4">
                    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                        <Card className="col-span-1">
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

                    <div className="grid gap-4 grid-cols-1 lg:grid-cols-7">
                        <div className="col-span-full lg:col-span-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Total de Visitantes (Simulado)</CardTitle>
                                    <CardDescription>*Gráfico de exemplo.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-[300px]">
                                        <TotalVisitorsChart /> 
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                        
                        <Card className="col-span-full lg:col-span-3">
                            <CardHeader>
                                <CardTitle>Histórico de BPM (Gráfico)</CardTitle>
                                <CardDescription>
                                    {historyError 
                                    ? `Erro de Histórico: ${historyError}`
                                    : historyLoading 
                                      ? "Carregando dados históricos do STH-Comet..."
                                      : `Mostrando os últimos ${historyData.length} pontos de dados.`}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                                    {historyData.length > 0 ? (
                                        <AtletaTelemetryChart data={historyData} dataKey="heartRate" name="Batimentos" /> 
                                    ) : (
                                        !historyLoading && <p className="text-center">Nenhum dado histórico encontrado.</p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
                
                <TabsContent value="analytics">
                    <Card>
                        <CardHeader><CardTitle>Análise Detalhada</CardTitle></CardHeader>
                        <CardContent><p>Conteúdo de análise e relatórios em desenvolvimento.</p></CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
