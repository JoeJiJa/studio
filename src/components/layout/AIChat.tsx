
"use client";

import React, { useState, useEffect, useRef, FormEvent } from 'react';
import { Bot, ChevronLeft, Send, User as UserIcon, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { data } from '@/lib/data';
import type { Subject } from '@/lib/types';
import { cn } from '@/lib/utils';
import { ScrollArea } from '../ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Input } from '../ui/input';
import { aiAssistantGuidesUser } from '@/ai/flows/ai-assistant-guides-user';
import { Skeleton } from '../ui/skeleton';

type Stage = 'year' | 'subject' | 'chat';
type Message = {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
};

const studyYears = [
    { id: '1', label: '1st Year (Pre-Clinical)' },
    { id: '2', label: '2nd Year (Para-Clinical)' },
    { id: '3', label: '3rd Year (Clinical)' },
    { id: '4', label: '4th Year (Major Clinical)' },
];

export function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [stage, setStage] = useState<Stage>('year');
  const [selectedYear, setSelectedYear] = useState<{ id: string; label: string } | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isAnimating, setIsAnimating] = useState(true);
  const [isThinking, setIsThinking] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      resetState();
      setMessages([
        { id: '1', role: 'assistant', content: "Welcome! I'm Dr. Astro. To help me guide you, which year are you interested in exploring?" },
      ]);
    }
  }, [isOpen]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 4000); 
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages, isThinking]);

  const handleYearSelect = (year: { id: string; label: string }) => {
    const yearNum = parseInt(year.id, 10);
    const yearSubjects = data.subjects.filter(subject => subject.year.includes(yearNum));
    setSubjects(yearSubjects);
    setSelectedYear(year);
    setMessages(prev => [
      ...prev,
      { id: Date.now().toString(), role: 'user', content: year.label },
      { id: (Date.now() + 1).toString(), role: 'assistant', content: `Great! Here are the subjects for ${year.label}. Which one would you like to discuss?` }
    ]);
    setStage('subject');
  };

  const handleSubjectSelect = (subject: Subject) => {
    setSelectedSubject(subject);
    setMessages(prev => [
      ...prev,
      { id: Date.now().toString(), role: 'user', content: subject.name },
      { id: (Date.now() + 1).toString(), role: 'assistant', content: `Excellent! We'll focus on ${subject.name}. What would you like to know? You can ask me about study materials, specific topics, or anything else.` }
    ]);
    setStage('chat');
  };

  const handleBack = () => {
    setStage('year');
    setSelectedYear(null);
    setSelectedSubject(null);
    setSubjects([]);
    setMessages(prev => [
        ...prev,
        { id: Date.now().toString(), role: 'assistant', content: "Let's go back. Which year are you interested in?" }
    ])
  };
  
  const resetState = () => {
    setStage('year');
    setSelectedYear(null);
    setSelectedSubject(null);
    setSubjects([]);
    setMessages([]);
    setInput('');
    setIsThinking(false);
  }

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input || !selectedYear || !selectedSubject || isThinking) return;

    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsThinking(true);

    try {
      const result = await aiAssistantGuidesUser({
        year: selectedYear.label,
        subject: selectedSubject.name,
        query: input,
      });

      const assistantMessage: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content: result.response };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error("AI Assistant Error:", error);
      const errorMessage: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content: "I'm sorry, I encountered an error. Please try again." };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsThinking(false);
    }
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
      <DialogContent className="sm:max-w-md p-0 flex flex-col h-[70vh] max-h-[700px] w-[90vw] max-w-[450px]">
        <DialogHeader className="p-4 border-b flex-row flex justify-between items-center">
          <DialogTitle className="font-headline flex items-center gap-2">
            <Bot /> Dr. Astro Assistant
          </DialogTitle>
          <DialogClose asChild>
            <Button variant="ghost" size="icon">
                <X className="h-4 w-4" />
            </Button>
          </DialogClose>
        </DialogHeader>

        <ScrollArea className="flex-1" ref={scrollAreaRef}>
            <div className="space-y-4 py-4 px-4">
              {messages.map((message) => (
                <div key={message.id} className={cn("flex items-start gap-3", message.role === 'user' && "flex-row-reverse")}>
                  <Avatar className="w-8 h-8 border">
                    <AvatarImage src={message.role === 'assistant' ? "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/jogRQQ7NL14vh4LDNK8n/pub/fRGo42eAcDofrKwh53zL/Dr%20Astro.jpg" : undefined} alt="Avatar" />
                    <AvatarFallback>{message.role === 'assistant' ? 'DA' : <UserIcon />}</AvatarFallback>
                  </Avatar>
                  <div className={cn("rounded-lg p-3 max-w-[80%]", message.role === 'assistant' ? 'bg-muted' : 'bg-primary text-primary-foreground')}>
                      <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              ))}

              {isThinking && (
                 <div className="flex items-start gap-3">
                  <Avatar className="w-8 h-8 border">
                      <AvatarImage src="https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/jogRQQ7NL14vh4LDNK8n/pub/fRGo42eAcDofrKwh53zL/Dr%20Astro.jpg" alt="Dr. Astro" />
                      <AvatarFallback>DA</AvatarFallback>
                  </Avatar>
                  <div className="bg-muted rounded-lg p-3 max-w-[80%]">
                      <Skeleton className="w-20 h-4" />
                  </div>
                </div>
              )}

              {stage === 'year' && (
                  <div className="flex flex-wrap gap-2 justify-end pt-2">
                      {studyYears.map(year => (
                          <Button key={year.id} variant="outline" size="sm" onClick={() => handleYearSelect(year)}>
                              {year.label}
                          </Button>
                      ))}
                  </div>
              )}

              {stage === 'subject' && (
                  <div className="flex flex-wrap gap-2 justify-end pt-2">
                      {subjects.map(subject => (
                          <Button key={subject.id} variant="outline" size="sm" onClick={() => handleSubjectSelect(subject)}>
                              {subject.name}
                          </Button>
                      ))}
                        <Button variant="ghost" size="sm" onClick={handleBack}>
                            <ChevronLeft className="mr-1 h-4 w-4" /> Back
                        </Button>
                  </div>
              )}
            </div>
        </ScrollArea>
        {stage === 'chat' && (
            <div className="p-4 border-t">
                <form onSubmit={handleSubmit} className="relative">
                    <Input 
                        placeholder="Ask Dr. Astro..." 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        disabled={isThinking}
                    />
                    <Button type="submit" size="icon" variant="ghost" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8" disabled={isThinking || !input}>
                        <Send className="h-4 w-4" />
                    </Button>
                </form>
            </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

    