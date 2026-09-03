import React from 'react';
import type { Metadata } from 'next';
import { createServerSupabaseClient } from '@/lib/supabase-server';
import AboutPageClient from './AboutPageClient';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const supabase = createServerSupabaseClient();
  try {
    const { data: page } = await supabase
      .from('pages')
      .select('seo_title, seo_description, title, description')
      .eq('slug', 'about')
      .single();

    if (page) {
      return {
        title: page.seo_title || page.title || 'About Zalia Properties | Who We Are & Architectural Philosophy',
        description: page.seo_description || page.description || 'Discover Zalia Properties — prime residential development.',
      };
    }
  } catch {
    // fallback
  }

  return {
    title: 'About Zalia Properties | Who We Are & Architectural Philosophy',
  };
}

export default async function AboutPage() {
  const supabase = createServerSupabaseClient();
  let pageData: any = null;

  try {
    const { data } = await supabase
      .from('pages')
      .select('*')
      .eq('slug', 'about')
      .single();

    if (data) {
      pageData = data;
    }
  } catch (err) {
    console.error('Failed to fetch about page:', err);
  }

  return <AboutPageClient pageData={pageData} />;
}
