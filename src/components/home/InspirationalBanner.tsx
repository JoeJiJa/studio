import React from 'react';
import Image from 'next/image';
import { data } from '@/lib/data';
import { getPlaceholderImage } from '@/lib/placeholder-images';

export function InspirationalBanner() {
  const { text, author } = data.inspirationalQuote;
  const bannerImage = getPlaceholderImage('inspirational-banner');

  return (
    <div className="relative w-full h-56 md:h-64 rounded-lg overflow-hidden my-6 group">
      {bannerImage && (
        <Image
          src={bannerImage.imageUrl}
          alt={bannerImage.description}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          priority
          data-ai-hint={bannerImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
      <div className="absolute bottom-0 left-0 p-6 text-white">
        <blockquote className="text-lg md:text-xl font-headline italic">
          "{text}"
        </blockquote>
        <cite className="block text-right mt-2 not-italic text-sm">- {author}</cite>
      </div>
    </div>
  );
}
