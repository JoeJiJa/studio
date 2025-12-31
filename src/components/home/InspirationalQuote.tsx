
"use client";

import React, { useState, useEffect } from 'react';
import { Quote } from 'lucide-react';
import { data } from '@/lib/data';

export function InspirationalQuote() {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  useEffect(() => {
    if (data.inspirationalQuotes && data.inspirationalQuotes.length > 0) {
      const interval = setInterval(() => {
        setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % data.inspirationalQuotes.length);
      }, 5 * 60 * 1000); // 5 minutes

      return () => clearInterval(interval);
    }
  }, []);

  if (!data.inspirationalQuotes || data.inspirationalQuotes.length === 0) {
    return null; 
  }

  const quote = data.inspirationalQuotes[currentQuoteIndex];
  
  if (!quote) {
    return null;
  }

  const { text, author } = quote;

  return (
    <div className="bg-accent/10 border-l-4 border-accent text-accent-foreground p-1.5 rounded-md" role="alert">
      <div className="flex">
        <div className="py-1">
          <Quote className="h-3 w-3 text-accent mr-2" />
        </div>
        <div>
          <p className="text-sm font-semibold font-headline">{`"${text}"`}</p>
          <p className="text-xs text-right w-full mt-0.5">- {author}</p>
        </div>
      </div>
    </div>
  );
}
