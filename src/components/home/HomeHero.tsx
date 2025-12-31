
import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { getPlaceholderImage } from '@/lib/placeholder-images';

export function HomeHero() {
  const inspirationalImage = getPlaceholderImage('inspirational-banner');

  return (
    <div className="relative text-center bg-card p-1 rounded-lg overflow-hidden">
      {inspirationalImage && (
        <Image
          src={inspirationalImage.imageUrl}
          alt={inspirationalImage.description}
          fill
          className="object-cover opacity-10"
          data-ai-hint={inspirationalImage.imageHint}
          priority
        />
      )}
      <div className="relative">
        <h1 className="text-xl sm:text-2xl font-bold font-headline text-primary">
          Welcome Back, Doctor!
        </h1>
        <p className="mt-0.5 text-xs text-muted-foreground max-w-2xl mx-auto">
          Your journey to medical mastery continues. What will you learn today?
        </p>
        <div className="mt-1.5 flex flex-col sm:flex-row gap-1.5 sm:gap-2 justify-center">
          <Button asChild size="sm" className="h-6">
            <Link href="/theory">Explore Subjects</Link>
          </Button>
          <Button asChild size="sm" variant="outline" className="h-6">
            <Link href="/menu">Review Flashcards</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
