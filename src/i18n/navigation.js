import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

/**
 * React navigation helpers. Never import this from middleware.js — it pulls in
 * the request config and, transitively, all locale message catalogs.
 */
export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
