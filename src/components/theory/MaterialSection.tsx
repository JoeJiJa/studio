
"use client";

import React from 'react';
import type { Material, Book } from '@/lib/types';
import { BookCarousel } from '../shared/BookCarousel';
import { Button } from '../ui/button';
import { ChevronRight } from 'lucide-react';
import { isBook } from '@/lib/types';

interface MaterialSectionProps {
  title: string;
  materials: Material[];
  onItemClick: (item: Material) => void;
  onShowMoreClick: (title: string, materials: Material[]) => void;
}

export function MaterialSection({ title, materials, onItemClick, onShowMoreClick }: MaterialSectionProps) {
  if (materials.length === 0) {
    return null;
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
         <Button variant="link" className="p-0 text-2xl font-bold font-headline h-auto hover:no-underline text-foreground" onClick={() => onShowMoreClick(title, materials)}>
            {title}
            <ChevronRight className="w-6 h-6 ml-1" />
        </Button>
      </div>
      <BookCarousel
        items={materials}
        getItemProps={(item) => {
          const book = item as Book; // Cast to Book to access properties
          if (isBook(book)) {
            onItemClick(book);
          }
          return {
            id: book.id,
            title: book.title,
            subtitle: book.author,
            href: item.downloadUrl || '#', 
            coverImageId: book.coverImageId,
          };
        }}
        isLoaded={true}
      />
    </section>
  );
}
