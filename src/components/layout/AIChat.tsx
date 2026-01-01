
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Bot, Book, ChevronLeft, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { data } from '@/lib/data';
import type { Subject } from '@/lib/types';
import { cn } from '@/lib/utils';
import { ScrollArea } from '../ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Input } from '../ui/input';

type Stage = 'year' | 'subject';

const studyYears = [
    { id: '1', label: 'Year 1' },
    { id: '2', label: 'Year 2' },
    { id: '3', label: 'Year 3' },
    { id: '4', label: 'Year 4' },
];

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
    setSubjects(yearSubjects);
    setSelectedYear(year);
    setStage('subject');
  };

  const handleSubjectSelect = (subject: Subject) => {
    router.push(`/theory/${subject.id}`);
    setIsOpen(false);
  };

  const handleBack = () => {
    setStage('year');
    setSelectedYear(null);
    setSubjects([]);
  };
  
  const resetState = () => {
      setStage('year');
      setSelectedYear(null);
      setSubjects([]);
  }

  const handleOpenChange = (open: boolean) => {
    if (!open) {
        setTimeout(resetState, 300);
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
      <DialogContent className="sm:max-w-md p-0 flex flex-col h-[70vh] max-h-[600px]">
        <DialogHeader className="p-4 border-b">
          <DialogTitle className="font-headline flex items-center gap-2">
            <Bot /> Dr. Astro Assistant
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="flex-1 px-4">
            <div className="space-y-4">
                {/* Initial Greeting */}
                <div className="flex items-start gap-3">
                    <Avatar className="w-8 h-8 border">
                        <AvatarImage src="https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/jogRQQ7NL14vh4LDNK8n/pub/fRGo42eAcDofrKwh53zL/Dr%20Astro.jpg" alt="Dr. Astro" />
                        <AvatarFallback>DA</AvatarFallback>
                    </Avatar>
                    <div className="bg-muted rounded-lg p-3 max-w-[80%]">
                        <p className="text-sm">
                            Welcome! I'm Dr. Astro. How can I help you? Let's start by finding the right study materials.
                        </p>
                    </div>
                </div>

                {/* Year Selection */}
                <div className="flex items-start gap-3">
                    <Avatar className="w-8 h-8 border">
                        <AvatarImage src="https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/jogRQQ7NL14vh4LDNK8n/pub/fRGo42eAcDofrKwh53zL/Dr%20Astro.jpg" alt="Dr. Astro" />
                        <AvatarFallback>DA</AvatarFallback>
                    </Avatar>
                     <div className="bg-muted rounded-lg p-3 max-w-[80%]">
                        <p className="text-sm">
                             Which year are you interested in exploring?
                        </p>
                    </div>
                </div>
                 {stage === 'year' && (
                    <div className="flex flex-wrap gap-2 justify-end">
                        {studyYears.map(year => (
                            <Button
                                key={year.id}
                                variant="outline"
                                size="sm"
                                onClick={() => handleYearSelect(parseInt(year.id))}
                            >
                                {year.label}
                            </Button>
                        ))}
                    </div>
                )}


                {/* Subject Selection */}
                {stage === 'subject' && selectedYear && (
                    <>
                        <div className="flex items-end gap-3 flex-row-reverse">
                            <div className="bg-primary text-primary-foreground rounded-lg p-3 max-w-[80%]">
                                <p className="text-sm">Year {selectedYear}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <Avatar className="w-8 h-8 border">
                                <AvatarImage src="https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/jogRQQ7NL14vh4LDNK8n/pub/fRGo42eAcDofrKwh53zL/Dr%20Astro.jpg" alt="Dr. Astro" />
                                <AvatarFallback>DA</AvatarFallback>
                            </Avatar>
                            <div className="bg-muted rounded-lg p-3 max-w-[80%]">
                                <p className="text-sm">
                                    Great! Here are the subjects for Year {selectedYear}. Which one would you like to see?
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-2 justify-end">
                            {subjects.map(subject => (
                                <Button
                                    key={subject.id}
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleSubjectSelect(subject)}
                                >
                                    {subject.name}
                                </Button>
                            ))}
                             <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleBack}
                            >
                                <ChevronLeft className="mr-1 h-4 w-4" /> Back
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </ScrollArea>
        <div className="p-4 border-t">
            <div className="relative">
                <Input placeholder="Ask Dr. Astro..." disabled />
                <Button size="icon" variant="ghost" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8" disabled>
                    <Send className="h-4 w-4" />
                </Button>
            </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
