import React from 'react';
import { Book, Material, isBook } from '@/lib/types';
import { BookCarousel } from '../shared/BookCarousel';
import { MaterialListItem } from './MaterialListItem';
import { Input } from '../ui/input';
import { Search } from 'lucide-react';
import { Button } from '../ui/button';

interface MaterialSectionProps {
  title: string;
  materials: Material[];
  category: string;
  onBookClick: (book: Book) => void;
}

export function MaterialSection({ title, materials, category, onBookClick }: MaterialSectionProps) {
  const isCarousel = ['textbooks', 'others'].includes(category);
  const showSearch = ['textbooks', 'clinical-books', 'study-materials'].includes(category);
  const showSeeAll = ['textbooks', 'others'].includes(category);

  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold font-headline">{title}</h2>
        <div className="flex items-center gap-4">
          {showSearch && (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search" className="pl-9 bg-card" />
            </div>
          )}
          {showSeeAll && <Button variant="link">See all</Button>}
        </div>
      </div>
      {isCarousel ? (
        <BookCarousel
          items={materials.filter(isBook)}
          getItemProps={(item) => ({
            id: item.id,
            title: item.title,
            href: '#',
            coverImageId: (item as Book).coverImageId
          })}
          onItemClick={onBookClick}
        />
      ) : (
        <div className="space-y-2">
          {materials.map(item => (
            <MaterialListItem key={item.id} item={item} onBookClick={onBookClick} />
          ))}
        </div>
      )}
    </section>
  );
}
