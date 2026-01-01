
"use client";

import React from 'react';
import type { Subject, Material } from '@/lib/types';
import { useRecentlyViewed } from '@/hooks/use-recently-viewed';
import { BackButton } from '../shared/BackButton';
import { isBook } from '@/lib/types';
import { MaterialSection } from './MaterialSection';
import { SubjectIcon } from './SubjectIcon';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';

interface SubjectDetailClientPageProps {
  subject: Subject;
}

const SECTIONS_CONFIG = [
  { key: 'textbooks', title: 'Textbooks' },
  { key: 'question-bank', title: 'Question Banks' },
  { key: 'general-anatomy', title: 'General Anatomy' },
  { key: 'dissection-manual', title: 'Dissection Manual' },
  { key: 'clinical-books', title: 'Clinical Books' },
  { key: 'histology', title: 'Histology' },
  { key: 'obstetrics-textbooks', title: 'Obstetrics Textbooks' },
  { key: 'gynecology-textbooks', title: 'Gynecology Textbooks' },
  { key: 'embryology', title: 'Embryology' },
  { key: 'study-materials', title: 'Study Materials' },
  { key: 'atlases', title: 'Atlases' },
  { key: 'others', title: 'Others' },
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
  
  const sectionsWithContent = SECTIONS_CONFIG.map(section => {
    let title = section.title;
    if (section.key === 'textbooks' && subject.id === 'anatomy') {
      title = 'Gross Anatomy';
    }
    
    return {
      ...section,
      title,
      materials: subject.materials[(section.key as keyof typeof subject.materials)] || [],
    };
  }).filter(section => section.materials.length > 0);


  return (
    <div className="max-w-sm mx-auto">
      <div className="flex items-center justify-between mb-4">
        <BackButton />
      </div>
      
      <Card>
        <CardContent className="p-4 md:p-6">
            <header className="mb-6 md:mb-8 text-center">
              <div className="inline-block p-4 rounded-full bg-secondary mb-4">
                  <SubjectIcon subjectId={subject.id} className="w-12 h-12 text-primary" />
              </div>
              <h1 className="text-3xl md:text-4xl font-headline font-bold">{subject.name}</h1>
              <div className="flex flex-wrap justify-center items-center gap-2 mt-2">
                  {subject.year.map(y => (
                  <Badge key={y} variant="secondary">Year {y}</Badge>
                ))}
              </div>
              <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">{subject.description}</p>
            </header>

            <div className="space-y-8">
                {sectionsWithContent.map((section) => (
                    <MaterialSection
                        key={section.key}
                        title={section.title}
                        materials={section.materials}
                        onItemClick={handleItemClick}
                    />
                ))}
            </div>
        </CardContent>
      </Card>
      
    </div>
  );
}
