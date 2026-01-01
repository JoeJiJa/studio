
'use client';

import React, { useState, useMemo } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { Material } from '@/lib/types';
import { MaterialListItem } from './MaterialListItem';
import { Input } from '../ui/input';
import { Search } from 'lucide-react';

interface MaterialSheetProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  title: string;
  materials: Material[];
  onItemClick: (item: Material) => void;
}

export function MaterialSheet({
  isOpen,
  onOpenChange,
  title,
  materials,
  onItemClick,
}: MaterialSheetProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMaterials = useMemo(() => {
    if (!searchTerm) {
      return materials;
    }
    return materials.filter(item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [materials, searchTerm]);


  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:w-[540px] flex flex-col">
        <SheetHeader>
          <SheetTitle className="font-headline">{title}</SheetTitle>
          <SheetDescription>
            Showing {filteredMaterials.length} of {materials.length} items.
          </SheetDescription>
        </SheetHeader>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search materials..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <ScrollArea className="flex-grow pr-6 -mr-6 mt-4">
          <div className="space-y-3">
            {filteredMaterials.map((item) => (
              <MaterialListItem
                key={item.id}
                item={item}
                onItemClick={onItemClick}
              />
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
