'use client';

import React from 'react';
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
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:w-[540px] flex flex-col">
        <SheetHeader>
          <SheetTitle className="font-headline">{title}</SheetTitle>
          <SheetDescription>
            Showing all {materials.length} items.
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="flex-grow pr-6 -mr-6">
          <div className="space-y-3">
            {materials.map((item) => (
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
