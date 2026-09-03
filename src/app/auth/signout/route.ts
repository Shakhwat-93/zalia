import { createServerSupabaseClient } from '@/lib/supabase-server';
import { NextResponse, type NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const supabase = createServerSupabaseClient();
  await supabase.auth.signOut();

  const url = new URL('/admin/login', request.url);
  return NextResponse.redirect(url, { status: 302 });
}
