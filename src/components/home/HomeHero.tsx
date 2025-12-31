
import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { getPlaceholderImage } from '@/lib/placeholder-images';

export function HomeHero() {
  const inspirationalImage = getPlaceholderImage('inspirational-banner');

  return (
    <div className="relative text-center bg-card p-6 rounded-lg overflow-hidden">
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
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">
          Welcome Back, Doctor!
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Your journey to medical mastery continues. What will you learn today?
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/theory">Explore Subjects</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/menu">Review Flashcards</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
