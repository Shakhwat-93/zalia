import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'http://supabasekong-qybvw9y2o7gbhbzfyyrlit6p.187.77.159.209.sslip.io';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SERVICE_SUPABASESERVICE_KEY || '';

// Client for public / frontend operations
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Admin client for backend server routes with elevated permissions
export const supabaseAdmin = createClient(
  supabaseUrl,
  supabaseServiceKey || supabaseAnonKey,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  }
);

// Helper to execute SQL directly against the PostgreSQL database
export async function executeSql(sql: string) {
  const queryUrl = `${supabaseUrl}/pg/query`;
  const res = await fetch(queryUrl, {
    method: 'POST',
    headers: {
      'apikey': supabaseServiceKey,
      'Authorization': `Bearer ${supabaseServiceKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: sql }),
    cache: 'no-store',
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`SQL Execution failed (${res.status}): ${errorText}`);
  }

  return res.json();
}
