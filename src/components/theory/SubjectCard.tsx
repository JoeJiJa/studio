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

  return (
    <Link href={`/theory/${subject.id}`} className="group block">
      <Card className="aspect-[2/3] w-full relative rounded-md overflow-hidden bg-card transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-lg flex flex-col items-center justify-center p-4 text-center">
        <SubjectIcon subjectId={subject.id} className="w-12 h-12 text-primary mb-4" />
        <h3 className="font-headline text-base font-semibold text-foreground group-hover:text-primary">{subject.name}</h3>
      </Card>
    </Link>
  );
}
