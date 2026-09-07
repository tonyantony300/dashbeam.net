import { defineRouting } from 'next-intl/routing';

/**
 * Pure routing config. Deliberately free of any React/navigation imports so the
 * edge middleware bundle stays small — `createNavigation` lives in ./navigation.
 * Importing it here drags the react-server navigation graph (and, through
 * getRequestConfig, every message catalog) into middleware. See ./navigation.js.
 */
export const routing = defineRouting({
  locales: ['en', 'ru', 'th', 'de', 'fr', 'ja', 'zh', 'ko', 'it'],
  defaultLocale: 'en',
  localePrefix: 'always',
  localeDetection: true
});
