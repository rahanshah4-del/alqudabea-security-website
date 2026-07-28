import { cn } from '@/utils/cn';

/**
 * Max-width content container.
 *
 * Centers content horizontally and constrains it to a readable measure.
 * Supports three sizes: default (1280px), small (960px), and wide (1440px).
 *
 * @param {object} props
 * @param {'default' | 'small' | 'wide'} [props.size='default']
 * @param {React.ReactNode} [props.children]
 * @param {string} [props.className]
 */
export function Container({ size = 'default', className, children, ...props }) {
  const widths = {
    small: 'max-w-4xl',
    default: 'max-w-7xl',
    wide: 'max-w-[90rem]',
  };

  return (
    <div className={cn('mx-auto w-full px-4 sm:px-6 lg:px-8', widths[size], className)} {...props}>
      {children}
    </div>
  );
}
