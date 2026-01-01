
"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Separator } from '../ui/separator';

const caseStudy = {
  title: 'An Unexpected Collapse',
  scenario: 'A 65-year-old male with a history of hypertension and smoking presents to the ER after a sudden collapse at home. He is conscious but confused. His wife reports he was complaining of a "tearing" chest pain that radiated to his back before he fell.',
  question: 'On examination, you find a significant difference in blood pressure between his right and left arms. What is the most likely diagnosis?',
  options: [
    'Myocardial Infarction',
    'Aortic Dissection',
    'Pulmonary Embolism',
    'Esophageal Rupture',
  ],
  correctAnswer: 1,
  explanation: 'The classic presentation of "tearing" chest pain radiating to the back, combined with a blood pressure differential between the arms, is highly suggestive of an acute aortic dissection. This is a medical emergency requiring immediate intervention.'
};

export function InteractiveCaseStudy() {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleOptionClick = (index: number) => {
    if (showResult) return;
    setSelectedOption(index);
    setShowResult(true);
  };

  const getButtonClass = (index: number) => {
    if (!showResult) return 'bg-background';
    if (index === caseStudy.correctAnswer) return 'bg-green-500/20 border-green-500 text-foreground';
    if (index === selectedOption) return 'bg-destructive/20 border-destructive text-foreground';
    return 'bg-background';
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText />
          Interactive Case Study
        </CardTitle>
        <CardDescription>{caseStudy.title}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">{caseStudy.scenario}</p>
        <p className="font-semibold text-card-foreground mb-4">{caseStudy.question}</p>
        <div className="space-y-2">
          {caseStudy.options.map((option, index) => (
            <Button
              key={index}
              variant="outline"
              className={cn("w-full justify-start h-auto text-left", getButtonClass(index))}
              onClick={() => handleOptionClick(index)}
            >
              <span className="p-2 flex-1">{option}</span>
              {showResult && index === caseStudy.correctAnswer && <Check className="text-green-500" />}
              {showResult && index !== caseStudy.correctAnswer && index === selectedOption && <X className="text-destructive" />}
            </Button>
          ))}
        </div>
        {showResult && (
            <div className="mt-4 p-4 bg-accent/50 rounded-lg">
                <p className="text-sm text-accent-foreground">{caseStudy.explanation}</p>
            </div>
        )}
      </CardContent>
      <CardFooter>
        <Button variant="secondary" onClick={() => { setSelectedOption(null); setShowResult(false); }}>
            Try Another Case
        </Button>
      </CardFooter>
    </Card>
  );
}
