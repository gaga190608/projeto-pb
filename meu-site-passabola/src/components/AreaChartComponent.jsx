// src/components/TotalVisitorsChart.jsx
import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils"; 

const chartData = [
  { month: "Jun 23", desktop: 186, mobile: 80 },
  { month: "Jun 24", desktop: 305, mobile: 200 },
  { month: "Jun 25", desktop: 237, mobile: 120 },
  { month: "Jun 26", desktop: 73, mobile: 190 },
  { month: "Jun 27", desktop: 209, mobile: 130 },
  { month: "Jun 28", desktop: 214, mobile: 140 },
  { month: "Jun 29", desktop: 186, mobile: 160 },
];


const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))", 
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
};


export function TotalVisitorsChart({ data, className }) {
  
  const chartDataSet = data || chartData; 
  
 

  return (
    <Card className={cn(className)}>
      <CardHeader className="flex flex-col space-y-1.5 pb-2 sm:pb-4">
        <CardTitle className="text-base">Total de Visitantes</CardTitle>
        <CardDescription>
          Total para os últimos 3 meses
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="month">
          <div className="flex justify-end">
            {/* Abas para filtrar o período (7 dias, 30 dias, 3 meses) */}
            <TabsList className="h-7 rounded-lg p-1">
              <TabsTrigger value="day" className="h-5 rounded-md px-2 text-xs">
                Últimos 7 dias
              </TabsTrigger>
              <TabsTrigger value="week" className="h-5 rounded-md px-2 text-xs">
                Últimos 30 dias
              </TabsTrigger>
              <TabsTrigger value="month" className="h-5 rounded-md px-2 text-xs">
                Últimos 3 meses
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="month" className="mt-6">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={chartDataSet} 
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    
                    <linearGradient id="colorDesktop" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorMobile" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  
                  <XAxis 
                    dataKey="month" 
                    stroke="hsl(var(--foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis 
                    stroke="hsl(var(--foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  
                  <Tooltip 
                    cursor={{ stroke: "hsl(var(--primary))", strokeWidth: 1 }}
                    contentStyle={{ 
                      borderRadius: "0.375rem", 
                      borderColor: "hsl(var(--border))", 
                      backgroundColor: "hsl(var(--background))" 
                    }}
                    labelStyle={{ color: "hsl(var(--foreground))" }}
                  />
                  
                 
                  <Area
                    type="monotone"
                    dataKey="desktop" 
                    stroke="hsl(var(--chart-1))"
                    fillOpacity={1}
                    fill="url(#colorDesktop)"
                  />
                  <Area
                    type="monotone"
                    dataKey="mobile" 
                    stroke="hsl(var(--chart-2))"
                    fillOpacity={1}
                    fill="url(#colorMobile)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}