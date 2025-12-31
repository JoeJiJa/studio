
"use client";

import React from 'react';
import type { Subject, Material } from '@/lib/types';
import { useRecentlyViewed } from '@/hooks/use-recently-viewed';
import { BackButton } from '../shared/BackButton';
import { isBook } from '@/lib/types';
import { BookCarousel } from '../shared/BookCarousel';
import { Button } from '../ui/button';

interface SubjectDetailClientPageProps {
  subject: Subject;
}

const SECTIONS_CONFIG = [
  { key: 'textbooks', title: 'Textbooks' },
  { key: 'clinical-books', title: 'Clinical Books' },
  { key: 'study-materials', title: 'Study Materials' },
  { key: 'question-bank', title: 'Question Banks' },
  { key: 'atlases', title: 'Atlases' },
  { key: 'general-anatomy', title: 'General Anatomy' },
  { key: 'others', title: 'Others' },
  { key: 'dissection-manual', title: 'Dissection Manual' },
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
  
  const sectionsWithContent = SECTIONS_CONFIG.map(section => ({
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

      <div className="space-y-8">
        {sectionsWithContent.map((section) => (
            <section key={section.key}>
                <div className="flex justify-between items-center mb-2">
                    <h2 className="text-2xl font-bold font-headline">{section.title}</h2>
                    {section.materials.length > 4 && <Button variant="link">See all</Button>}
                </div>
                <BookCarousel
                    items={section.materials}
                    getItemProps={(item) => {
                        const book = item as any;
                        const coverImageId = isBook(item) ? item.coverImageId : undefined;
                        const subtitle = isBook(item) ? item.author : item.description;

                        return {
                            id: item.id,
                            title: item.title,
                            subtitle: subtitle,
                            href: item.downloadUrl || '#',
                            coverImageId: coverImageId,
                        };
                    }}
                    onItemClick={handleItemClick}
                />
            </section>
        ))}
      </div>
    </div>
  );
}
