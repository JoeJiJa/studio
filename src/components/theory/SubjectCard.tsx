import Link from 'next/link';
import React from 'react';
import { Card } from '@/components/ui/card';
import type { Subject } from '@/lib/types';
import { SubjectIcon } from './SubjectIcon';

interface SubjectCardProps {
  subject: Subject;
}

export function SubjectCard({ subject }: SubjectCardProps) {
  return (
    <Link href={`/theory/${subject.id}`} className="group block">
      <Card className="aspect-square w-full relative rounded-full overflow-hidden bg-card transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-lg flex flex-col items-center justify-center p-4 text-center">
        <SubjectIcon subjectId={subject.id} className="w-10 h-10 text-primary mb-2" />
        <h3 className="font-headline text-sm font-semibold text-foreground group-hover:text-primary leading-tight">
          {subject.name}
        </h3>
      </Card>
    </Link>
  );
}
