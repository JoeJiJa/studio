
"use client"

import * as React from "react"
import { Bar, BarChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { useStudyTime } from "@/hooks/use-study-time";
import { format, subDays } from 'date-fns';
import { Skeleton } from "../ui/skeleton";

export function StudyChart() {
  const { weeklyData, isLoaded } = useStudyTime();

  const chartData = React.useMemo(() => {
    const today = new Date();
    return Array.from({ length: 7 }).map((_, i) => {
      const date = subDays(today, 6 - i);
      const day = format(date, 'EEE');
      const dateString = format(date, 'yyyy-MM-dd');
      const studyDay = weeklyData.find(d => d.date === dateString);
      return {
        day,
        minutes: studyDay ? studyDay.minutes : 0,
      };
    });
  }, [weeklyData]);

  if (!isLoaded) {
      return <Skeleton className="h-20 w-full" />;
  }

  return (
    <div className="h-20 w-full">
        <ResponsiveContainer width="100%" height="100%">
            <BarChart 
                data={chartData}
                margin={{
                    top: 5,
                    right: 0,
                    left: -20,
                    bottom: -5,
                }}
            >
                <XAxis
                    dataKey="day"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={10}
                    tickLine={false}
                    axisLine={false}
                />
                <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={10}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}m`}
                />
                 <Tooltip
                    cursor={{ fill: 'hsl(var(--accent))', radius: 'var(--radius)' }}
                    content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                        return (
                            <div className="rounded-lg border bg-background p-2 shadow-sm">
                                <div className="grid grid-cols-1 gap-2">
                                    <div className="flex flex-col">
                                    <span className="text-[0.70rem] uppercase text-muted-foreground">
                                        Minutes Studied
                                    </span>
                                    <span className="font-bold text-muted-foreground">
                                        {payload[0].value}
                                    </span>
                                    </div>
                                </div>
                            </div>
                        )
                        }
                        return null
                    }}
                />
                <Bar 
                    dataKey="minutes" 
                    fill="hsl(var(--primary))" 
                    radius={[4, 4, 0, 0]} 
                />
            </BarChart>
        </ResponsiveContainer>
    </div>
  )
}
