
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
import { MaterialListSection } from './MaterialListSection';

interface SubjectDetailClientPageProps {
  subject: Subject;
}

const SECTIONS_CONFIG = [
  { key: 'textbooks', title: 'Textbooks', view: 'list' },
  { key: 'question-bank', title: 'Question Banks', view: 'list' },
  { key: 'general-anatomy', title: 'General Anatomy', view: 'carousel' },
  { key: 'dissection-manual', title: 'Dissection Manual', view: 'carousel' },
  { key: 'clinical-books', title: 'Clinical Books', view: 'carousel' },
  { key: 'histology', title: 'Histology', view: 'carousel' },
  { key: 'obstetrics-textbooks', title: 'Obstetrics Textbooks', view: 'carousel' },
  { key: 'gynecology-textbooks', title: 'Gynecology Textbooks', view: 'carousel' },
  { key: 'embryology', title: 'Embryology', view: 'carousel' },
  { key: 'study-materials', title: 'Study Materials', view: 'carousel' },
  { key: 'atlases', title: 'Atlases', view: 'carousel' },
  { key: 'others', title: 'Others', view: 'carousel' },
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
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <BackButton />
      </div>
      
      <Card>
        <CardContent className="p-4 md:p-6">
            <header className="mb-6 md:mb-8">
              <div className="flex items-start gap-4">
                <div className="hidden sm:block p-3 rounded-lg bg-secondary">
                  <SubjectIcon subjectId={subject.id} className="w-8 h-8 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                     {subject.year.map(y => (
                      <Badge key={y} variant="secondary">Year {y}</Badge>
                    ))}
                  </div>
                  <h1 className="text-3xl md:text-4xl font-headline font-bold">{subject.name}</h1>
                  <p className="text-muted-foreground mt-2">{subject.description}</p>
                </div>
              </div>
            </header>

            <div className="space-y-8">
                {sectionsWithContent.map((section) => {
                    if (section.view === 'list') {
                        return (
                             <MaterialListSection
                                key={section.key}
                                title={section.title}
                                materials={section.materials}
                                onItemClick={handleItemClick}
                            />
                        );
                    }
                    return (
                        <MaterialSection
                            key={section.key}
                            title={section.title}
                            materials={section.materials}
                            onItemClick={handleItemClick}
                        />
                    );
                })}
            </div>
        </CardContent>
      </Card>
      
    </div>
  );
}
