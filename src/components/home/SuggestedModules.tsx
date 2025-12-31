
"use client";

import React from 'react';
import { getSubject } from '@/lib/data';
import type { Subject } from '@/lib/types';
import { BookCarousel } from '../shared/BookCarousel';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { BrainCircuit } from 'lucide-react';

interface SuggestedModulesProps {
  moduleIds: string[];
}

export function SuggestedModules({ moduleIds }: SuggestedModulesProps) {
  const modules = moduleIds
    .map(id => getSubject(id))
    .filter((s): s is Subject => {
      if (!s) return false;
      // Ensure the subject has some materials to be displayed.
      const hasMaterials = s.materials && Object.values(s.materials).some(m => m.length > 0);
      return hasMaterials;
    });

  return (
    <Card className="h-full">
      <CardHeader className="p-3">
        <CardTitle className="flex items-center gap-2 text-lg">
            <BrainCircuit className="text-primary h-5 w-5"/>
            Suggested Modules
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3 pt-0">
        <BookCarousel
            items={modules}
            getItemProps={(item) => {
              const subject = item as Subject;
              
              const firstTextbook = subject.materials?.textbooks?.[0] as any;
              const firstAtlas = subject.materials?.atlases?.[0] as any;

              const coverImageId = firstTextbook?.coverImageId || firstAtlas?.coverImageId;

              return {
                  id: subject.id,
                  title: subject.name,
                  href: `/theory/${subject.id}`,
                  coverImageId: coverImageId
              };
            }}
        />
      </CardContent>
    </Card>
  );
}
