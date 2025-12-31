
import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { getPlaceholderImage } from '@/lib/placeholder-images';

export function HomeHero() {
  const inspirationalImage = getPlaceholderImage('inspirational-banner');

  return (
    <div className="relative text-center bg-card p-3 rounded-lg overflow-hidden">
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
        <h1 className="text-2xl sm:text-3xl font-bold font-headline text-primary">
          Welcome Back, Doctor!
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-muted-foreground max-w-2xl mx-auto">
          Your journey to medical mastery continues. What will you learn today?
        </p>
        <div className="mt-3 flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center">
          <Button asChild size="sm">
            <Link href="/theory">Explore Subjects</Link>
          </Button>
          <Button asChild size="sm" variant="outline">
            <Link href="/menu">Review Flashcards</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
