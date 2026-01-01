
"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Activity } from 'lucide-react';

const mockPerformanceData = [
  { subject: 'Anatomy', score: 85 },
  { subject: 'Physiology', score: 78 },
  { subject: 'Biochem', score: 72 },
  { subject: 'Pathology', score: 91 },
  { subject: 'Pharma', score: 65 },
];

export function PerformanceDashboard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity />
          Performance Dashboard
        </CardTitle>
        <CardDescription>Your recent quiz scores by subject.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                    data={mockPerformanceData}
                    margin={{ top: 5, right: 0, left: -20, bottom: 5 }}
                    layout="vertical"
                >
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis 
                        type="number"
                        domain={[0, 100]}
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={10}
                        tickLine={false}
                        axisLine={false}
                    />
                    <YAxis 
                        type="category"
                        dataKey="subject"
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={10}
                        tickLine={false}
                        axisLine={false}
                        width={60}
                    />
                    <Tooltip
                        cursor={{ fill: 'hsl(var(--accent))' }}
                        content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                                return (
                                <div className="rounded-lg border bg-background p-2 shadow-sm">
                                    <p className="font-bold text-foreground">{`${payload[0].value}%`}</p>
                                </div>
                                )
                            }
                            return null
                        }}
                    />
                    <Bar 
                        dataKey="score" 
                        fill="hsl(var(--primary))" 
                        radius={[0, 4, 4, 0]}
                        background={{ fill: 'hsl(var(--secondary))', radius: 4 }}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
