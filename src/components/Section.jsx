import { cn } from '@/utils/cn';
import { Container } from '@/components/Container';

/**
 * Vertical page section with consistent spacing.
 *
 * Wraps content in a Container and applies top/bottom padding.
 *
 * @param {object} props
 * @param {'default' | 'small' | 'large'} [props.spacing='default']
 * @param {boolean} [props.contained=true] - Wrap children in a Container.
 * @param {React.ReactNode} [props.children]
 * @param {string} [props.className]
 */
export function Section({ spacing = 'default', contained = true, className, children, ...props }) {
  const spacings = {
    small: 'py-12 lg:py-16',
    default: 'py-20 lg:py-28',
    large: 'py-28 lg:py-40',
  };

  const content = contained ? <Container>{children}</Container> : children;

  return (
    <section className={cn(spacings[spacing], className)} {...props}>
      {content}
    </section>
  );
}
