import { NavLink as RouterNavLink } from 'react-router';
import { cn } from '@/utils/cn';

/**
 * Styled navigation link with animated active states.
 *
 * Desktop: animated underline slides in from center on active.
 * Mobile: highlighted background with accent color on active.
 *
 * @param {object} props
 * @param {React.ReactNode} [props.children]
 * @param {string} [props.className]
 * @param {boolean} [props.mobile] — Uses larger tap target for mobile drawer.
 */
export function NavLink({ className, mobile = false, children, ...props }) {
  return (
    <RouterNavLink
      className={({ isActive }) =>
        cn(
          'relative font-sans font-medium transition-colors duration-200',
          mobile
            ? cn(
                'flex min-h-[48px] min-w-[48px] items-center justify-center rounded-xl px-6 py-3 text-lg',
                isActive
                  ? 'bg-accent-500/10 text-accent-400'
                  : 'text-neutral-400 hover:text-neutral-100',
              )
            : cn(
                'inline-flex items-center px-3 py-2 text-sm',
                isActive ? 'text-accent-400' : 'text-neutral-400 hover:text-neutral-100',
                // Animated underline via ::after pseudo-element handled below
                'after:absolute after:bottom-0 after:left-1/2 after:h-[2px] after:rounded-full',
                'after:bg-accent-400 after:transition-all after:duration-300 after:ease-out',
                isActive
                  ? 'after:w-full after:left-0'
                  : 'after:w-0 hover:after:w-full hover:after:left-0',
              ),
          className,
        )
      }
      {...props}
    >
      {children}
    </RouterNavLink>
  );
}
