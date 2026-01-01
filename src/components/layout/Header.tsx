
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bot, Home, LayoutGrid, FileText, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeSwitcher } from '@/components/shared/ThemeSwitcher';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/theory', label: 'Theory' },
  { href: '/exam-prep', label: 'Exam Prep' },
  { href: '/menu', label: 'Profile' },
];

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'bg-background/95 backdrop-blur-sm' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 font-headline text-lg font-bold text-primary">
              <Bot />
              <span>Dr. Astro</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              {navItems.map((item) => {
                const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'text-sm font-medium transition-colors',
                      isActive
                        ? 'text-primary'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="flex items-center gap-4">
             <ThemeSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
}
