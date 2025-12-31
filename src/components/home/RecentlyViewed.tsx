
"use client";

import React from 'react';
import type { Book } from '@/lib/types';
import { useRecentlyViewed } from '@/hooks/use-recently-viewed';
import { BookCarousel } from '../shared/BookCarousel';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { History } from 'lucide-react';

export function RecentlyViewed() {
  const { items, isLoaded } = useRecentlyViewed();

  if (isLoaded && items.length === 0) {
    return null; // Don't show the section if there's nothing to show
  }

  return (
    <Card>
      <CardHeader className="p-2">
        <CardTitle className="flex items-center gap-1.5 text-base">
            <History className="text-primary h-4 w-4" />
            Recently Viewed
        </CardTitle>
      </CardHeader>
      <CardContent className="p-2 pt-0">
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
      </CardContent>
    </Card>
  );
}
