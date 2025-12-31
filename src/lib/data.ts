import appData from '../../public/data.json';
import type { AppData, Subject, Book } from './types';

export const data: AppData = appData;

export function getSubject(id: string): Subject | undefined {
  return data.subjects.find(subject => subject.id === id);
}

export function getBookById(bookId: string): Book | undefined {
  for (const subject of data.subjects) {
    for (const materialType in subject.materials) {
      const material = subject.materials[materialType].find(m => m.id === bookId);
      if (material && 'coverImageId' in material) {
        return material as Book;
      }
    }
  }
  return undefined;
}
