
'use client';

import React from 'react';
import Image from 'next/image';

export function SplashScreen() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background animate-splash-fade-out">
      <div className="relative w-48 h-48 animate-splash-pop-in">
        <Image
          src="https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/jogRQQ7NL14vh4LDNK8n/pub/fRGo42eAcDofrKwh53zL/Dr%20Astro.jpg"
          alt="Dr Astro Logo"
          fill
          priority
          className="object-contain"
        />
      </div>
    </div>
  );
}
