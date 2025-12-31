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
import type { Book, Subject } from '@/lib/types';
import { Skeleton } from '../ui/skeleton';

type BookCarouselProps = {
  items: (Book | Subject)[];
  getItemProps: (item: Book | Subject) => {
    id: string;
    title: string;
    href: string;
    coverImageId?: string;
  };
  onItemClick?: (item: Book) => void;
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
      <CarouselContent>
        {items.map((item) => {
          const { id, title, href, coverImageId } = getItemProps(item);
          const placeholder = coverImageId ? getPlaceholderImage(coverImageId) : null;

          const handleItemClick = () => {
            if (onItemClick && 'coverImageId' in item) {
              onItemClick(item as Book);
            }
          };

          return (
            <CarouselItem key={id} className="basis-1/2 md:basis-1/4 lg:basis-1/5">
              <div className="p-1">
                <Link href={href} onClick={handleItemClick}>
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
