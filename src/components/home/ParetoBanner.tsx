import React from 'react';
import { Lightbulb } from 'lucide-react';
import { data } from '@/lib/data';

export function ParetoBanner() {
  const { title, description } = data.paretoBanner;
  return (
    <div className="bg-accent/10 border-l-4 border-accent text-accent-foreground p-4 rounded-md my-6" role="alert">
      <div className="flex">
        <div className="py-1">
          <Lightbulb className="h-5 w-5 text-accent mr-4" />
        </div>
        <div>
          <p className="font-bold font-headline">{title}</p>
          <p className="text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
}
