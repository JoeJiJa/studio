"use client";

import { useState, useEffect, useCallback } from 'react';
import type { Book } from '@/lib/types';
import { getBookById } from '@/lib/data';

const RECENTLY_VIEWED_KEY = 'recentlyViewed';
const MAX_RECENTLY_VIEWED = 10;
const STORAGE_EVENT = 'astroMed_storage';

export function useRecentlyViewed() {
  const [items, setItems] = useState<Book[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const loadItems = useCallback(() => {
    try {
      const itemIds: string[] = JSON.parse(localStorage.getItem(RECENTLY_VIEWED_KEY) || '[]');
      const validBooks = itemIds.map(id => getBookById(id)).filter((b): b is Book => b !== undefined);
      setItems(validBooks);
    } catch (error) {
      console.error("Failed to parse recently viewed items:", error);
      setItems([]);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    loadItems();
    
    const handleStorageChange = () => {
      loadItems();
    };

    window.addEventListener(STORAGE_EVENT, handleStorageChange);
    
    return () => {
      window.removeEventListener(STORAGE_EVENT, handleStorageChange);
    };
  }, [loadItems]);
  
  const addItem = useCallback((book: Book) => {
    const currentItems: string[] = JSON.parse(localStorage.getItem(RECENTLY_VIEWED_KEY) || '[]');
    const newItems = [book.id, ...currentItems.filter(id => id !== book.id)].slice(0, MAX_RECENTLY_VIEWED);
    localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(newItems));
    window.dispatchEvent(new Event(STORAGE_EVENT));
  }, []);

  return { items, addItem, isLoaded };
}
