"use client";

import React from 'react';
import type { Subject, Book, Material } from '@/lib/types';
import { useRecentlyViewed } from '@/hooks/use-recently-viewed';
import { BackButton } from '../shared/BackButton';
import { Separator } from '../ui/separator';
import { isBook } from '@/lib/types';
import { BookCarousel } from '../shared/BookCarousel';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface SubjectDetailClientPageProps {
  subject: Subject;
}

const SECTIONS = [
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

      <div className="space-y-8">
        {sectionsWithContent.map((section, index) => (
          <Card key={section.key} className="overflow-hidden">
            <CardHeader>
              <CardTitle>{section.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <BookCarousel
                items={section.materials}
                getItemProps={(item: Material) => {
                  if (isBook(item)) {
                    return {
                      id: item.id,
                      title: item.title,
                      subtitle: item.author,
                      href: item.downloadUrl || '#',
                      coverImageId: item.coverImageId,
                    };
                  }
                  // Handle StudyMaterial
                  return {
                    id: item.id,
                    title: item.title,
                    subtitle: item.description,
                    href: item.downloadUrl || '#',
                  };
                }}
                onItemClick={handleItemClick}
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
