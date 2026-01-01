
import React from 'react';
import { CustomQuizGenerator } from '@/components/exam-prep/CustomQuizGenerator';
import { PerformanceDashboard } from '@/components/exam-prep/PerformanceDashboard';
import { HighYieldFact } from '@/components/exam-prep/HighYieldFact';
import { InteractiveCaseStudy } from '@/components/exam-prep/InteractiveCaseStudy';

export default function ExamPrepPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl md:text-4xl font-headline font-bold">Exam Prep Center</h1>
        <p className="text-muted-foreground mt-2">Sharpen your knowledge and get ready for your exams.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <CustomQuizGenerator />
          <InteractiveCaseStudy />
        </div>
        <div className="space-y-8">
          <HighYieldFact />
          <PerformanceDashboard />
        </div>
      </div>
    </div>
  );
}
