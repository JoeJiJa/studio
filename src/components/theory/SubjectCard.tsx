import Link from 'next/link';
import React from 'react';
import { Card } from '@/components/ui/card';
import type { Subject } from '@/lib/types';
import { SubjectIcon } from './SubjectIcon';
import Image from 'next/image';
import { getPlaceholderImage } from '@/lib/placeholder-images';

interface SubjectCardProps {
  subject: Subject;
}

export function SubjectCard({ subject }: SubjectCardProps) {
  const firstTextbook = subject.materials?.textbooks?.[0] as any;
  const firstAtlas = subject.materials?.atlases?.[0] as any;
  const coverImageId = firstTextbook?.coverImageId || firstAtlas?.coverImageId;
  const placeholder = coverImageId ? getPlaceholderImage(coverImageId) : null;

  return (
    <Link href={`/theory/${subject.id}`} className="group block">
      <div className="aspect-[2/3] w-full relative rounded-md overflow-hidden bg-secondary transition-transform duration-300 ease-in-out group-hover:scale-105">
        {placeholder ? (
            <Image
              src={placeholder.imageUrl}
              alt={subject.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
              className="object-cover"
              data-ai-hint={placeholder.imageHint}
            />
        ) : (
            <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                <SubjectIcon subjectId={subject.id} className="w-12 h-12 text-muted-foreground" />
                <h3 className="font-headline text-lg mt-4 text-foreground">{subject.name}</h3>
            </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 flex flex-col justify-end">
            <h3 className="font-headline text-lg text-white font-bold">{subject.name}</h3>
        </div>
      </div>
    </Link>
  );
}
