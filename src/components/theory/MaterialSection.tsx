import React from 'react';
import type { Material, Book, Subject } from '@/lib/types';
import { Button } from '../ui/button';
import { BookCarousel } from '../shared/BookCarousel';
import { isBook } from '@/lib/types';

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
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold font-headline">{title}</h2>
        {materials.length > 4 && <Button variant="link">See all</Button>}
      </div>
      <BookCarousel
        items={materials}
        getItemProps={(item) => {
          const isBookItem = isBook(item);
          return {
            id: item.id,
            title: item.title,
            href: item.downloadUrl || '#',
            coverImageId: isBookItem ? (item as Book).coverImageId : 'study-material-placeholder',
          };
        }}
        onItemClick={onItemClick}
      />
    </section>
  );
}
