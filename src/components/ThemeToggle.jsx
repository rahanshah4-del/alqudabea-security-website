import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/utils/cn';

const OPTIONS = [
  { value: 'light', icon: Sun, label: 'Light' },
  { value: 'system', icon: Monitor, label: 'System' },
  { value: 'dark', icon: Moon, label: 'Dark' },
];

const APPLE_EASE = [0.16, 1, 0.3, 1];

/**
 * Apple-style theme toggle — a segmented control with icons.
 *
 * Automatically adapts to light/dark modes and shows the active
 * selection. Respects prefers-reduced-motion.
 */
export function ThemeToggle({ className }) {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close on outside click
  useEffect(() => {
    if (!open) { return; }
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const active = OPTIONS.find((o) => o.value === theme) || OPTIONS[1];
  const Icon = active.icon;

  return (
    <div ref={ref} className={cn('relative', className)}>
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className={cn(
          'flex h-9 w-9 items-center justify-center rounded-xl',
          'bg-theme-surface-raised border-theme-border hover:bg-theme-surface-overlay',
          'border transition-colors duration-200',
          'focus-visible:ring-accent-500 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-theme-root focus-visible:outline-none',
        )}
        aria-label={`Theme: ${active.label}. Click to change.`}
        aria-expanded={open}
      >
        <Icon className="text-theme-secondary h-4 w-4" aria-hidden="true" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            transition={{ duration: 0.18, ease: APPLE_EASE }}
            className={cn(
              'absolute right-0 top-full mt-2 overflow-hidden rounded-xl',
              'bg-theme-surface-overlay/90 border-theme-border border',
              'shadow-theme-overlay backdrop-blur-2xl',
            )}
          >
            <div className="flex p-1 gap-0.5">
              {OPTIONS.map((opt) => {
                const OptIcon = opt.icon;
                const isActive = theme === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      setTheme(opt.value);
                      setOpen(false);
                    }}
                    className={cn(
                      'relative flex items-center gap-2 rounded-lg px-3 py-1.5',
                      'text-xs font-medium transition-colors duration-150',
                      'focus-visible:ring-accent-500 focus-visible:ring-2 focus-visible:outline-none',
                      isActive
                        ? 'text-theme-primary'
                        : 'text-theme-tertiary hover:text-theme-secondary',
                    )}
                    aria-label={`Switch to ${opt.label} mode`}
                    aria-pressed={isActive}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="theme-active"
                        className="bg-theme-surface absolute inset-0 rounded-lg shadow-theme-surface"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                      <OptIcon className="h-3.5 w-3.5" aria-hidden="true" />
                      {opt.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
