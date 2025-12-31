
import React from 'react';
import type { Material, Book } from '@/lib/types';
import { Button } from '../ui/button';
import { BookCarousel } from '../shared/BookCarousel';

interface TextbookCarouselSectionProps {
  title: string;
  materials: Material[];
  onItemClick: (item: Material) => void;
}

export function TextbookCarouselSection({ title, materials, onItemClick }: TextbookCarouselSectionProps) {
  if (materials.length === 0) {
    return null;
  }

  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold font-headline">{title}</h2>
        <Button variant="link">See all</Button>
      </div>
      <BookCarousel
        items={materials}
        getItemProps={(item) => {
          const book = item as Book;
          return {
            id: book.id,
            title: book.title,
            subtitle: book.author,
            href: book.downloadUrl || '#',
            coverImageId: book.coverImageId,
          };
        }}
        onItemClick={onItemClick}
        isLoaded={true}
      />
    </section>
  );
}
