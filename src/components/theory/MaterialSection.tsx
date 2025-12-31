import React from 'react';
import type { Material, Book, Subject } from '@/lib/types';
import { Button } from '../ui/button';
import { BookCarousel } from '../shared/BookCarousel';

interface MaterialSectionProps {
  title: string;
  materials: Material[];
  onItemClick: (item: Material) => void;
}

export function MaterialSection({ title, materials, onItemClick }: MaterialSectionProps) {
  if (materials.length === 0) {
    return null;
  }

  return (
    <section>
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold font-headline">{title}</h2>
        {materials.length > 5 && <Button variant="link">See all</Button>}
      </div>
      <BookCarousel
          items={materials}
          getItemProps={(item) => {
            const book = item as Book;
            return {
                id: book.id,
                title: book.title,
                subtitle: book.author,
                href: '#',
                coverImageId: book.coverImageId
            };
          }}
          onItemClick={onItemClick}
      />
    </section>
  );
}
