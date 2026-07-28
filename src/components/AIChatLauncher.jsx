import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import { cn } from '@/utils/cn';
import { APPLE_EASE } from '@/hooks/useScrollReveal';

/**
 * Floating AI Chat Launcher — placeholder for future Nexora AI chatbot.
 *
 * Renders a floating action button that, when clicked, opens a conversation
 * panel. Currently displays a "coming soon" placeholder.
 *
 * When Nexora AI integration is ready:
 * 1. Replace the placeholder content with the chat interface
 * 2. Connect to the AI provider via src/ai/provider.js
 * 3. Add streaming message support
 */

export function AIChatLauncher() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating button */}
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className={cn(
          'fixed right-6 bottom-20 z-30 hidden h-14 w-14 items-center justify-center md:flex lg:bottom-6',
          'rounded-2xl bg-accent-500 text-white shadow-glow-accent',
          'transition-all duration-300 hover:scale-105 active:scale-95',
          'focus-visible:ring-accent-500 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-theme-root focus-visible:outline-none',
        )}
        aria-label={open ? 'Close AI assistant' : 'Open AI assistant'}
        aria-expanded={open}
      >
        {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
      </button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.25, ease: APPLE_EASE }}
            className="glass fixed right-6 z-30 w-[380px] max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl shadow-overlay lg:bottom-24" style={{ bottom: '5.5rem' }}
          >
            {/* Header */}
            <div className="border-theme-muted bg-surface-raised/80 flex items-center gap-3 border-b px-5 py-4">
              <div className="bg-accent-500 flex h-8 w-8 items-center justify-center rounded-lg">
                <MessageCircle className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="font-sans text-sm font-semibold text-neutral-100">Nexora AI Assistant</p>
                <p className="font-mono text-[10px] text-neutral-500">Coming Soon</p>
              </div>
            </div>

            {/* Body — placeholder */}
            <div className="flex flex-col items-center gap-3 px-6 py-12 text-center">
              <div className="bg-accent-500/10 border-accent-500/20 flex h-14 w-14 items-center justify-center rounded-2xl border">
                <MessageCircle className="text-accent-400 h-7 w-7" />
              </div>
              <p className="font-sans text-sm font-semibold text-neutral-200">AI Assistant — Coming Soon</p>
              <p className="text-xs leading-relaxed text-neutral-500 max-w-[280px]">
                Our AI-powered security assistant is being prepared to help you explore services,
                answer questions, and connect with our team — 24/7.
              </p>
              <p className="font-mono text-[10px] text-neutral-700 mt-2 tracking-wide">
                Powered by Nexora AI
              </p>
            </div>

            {/* Footer */}
            <div className="border-theme-muted bg-surface-raised/40 border-t px-5 py-3">
              <p className="text-center font-mono text-[10px] text-neutral-600">
                ALQUDABEA SECURITY SERVICES W.L.L.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
