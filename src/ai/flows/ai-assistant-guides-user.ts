
// src/ai/flows/ai-assistant-guides-user.ts
'use server';

/**
 * @fileOverview AI assistant to guide users through the website's content based on their year of study and subject of interest.
 * 
 * - aiAssistantGuidesUser - A function that handles the AI assistant guidance.
 * - AIAssistantGuidesUserInput - The input type for the aiAssistantGuidesUser function.
 * - AIAssistantGuidesUserOutput - The return type for the aiAssistantGuidesUser function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { data } from '@/lib/data';

const AIAssistantGuidesUserInputSchema = z.object({
  year: z.string().describe('The year of study (1st, 2nd, 3rd, 4th).'),
  subject: z.string().describe('The subject of interest (e.g., Anatomy, Oncology).'),
  query: z.string().describe('The user query to the AI assistant.'),
});

export type AIAssistantGuidesUserInput = z.infer<typeof AIAssistantGuidesUserInputSchema>;

const AIAssistantGuidesUserOutputSchema = z.object({
  response: z.string().describe('The AI assistant response.'),
});

export type AIAssistantGuidesUserOutput = z.infer<typeof AIAssistantGuidesUserOutputSchema>;

const getRelevantContent = ai.defineTool(
  {
    name: 'getRelevantContent',
    description: 'Retrieves relevant learning materials based on the year of study and subject of interest.',
    inputSchema: z.object({
      year: z.string().describe('The year of study (1st, 2nd, 3rd, 4th).'),
      subject: z.string().describe('The subject of interest (e.g., Anatomy, Oncology).'),
    }),
    outputSchema: z.string(),
  },
  async (input) => {
    const subject = data.subjects.find(s => s.name.toLowerCase() === input.subject.toLowerCase());
    if (!subject) {
      return `I couldn't find any materials for the subject: ${input.subject}. Please check the subject name and try again.`;
    }

    const materials = Object.values(subject.materials).flat();
    if (materials.length === 0) {
        return `There are no learning materials available for ${input.subject} yet. Please check back later.`;
    }
    
    const materialTitles = materials.map(m => m.title).join(', ');
    
    return `For ${input.subject}, I found the following materials: ${materialTitles}. You can find them on the ${input.subject} page.`;
  }
);

const aiAssistantGuidesUserPrompt = ai.definePrompt({
  name: 'aiAssistantGuidesUserPrompt',
  tools: [getRelevantContent],
  input: {schema: AIAssistantGuidesUserInputSchema},
  output: {schema: AIAssistantGuidesUserOutputSchema},
  prompt: `You are Dr. Astro, a helpful AI assistant for medical students. Your role is to guide users through the website's content based on their year of study and subject of interest.

  The student is in year: {{{year}}}
  The subject of interest is: {{{subject}}}.

  The user has the following query: {{{query}}}

  Use the getRelevantContent tool to find relevant learning materials based on the user's year and subject, if the query is related to study materials.
  If the user asks a general question, provide a helpful and encouraging response without using the tool.
  If the tool returns a list of materials, present them clearly to the user.
  If the tool says no materials were found, inform the user in a friendly way.
`,
});

const aiAssistantGuidesUserFlow = ai.defineFlow(
  {
    name: 'aiAssistantGuidesUserFlow',
    inputSchema: AIAssistantGuidesUserInputSchema,
    outputSchema: AIAssistantGuidesUserOutputSchema,
  },
  async input => {
    const {output} = await aiAssistantGuidesUserPrompt(input);
    return {
      response: output!.response,
    };
  }
);

export async function aiAssistantGuidesUser(input: AIAssistantGuidesUserInput): Promise<AIAssistantGuidesUserOutput> {
  return aiAssistantGuidesUserFlow(input);
}
