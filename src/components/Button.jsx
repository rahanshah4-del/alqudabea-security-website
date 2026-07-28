import { forwardRef } from 'react';
import { cn } from '@/utils/cn';

/**
 * Reusable button component with style variants and size options.
 *
 * Variants follow the design system: primary (accent), secondary (surface),
 * ghost (transparent), danger (destructive).
 */
const variants = {
  primary:
    'bg-accent-500 text-white hover:bg-accent-400 active:bg-accent-600 focus-visible:ring-accent-500 shadow-glow-accent',
  secondary:
    'bg-theme-raised text-theme-primary border border-theme hover:bg-theme-overlay active:bg-theme-muted focus-visible:ring-accent-500 shadow-theme-surface',
  ghost:
    'text-theme-secondary hover:bg-theme-raised hover:text-theme-primary active:bg-theme-overlay focus-visible:ring-accent-500',
  glass:
    'glass text-theme-primary hover:shadow-theme-raised active:bg-theme-overlay focus-visible:ring-accent-500',
  danger: 'bg-danger-500 text-white hover:bg-danger-400 active:bg-danger-600 focus-visible:ring-danger-500',
};

const sizes = {
  sm: 'h-8 px-3 text-xs gap-1.5',
  md: 'h-10 px-5 text-sm gap-2',
  lg: 'h-12 px-7 text-base gap-2.5',
};

/**
 * @param {object} props
 * @param {'primary' | 'secondary' | 'ghost' | 'danger'} [props.variant='primary']
 * @param {'sm' | 'md' | 'lg'} [props.size='md']
 * @param {boolean} [props.loading=false]
 * @param {React.ElementType} [props.as='button'] - Render as a different element (e.g. 'a', Link).
 * @param {React.ReactNode} [props.children]
 * @param {string} [props.className]
 */
export const Button = forwardRef(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      as: Component = 'button',
      className,
      children,
      disabled,
      ...props
    },
    ref,
  ) => (
    <Component
      ref={ref}
      disabled={disabled || loading}
      className={cn(
        'inline-flex items-center justify-center rounded-lg font-sans font-medium select-none',
        'transition-all duration-200 ease-out',
        'active:scale-[0.97]',
        'focus-visible:ring-offset-surface-root focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
        'disabled:pointer-events-none disabled:opacity-40',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {loading && (
        <svg
          className="h-4 w-4 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      )}
      {children}
    </Component>
  ),
);

Button.displayName = 'Button';
