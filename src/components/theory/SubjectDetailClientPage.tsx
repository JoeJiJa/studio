"use client";

import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from '../ui/card';
import { useRecentlyViewed } from '@/hooks/use-recently-viewed';
import type { Subject, Material, Book } from '@/lib/types';
import { isBook } from '@/lib/types';
import { BookCarousel } from '../shared/BookCarousel';

interface SubjectDetailClientPageProps {
  subject: Subject;
}

const formatTitle = (title: string) => {
    return title.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

export function SubjectDetailClientPage({ subject }: SubjectDetailClientPageProps) {
  const { addItem: addRecentlyViewed } = useRecentlyViewed();

  const handleBookClick = (book: Book) => {
    addRecentlyViewed(book);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-headline font-bold">{subject.name}</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">{subject.description}</p>
      </header>

      <Accordion type="multiple" defaultValue={Object.keys(subject.materials)} className="w-full">
        {Object.entries(subject.materials).map(([category, materials]) => (
          <AccordionItem key={category} value={category}>
            <AccordionTrigger className="text-xl font-headline">
              {formatTitle(category)}
            </AccordionTrigger>
            <AccordionContent>
              {materials.some(isBook) ? (
                <BookCarousel
                  items={materials.filter(isBook)}
                  getItemProps={(item) => ({
                    id: item.id,
                    title: item.title,
                    href: '#', // Clicks are handled by onItemClick
                    coverImageId: (item as Book).coverImageId
                  })}
                  onItemClick={handleBookClick}
                />
              ) : (
                <div className="space-y-4">
                  {materials.map((item: Material) => (
                    <Card key={item.id}>
                      <CardContent className="p-4">
                        <h4 className="font-semibold">{item.title}</h4>
                        {!isBook(item) && <p className="text-sm text-muted-foreground">{item.description}</p>}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
