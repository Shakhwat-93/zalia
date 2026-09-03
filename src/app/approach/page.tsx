import React from 'react';
import type { Metadata } from 'next';
import { createServerSupabaseClient } from '@/lib/supabase-server';
import ApproachPageClient from './ApproachPageClient';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const supabase = createServerSupabaseClient();
  try {
    const { data: page } = await supabase
      .from('pages')
      .select('seo_title, seo_description, title, description')
      .eq('slug', 'approach')
      .single();

    if (page) {
      return {
        title: page.seo_title || page.title || 'Our Approach | Disciplined 5-Stage Methodology | Zalia Properties',
        description: page.seo_description || page.description || 'Discover the 5-stage Zalia methodology.',
      };
    }
  } catch {
    // fallback
  }

  return {
    title: 'Our Approach | Disciplined 5-Stage Methodology | Zalia Properties',
  };
}

export default async function ApproachPage() {
  const supabase = createServerSupabaseClient();
  let pageData: any = null;

  try {
    const { data } = await supabase
      .from('pages')
      .select('*')
      .eq('slug', 'approach')
      .single();

    if (data) {
      pageData = data;
    }
  } catch (err) {
    console.error('Failed to fetch approach page:', err);
  }

  return <ApproachPageClient pageData={pageData} />;
}
