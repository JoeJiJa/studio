
"use client";

import { useState, useEffect, useCallback } from 'react';
import { format, subDays, parseISO } from 'date-fns';

const STUDY_TIME_KEY = 'studyTime';
const STORAGE_EVENT = 'drAstro_studyTime_storage';

export interface StudyDay {
  date: string; // YYYY-MM-DD
  minutes: number;
}

export function useStudyTime() {
  const [weeklyData, setWeeklyData] = useState<StudyDay[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const loadStudyData = useCallback(() => {
    try {
      const storedData: StudyDay[] = JSON.parse(localStorage.getItem(STUDY_TIME_KEY) || '[]');
      const sevenDaysAgo = format(subDays(new Date(), 6), 'yyyy-MM-dd');
      
      const recentData = storedData.filter(day => day.date >= sevenDaysAgo);
      
      setWeeklyData(recentData);
      
      // Clean up old data from localStorage
      if (recentData.length !== storedData.length) {
          localStorage.setItem(STUDY_TIME_KEY, JSON.stringify(recentData));
      }

    } catch (error) {
      console.error("Failed to parse study time data:", error);
      setWeeklyData([]);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    loadStudyData();
    
    const handleStorageChange = () => {
      loadStudyData();
    };

    window.addEventListener(STORAGE_EVENT, handleStorageChange);
    
    return () => {
      window.removeEventListener(STORAGE_EVENT, handleStorageChange);
    };
  }, [loadStudyData]);
  
  const logStudyTime = useCallback((minutes: number) => {
    const todayStr = format(new Date(), 'yyyy-MM-dd');
    
    const storedData: StudyDay[] = JSON.parse(localStorage.getItem(STUDY_TIME_KEY) || '[]');
    
    const todayIndex = storedData.findIndex(d => d.date === todayStr);

    if (todayIndex > -1) {
      // Update today's time
      storedData[todayIndex].minutes += minutes;
    } else {
      // Add new entry for today
      storedData.push({ date: todayStr, minutes });
    }
    
    const sevenDaysAgo = format(subDays(new Date(), 6), 'yyyy-MM-dd');
    const recentData = storedData.filter(day => day.date >= sevenDaysAgo);

    localStorage.setItem(STUDY_TIME_KEY, JSON.stringify(recentData));
    window.dispatchEvent(new Event(STORAGE_EVENT));
  }, []);

  return { weeklyData, logStudyTime, isLoaded };
}
