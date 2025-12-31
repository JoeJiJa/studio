import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function HomeHero() {
  return (
    <div className="text-center bg-card p-8 rounded-lg">
      <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">
        Welcome Back, Doctor!
      </h1>
      <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
        Your journey to medical mastery continues. What will you learn today?
      </p>
      <div className="mt-6 flex gap-4 justify-center">
        <Button asChild size="lg">
          <Link href="/theory">Explore Subjects</Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="/menu">Review Flashcards</Link>
        </Button>
      </div>
    </div>
  );
}
