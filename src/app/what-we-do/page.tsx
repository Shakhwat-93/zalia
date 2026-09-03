import React from 'react';
import type { Metadata } from 'next';
import { createServerSupabaseClient } from '@/lib/supabase-server';
import WhatWeDoPageClient from './WhatWeDoPageClient';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const supabase = createServerSupabaseClient();
  try {
    const { data: page } = await supabase
      .from('pages')
      .select('seo_title, seo_description, title, description')
      .eq('slug', 'what-we-do')
      .single();

    if (page) {
      return {
        title: page.seo_title || page.title || 'What We Do | Acquire • Transform • Create | Zalia Properties',
        description: page.seo_description || page.description || 'Explore Zalia Properties three-pillar development model.',
      };
    }
  } catch {
    // fallback
  }

  return {
    title: 'What We Do | Acquire • Transform • Create | Zalia Properties',
  };
}

export default async function WhatWeDoPage() {
  const supabase = createServerSupabaseClient();
  let pageData: any = null;

  try {
    const { data } = await supabase
      .from('pages')
      .select('*')
      .eq('slug', 'what-we-do')
      .single();

    if (data) {
      pageData = data;
    }
  } catch (err) {
    console.error('Failed to fetch what-we-do page:', err);
  }

  return <WhatWeDoPageClient pageData={pageData} />;
}
