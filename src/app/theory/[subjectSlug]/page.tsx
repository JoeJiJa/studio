
import React from 'react';
import { notFound } from 'next/navigation';
import { data, getSubject } from '@/lib/data';
import type { Metadata } from 'next';
import { SubjectDetailClientPage } from '@/components/theory/SubjectDetailClientPage';

type Props = {
  params: { subjectSlug: string };
};

export async function generateStaticParams() {
  return data.subjects.map((subject) => ({
    subjectSlug: subject.id,
  }));
}

export async function generateMetadata({ params: { subjectSlug } }: Props): Promise<Metadata> {
  const subject = getSubject(subjectSlug);
  
  if (!subject) {
    return {
      title: 'Subject not found'
    };
  }

  return {
    title: `${subject.name} | Dr Astro`,
    description: `Explore learning materials for ${subject.name}.`,
  };
}

export default function SubjectDetailPage({ params: { subjectSlug } }: Props) {
  const subject = getSubject(subjectSlug);

  if (!subject) {
    notFound();
  }

  return <SubjectDetailClientPage subject={subject} />;
}
