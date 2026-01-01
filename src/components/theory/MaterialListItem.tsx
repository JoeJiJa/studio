
import React from 'react';
import Image from 'next/image';
import { Material, isBook } from '@/lib/types';
import { getPlaceholderImage } from '@/lib/placeholder-images';
import { Card } from '../ui/card';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface MaterialListItemProps {
  item: Material;
  onItemClick?: (item: Material) => void;
}

export function MaterialListItem({ item, onItemClick }: MaterialListItemProps) {
  const handleClick = (e: React.MouseEvent) => {
    if (onItemClick) {
      e.preventDefault();
      onItemClick(item);
    }
  };

  const placeholder = isBook(item) ? getPlaceholderImage(item.coverImageId) : getPlaceholderImage('study-material-placeholder');

  const content = (
    <>
      <div className="flex items-center min-w-0 flex-1">
        <div className="w-16 h-20 relative mr-4 flex-shrink-0">
          {placeholder ? (
            <Image 
              src={placeholder.imageUrl}
              alt={item.title}
              fill
              sizes="64px"
              className="object-cover rounded-md"
              data-ai-hint={placeholder.imageHint}
            />
          ) : (
            <div className="w-full h-full bg-secondary rounded-md" />
          )}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold leading-tight">{item.title}</h3>
          {isBook(item) && <p className="text-sm text-muted-foreground">{item.author}</p>}
          {!isBook(item) && item.description && <p className="text-sm text-muted-foreground">{item.description}</p>}
        </div>
      </div>
      <ChevronRight className="h-5 w-5 text-muted-foreground ml-2 flex-shrink-0" />
    </>
  );
  
  const href = item.downloadUrl || '#';
  const isExternal = href.startsWith('http');

  if (href !== '#') {
    return (
      <Link href={href} onClick={handleClick} target={isExternal ? "_blank" : undefined} rel={isExternal ? "noopener noreferrer" : undefined}>
        <Card className="p-3 flex items-center justify-between transition-shadow hover:shadow-md cursor-pointer">
          {content}
        </Card>
      </Link>
    )
  }

  return (
    <Card 
      onClick={handleClick}
      className="p-3 flex items-center justify-between transition-shadow hover:shadow-md cursor-pointer"
    >
      {content}
    </Card>
  );
}
