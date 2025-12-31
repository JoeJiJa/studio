import { getSubject } from '@/lib/data';
import { notFound } from 'next/navigation';
import { SubjectDetailClientPage } from '@/components/theory/SubjectDetailClientPage';

export default function AnatomyPage() {
  const subject = getSubject('anatomy');

  if (!subject) {
    notFound();
  }

  return <SubjectDetailClientPage subject={subject} />;
}
