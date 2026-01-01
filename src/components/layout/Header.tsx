
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bot } from 'lucide-react';
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

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90vw] md:w-auto">
        <div className="flex items-center justify-center bg-black/50 backdrop-blur-md rounded-full shadow-lg p-2 gap-2 md:gap-4">
            <Link href="/" className="flex items-center gap-2 font-headline text-lg font-bold text-primary flex-shrink-0 pr-2">
              <Bot />
            </Link>
            <nav className="flex items-center gap-1 md:gap-2 overflow-x-auto no-scrollbar">
              {navItems.map((item) => {
                const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'text-sm font-medium transition-colors rounded-full px-3 py-1 flex-shrink-0',
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <div className="flex items-center gap-2 flex-shrink-0 pl-2">
             <ThemeSwitcher />
          </div>
        </div>
        <style jsx>{`
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
    </header>
  );
}
