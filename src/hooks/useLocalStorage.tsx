import { useState } from 'react';

export function useLocalStorage<T>(
  key: string,
  initialValue: T[],
): { storedValue: T[]; removeItem: (id: string) => void } {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window !== 'undefined') {
      const item = window.localStorage.getItem(key);
      if (item === null) {
        window.localStorage.setItem(key, JSON.stringify(initialValue));
        return JSON.stringify(initialValue);
      }

      return item;
    }
    return JSON.stringify(initialValue);
  });

  // remove element from local storage by its ID
  const removeItem = (id: string) => {
    const filteredItems = JSON.parse(storedValue).filter(
      (item: { id: string }) => item.id !== id,
    );

    setStoredValue(JSON.stringify(filteredItems));

    if (typeof window !== 'undefined') {
      window.localStorage.setItem(key, JSON.stringify(filteredItems));
    }
  };

  return {
    storedValue: JSON.parse(storedValue),
    removeItem,
  };
}
