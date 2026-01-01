
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Bot, Book, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from '@/components/ui/dialog';
import { data } from '@/lib/data';
import type { Subject } from '@/lib/types';
import { cn } from '@/lib/utils';
import { ScrollArea } from '../ui/scroll-area';

type Stage = 'year' | 'subject';

const studyYears = [1, 2, 3, 4];
const subjectOrder: { [key: number]: string[] } = {
  1: ['anatomy', 'physiology', 'biochemistry'],
};

export function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [stage, setStage] = useState<Stage>('year');
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const router = useRouter();
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 4000); // Animation duration
    return () => clearTimeout(timer);
  }, []);

  const handleYearSelect = (year: number) => {
    const yearSubjects = data.subjects.filter(subject => subject.year.includes(year));

    const order = subjectOrder[year];
    if (order) {
      yearSubjects.sort((a, b) => {
        const indexA = order.indexOf(a.id);
        const indexB = order.indexOf(b.id);
        if (indexA !== -1 && indexB !== -1) return indexA - indexB;
        if (indexA !== -1) return -1;
        if (indexB !== -1) return 1;
        return a.name.localeCompare(b.name);
      });
    } else {
        yearSubjects.sort((a, b) => a.name.localeCompare(b.name));
    }

    setSubjects(yearSubjects);
    setSelectedYear(year);
    setStage('subject');
  };

  const handleSubjectSelect = (subject: Subject) => {
    router.push(`/theory/${subject.id}`);
    setIsOpen(false);
    // Reset state for next time
    setTimeout(() => {
        setStage('year');
        setSelectedYear(null);
    }, 300);
  };

  const handleBack = () => {
    setStage('year');
    setSelectedYear(null);
    setSubjects([]);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
        // Reset state when closing dialog
        setTimeout(() => {
            setStage('year');
            setSelectedYear(null);
        }, 300);
    }
    setIsOpen(open);
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          size="icon"
          className={cn(
            "fixed bottom-20 right-4 md:bottom-6 md:right-6 rounded-full w-14 h-14 shadow-lg z-50",
            isAnimating && "animate-jiggle"
          )}
        >
          <Bot className="h-6 w-6" />
          <span className="sr-only">Open AI Assistant</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm md:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-headline flex items-center gap-2">
            <Bot /> Dr. Astro Assistant
          </DialogTitle>
          <DialogDescription>
            {stage === 'year'
              ? "Welcome! I can help you navigate the subjects. Which year are you interested in exploring?"
              : `Great! Showing subjects for Year ${selectedYear}.`}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
            {stage === 'year' ? (
                <div className="grid grid-cols-2 gap-3">
                    {studyYears.map(year => (
                        <Button
                            key={year}
                            variant="outline"
                            className="h-16 text-lg"
                            onClick={() => handleYearSelect(year)}
                        >
                            Year {year}
                        </Button>
                    ))}
                </div>
            ) : (
                <div>
                    <Button variant="ghost" size="sm" onClick={handleBack} className="mb-2">
                        <ChevronLeft className="mr-2" />
                        Back to years
                    </Button>
                    <ScrollArea className="h-64">
                      <div className="space-y-2 pr-4">
                          {subjects.map(subject => (
                              <Button
                                  key={subject.id}
                                  variant="outline"
                                  className="w-full justify-start text-left h-auto"
                                  onClick={() => handleSubjectSelect(subject)}
                              >
                                  <Book className="mr-2 shrink-0" />
                                  <span className="flex-1 whitespace-normal">{subject.name}</span>
                              </Button>
                          ))}
                      </div>
                    </ScrollArea>
                </div>
            )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
