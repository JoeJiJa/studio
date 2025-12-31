import React from 'react';
import type { Material } from '@/lib/types';
import { MaterialListItem } from './MaterialListItem';

interface MaterialSectionProps {
  title: string;
  materials: Material[];
  onItemClick: (item: Material) => void;
}

export function MaterialSection({ title, materials, onItemClick }: MaterialSectionProps) {
  if (materials.length === 0) {
    return null;
  }

  return (
    <section>
      <h2 className="text-2xl font-bold font-headline mb-4">{title}</h2>
      <div className="space-y-3">
        {materials.map(item => (
          <MaterialListItem key={item.id} item={item} onItemClick={onItemClick} />
        ))}
      </div>
    </section>
  );
}
