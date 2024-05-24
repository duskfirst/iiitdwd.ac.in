import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toDateString(date: number) {
  const dateObj = new Date(date);
  return dateObj.toLocaleString('en-GB', {
    // 'default' causes hydration error if client and server have different regions set
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export function toDateTimeString(date: number) {
  const dateObj = new Date(date);
  return dateObj.toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}
