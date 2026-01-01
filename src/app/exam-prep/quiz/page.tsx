
'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { useQuizPerformance } from '@/hooks/use-quiz-performance';
import { data } from '@/lib/data';
import { BackButton } from '@/components/shared/BackButton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Check, Info } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const generateDummyQuestions = (subjectName: string, count: number) => {
  if (!subjectName) return [];
  return Array.from({ length: count }, (_, i) => ({
    question: `This is dummy question #${i + 1} for the subject of ${subjectName}. What is the correct answer?`,
    options: ['Option A', 'Option B', 'Option C', 'Correct Answer'],
    correctAnswer: 3,
  }));
};

function QuizComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const { logQuizResult } = useQuizPerformance();

  const subjectId = searchParams.get('subject');
  const questionCount = parseInt(searchParams.get('count') || '10', 10);

  const subject = useMemo(() => data.subjects.find(s => s.id === subjectId), [subjectId]);
  const questions = useMemo(() => generateDummyQuestions(subject?.name || '', questionCount), [subject, questionCount]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(new Array(questionCount).fill(null));
  const [isFinished, setIsFinished] = useState(false);

  if (!subject) {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center">
            <h2 className="text-2xl font-bold mb-4">Invalid Quiz Setup</h2>
            <p className="text-muted-foreground mb-6">The subject for this quiz could not be found.</p>
            <Button onClick={() => router.push('/exam-prep')}>Go Back to Exam Prep</Button>
        </div>
    );
  }

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handleSelectOption = (optionIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = optionIndex;
    setSelectedAnswers(newAnswers);
    setTimeout(handleNext, 300);
  };
  
  const handleSubmit = () => {
    setIsFinished(true);
    const score = Math.round(
      (selectedAnswers.reduce((correct, answer, index) => {
        return answer === questions[index].correctAnswer ? correct + 1 : correct;
      }, 0) / questions.length) * 100
    );

    logQuizResult(subject.name, score);

    toast({
      title: 'Quiz Finished!',
      description: `You scored ${score}% in ${subject.name}. Your dashboard is updated.`,
    });
  };

  const progress = (currentQuestionIndex / questions.length) * 100;
  const currentQuestion = questions[currentQuestionIndex];

  if (isFinished) {
    const score = Math.round(
      (selectedAnswers.reduce((correct, answer, index) => {
        return answer === questions[index].correctAnswer ? correct + 1 : correct;
      }, 0) / questions.length) * 100
    );

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold mb-2">Quiz Complete!</h2>
        <p className="text-muted-foreground mb-4">You have completed the {subject.name} quiz.</p>
        <div className="my-8">
            <p className="text-lg">Your Score:</p>
            <p className="text-6xl font-bold text-primary">{score}%</p>
        </div>
        <Alert className={score >= 70 ? "border-green-500/50 text-green-500" : "border-amber-500/50 text-amber-500"}>
          <Check className="h-4 w-4" />
          <AlertTitle>{score >= 70 ? "Excellent Work!" : "Good Effort!"}</AlertTitle>
          <AlertDescription>
            {score >= 70 ? "You've shown great understanding." : "Keep practicing to improve your score."}
          </AlertDescription>
        </Alert>
        <Button className="mt-8" onClick={() => router.push('/exam-prep')}>Return to Exam Prep</Button>
      </motion.div>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">{subject.name} Quiz</CardTitle>
        <div className="flex items-center gap-4 pt-2">
            <span className="text-sm text-muted-foreground">Question {currentQuestionIndex + 1} of {questions.length}</span>
            <Progress value={progress} className="w-full" />
        </div>
      </CardHeader>
      <CardContent>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <p className="font-semibold text-lg mb-6">{currentQuestion.question}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentQuestion.options.map((option, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="lg"
                  className="h-auto justify-start text-left whitespace-normal py-3"
                  onClick={() => handleSelectOption(index)}
                >
                  {option}
                </Button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </CardContent>
      <CardFooter className="justify-end">
        {currentQuestionIndex === questions.length - 1 && (
            <Button 
                onClick={handleSubmit} 
                disabled={selectedAnswers[currentQuestionIndex] === null}
                size="lg"
            >
                Finish Quiz
            </Button>
        )}
      </CardFooter>
    </Card>
  );
}


export default function QuizPage() {
    return (
        <div className="space-y-4">
            <BackButton />
            <Suspense fallback={<QuizSkeleton />}>
                <QuizComponent />
            </Suspense>
        </div>
    );
}

function QuizSkeleton() {
    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <Skeleton className="h-8 w-1/2" />
                <div className="flex items-center gap-4 pt-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-full" />
                </div>
            </CardHeader>
            <CardContent>
                <Skeleton className="h-6 w-full mb-6" />
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Skeleton className="h-14 w-full" />
                    <Skeleton className="h-14 w-full" />
                    <Skeleton className="h-14 w-full" />
                    <Skeleton className="h-14 w-full" />
                </div>
            </CardContent>
        </Card>
    )
}
