import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Suppress console outputs and unhandled errors in production
if (import.meta.env.PROD) {
  console.log = () => {};
  console.error = () => {};
  console.warn = () => {};
  console.debug = () => {};

  window.onerror = function () {
    return true; // Prevents the default browser error handler
  };

  window.onunhandledrejection = function (e) {
    e.preventDefault(); // Prevents the default browser unhandled rejection handler
  };
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
