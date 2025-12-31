"use client";

import { useState, useEffect } from 'react';
import { Flame } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { StudyChart } from './StudyChart';

const STREAK_KEY = 'studyStreak';

interface StreakData {
  count: number;
  lastVisit: string;
}

export function StudyStreak() {
  const [streak, setStreak] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    let currentStreak = 0;

    try {
      const storedData = localStorage.getItem(STREAK_KEY);
      const data: StreakData = storedData ? JSON.parse(storedData) : { count: 0, lastVisit: '' };
      
      if (data.lastVisit) {
        const lastVisitDate = new Date(data.lastVisit);
        const todayDate = new Date(today);
        
        const diffTime = todayDate.getTime() - lastVisitDate.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
          currentStreak = data.count + 1;
        } else if (diffDays > 1) {
          currentStreak = 1;
        } else { // diffDays <= 0
          currentStreak = data.count;
        }
      } else {
        currentStreak = 1;
      }
      
      if (data.lastVisit !== today) {
        localStorage.setItem(STREAK_KEY, JSON.stringify({ count: currentStreak, lastVisit: today }));
      }
      setStreak(currentStreak);

    } catch (error) {
      console.error("Failed to process study streak:", error);
      localStorage.removeItem(STREAK_KEY);
      setStreak(1);
      localStorage.setItem(STREAK_KEY, JSON.stringify({ count: 1, lastVisit: today }));
    }
    
    setIsLoaded(true);
  }, []);

  if (!isLoaded) {
    return (
        <Card>
            <CardHeader>
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-48 mt-1" />
            </CardHeader>
            <CardContent>
                <div className="flex justify-between items-end">
                    <div>
                        <Skeleton className="h-8 w-24" />
                        <Skeleton className="h-4 w-32 mt-1" />
                    </div>
                    <Skeleton className="h-24 w-full max-w-xs" />
                </div>
            </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
        <CardHeader>
            <div className="flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-xl font-bold">Your Progress</CardTitle>
                <div className="flex items-center text-amber-500 font-bold">
                    <Flame className="h-5 w-5 mr-1" />
                    <span>{streak} Day Streak</span>
                </div>
            </div>
            <CardDescription>
                {streak > 1 ? 'Keep up the great work!' : 'Keep coming back to build your streak!'}
            </CardDescription>
        </CardHeader>
        <CardContent>
            <StudyChart />
        </CardContent>
    </Card>
  );
}
