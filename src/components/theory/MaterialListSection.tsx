
"use client";

import React from 'react';
import type { Material } from '@/lib/types';
import { MaterialListItem } from './MaterialListItem';

interface MaterialListSectionProps {
  title: string;
  materials: Material[];
  onItemClick: (item: Material) => void;
}

export function MaterialListSection({ title, materials, onItemClick }: MaterialListSectionProps) {
  if (materials.length === 0) {
    return null;
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-bold font-headline flex items-center gap-2">
          {title}
        </h2>
      </div>
      <div className="space-y-2">
        {materials.map((item) => (
          <MaterialListItem
            key={item.id}
            item={item}
            onItemClick={onItemClick}
          />
        ))}
      </div>
    </section>
  );
}
