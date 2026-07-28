import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Conditionally merge Tailwind CSS classes without style conflicts.
 *
 * Uses `clsx` for conditional logic and `tailwind-merge` to resolve
 * conflicting Tailwind utilities (e.g. `px-4 p-6` → `p-6` with `px-4` dropped).
 *
 * @param {...import('clsx').ClassValue} inputs - Class values (strings, objects, arrays).
 * @returns {string} Merged class string.
 *
 * @example
 * cn('px-4 py-2', isActive && 'bg-accent-500', className);
 * cn({ 'text-accent-500': isActive, 'text-neutral-400': !isActive });
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
