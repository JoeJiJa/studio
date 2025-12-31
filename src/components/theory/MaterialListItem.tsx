import React from 'react';
import Image from 'next/image';
import { Book, Material, isBook, StudyMaterial } from '@/lib/types';
import { getPlaceholderImage } from '@/lib/placeholder-images';
import { Card } from '../ui/card';
import { ChevronRight } from 'lucide-react';

interface MaterialListItemProps {
  item: Material;
  onBookClick?: (book: Book) => void;
}

export function MaterialListItem({ item, onBookClick }: MaterialListItemProps) {
  const handleClick = () => {
    if (isBook(item) && onBookClick) {
      onBookClick(item);
    }
  };

  const placeholder = isBook(item) ? getPlaceholderImage(item.coverImageId) : getPlaceholderImage('study-material-placeholder');

  const renderContent = () => {
    if (isBook(item)) {
      return (
        <>
          <div className="w-16 h-20 relative mr-4 flex-shrink-0">
            {placeholder ? (
              <Image 
                src={placeholder.imageUrl}
                alt={item.title}
                fill
                sizes="64px"
                className="object-cover rounded-md"
              />
            ) : (
              <div className="w-full h-full bg-secondary rounded-md" />
            )}
          </div>
          <div>
            <h3 className="font-semibold">{item.title}</h3>
            <p className="text-sm text-muted-foreground">{item.author}</p>
          </div>
        </>
      );
    }
    
    const studyMaterial = item as StudyMaterial;
    return (
        <>
            <div className="w-16 h-20 relative mr-4 flex-shrink-0 bg-secondary rounded-md flex items-center justify-center">
               <span className="text-3xl font-bold text-primary">M</span>
            </div>
            <div>
                <h3 className="font-semibold">{studyMaterial.title}</h3>
                <p className="text-sm text-muted-foreground">{studyMaterial.description}</p>
            </div>
        </>
    )
  };

  return (
    <Card 
      onClick={handleClick}
      className="p-3 flex items-center justify-between transition-colors hover:bg-card/60 cursor-pointer"
    >
      <div className="flex items-center">
        {renderContent()}
      </div>
      <ChevronRight className="h-5 w-5 text-muted-foreground" />
    </Card>
  );
}
