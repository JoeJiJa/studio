
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
import { cn } from '@/lib/utils';

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
  loadingSkeletons = 6
}: BookCarouselProps) {
  
  if (!isLoaded) {
    return (
      <div className="flex space-x-4 pb-1">
        {[...Array(loadingSkeletons)].map((_, i) => (
          <div key={i} className="min-w-0 shrink-0 grow-0 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6">
            <Skeleton className="aspect-[2/3] w-full rounded-md" />
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
        slidesToScroll: 'auto',
      }}
      className="w-full"
    >
      <CarouselContent className="-ml-2 md:-ml-4">
        {items.map((item, index) => {
          const { id, title, href, coverImageId } = getItemProps(item);
          const placeholder = coverImageId ? getPlaceholderImage(coverImageId) : getPlaceholderImage('study-material-placeholder');

          const handleItemClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
            if (onItemClick) {
              onItemClick(item);
            }
          };
          
          const isExternal = href.startsWith('http');

          return (
            <CarouselItem key={`${id}-${index}`} className="basis-1/3 sm:basis-1/4 md:basis-1/5 lg:basis-1/6 xl:basis-1/7 pl-2 md:pl-4">
                <Link 
                  href={href} 
                  onClick={handleItemClick}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  className="group block"
                >
                  <div className="aspect-[2/3] w-full relative rounded-md overflow-hidden bg-secondary transition-transform duration-300 ease-in-out group-hover:scale-105">
                    {placeholder ? (
                      <Image
                        src={placeholder.imageUrl}
                        alt={title}
                        fill
                        sizes="(max-width: 640px) 33vw, (max-width: 768px) 25vw, (max-width: 1024px) 20vw, 16vw"
                        className="object-cover"
                        data-ai-hint={placeholder.imageHint}
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full p-2">
                        <span className="text-center text-xs text-muted-foreground">{title}</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                   <p className="text-sm font-medium mt-2 truncate text-foreground group-hover:text-primary" title={title}>
                    {title}
                  </p>
                </Link>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious className="absolute left-[-1rem] top-1/2 -translate-y-1/2 hidden md:flex" />
      <CarouselNext className="absolute right-[-1rem] top-1/2 -translate-y-1/2 hidden md:flex" />
    </Carousel>
  );
}
