
"use client";

import React from 'react';
import type { Book } from '@/lib/types';
import { useRecentlyViewed } from '@/hooks/use-recently-viewed';
import { BookCarousel } from '../shared/BookCarousel';
import { History } from 'lucide-react';

export function RecentlyViewed() {
  const { items, isLoaded } = useRecentlyViewed();

  if (isLoaded && items.length === 0) {
    return null; // Don't show the section if there's nothing to show
  }

  return (
    <div>
        <h2 className="text-2xl font-bold font-headline flex items-center gap-2 mb-4">
            <History className="text-primary h-6 w-6" />
            Recently Viewed
        </h2>
        <BookCarousel
          items={items}
          getItemProps={(item) => {
            const book = item as Book;
            return {
              id: book.id,
              title: book.title,
              href: '#', 
              coverImageId: book.coverImageId,
            };
          }}
          isLoaded={isLoaded}
        />
    </div>
  );
}
