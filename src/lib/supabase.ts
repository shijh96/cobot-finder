/**
 * Supabase client initialization.
 *
 * Two clients are exported:
 *  - `supabase`       — browser-side client, uses the anon key, safe to bundle.
 *  - `supabaseAdmin`  — server-side only, uses service-role key, never import
 *                       from client components or expose to the browser.
 *
 * Install the SDK first:
 *   pnpm add @supabase/supabase-js
 */

import { createClient, type SupabaseClient } from '@supabase/supabase-js';

// ----------------------------------------------------------------
// Environment validation
// ----------------------------------------------------------------

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    // In development without Supabase configured, return a placeholder.
    // The client will fail gracefully on actual queries.
    if (process.env.NODE_ENV === 'development') {
      return `MISSING_${name}`;
    }
    throw new Error(
      `Missing required environment variable: ${name}. ` +
        'Ensure .env.local is populated before starting the server.'
    );
  }
  return value;
}

const supabaseUrl = requireEnv('NEXT_PUBLIC_SUPABASE_URL');
const supabaseAnonKey = requireEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY');

// ----------------------------------------------------------------
// Browser client (singleton)
// Suitable for React Server Components and Client Components.
// Respects Row-Level Security using the visitor's JWT / anon role.
// ----------------------------------------------------------------

let _browserClient: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient {
  if (!_browserClient) {
    _browserClient = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        // Persist session in localStorage so the user stays logged in
        // across page reloads. Safe to disable for purely public pages.
        persistSession: true,
        autoRefreshToken: true,
      },
    });
  }
  return _browserClient;
}

/**
 * Pre-instantiated browser client.
 * Import this in Client Components or Route Handlers that only need
 * the anon role (public reads, anonymous lead submissions).
 */
export const supabase = getSupabaseClient();

// ----------------------------------------------------------------
// Admin client (server-only)
// Uses the service-role key which BYPASSES Row-Level Security.
// Only import this in:
//   - API Route Handlers (app/api/**/route.ts)
//   - Server Actions
//   - scripts/ run outside Next.js
// NEVER import in client components or pages that are bundled for
// the browser.
// ----------------------------------------------------------------

export function getSupabaseAdmin(): SupabaseClient {
  // Lazy-instantiate so the service role key is never evaluated on the
  // browser bundle (tree-shaking alone is not sufficient — guard with
  // a runtime check as well).
  if (typeof window !== 'undefined') {
    throw new Error(
      'getSupabaseAdmin() must only be called in server-side code. ' +
        'Never expose the service-role key to the browser.'
    );
  }

  const serviceRoleKey = requireEnv('SUPABASE_SERVICE_ROLE_KEY');

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      // No session management needed for service-role calls.
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
