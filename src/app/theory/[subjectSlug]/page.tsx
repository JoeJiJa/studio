
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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const subject = getSubject(params.subjectSlug);
  
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

export default async function SubjectDetailPage({ params }: Props) {
  const awaitedParams = await params;
  const subject = getSubject(awaitedParams.subjectSlug);

  if (!subject) {
    notFound();
  }

  return <SubjectDetailClientPage subject={subject} />;
}
