
"use client";

import React, { useState, useEffect } from 'react';
import { Quote } from 'lucide-react';
import { data } from '@/lib/data';

export function InspirationalQuote() {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  useEffect(() => {
    if (data.inspirationalQuotes && data.inspirationalQuotes.length > 0) {
        // Set a random quote on initial load
        setCurrentQuoteIndex(Math.floor(Math.random() * data.inspirationalQuotes.length));
      
        const interval = setInterval(() => {
            setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % data.inspirationalQuotes.length);
        }, 30 * 1000); // 30 seconds

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
    <div className="bg-card text-center p-8 rounded-lg" role="alert">
        <Quote className="h-8 w-8 text-primary mx-auto mb-4" />
        <p className="text-xl md:text-2xl font-semibold font-headline italic">{`"${text}"`}</p>
        <p className="text-md text-muted-foreground mt-4">- {author}</p>
    </div>
  );
}
