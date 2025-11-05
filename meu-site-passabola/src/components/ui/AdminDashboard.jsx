import { Button, buttonVariants } from "./button";
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "./card";
import {Tabs, TabsList, TabsTrigger, TabsContent} from "./tabs";
import { TotalVisitorsChart } from "../AreaChartComponent";
import {AtletaTelemetryChart} from "../AtletaTelemetryChart";
import { useFiwareData } from "@/hooks/useFiwareData"; // Hook importado corretamente

export default function AdminDashboard() {
    // 🚨 HOOK DE FIWARE CHAMADO CORRETAMENTE AQUI!
    const { 
        data: telemetriaData, 
        loading: telemetriaLoading, 
        error: telemetriaError 
    } = useFiwareData('Atleta'); // Use o nome exato do tipo de entidade do seu Fiware!
    
    return (
        <div className="p-8">
            {/* 1. Componente TABS: Para organizar diferentes visualizações */}
            <Tabs defaultValue="overview" className="space-y-4">
                
                {/* Lista de Botões/Triggers para alternar as abas */}
                <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                    <TabsList>
                        <TabsTrigger value="overview">Visão Geral</TabsTrigger>
                        <TabsTrigger value="analytics">Análise</TabsTrigger>
                        <TabsTrigger value="reports">Relatórios</TabsTrigger>
                    </TabsList>
                </div>
                
                {/* Conteúdo da Aba "Visão Geral" */}
                <TabsContent value="overview" className="space-y-4">
                    
                    {/* 2. Grid de CARDS para métricas (Exemplo de Layout) */}
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        
                        {/* Card 1: Receita Total */}
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Receita Total
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">R$ 45.231,89</div>
                                <p className="text-xs text-muted-foreground">
                                    +20.1% do mês passado
                                </p>
                                {/* 3. Componente BUTTON dentro do Card */}
                                <Button className="mt-4" variant="secondary" size="sm">
                                    Ver Detalhes
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Card 2, Card 3, etc. (Você pode adicionar mais aqui) */}
                        <Card>...</Card>
                        <Card>...</Card>
                        <Card>...</Card>
                        
                    </div>

                    {/* 4. Layout para Gráficos (Visitantes Simulados) */}
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                        
                        {/* GRÁFICO 1: Visitantes (4 colunas) - Usa dados mock internos */}
                        <TotalVisitorsChart className="col-span-4 lg:col-span-4" /> 
                        
                        {/* Card de Vendas Recentes (ocupa as 3 colunas restantes) */}
                        <Card className="col-span-3">
                            <CardHeader>
                                <CardTitle>Vendas Recentes</CardTitle>
                                <CardDescription>Você fez 265 vendas este mês.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {/* Conteúdo da tabela de vendas */}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Layout para dados de atleta (FIWARE) */}
                    <h3 className="text-2xl font-bold tracking-tight mt-6 mb-2">Monitoramento de Telemetria</h3>
                    <div className="grid gap-4 lg:grid-cols-7">
                        
                        {/* 🚨 RECEPTÁCULO DOS DADOS DO FIWARE (Ocupa 4 colunas) */}
                        <div className="col-span-4 lg:col-span-4">
                            {/* Lógica de Carregamento e Erro */}
                            {telemetriaLoading && (
                                <Card className="h-[400px] flex items-center justify-center">
                                    <p className="p-4 text-center">Carregando telemetria do Fiware...</p>
                                </Card>
                            )}
                            {telemetriaError && (
                                <Card className="h-[400px] flex items-center justify-center">
                                    <p className="p-4 text-center text-red-500">{telemetriaError}</p>
                                </Card>
                            )}
                            
                            {/* Renderiza o Gráfico APENAS se houver dados */}
                            {telemetriaData && !telemetriaLoading && (
                                <AtletaTelemetryChart 
                                    // Não precisa de className aqui se o div pai já define o col-span
                                    data={telemetriaData} // ⬅️ PASSA OS DADOS DO FIWARE!
                                /> 
                            )}
                            
                            {/* Caso não haja dados após o carregamento (array vazio) */}
                            {(!telemetriaData || telemetriaData.length === 0) && !telemetriaLoading && (
                                <Card className="h-[400px] flex items-center justify-center">
                                    <p className="p-4 text-center text-muted-foreground">Nenhum dado de telemetria encontrado para o tipo 'Atleta'.</p>
                                </Card>
                            )}
                        </div>
                        
                        {/* Espaço Vazio ou Card Auxiliar (3 colunas restantes) */}
                        <Card className="col-span-3">
                            <CardHeader><CardTitle>Informações do Atleta</CardTitle></CardHeader>
                            <CardContent>Detalhes da última corrida, ID do sensor, etc.</CardContent>
                        </Card>
                        
                    </div>


                </TabsContent>
                
                {/* Conteúdo da Aba "Análise" (Vazio por enquanto) */}
                <TabsContent value="analytics">
                    <Card>
                        <CardHeader>
                            <CardTitle>Dados de Análise</CardTitle>
                        </CardHeader>
                        <CardContent>Conteúdo de análise virá aqui...</CardContent>
                    </Card>
                </TabsContent>
                
            </Tabs>
        </div>
    );
}