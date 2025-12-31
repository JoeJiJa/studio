"use client";

import { useState, useEffect } from 'react';
import { Flame } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

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
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Study Streak</CardTitle>
          <Flame className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-4 w-32 mt-1" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Study Streak</CardTitle>
        <Flame className="h-4 w-4 text-amber-500" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{streak} Day{streak !== 1 && 's'}</div>
        <p className="text-xs text-muted-foreground">
          {streak > 1 ? 'Keep up the great work!' : 'Keep coming back to build your streak!'}
        </p>
      </CardContent>
    </Card>
  );
}
