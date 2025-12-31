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

export function TheoryClientPage({ subjects }: TheoryClientPageProps) {
  const [selectedYear, setSelectedYear] = useState('All');

  const filteredSubjects = useMemo(() => {
    if (selectedYear === 'All') {
      return subjects;
    }
    const yearNum = parseInt(selectedYear, 10);
    return subjects.filter(subject => subject.year.includes(yearNum));
  }, [selectedYear, subjects]);

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-headline font-bold">Theory</h1>
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSubjects.map(subject => (
          <SubjectCard key={subject.id} subject={subject} />
        ))}
      </div>
    </div>
  );
}
