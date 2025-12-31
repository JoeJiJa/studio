
"use client"

import * as React from "react"
import { Bar, BarChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

const MOCK_DATA = [
  { day: "Mon", minutes: Math.floor(Math.random() * 180) + 30 },
  { day: "Tue", minutes: Math.floor(Math.random() * 180) + 30 },
  { day: "Wed", minutes: Math.floor(Math.random() * 180) + 30 },
  { day: "Thu", minutes: Math.floor(Math.random() * 180) + 30 },
  { day: "Fri", minutes: Math.floor(Math.random() * 180) + 30 },
  { day: "Sat", minutes: Math.floor(Math.random() * 180) + 30 },
  { day: "Sun", minutes: Math.floor(Math.random() * 180) + 30 },
]

export function StudyChart() {
  return (
    <div className="h-20 w-full">
        <ResponsiveContainer width="100%" height="100%">
            <BarChart 
                data={MOCK_DATA}
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
