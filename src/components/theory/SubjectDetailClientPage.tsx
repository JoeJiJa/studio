

"use client";

import React, { useState } from 'react';
import type { Subject, Material } from '@/lib/types';
import { useRecentlyViewed } from '@/hooks/use-recently-viewed';
import { BackButton } from '../shared/BackButton';
import { isBook } from '@/lib/types';
import { MaterialSection } from './MaterialSection';
import { MaterialSheet } from './MaterialSheet';

interface SubjectDetailClientPageProps {
  subject: Subject;
}

type SheetData = {
  title: string;
  materials: Material[];
} | null;

const SECTIONS_CONFIG = [
  { key: 'general-anatomy', title: 'General Anatomy' },
  { key: 'textbooks', title: 'Textbooks' },
  { key: 'dissection-manual', title: 'Dissection Manual' },
  { key: 'clinical-books', title: 'Clinical Books' },
  { key: 'embryology', title: 'Embryology' },
  { key: 'histology', title: 'Histology' },
  { key: 'obstetrics-textbooks', title: 'Obstetrics Textbooks' },
  { key: 'gynecology-textbooks', title: 'Gynecology Textbooks' },
  { key: 'study-materials', title: 'Study Materials' },
  { key: 'question-bank', title: 'Question Banks' },
  { key: 'atlases', title: 'Atlases' },
  { key: 'others', title: 'Others' },
];

export function SubjectDetailClientPage({ subject }: SubjectDetailClientPageProps) {
  const { addItem: addRecentlyViewed } = useRecentlyViewed();
  const [sheetData, setSheetData] = useState<SheetData>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

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

  const handleSeeAllClick = (title: string, materials: Material[]) => {
    setSheetData({ title, materials });
    setIsSheetOpen(true);
  };

  const handleSheetOpenChange = (isOpen: boolean) => {
    setIsSheetOpen(isOpen);
    if (!isOpen) {
      // Give a small delay for the sheet to close before clearing data
      setTimeout(() => setSheetData(null), 150);
    }
  };

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
            <MaterialSection
                key={section.key}
                title={section.title}
                materials={section.materials}
                onItemClick={handleItemClick}
                onSeeAllClick={() => handleSeeAllClick(section.title, section.materials)}
            />
        ))}
      </div>
      
      {sheetData && (
        <MaterialSheet
          isOpen={isSheetOpen}
          onOpenChange={handleSheetOpenChange}
          title={sheetData.title}
          materials={sheetData.materials}
          onItemClick={handleItemClick}
        />
      )}
    </div>
  );
}
