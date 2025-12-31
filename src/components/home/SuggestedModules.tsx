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
    .filter((s): s is Subject => s !== undefined);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <BrainCircuit className="text-primary"/>
            Suggested Modules
        </CardTitle>
      </CardHeader>
      <CardContent>
        <BookCarousel
            items={modules}
            getItemProps={(item) => {
            const subject = item as Subject;
            return {
                id: subject.id,
                title: subject.name,
                href: `/theory/${subject.id}`,
                coverImageId: (subject.materials.textbooks?.[0] as any)?.coverImageId || (subject.materials.atlases?.[0] as any)?.coverImageId || ''
            };
            }}
        />
      </CardContent>
    </Card>
  );
}
