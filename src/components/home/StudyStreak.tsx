
"use client";

import { useState, useEffect } from 'react';
import { Flame } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { StudyChart } from './StudyChart';
import { useStudyTime } from '@/hooks/use-study-time';

const STREAK_KEY = 'studyStreak';

interface StreakData {
  count: number;
  lastVisit: string;
}

export function StudyStreak() {
  const [streak, setStreak] = useState<number>(0);
  const [isStreakLoaded, setIsStreakLoaded] = useState<boolean>(false);
  const { logStudyTime } = useStudyTime();

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
        const randomMinutes = Math.floor(Math.random() * 60) + 15;
        logStudyTime(randomMinutes);
      }
      setStreak(currentStreak);

    } catch (error) {
      console.error("Failed to process study streak:", error);
      localStorage.removeItem(STREAK_KEY);
      setStreak(1);
      localStorage.setItem(STREAK_KEY, JSON.stringify({ count: 1, lastVisit: today }));
    }
    
    setIsStreakLoaded(true);
  }, [logStudyTime]);

  if (!isStreakLoaded) {
    return <Skeleton className="h-full w-full min-h-[200px]" />;
  }

  return (
    <Card className="h-full">
        <CardHeader>
            <div className="flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-lg font-headline">Your Progress</CardTitle>
                <div className="flex items-center text-amber-500 font-bold text-sm">
                    <Flame className="h-4 w-4 mr-1" />
                    <span>{streak} Day Streak</span>
                </div>
            </div>
            <CardDescription className="text-sm">
                {streak > 1 ? 'Keep up the great work!' : 'Keep coming back to build your streak!'}
            </CardDescription>
        </CardHeader>
        <CardContent>
            <StudyChart />
        </CardContent>
    </Card>
  );
}
