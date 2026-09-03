import { createBrowserClient } from '@supabase/ssr';

export function createBrowserSupabaseClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'http://supabasekong-qybvw9y2o7gbhbzfyyrlit6p.187.77.159.209.sslip.io',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  );
}
