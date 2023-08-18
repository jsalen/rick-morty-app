import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const breakpoints = {
  mobile: '(min-width: 320px)',
  tablet: '(min-width: 768px)',
  desktop: '(min-width: 1024px)',
  desktopLg: '(min-width: 1440px)',
};