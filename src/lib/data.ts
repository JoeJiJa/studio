import appData from '../../public/data.json';
import type { AppData, Subject, Book } from './types';

export const data: AppData = appData as AppData;

export function getSubject(id: string): Subject | undefined {
  return data.subjects.find(subject => subject.id === id);
}

export function getBookById(bookId: string): Book | undefined {
  for (const subject of data.subjects) {
    for (const materialType in subject.materials) {
      const materials = subject.materials[materialType as keyof typeof subject.materials];
      if (Array.isArray(materials)) {
        const material = materials.find(m => m.id === bookId);
        if (material && 'coverImageId' in material) {
          return material as Book;
        }
      }
    }
  }
  return undefined;
}
