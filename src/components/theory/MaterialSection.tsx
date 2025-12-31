import React from 'react';
import type { Material } from '@/lib/types';
import { Button } from '../ui/button';
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
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold font-headline">{title}</h2>
        {materials.length > 4 && <Button variant="link">See all</Button>}
      </div>
      <div className="space-y-3">
        {materials.map((item) => (
          <MaterialListItem key={item.id} item={item} onItemClick={onItemClick} />
        ))}
      </div>
    </section>
  );
}
