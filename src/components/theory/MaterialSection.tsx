
"use client";

import React, { useState, useMemo } from 'react';
import type { Material } from '@/lib/types';
import { MaterialListItem } from './MaterialListItem';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';

const ITEMS_TO_SHOW = 3;

interface MaterialSectionProps {
  title: string;
  materials: Material[];
  onItemClick: (item: Material) => void;
  onSeeAllClick: () => void;
}

export function MaterialSection({ title, materials, onItemClick, onSeeAllClick }: MaterialSectionProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMaterials = useMemo(() => {
    if (!searchTerm) {
      return materials;
    }
    return materials.filter(item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [materials, searchTerm]);
  
  const visibleMaterials = filteredMaterials.slice(0, ITEMS_TO_SHOW);
  const canSeeAll = materials.length > 0;

  if (materials.length === 0) {
    return null;
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold font-headline flex items-center gap-2">
          {title}
          <span className="text-primary">■</span>
        </h2>
      </div>
      <Card className="p-4">
        <div className="flex gap-2 mb-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-9 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {canSeeAll && (
            <Button variant="outline" onClick={onSeeAllClick}>
              See all
            </Button>
          )}
        </div>
        <div className="space-y-3">
          {visibleMaterials.map(item => (
            <MaterialListItem key={item.id} item={item} onItemClick={onItemClick} />
          ))}
          {filteredMaterials.length === 0 && (
            <p className="text-center text-muted-foreground py-4">No materials found.</p>
          )}
        </div>
      </Card>
    </section>
  );
}
