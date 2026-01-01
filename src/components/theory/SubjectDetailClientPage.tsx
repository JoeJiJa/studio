
"use client";

import React, { useState, useMemo } from 'react';
import type { Subject, Material } from '@/lib/types';
import { useRecentlyViewed } from '@/hooks/use-recently-viewed';
import { BackButton } from '../shared/BackButton';
import { isBook } from '@/lib/types';
import { MaterialSection } from './MaterialSection';
import { SubjectIcon } from './SubjectIcon';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { MaterialSheet } from './MaterialSheet';

interface SubjectDetailClientPageProps {
  subject: Subject;
}

type SheetState = {
  title: string;
  materials: Material[];
};

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
  const [sheetState, setSheetState] = useState<SheetState | null>(null);

  const handleItemClick = (item: Material) => {
    if (item.downloadUrl) {
      window.open(item.downloadUrl, '_blank', 'noopener,noreferrer');
    }
    
    if (isBook(item)) {
       addRecentlyViewed(item);
    }
  };

  const handleShowMoreClick = (title: string, materials: Material[]) => {
    setSheetState({ title, materials });
  };
  
  const sectionsWithContent = useMemo(() => SECTIONS_CONFIG.map(section => {
    let title = section.title;
    if (section.key === 'textbooks' && subject.id === 'anatomy') {
      title = 'Gross Anatomy';
    } else if (section.key === 'textbooks' && subject.id === 'ophthalmology') {
        title = 'Ophthalmology Textbook';
    } else if (section.key === 'clinical-books' && subject.id === 'ophthalmology') {
        title = 'Ophthalmology Clinical Book';
    } else if (section.key === 'study-materials' && subject.id === 'ophthalmology') {
        title = 'Ophthalmology Study Materials';
    } else if (section.key === 'textbooks' && subject.id === 'ent') {
        title = 'ENT Textbook';
    } else if (section.key === 'clinical-books' && subject.id === 'ent') {
        title = 'ENT Clinical Book';
    } else if (section.key === 'study-materials' && subject.id === 'ent') {
        title = 'ENT Study Materials';
    }
    
    return {
      ...section,
      title,
      materials: subject.materials[(section.key as keyof typeof subject.materials)] || [],
    };
  }).filter(section => section.materials.length > 0), [subject]);


  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <BackButton />
      </div>
      
      <Card>
        <CardContent className="p-2 md:p-6">
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
                        onShowMoreClick={handleShowMoreClick}
                    />
                ))}
            </div>
        </CardContent>
      </Card>
      
      {sheetState && (
        <MaterialSheet
          isOpen={!!sheetState}
          onOpenChange={(isOpen) => !isOpen && setSheetState(null)}
          title={sheetState.title}
          materials={sheetState.materials}
          onItemClick={handleItemClick}
        />
      )}
    </>
  );
}
