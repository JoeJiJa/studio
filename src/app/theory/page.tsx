import React from 'react';
import { data } from '@/lib/data';
import { TheoryClientPage } from '@/components/theory/TheoryClientPage';

export const metadata = {
  title: 'Theory | AstroMed',
  description: 'Explore all medical subjects and their learning materials.',
};

export default function TheoryPage() {
  const subjects = data.subjects;

  return <TheoryClientPage subjects={subjects} />;
}
