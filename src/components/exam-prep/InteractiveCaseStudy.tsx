
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { data } from '@/lib/data';
import type { CaseStudy } from '@/lib/types';

export function InteractiveCaseStudy() {
  const [currentCase, setCurrentCase] = useState<CaseStudy | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const getNewCase = useCallback(() => {
    const caseStudies = data.caseStudies;
    if (!caseStudies || caseStudies.length === 0) return;

    let newCase;
    do {
      const randomIndex = Math.floor(Math.random() * caseStudies.length);
      newCase = caseStudies[randomIndex];
    } while (caseStudies.length > 1 && newCase?.id === currentCase?.id);

    setCurrentCase(newCase);
    setSelectedOption(null);
    setShowResult(false);
  }, [currentCase]);

  useEffect(() => {
    getNewCase();
  }, [getNewCase]);

  const handleOptionClick = (index: number) => {
    if (showResult) return;
    setSelectedOption(index);
    setShowResult(true);
  };

  const getButtonClass = (index: number) => {
    if (!showResult || !currentCase) return 'bg-background';
    if (index === currentCase.correctAnswer) return 'bg-green-500/20 border-green-500 text-foreground';
    if (index === selectedOption) return 'bg-destructive/20 border-destructive text-foreground';
    return 'bg-background';
  }

  if (!currentCase) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText />
            Interactive Case Study
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>Loading case study...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText />
          Interactive Case Study
        </CardTitle>
        <CardDescription>{currentCase.title}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">{currentCase.scenario}</p>
        <p className="font-semibold text-card-foreground mb-4">{currentCase.question}</p>
        <div className="space-y-2">
          {currentCase.options.map((option, index) => (
            <Button
              key={index}
              variant="outline"
              className={cn("w-full justify-start h-auto text-left", getButtonClass(index))}
              onClick={() => handleOptionClick(index)}
              disabled={showResult}
            >
              <span className="p-2 flex-1">{option}</span>
              {showResult && index === currentCase.correctAnswer && <Check className="text-green-500" />}
              {showResult && index !== currentCase.correctAnswer && index === selectedOption && <X className="text-destructive" />}
            </Button>
          ))}
        </div>
        {showResult && (
            <div className="mt-4 p-4 bg-accent/50 rounded-lg">
                <p className="text-sm text-accent-foreground">{currentCase.explanation}</p>
            </div>
        )}
      </CardContent>
      <CardFooter>
        <Button variant="secondary" onClick={getNewCase}>
            Try Another Case
        </Button>
      </CardFooter>
    </Card>
  );
}
