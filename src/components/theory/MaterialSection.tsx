"use client";

import React, { useState, useMemo } from 'react';
import type { Material } from '@/lib/types';
import { MaterialListItem } from './MaterialListItem';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Card } from '../ui/card';

interface MaterialSectionProps {
  title: string;
  materials: Material[];
  onItemClick: (item: Material) => void;
}

export function MaterialSection({ title, materials, onItemClick }: MaterialSectionProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMaterials = useMemo(() => {
    if (!searchTerm) {
      return materials;
    }
    return materials.filter(item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [materials, searchTerm]);

  if (materials.length === 0) {
    return null;
  }

  return (
    <section>
      <h2 className="text-2xl font-bold font-headline mb-4 flex items-center gap-2">
        {title}
        <span className="text-primary">■</span>
      </h2>
      <Card className="p-4">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="pl-9 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="space-y-3">
          {filteredMaterials.map(item => (
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
