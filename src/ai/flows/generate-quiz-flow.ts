'use server';
/**
 * @fileOverview A flow for generating quiz questions for medical students.
 * 
 * - generateQuiz - A function that creates a quiz with a specified subject and number of questions.
 * - GenerateQuizInput - The input type for the generateQuiz function.
 * - GenerateQuizOutput - The return type for the generateQuiz function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const QuestionSchema = z.object({
  question: z.string().describe('The question text.'),
  options: z.array(z.string()).describe('An array of 4 possible answers.'),
  correctAnswer: z.number().int().min(0).max(3).describe('The 0-based index of the correct answer in the options array.'),
  explanation: z.string().describe('A brief explanation for why the correct answer is right.'),
});

const GenerateQuizInputSchema = z.object({
  subjectName: z.string().describe('The subject for which to generate the quiz (e.g., "Anatomy", "Pharmacology").'),
  questionCount: z.number().int().positive().describe('The number of questions to generate for the quiz.'),
});
export type GenerateQuizInput = z.infer<typeof GenerateQuizInputSchema>;

const GenerateQuizOutputSchema = z.object({
  questions: z.array(QuestionSchema).describe('The array of generated quiz questions.'),
});
export type GenerateQuizOutput = z.infer<typeof GenerateQuizOutputSchema>;

const generateQuizPrompt = ai.definePrompt({
  name: 'generateQuizPrompt',
  input: { schema: GenerateQuizInputSchema },
  output: { schema: GenerateQuizOutputSchema },
  prompt: `You are an expert medical educator creating a multiple-choice quiz for MBBS students.
  Generate {{{questionCount}}} questions for the subject: {{{subjectName}}}.
  Each question must have 4 options.
  The questions should be challenging but appropriate for a medical student.
  Ensure you provide the question, options, the 0-based index of the correct answer, and a brief explanation.
  `,
});

const generateQuizFlow = ai.defineFlow(
  {
    name: 'generateQuizFlow',
    inputSchema: GenerateQuizInputSchema,
    outputSchema: GenerateQuizOutputSchema,
  },
  async (input) => {
    const { output } = await generateQuizPrompt(input);
    return output!;
  }
);

export async function generateQuiz(input: GenerateQuizInput): Promise<GenerateQuizOutput> {
  return generateQuizFlow(input);
}
