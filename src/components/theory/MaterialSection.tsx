
"use client";

import React from 'react';
import type { Material, Book } from '@/lib/types';
import { Card, CardContent } from '../ui/card';
import { BookCarousel } from '../shared/BookCarousel';
import { Button } from '../ui/button';

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
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-bold font-headline flex items-center gap-2">
          {title}
        </h2>
        {materials.length > 5 && (
            <Button variant="link" className="pr-0" onClick={() => onShowMoreClick(title, materials)}>
                Show more
            </Button>
        )}
      </div>
      <Card>
        <CardContent className="p-2">
          <BookCarousel
            items={materials}
            getItemProps={(item) => {
              const book = item as Book;
              return {
                id: book.id,
                title: book.title,
                subtitle: book.author,
                href: '#', 
                coverImageId: book.coverImageId,
              };
            }}
            onItemClick={onItemClick}
            isLoaded={true}
          />
        </CardContent>
      </Card>
    </section>
  );
}
