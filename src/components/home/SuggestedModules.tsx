
"use client";

import React from 'react';
import { getSubject } from '@/lib/data';
import type { Subject } from '@/lib/types';
import { BookCarousel } from '../shared/BookCarousel';
import { BrainCircuit } from 'lucide-react';

interface SuggestedModulesProps {
  moduleIds: string[];
}

export function SuggestedModules({ moduleIds }: SuggestedModulesProps) {
  const modules = moduleIds
    .map(id => getSubject(id))
    .filter((s): s is Subject => {
      if (!s) return false;
      const hasMaterials = s.materials && Object.values(s.materials).some(m => m.length > 0);
      return hasMaterials;
    });

  return (
    <div>
        <h2 className="text-2xl font-bold font-headline flex items-center gap-2 mb-4">
            <BrainCircuit className="text-primary h-6 w-6"/>
            Suggested Modules
        </h2>
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
    </div>
  );
}
