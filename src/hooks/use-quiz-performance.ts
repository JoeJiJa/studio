
"use client";

import { useState, useEffect, useCallback } from 'react';

const QUIZ_PERFORMANCE_KEY = 'quizPerformance';
const STORAGE_EVENT = 'drAstro_quizPerformance_storage';

export interface QuizPerformance {
  subject: string;
  score: number;
  attempts: number;
}

export function useQuizPerformance() {
  const [performanceData, setPerformanceData] = useState<QuizPerformance[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const loadPerformanceData = useCallback(() => {
    try {
      const storedData: QuizPerformance[] = JSON.parse(localStorage.getItem(QUIZ_PERFORMANCE_KEY) || '[]');
      setPerformanceData(storedData);
    } catch (error) {
      console.error("Failed to parse quiz performance data:", error);
      setPerformanceData([]);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    loadPerformanceData();
    
    const handleStorageChange = () => {
      loadPerformanceData();
    };

    window.addEventListener(STORAGE_EVENT, handleStorageChange);
    
    return () => {
      window.removeEventListener(STORAGE_EVENT, handleStorageChange);
    };
  }, [loadPerformanceData]);
  
  const logQuizResult = useCallback((subject: string, score: number) => {
    const storedData: QuizPerformance[] = JSON.parse(localStorage.getItem(QUIZ_PERFORMANCE_KEY) || '[]');
    
    const subjectIndex = storedData.findIndex(d => d.subject === subject);

    if (subjectIndex > -1) {
      // Update existing subject's score
      const existingData = storedData[subjectIndex];
      const newAttempts = existingData.attempts + 1;
      const newAverageScore = Math.round(((existingData.score * existingData.attempts) + score) / newAttempts);
      storedData[subjectIndex] = { ...existingData, score: newAverageScore, attempts: newAttempts };
    } else {
      // Add new subject
      storedData.push({ subject, score, attempts: 1 });
    }

    localStorage.setItem(QUIZ_PERFORMANCE_KEY, JSON.stringify(storedData));
    window.dispatchEvent(new Event(STORAGE_EVENT));
  }, []);

  return { performanceData, logQuizResult, isLoaded };
}
