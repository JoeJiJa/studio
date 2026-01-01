
"use client";

import React, { useState, useMemo } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Subject } from '@/lib/types';
import { SubjectCard } from './SubjectCard';

interface TheoryClientPageProps {
  subjects: Subject[];
}

const years = ['All', '1', '2', '3', '4'];

const subjectOrder: { [key: number]: string[] } = {
  1: ['anatomy', 'physiology', 'biochemistry'],
};

export function TheoryClientPage({ subjects }: TheoryClientPageProps) {
  const [selectedYear, setSelectedYear] = useState('All');

  const filteredSubjects = useMemo(() => {
    let yearSubjects: Subject[];
    if (selectedYear === 'All') {
      yearSubjects = subjects;
    } else {
      const yearNum = parseInt(selectedYear, 10);
      yearSubjects = subjects.filter(subject => subject.year.includes(yearNum));

      const order = subjectOrder[yearNum];
      if (order) {
        yearSubjects.sort((a, b) => {
          const indexA = order.indexOf(a.id);
          const indexB = order.indexOf(b.id);
          if (indexA !== -1 && indexB !== -1) {
            return indexA - indexB;
          }
          if (indexA !== -1) return -1;
          if (indexB !== -1) return 1;
          return 0;
        });
      }
    }
    return yearSubjects;
  }, [selectedYear, subjects]);

  return (
    <div>
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-headline font-bold">Core subjects</h1>
          <p className="text-muted-foreground mt-1">Explore learning materials for all your subjects.</p>
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="year-filter" className="text-sm font-medium">Filter by year:</label>
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger id="year-filter" className="w-[180px]">
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              {years.map(year => (
                <SelectItem key={year} value={year}>
                  {year === 'All' ? 'All Years' : `Year ${year}`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </header>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
        {filteredSubjects.map(subject => (
          <SubjectCard key={subject.id} subject={subject} />
        ))}
      </div>
    </div>
  );
}
