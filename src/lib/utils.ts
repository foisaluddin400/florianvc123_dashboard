import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const responsiveFont = (
  baseFontSize: number,
  baseWidth: number = 1440
): number => {
  const screenWidth = window.innerWidth;
  return (screenWidth / baseWidth) * baseFontSize;
};