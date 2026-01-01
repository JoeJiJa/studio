
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
  const handleClick = () => {
    if (onItemClick) {
      onItemClick(item);
    }
  };

  const placeholder = isBook(item) ? getPlaceholderImage(item.coverImageId) : getPlaceholderImage('study-material-placeholder');
  
  const href = item.downloadUrl || '#';
  const isExternal = href.startsWith('http');

  const content = (
    <Link 
      href={href} 
      onClick={handleClick} 
      target={isExternal ? "_blank" : undefined} 
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="w-full"
    >
      <Card className="p-3 flex items-center justify-between transition-shadow hover:shadow-md cursor-pointer">
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
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold leading-tight truncate">{item.title}</h3>
            {isBook(item) && <p className="text-sm text-muted-foreground truncate">{item.author}</p>}
            {!isBook(item) && item.description && <p className="text-sm text-muted-foreground truncate">{item.description}</p>}
          </div>
        </div>
        <ChevronRight className="h-5 w-5 text-muted-foreground ml-2 flex-shrink-0" />
      </Card>
    </Link>
  );

  return content;
}
