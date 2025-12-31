import React from 'react';
import { Book, Material, isBook } from '@/lib/types';
import { BookCarousel } from '../shared/BookCarousel';
import { Button } from '../ui/button';

interface MaterialSectionProps {
  title: string;
  materials: Material[];
  onBookClick: (book: Book) => void;
}

export function MaterialSection({ title, materials, onBookClick }: MaterialSectionProps) {
  // Convert all material types to a structure that BookCarousel can handle
  const carouselItems = materials.map(item => {
    if (isBook(item)) {
      return item;
    }
    // Convert StudyMaterial or other types to a Book-like structure for the carousel
    return {
      id: item.id,
      title: item.title,
      author: (item as any).description || '',
      coverImageId: 'study-material-placeholder', // Use a generic placeholder
    };
  });

  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold font-headline">{title}</h2>
        <Button variant="link">See all</Button>
      </div>
      <BookCarousel
        items={carouselItems}
        getItemProps={(item) => ({
          id: item.id,
          title: item.title,
          href: '#', // The click is handled by onBookClick, href can be '#'
          coverImageId: (item as Book).coverImageId
        })}
        onItemClick={onBookClick}
      />
    </section>
  );
}
