import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { Container } from '@/components/Container';
import { TRUST_BAR } from '@/data/home';

/**
 * Trust bar — Bahrain registration, VAT, licensing.
 *
 * A clean, understated row of credentials that builds immediate
 * institutional trust. Each item is a simple checkmark + label pair.
 */
export function TrustBar() {
  return (
    <div className="border-border-muted bg-surface-raised/30 border-y">
      <Container>
        <div className="grid gap-6 py-10 sm:grid-cols-2 lg:grid-cols-4 lg:py-14">
          {TRUST_BAR.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="flex items-start gap-3"
            >
              <CheckCircle2
                className="text-accent-500 mt-0.5 h-4 w-4 shrink-0"
                aria-hidden="true"
              />
              <div>
                <p className="text-sm font-medium text-neutral-200">{item.label}</p>
                <p className="mt-0.5 text-xs text-neutral-500">{item.sublabel}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </div>
  );
}
