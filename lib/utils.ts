import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Merges conditional class values and resolves Tailwind CSS conflicts.
 *
 * @param inputs - Class values accepted by `clsx`.
 * @returns A merged class name string.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
