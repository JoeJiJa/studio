
import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { getPlaceholderImage } from '@/lib/placeholder-images';
import { PlayCircle, Info } from 'lucide-react';

export function HomeHero() {
  const inspirationalImage = getPlaceholderImage('inspirational-banner');

  return (
    <div className="relative h-[50vh] md:h-[60vh] w-full flex items-center justify-center rounded-lg overflow-hidden">
      {inspirationalImage && (
        <>
          <Image
            src={inspirationalImage.imageUrl}
            alt={inspirationalImage.description}
            fill
            className="object-cover"
            data-ai-hint={inspirationalImage.imageHint}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-black/10"></div>
        </>
      )}
      <div className="relative z-10 text-center container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-headline text-white drop-shadow-lg">
          Welcome Back, Doctor!
        </h1>
        <p className="mt-4 text-md sm:text-lg text-primary-foreground/90 drop-shadow-md max-w-2xl mx-auto">
          Your journey to medical mastery continues. What will you learn today?
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="h-12 text-base sm:text-lg">
            <Link href="/theory"><PlayCircle className="mr-2 h-5 w-5"/> Explore Subjects</Link>
          </Button>
          <Button asChild size="lg" variant="secondary" className="h-12 text-base sm:text-lg">
            <Link href="/menu"><Info className="mr-2 h-5 w-5"/> Review Flashcards</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
