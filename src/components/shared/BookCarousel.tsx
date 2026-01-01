
"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { getPlaceholderImage } from '@/lib/placeholder-images';
import type { Book, Subject, Material } from '@/lib/types';
import { Skeleton } from '../ui/skeleton';

type Item = Book | Subject | Material | (Omit<Book, 'author'> & { author?: string });

type BookCarouselProps = {
  items: Item[];
  getItemProps: (item: Item) => {
    id: string;
    title: string;
    subtitle?: string;
    href: string;
    coverImageId?: string;
  };
  onItemClick?: (item: Item) => void;
  isLoaded?: boolean;
  loadingSkeletons?: number;
};

export function BookCarousel({ 
  items, 
  getItemProps, 
  onItemClick, 
  isLoaded = true, 
  loadingSkeletons = 5
}: BookCarouselProps) {
  
  if (!isLoaded) {
    return (
      <div className="flex space-x-4 pb-1">
        {[...Array(loadingSkeletons)].map((_, i) => (
          <div key={i} className="min-w-0 shrink-0 grow-0 basis-1/5 md:basis-1/7 lg:basis-1/9">
            <div className="p-1">
              <Skeleton className="aspect-[2/3] w-full rounded-md" />
              <Skeleton className="h-4 mt-2 w-3/4" />
              <Skeleton className="h-3 mt-1 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <Carousel
      opts={{
        align: 'start',
        dragFree: true,
      }}
      className="w-full"
    >
      <CarouselContent className="-ml-1">
        {items.map((item) => {
          const { id, title, subtitle, href, coverImageId } = getItemProps(item);
          const placeholder = coverImageId ? getPlaceholderImage(coverImageId) : getPlaceholderImage('study-material-placeholder');

          const handleItemClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
            if (onItemClick) {
              e.preventDefault();
              onItemClick(item);
            }
          };
          
          const isExternal = href.startsWith('http');

          return (
            <CarouselItem key={id} className="basis-1/3 sm:basis-1/5 md:basis-1/7 lg:basis-1/9 xl:basis-1/11 pl-1">
              <div className="p-0.5">
                <Link 
                  href={href} 
                  onClick={handleItemClick}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  className="group"
                >
                  <Card className="overflow-hidden transition-shadow duration-200 group-hover:shadow-lg group-hover:-translate-y-0.5">
                    <CardContent className="p-0">
                      <div className="aspect-[2/3] w-full relative bg-secondary">
                        {placeholder ? (
                          <Image
                            src={placeholder.imageUrl}
                            alt={placeholder.description}
                            fill
                            sizes="(max-width: 640px) 20vw, (max-width: 768px) 12.5vw, (max-width: 1024px) 10vw, (max-width: 1280px) 8.33vw, 7.14vw"
                            className="object-cover"
                            data-ai-hint={placeholder.imageHint}
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full p-4">
                            <span className="text-center text-sm text-muted-foreground">{title}</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                  <p className="text-xs font-medium mt-1 truncate group-hover:text-primary" title={title}>
                    {title}
                  </p>
                  {subtitle && (
                     <p className="text-xs text-muted-foreground truncate" title={subtitle}>{subtitle}</p>
                  )}
                </Link>
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious className="hidden sm:flex" />
      <CarouselNext className="hidden sm:flex" />
    </Carousel>
  );
}
