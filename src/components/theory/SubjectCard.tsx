import Link from 'next/link';
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Subject } from '@/lib/types';

interface SubjectCardProps {
  subject: Subject;
}

export function SubjectCard({ subject }: SubjectCardProps) {
  return (
    <Link href={`/theory/${subject.id}`} className="h-full">
      <Card className="h-full flex flex-col hover:border-primary transition-colors hover:shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline">{subject.name}</CardTitle>
          <CardDescription>{subject.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
           <div className="flex flex-wrap gap-2">
            {subject.year.map(y => (
              <Badge key={y} variant="secondary">Year {y}</Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex items-center text-sm font-medium text-primary">
            View Materials
            <ArrowRight className="h-4 w-4 ml-2" />
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
