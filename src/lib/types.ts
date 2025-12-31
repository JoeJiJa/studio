export interface Book {
  id: string;
  title: string;
  author: string;
  coverImageId: string;
  downloadUrl?: string;
}

export interface StudyMaterial {
  id: string;
  title: string;
  description: string;
  downloadUrl?: string;
}

export type Material = Book | StudyMaterial;

export function isBook(material: Material): material is Book {
  return (material as Book).coverImageId !== undefined;
}

export interface Subject {
  id: string;
  name: string;
  year: number[];
  description: string;
  materials: {
    [key: string]: Material[];
  };
}

export interface Quote {
  text: string;
  author: string;
}

export interface AppData {
  inspirationalQuotes: Quote[];
  paretoBanner: {
    title: string;
    description: string;
  };
  questionOfTheDay: {
    question: string;
    options: string[];
    answerIndex: number;
  };
  subjects: Subject[];
  suggestedModules: string[];
}
