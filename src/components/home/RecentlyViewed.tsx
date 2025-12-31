"use client";

import React from 'react';
import type { Book } from '@/lib/types';
import { useRecentlyViewed } from '@/hooks/use-recently-viewed';
import { BookCarousel } from '../shared/BookCarousel';

export function RecentlyViewed() {
  const { items, isLoaded } = useRecentlyViewed();

  if (!isLoaded && items.length === 0) {
     return (
        <div className="my-8">
            <h2 className="text-2xl font-headline font-bold mb-4">Recently Viewed</h2>
            <BookCarousel items={[]} getItemProps={() => ({id: '', title: '', href: ''})} isLoaded={false} />
        </div>
     )
  }

  if (isLoaded && items.length === 0) {
    return null; // Don't show the section if there's nothing to show
  }

  return (
    <div className="my-8">
      <h2 className="text-2xl font-headline font-bold mb-4">Recently Viewed</h2>
      <BookCarousel
        items={items}
        getItemProps={(item) => {
          const book = item as Book;
          // Find the subject this book belongs to for the link
          return {
            id: book.id,
            title: book.title,
            href: '#', // The click is handled, direct link is complex without more context
            coverImageId: book.coverImageId,
          };
        }}
        isLoaded={isLoaded}
      />
    </div>
  );
}
