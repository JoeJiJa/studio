'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, LayoutGrid, User, Store, Bot } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/theory', label: 'Theory', icon: LayoutGrid },
  { href: '/store', label: 'Store', icon: Store },
  { href: '/menu', label: 'Profile', icon: User },
];

export function SideNav() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:block w-64 flex-shrink-0">
      <div className="fixed top-0 left-0 h-full w-64 flex flex-col border-r bg-background/95 z-40">
        <div className="flex items-center justify-center h-20 border-b">
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-primary font-headline">
            <Bot />
            Dr. Astro
          </Link>
        </div>
        <nav className="flex-grow p-4">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      'flex items-center gap-3 px-4 py-3 rounded-lg text-lg transition-colors',
                      isActive
                        ? 'bg-primary text-primary-foreground font-semibold'
                        : 'text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground'
                    )}
                  >
                    <item.icon className="h-6 w-6" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
}

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-background/80 backdrop-blur-sm border-t z-40 md:hidden">
      <div className="flex justify-around items-center h-full">
        {navItems.map((item) => {
          const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center text-xs gap-1 px-2 py-1 rounded-lg transition-colors w-20',
                isActive
                  ? 'text-primary font-semibold'
                  : 'text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground'
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
