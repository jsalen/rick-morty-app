import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const breakpoints = {
  mobile: '(min-width: 320px)',
  tablet: '(min-width: 768px)',
  desktop: '(min-width: 1024px)',
  desktopLg: '(min-width: 1440px)',
};

export const getData = async <T>(url: string) => {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error('An error occurred while fetching the data.');
  }

  const data = await res.json();

  return data as T;
};
