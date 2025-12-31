import React from 'react';
import { Quote } from 'lucide-react';
import { data } from '@/lib/data';

export function InspirationalQuote() {
  const { text, author } = data.inspirationalQuote;
  return (
    <div className="bg-accent/10 border-l-4 border-accent text-accent-foreground p-4 rounded-md my-6" role="alert">
      <div className="flex">
        <div className="py-1">
          <Quote className="h-5 w-5 text-accent mr-4" />
        </div>
        <div>
          <p className="font-bold font-headline">{`"${text}"`}</p>
          <p className="text-sm text-right w-full mt-1">- {author}</p>
        </div>
      </div>
    </div>
  );
}
