import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { BottomNav } from '@/components/layout/BottomNav';
import { Toaster } from '@/components/ui/toaster';
import { AIChat } from '@/components/layout/AIChat';
import { ThemeProvider } from '@/components/shared/ThemeProvider';
import { ThemeSwitcher } from '@/components/shared/ThemeSwitcher';

export const metadata: Metadata = {
  title: 'AstroMed',
  description: 'Your personal medical study companion.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
          <div className="fixed top-4 right-4 z-50">
            <ThemeSwitcher />
          </div>
          <div className="flex min-h-screen">
            <main className="flex-grow pb-16">
              <div className="container mx-auto px-4 py-8">
                {children}
              </div>
            </main>
          </div>
          <BottomNav />
          <AIChat />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
