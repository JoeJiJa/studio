
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
  
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-headline">
          <HelpCircle className="text-primary h-5 w-5" />
          Question of the Day
        </CardTitle>
        <CardDescription className="text-base pt-2">{question}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-2">
          {options.map((option, index) => {
             const isCorrect = index === answerIndex;
             const isSelected = index === selectedOption;

             let variant: "outline" | "default" | "destructive" = "outline";
             let icon = null;

             if(isAnswered) {
                 if(isCorrect) {
                     variant = "default";
                     icon = <CheckCircle2 className="h-4 w-4" />;
                 } else if (isSelected) {
                     variant = "destructive";
                     icon = <XCircle className="h-4 w-4" />;
                 }
             }

            return (
                <Button
                  key={index}
                  variant={variant}
                  size="lg"
                  className="justify-start h-auto whitespace-normal text-left"
                  onClick={() => handleOptionSelect(index)}
                  disabled={isAnswered}
                >
                  <div className="flex items-center w-full py-1">
                    <span className="flex-1">{option}</span>
                    {icon}
                  </div>
                </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
