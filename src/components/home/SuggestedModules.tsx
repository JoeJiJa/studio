"use client";

import React from 'react';
import { getSubject } from '@/lib/data';
import type { Subject } from '@/lib/types';
import { BookCarousel } from '../shared/BookCarousel';

interface SuggestedModulesProps {
  moduleIds: string[];
}

export function SuggestedModules({ moduleIds }: SuggestedModulesProps) {
  const modules = moduleIds
    .map(id => getSubject(id))
    .filter((s): s is Subject => s !== undefined);

  return (
    <div className="my-8">
      <h2 className="text-2xl font-headline font-bold mb-4">Suggested Modules</h2>
      <BookCarousel
        items={modules}
        getItemProps={(item) => {
          const subject = item as Subject;
          return {
            id: subject.id,
            title: subject.name,
            href: `/theory/${subject.id}`,
            // We can use the first book's cover, or a generic subject icon later
            coverImageId: (subject.materials.textbooks?.[0] as any)?.coverImageId || (subject.materials.atlases?.[0] as any)?.coverImageId || ''
          };
        }}
      />
    </div>
  );
}
