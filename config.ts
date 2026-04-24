/**
 * Base URL for the site. Set VITE_SITE_URL in .env for production (e.g. https://finomik.com).
 * Falls back to window.location.origin in the browser.
 */
export const SITE_URL =
  typeof import.meta.env.VITE_SITE_URL === 'string' && import.meta.env.VITE_SITE_URL
    ? import.meta.env.VITE_SITE_URL.replace(/\/$/, '')
    : (typeof window !== 'undefined' ? window.location.origin : 'https://finomik.com');

export const SITE_NAME = 'Finomik';
