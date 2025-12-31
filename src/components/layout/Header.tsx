import React from 'react';

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-background/80 backdrop-blur-sm border-b z-40 flex items-center">
      <div className="container mx-auto px-4">
        <h1 className="text-xl font-headline font-bold text-primary">
          Dr. Astro
        </h1>
      </div>
    </header>
  );
}
