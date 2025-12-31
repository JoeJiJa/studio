import Link from 'next/link';
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Subject } from '@/lib/types';
import { SubjectIcon } from './SubjectIcon';

interface SubjectCardProps {
  subject: Subject;
}

export function SubjectCard({ subject }: SubjectCardProps) {
  return (
    <Link href={`/theory/${subject.id}`} className="h-full group">
      <Card className="h-full flex flex-col justify-between text-center bg-card hover:border-primary transition-colors hover:shadow-lg">
        <CardHeader className="flex-grow flex flex-col justify-center items-center p-4">
          <div className="w-24 h-24 mb-4 rounded-full bg-secondary flex items-center justify-center group-hover:bg-accent/20 transition-colors">
            <SubjectIcon subjectId={subject.id} className="w-12 h-12 text-foreground" />
          </div>
          <h3 className="font-headline text-lg">{subject.name}</h3>
        </CardHeader>
        <CardContent className="p-4 pt-0">
           <div className="flex flex-wrap gap-1 justify-center">
            {subject.year.map(y => (
              <Badge key={y} variant="secondary">Year {y}</Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
