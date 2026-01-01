
"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Activity } from 'lucide-react';
import { useQuizPerformance } from '@/hooks/use-quiz-performance';
import { Skeleton } from '../ui/skeleton';

export function PerformanceDashboard() {
  const { performanceData, isLoaded } = useQuizPerformance();

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
        <div className="h-64 w-full">
          {!isLoaded ? (
            <Skeleton className="h-full w-full" />
          ) : performanceData.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-muted-foreground text-sm">Take a quiz to see your performance!</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                  data={performanceData}
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
                      width={80}
                      tickFormatter={(value) => value.length > 10 ? `${value.substring(0, 10)}...` : value}
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
          )}
        </div>
      </CardContent>
    </Card>
  );
}
