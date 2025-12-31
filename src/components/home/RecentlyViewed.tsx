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
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <History className="text-primary" />
            Recently Viewed
        </CardTitle>
      </CardHeader>
      <CardContent>
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
