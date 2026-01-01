
'use client';

import React from 'react';
import Image from 'next/image';

export function SplashScreen() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background animate-splash-fade-out">
      <div className="relative w-48 h-48 animate-splash-pop-in">
        <Image
          src="https://storage.googleapis.com/pai-images/051381394a14434293a527f4d7f5b331.png"
          alt="Dr Astro Logo"
          fill
          sizes="12rem"
          priority
          className="object-contain"
        />
      </div>
    </div>
  );
}
