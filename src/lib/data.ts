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

export function getAnatomyMaterials() {
  return {
    "textbooks": [
      { "id": "bd-chaurasia-1", "title": "BD Chaurasia Vol 1", "author": "10th Edition", "coverImageId": "bd-chaurasia-1" },
      { "id": "bd-chaurasia-2", "title": "BD Chaurasia Vol 2", "author": "10th Edition", "coverImageId": "bd-chaurasia-2" },
      { "id": "bd-chaurasia-3", "title": "BD Chaurasia Vol 3", "author": "10th Edition", "coverImageId": "bd-chaurasia-3" },
      { "id": "vishram-singh-anatomy", "title": "Vishram Singh Vol 1", "author": "Anatomy", "coverImageId": "vishram-singh-anatomy" }
    ],
    "general-anatomy": [
      { "id": "sbd-general-anatomy", "title": "SBD General Anatomy", "author": "8th Edition", "coverImageId": "sbd-general-anatomy" },
      { "id": "vishram-general-anatomy", "title": "Vishram General Anatomy", "author": "8th Edition", "coverImageId": "vishram-general-anatomy" }
    ],
    "clinical-books": [
      { "id": "moores-clinically-oriented", "title": "Moore's Clinically Oriented", "author": "Anatomy", "coverImageId": "moores-clinically-oriented" }
    ],
    "study-materials": [
      { "id": "marmo-anatomy", "title": "Marmo Anatomy", "description": "8th Edition" }
    ],
    "others": [
      { "id": "vishrams-embryology", "title": "Vishram's Embryology", "author": "5th Edition", "coverImageId": "vishrams-embryology" },
      { "id": "embryology-notes", "title": "Embryology Notes", "author": "", "coverImageId": "embryology-notes" },
      { "id": "ib-singh-histology", "title": "IB Singh Histology", "author": "7th Edition", "coverImageId": "ib-singh-histology" },
      { "id": "difiore-histology", "title": "diFiore Histology", "author": "6th Edition", "coverImageId": "difiore-histology" }
    ],
    "dissection-manual": [
      { "id": "cunningham-head-neck", "title": "Cunningham's Head & Neck", "author": "12th Edition", "coverImageId": "cunningham-head-neck" },
      { "id": "cunningham-thorax-abdomen", "title": "Cunningham's Thorax & Abdomen", "author": "12th Edition", "coverImageId": "cunningham-thorax-abdomen" },
      { "id": "cunningham-limbs", "title": "Cunningham's Limbs", "author": "12th Edition", "coverImageId": "cunningham-limbs" }
    ]
  };
}
