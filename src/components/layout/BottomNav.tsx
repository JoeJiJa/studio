"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, Store, Menu as MenuIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/theory', label: 'Theory', icon: BookOpen },
  { href: '/store', label: 'Store', icon: Store },
  { href: '/menu', label: 'Menu', icon: MenuIcon },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-background/80 backdrop-blur-sm border-t z-40 md:hidden">
      <div className="flex justify-around items-center h-full max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
          return (
            <Link key={item.href} href={item.href} className="flex flex-col items-center justify-center text-sm gap-1">
              <item.icon className={cn(
                "h-6 w-6 transition-colors",
                isActive ? 'text-primary' : 'text-muted-foreground'
              )} />
              <span className={cn(
                "text-xs font-medium transition-colors",
                isActive ? 'text-primary' : 'text-muted-foreground'
              )}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
