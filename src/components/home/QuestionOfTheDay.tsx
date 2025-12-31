
"use client";

import React, { useState } from 'react';
import { CheckCircle2, XCircle, HelpCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { data } from '@/lib/data';
import { cn } from '@/lib/utils';

export function QuestionOfTheDay() {
  const { question, options, answerIndex } = data.questionOfTheDay;
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);

  const handleOptionSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
  };

  const getButtonVariant = (index: number) => {
    if (!isAnswered) return 'outline';
    if (index === answerIndex) return 'default';
    if (index === selectedOption) return 'destructive';
    return 'outline';
  };
  
  const getButtonClass = (index: number) => {
    if (!isAnswered) return '';
    if (index === answerIndex) return 'bg-accent hover:bg-accent/90 text-accent-foreground';
    if (index === selectedOption) return 'bg-destructive';
    return '';
  }

  return (
    <Card className="h-full">
      <CardHeader className="p-2">
        <CardTitle className="flex items-center gap-1.5 text-base">
          <HelpCircle className="text-primary h-4 w-4" />
          Question of the Day
        </CardTitle>
        <CardDescription className="text-sm">{question}</CardDescription>
      </CardHeader>
      <CardContent className="p-2 pt-0">
        <div className="flex flex-col space-y-1.5">
          {options.map((option, index) => (
            <Button
              key={index}
              variant={getButtonVariant(index)}
              size="sm"
              className={cn("justify-start h-auto whitespace-normal text-left text-sm", getButtonClass(index))}
              onClick={() => handleOptionSelect(index)}
              disabled={isAnswered}
            >
              <div className="flex items-center w-full">
                <span className="flex-1 py-1">{option}</span>
                {isAnswered && index === answerIndex && <CheckCircle2 className="h-4 w-4 ml-2 shrink-0" />}
                {isAnswered && index === selectedOption && index !== answerIndex && <XCircle className="h-4 w-4 ml-2 shrink-0" />}
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
