
import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { getPlaceholderImage } from '@/lib/placeholder-images';
import { PlayCircle, Info } from 'lucide-react';

export function HomeHero() {
  const inspirationalImage = getPlaceholderImage('inspirational-banner');

  return (
    <div className="relative h-[50vh] md:h-[60vh] w-full flex items-center justify-center -mx-4 sm:-mx-6 lg:-mx-8">
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
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"></div>
        </>
      )}
      <div className="relative z-10 text-left container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-bold font-headline text-white drop-shadow-lg">
          Welcome Back, Doctor!
        </h1>
        <p className="mt-4 text-lg text-white/90 drop-shadow-md max-w-2xl">
          Your journey to medical mastery continues. What will you learn today?
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Button asChild size="lg" className="h-12 text-lg">
            <Link href="/theory"><PlayCircle className="mr-2 h-6 w-6"/> Explore Subjects</Link>
          </Button>
          <Button asChild size="lg" variant="secondary" className="h-12 text-lg bg-background/20 backdrop-blur-sm hover:bg-background/30 border border-white/20 text-white">
            <Link href="/menu"><Info className="mr-2 h-6 w-6"/> Review Flashcards</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
