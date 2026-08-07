import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from '@vuer-ai/react-helmet-async';
import { BrowserRouter } from 'react-router';
import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider } from '@/context/AuthContext';
import { BlogProvider } from '@/context/BlogContext';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { initAnalytics } from '@/services/analytics';
import App from './App';
import '@/styles/index.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found. Ensure index.html contains <div id="root"></div>.');
}

// Build info
if (typeof __BUILD_TIME__ !== 'undefined') {
  console.debug('Build:', __BUILD_TIME__);
}

// Initialize analytics (safe no-op if env vars not set)
initAnalytics();

createRoot(rootElement).render(
  <StrictMode>
    <ErrorBoundary>
      <HelmetProvider>
        <BrowserRouter>
          <ThemeProvider>
            <AuthProvider>
              <BlogProvider>
                <App />
              </BlogProvider>
            </AuthProvider>
          </ThemeProvider>
        </BrowserRouter>
      </HelmetProvider>
    </ErrorBoundary>
  </StrictMode>,
);
