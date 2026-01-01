
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { data } from '@/lib/data';
import { BrainCircuit } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function CustomQuizGenerator() {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedCount, setSelectedCount] = useState<string>("25");
  const { toast } = useToast();
  const router = useRouter();

  const handleStartQuiz = () => {
    if (!selectedSubject) {
        toast({
            title: "No Subject Selected",
            description: "Please select a subject to start a quiz.",
            variant: "destructive"
        });
        return;
    }
    
    router.push(`/exam-prep/quiz?subject=${selectedSubject}&count=${selectedCount}`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BrainCircuit />
          Custom Quiz Generator
        </CardTitle>
        <CardDescription>Create a personalized quiz to focus on your study needs.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="subject-select" className="text-sm font-medium">Subject</label>
            <Select onValueChange={setSelectedSubject}>
              <SelectTrigger id="subject-select">
                <SelectValue placeholder="Select a subject" />
              </SelectTrigger>
              <SelectContent>
                {data.subjects.map(subject => (
                  <SelectItem key={subject.id} value={subject.id}>
                    {subject.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label htmlFor="questions-select" className="text-sm font-medium">Number of Questions</label>
            <Select value={selectedCount} onValueChange={setSelectedCount}>
              <SelectTrigger id="questions-select">
                <SelectValue placeholder="Select number" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10 Questions</SelectItem>
                <SelectItem value="25">25 Questions</SelectItem>
                <SelectItem value="50">50 Questions</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full sm:w-auto" onClick={handleStartQuiz}>Start Quiz</Button>
      </CardFooter>
    </Card>
  );
}
