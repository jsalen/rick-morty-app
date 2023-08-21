import { useState } from 'react';
import { v4 as uuid } from 'uuid';

export function useLocalStorage<T>(
  key: string,
  initialValue?: T[],
): {
  storedValue: T[];
  removeItem: (id: number) => void;
  addItem: (newItem: Record<string, string>) => void;
} {
  const [storedValue, setStoredValue] = useState<T[]>(() => {
    const item = window.localStorage.getItem(key);
    if (item === null) {
      window.localStorage.setItem(key, JSON.stringify(initialValue));
      return initialValue;
    }

    return JSON.parse(item);
  });

  const addItem = (value: Record<string, string>) => {
    const item = window.localStorage.getItem(key);
    const newItem = {
      ...value,
      id: uuid(),
      location: {
        name: value.location,
      },
      origin: {
        name: value.origin,
      },
    };

    const updatedItems: T[] =
      item !== null ? [newItem, ...JSON.parse(item)] : [newItem];

    setStoredValue(updatedItems);
    window.localStorage.setItem(key, JSON.stringify(updatedItems));
  };

  const removeItem = (id: number) => {
    const item = window.localStorage.getItem(key);

    const updatedItems =
      item !== null
        ? JSON.parse(item).filter((item: { id: number }) => item.id !== id)
        : [];

    setStoredValue(updatedItems);
    window.localStorage.setItem(key, JSON.stringify(updatedItems));
  };

  return {
    storedValue,
    addItem,
    removeItem,
  };
}
