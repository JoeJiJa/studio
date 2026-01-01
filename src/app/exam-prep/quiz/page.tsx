
'use client';

import React, { useState, useMemo, Suspense, useEffect } from 'react';
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
import { Check, Info, Bot } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { generateQuiz } from '@/ai/flows/generate-quiz-flow';
import type { GenerateQuizOutput } from '@/ai/flows/generate-quiz-flow';

function QuizComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const { logQuizResult } = useQuizPerformance();

  const [questions, setQuestions] = useState<GenerateQuizOutput['questions']>([]);
  const [isLoading, setIsLoading] = useState(true);

  const subjectId = searchParams.get('subject');
  const questionCount = parseInt(searchParams.get('count') || '10', 10);

  const subject = useMemo(() => data.subjects.find(s => s.id === subjectId), [subjectId]);
  
  useEffect(() => {
    async function fetchQuestions() {
      if (!subject) return;

      setIsLoading(true);
      try {
        const result = await generateQuiz({ subjectName: subject.name, questionCount });
        setQuestions(result.questions);
      } catch (error) {
        console.error("Failed to generate quiz:", error);
        toast({
          title: "Error",
          description: "Could not generate the quiz. Please try again later.",
          variant: "destructive"
        });
        router.push('/exam-prep');
      } finally {
        setIsLoading(false);
      }
    }
    fetchQuestions();
  }, [subject, questionCount, router, toast]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    if (questions.length > 0) {
      setSelectedAnswers(new Array(questions.length).fill(null));
    }
  }, [questions]);

  if (!subject) {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center">
            <h2 className="text-2xl font-bold mb-4">Invalid Quiz Setup</h2>
            <p className="text-muted-foreground mb-6">The subject for this quiz could not be found.</p>
            <Button onClick={() => router.push('/exam-prep')}>Go Back to Exam Prep</Button>
        </div>
    );
  }

  if (isLoading) {
    return <GeneratingQuizSkeleton subjectName={subject.name} />;
  }

  const handleNext = () => {
    setShowExplanation(false);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSelectOption = (optionIndex: number) => {
    if (showExplanation) return;
    
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = optionIndex;
    setSelectedAnswers(newAnswers);
    setShowExplanation(true);
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

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
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
  
  if (!currentQuestion) {
      return <QuizSkeleton />;
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
              {currentQuestion.options.map((option, index) => {
                const isCorrect = index === currentQuestion.correctAnswer;
                const isSelected = selectedAnswers[currentQuestionIndex] === index;

                let variant: "outline" | "default" | "destructive" = "outline";
                if (showExplanation) {
                  if (isCorrect) variant = "default";
                  else if (isSelected) variant = "destructive";
                }

                return (
                  <Button
                    key={index}
                    variant={variant}
                    size="lg"
                    className="h-auto justify-start text-left whitespace-normal py-3"
                    onClick={() => handleSelectOption(index)}
                    disabled={showExplanation}
                  >
                    {option}
                  </Button>
                )
              })}
            </div>

            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="mt-4"
              >
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertTitle>Explanation</AlertTitle>
                    <AlertDescription>
                      {currentQuestion.explanation}
                    </AlertDescription>
                  </Alert>
              </motion.div>
            )}

          </motion.div>
        </AnimatePresence>
      </CardContent>
      <CardFooter className="justify-end">
        {showExplanation && (
            <Button 
                onClick={handleNext}
                size="lg"
            >
                {currentQuestionIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
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

function GeneratingQuizSkeleton({ subjectName }: { subjectName: string }) {
    return (
        <Card className="w-full max-w-2xl mx-auto text-center">
            <CardHeader>
                <CardTitle className="font-headline text-2xl">Generating Quiz...</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center space-y-4 p-8">
                 <div className="relative">
                    <Bot className="h-16 w-16 text-primary animate-pulse" />
                </div>
                <p className="text-muted-foreground">Dr. Astro is preparing a {subjectName} quiz for you.</p>
                <p className="text-sm text-muted-foreground">This may take a moment.</p>
            </CardContent>
        </Card>
    )
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
