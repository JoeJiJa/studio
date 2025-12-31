"use client";

import React from 'react';
import type { Subject, Book, Material } from '@/lib/types';
import { useRecentlyViewed } from '@/hooks/use-recently-viewed';
import { BackButton } from '../shared/BackButton';
import { MaterialSection } from './MaterialSection';
import { Separator } from '../ui/separator';
import { isBook } from '@/lib/types';

interface SubjectDetailClientPageProps {
  subject: Subject;
}

const SECTIONS = [
  { key: 'textbooks', title: 'Textbooks' },
  { key: 'clinical-books', title: 'Clinical Books' },
  { key: 'study-materials', title: 'Study Materials' },
  { key: 'question-bank', title: 'Question Banks' },
];

export function SubjectDetailClientPage({ subject }: SubjectDetailClientPageProps) {
  const { addItem: addRecentlyViewed } = useRecentlyViewed();

  const handleItemClick = (item: Material) => {
    if (item.downloadUrl) {
      window.open(item.downloadUrl, '_blank', 'noopener,noreferrer');
    }
    
    if (isBook(item)) {
       addRecentlyViewed(item);
    }
  };
  
  const sectionsWithContent = SECTIONS.map(section => ({
    ...section,
    materials: subject.materials[section.key as keyof typeof subject.materials] || [],
  })).filter(section => section.materials.length > 0);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <BackButton />
      </div>
      
      <header className="my-6 md:my-8 text-center">
        <h1 className="text-4xl md:text-5xl font-headline font-bold">{subject.name}</h1>
        <p className="text-muted-foreground mt-2 max-w-3xl mx-auto">{subject.description}</p>
      </header>

      <div className="space-y-12">
        {sectionsWithContent.map((section, index) => (
          <React.Fragment key={section.key}>
            <MaterialSection
              title={section.title}
              materials={section.materials}
              onItemClick={handleItemClick}
            />
            {index < sectionsWithContent.length - 1 && <Separator className="my-8" />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
