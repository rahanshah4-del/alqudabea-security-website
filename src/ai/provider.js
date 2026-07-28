/**
 * Nexora AI Provider Abstraction — ALQUDABEA Security Services W.L.L.
 *
 * Architecture-only file. No live Nexora AI calls are made.
 * This prepares the foundation for future Nexora AI chatbot integration.
 *
 * The abstraction layer allows swapping providers (OpenAI, Anthropic, custom)
 * without changing any consuming code. All chat functionality is stream-ready.
 *
 * STATUS: Placeholder — do NOT connect to any Nexora AI API yet.
 */

// ── Provider Interface ────────────────────────────────────

/**
 * @typedef {object} ChatMessage
 * @property {'user' | 'assistant' | 'system'} role
 * @property {string} content
 */

/**
 * @typedef {object} StreamChunk
 * @property {string} content — incremental text
 * @property {boolean} done — true when stream is complete
 */

// ── Provider Registry ─────────────────────────────────────

const providers = {};

/**
 * Register an AI provider.
 *
 * @param {string} name — provider name (e.g. 'openai', 'anthropic')
 * @param {object} implementation
 * @param {Function} implementation.chat — (messages: ChatMessage[], options?: object) => Promise<string>
 * @param {Function} [implementation.chatStream] — AsyncGenerator<StreamChunk>
 */
export function registerProvider(name, implementation) {
  providers[name] = implementation;
}

/**
 * Get a registered provider.
 *
 * @param {string} [name] — provider name. Uses default if omitted.
 * @returns {object | null}
 */
export function getProvider(name) {
  const key = name || import.meta.env.VITE_AI_PROVIDER || null;
  if (!key) { return null; }
  return providers[key] || null;
}

// ── Chat Interface ────────────────────────────────────────

/**
 * Send messages to the AI provider and receive a complete response.
 *
 * @param {ChatMessage[]} messages
 * @param {object} [options]
 * @returns {Promise<string>}
 */
export async function chat(messages, options = {}) {
  const provider = getProvider();
  if (!provider) {
    throw new Error('No Nexora AI provider configured. Set VITE_AI_PROVIDER in .env when ready.');
  }
  return provider.chat(messages, options);
}

/**
 * Send messages and receive a streaming response.
 *
 * @param {ChatMessage[]} messages
 * @param {object} [options]
 * @returns {AsyncGenerator<StreamChunk>}
 */
export async function* chatStream(messages, options = {}) {
  const provider = getProvider();
  if (!provider) {
    yield { content: 'Nexora AI is not configured yet. This is a placeholder.', done: true };
    return;
  }
  if (!provider.chatStream) {
    const text = await provider.chat(messages, options);
    yield { content: text, done: true };
    return;
  }
  yield* provider.chatStream(messages, options);
}

// ── Context Builder ───────────────────────────────────────

/**
 * Build a system-level context for the AI chatbot.
 *
 * Provides the AI with information about ALQUDABEA, services,
 * and Bahrain-specific context to improve response quality.
 *
 * @returns {ChatMessage}
 */
export function buildSystemContext() {
  return {
    role: 'system',
    content: `You are a helpful security assistant for ALQUDABEA SECURITY SERVICES W.L.L.,
Bahrain's premier corporate security provider. You help users with questions about:

- Security services: static guards, mobile patrols, event security, VIP protection,
  CCTV monitoring, access control, reception security, industrial/commercial/residential security
- Industries served: banking, government, commercial, residential, hotels, healthcare,
  industrial, construction, retail, logistics
- Company information: Bahrain-registered, Ministry of Interior licensed, 500+ personnel,
  24/7 operations centre, 15+ years of experience
- Careers: security officer roles, training, GTS licensing
- Bahrain-specific regulations and security best practices

Always be professional, helpful, and concise. If you don't know something, say so.
Never make up information about pricing, specific client names, or security vulnerabilities.`,
  };
}

// ── Rate Limiter Placeholder ──────────────────────────────

/**
 * Simple token bucket rate limiter (future use).
 *
 * @param {number} maxRequests — max requests per window
 * @param {number} windowMs — window duration in milliseconds
 * @returns {{ canProceed: () => boolean }}
 */
export function createRateLimiter(maxRequests = 10, windowMs = 60000) {
  let tokens = maxRequests;
  let lastRefill = Date.now();

  return {
    canProceed() {
      const now = Date.now();
      const elapsed = now - lastRefill;
      tokens = Math.min(maxRequests, tokens + (elapsed / windowMs) * maxRequests);
      lastRefill = now;
      if (tokens >= 1) { tokens -= 1; return true; }
      return false;
    },
  };
}
