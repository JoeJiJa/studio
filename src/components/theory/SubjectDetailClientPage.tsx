"use client";

import React from 'react';
import type { Subject, Book } from '@/lib/types';
import { useRecentlyViewed } from '@/hooks/use-recently-viewed';
import { BackButton } from '../shared/BackButton';
import { Button } from '../ui/button';
import { MaterialSection } from './MaterialSection';
import { Separator } from '../ui/separator';

interface SubjectDetailClientPageProps {
  subject: Subject;
}

export function SubjectDetailClientPage({ subject }: SubjectDetailClientPageProps) {
  const { addItem: addRecentlyViewed } = useRecentlyViewed();

  const handleBookClick = (book: Book) => {
    addRecentlyViewed(book);
  };
  
  const getSectionTitle = (category: string) => {
    switch (category) {
      case 'textbooks':
        return 'Textbooks';
      case 'general-anatomy':
        return 'General Anatomy';
      case 'clinical-books':
        return 'Clinical Books';
      case 'study-materials':
        return 'Study Materials';
      case 'others':
        return 'Others';
      case 'dissection-manual':
        return 'Dissection Manual';
      default:
        return category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    }
  };

  const sectionOrder = [
    'textbooks',
    'general-anatomy',
    'clinical-books',
    'study-materials',
    'others',
    'dissection-manual',
  ];

  const sortedMaterials = Object.entries(subject.materials).sort(([a], [b]) => {
    const indexA = sectionOrder.indexOf(a);
    const indexB = sectionOrder.indexOf(b);
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <BackButton />
      </div>
      
      <header className="my-8">
        <h1 className="text-4xl font-headline font-bold text-center">{subject.name}</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto text-center">{subject.description}</p>
      </header>

      <div className="space-y-12">
        {sortedMaterials.map(([category, materials], index) => (
          <React.Fragment key={category}>
            <MaterialSection
              title={getSectionTitle(category)}
              materials={materials}
              category={category}
              onBookClick={handleBookClick}
            />
            {index < sortedMaterials.length - 1 && <Separator className="my-8" />}
          </React.Fragment>
        ))}
      </div>
      
      <div className="mt-12 text-center p-4 rounded-lg bg-green-900/20 border border-green-700/50">
          <p className="text-green-400">More content and resources are live on Dr. Astro Bot on Telegram - <a href="#" className="underline hover:text-green-300">check it out now!</a></p>
      </div>

      <div className="mt-8 text-center">
        <Button size="lg" variant="destructive" className="bg-red-800 hover:bg-red-700">Switch</Button>
      </div>
    </div>
  );
}
