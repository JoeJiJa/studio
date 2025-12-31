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
  loadingSkeletons = 4 
}: BookCarouselProps) {
  
  if (!isLoaded) {
    return (
      <div className="flex space-x-4 pb-1">
        {[...Array(loadingSkeletons)].map((_, i) => (
          <div key={i} className="min-w-0 shrink-0 grow-0 basis-1/2 md:basis-1/4 lg:basis-1/5">
            <div className="p-1">
              <Skeleton className="aspect-[3/4] w-full rounded-md" />
              <Skeleton className="h-4 mt-2 w-3/4" />
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
          const { id, title, href, coverImageId } = getItemProps(item);
          const placeholder = coverImageId ? getPlaceholderImage(coverImageId) : getPlaceholderImage('study-material-placeholder');

          const handleItemClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
            if (onItemClick) {
              // If there's a custom click handler, prevent default link navigation
              // if the handler wants to take over (e.g., for external links).
              e.preventDefault();
              onItemClick(item);
            }
          };
          
          // If there's no onItemClick handler, the link will work as a normal Next.js Link
          // which is useful for internal navigation.
          const isExternal = href.startsWith('http');

          return (
            <CarouselItem key={id} className="basis-1/2 md:basis-1/4 lg:basis-1/5 pl-3">
              <div className="p-1">
                <Link 
                  href={href} 
                  onClick={handleItemClick}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                >
                  <Card className="overflow-hidden transition-shadow hover:shadow-md">
                    <CardContent className="p-0">
                      <div className="aspect-[3/4] w-full relative bg-secondary">
                        {placeholder ? (
                          <Image
                            src={placeholder.imageUrl}
                            alt={placeholder.description}
                            fill
                            sizes="(max-width: 768px) 50vw, 25vw"
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
                  <p className="text-sm font-medium mt-2 truncate" title={title}>
                    {title}
                  </p>
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
