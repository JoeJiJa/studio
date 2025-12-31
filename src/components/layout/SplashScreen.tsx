'use client';

import React from 'react';
import Image from 'next/image';

export function SplashScreen() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background text-primary transition-opacity duration-500 ease-in-out">
      <div className="flex animate-pulse flex-col items-center gap-4">
        <Image
          src="https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/jogRQQ7NL14vh4LDNK8n/pub/fRGo42eAcDofrKwh53zL/Dr%20Astro.jpg"
          alt="Dr Astro Logo"
          width={128}
          height={128}
          className="rounded-full"
          priority
        />
        <h1 className="text-4xl font-headline font-bold">Dr Astro</h1>
      </div>
      <p className="mt-4 text-muted-foreground">Your personal medical study companion.</p>
    </div>
  );
}
