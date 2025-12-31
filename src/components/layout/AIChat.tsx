"use client";

import React, { useState } from 'react';
import { Bot, Loader2, Send } from 'lucide-react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { aiAssistantGuidesUser } from '@/ai/flows/ai-assistant-guides-user';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { data } from '@/lib/data';
import { ScrollArea } from '../ui/scroll-area';

const formSchema = z.object({
  year: z.string().min(1, 'Please select your year.'),
  subject: z.string().min(1, 'Please select a subject.'),
  query: z.string().min(10, 'Please enter a query of at least 10 characters.'),
});

type FormValues = z.infer<typeof formSchema>;

const studyYears = ["1st", "2nd", "3rd", "4th"];

export function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState('');

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      year: '',
      subject: '',
      query: '',
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    setAiResponse('');
    try {
      const result = await aiAssistantGuidesUser(values);
      setAiResponse(result.response);
    } catch (error) {
      console.error('AI assistant error:', error);
      setAiResponse('Sorry, something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          size="icon"
          className="fixed bottom-20 right-4 md:bottom-6 md:right-6 rounded-full w-14 h-14 shadow-lg"
        >
          <Bot className="h-6 w-6" />
          <span className="sr-only">Open AI Assistant</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-headline flex items-center gap-2">
            <Bot /> Dr. Astro Assistant
          </DialogTitle>
          <DialogDescription>
            Ask me anything about your studies. I'll help you find the right resources.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select year" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {studyYears.map(year => (
                          <SelectItem key={year} value={year}>{year} Year</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select subject" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                         <ScrollArea className="h-48">
                          {data.subjects.map(subject => (
                            <SelectItem key={subject.id} value={subject.name}>{subject.name}</SelectItem>
                          ))}
                        </ScrollArea>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="query"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Question</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., 'What are the best resources to start with for anatomy?'" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <DialogFooter>
                <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                    <Send className="mr-2 h-4 w-4" />
                )}
                Ask Dr. Astro
                </Button>
            </DialogFooter>
          </form>
        </Form>
        { (isLoading || aiResponse) && (
            <div className="mt-4 space-y-2">
                <h4 className="font-semibold">Dr. Astro's Response:</h4>
                {isLoading && !aiResponse && <p className="text-sm text-muted-foreground">Thinking...</p>}
                {aiResponse && <div className="p-4 bg-secondary rounded-md text-sm">{aiResponse}</div>}
            </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
