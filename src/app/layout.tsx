
'use client';

import React, { useState, useEffect } from 'react';
import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { AIChat } from '@/components/layout/AIChat';
import { ThemeProvider } from '@/components/shared/ThemeProvider';
import { SplashScreen } from '@/components/shared/SplashScreen';
import { Header } from '@/components/layout/Header';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Splash screen will be visible for 2 seconds

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <html lang="en" suppressHydrationWarning>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link rel="icon" href="https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/jogRQQ7NL14vh4LDNK8n/pub/fRGo42eAcDofrKwh53zL/Dr%20Astro.jpg" />
          <link rel="manifest" href="/manifest.json" />
        </head>
        <body className={cn("font-body antialiased", "min-h-screen bg-background")}>
           <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <SplashScreen />
          </ThemeProvider>
        </body>
      </html>
    );
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Dr Astro</title>
        <meta name="description" content="Your personal medical study companion." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/jogRQQ7NL14vh4LDNK8n/pub/fRGo42eAcDofrKwh53zL/Dr%20Astro.jpg" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn("font-body antialiased", "min-h-screen bg-background")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="flex-grow pt-24 container mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </main>
          <AIChat />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
