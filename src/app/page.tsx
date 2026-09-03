import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import HomeIntro from '@/components/home/HomeIntro';
import HomePillars from '@/components/home/HomePillars';
import HomeProjects from '@/components/home/HomeProjects';
import HomeStatement from '@/components/home/HomeStatement';
import HomeCTA from '@/components/home/HomeCTA';
import Footer from '@/components/Footer';
import { createServerSupabaseClient } from '@/lib/supabase-server';

export const dynamic = 'force-dynamic';

export default async function Home() {
  let sections: any[] = [];
  let featuredProjects: any[] = [];

  try {
    const supabase = createServerSupabaseClient();
    const [
      { data: sectionsData },
      { data: projectsData },
    ] = await Promise.all([
      supabase
        .from('homepage_sections')
        .select('*')
        .eq('status', 'published')
        .order('sort_order', { ascending: true }),
      supabase
        .from('projects')
        .select('id, slug, title, location, category, status_badge, image_url, featured, sort_order')
        .eq('status', 'published')
        .eq('featured', true)
        .order('sort_order', { ascending: true })
        .limit(3),
    ]);

    if (sectionsData && sectionsData.length > 0) {
      sections = sectionsData;
    }
    if (projectsData && projectsData.length > 0) {
      featuredProjects = projectsData;
    }
  } catch (err) {
    console.error('Failed to fetch dynamic homepage content:', err);
  }

  // If no sections in DB yet, fallback to default ordering
  if (sections.length === 0) {
    return (
      <main className="min-h-screen bg-canvas text-charcoal-950 selection:bg-emerald-brand selection:text-white relative">
        <Navbar />
        <Hero />
        <HomeIntro />
        <HomePillars />
        <HomeProjects />
        <HomeStatement />
        <HomeCTA />
        <Footer />
      </main>
    );
  }

  // Render sections dynamically according to admin-defined sort_order and visibility
  return (
    <main className="min-h-screen bg-canvas text-charcoal-950 selection:bg-emerald-brand selection:text-white relative">
      <Navbar />

      {sections.map((section) => {
        switch (section.section_key) {
          case 'hero':
            return <Hero key="hero" data={section} />;
          case 'intro':
            return <HomeIntro key="intro" data={section} />;
          case 'what_we_do':
            return <HomePillars key="what_we_do" data={section} />;
          case 'projects':
            return (
              <HomeProjects
                key="projects"
                data={section}
                featuredProjects={featuredProjects}
              />
            );
          case 'statement':
            return <HomeStatement key="statement" data={section} />;
          case 'cta':
            return <HomeCTA key="cta" data={section} />;
          default:
            return null;
        }
      })}

      <Footer />
    </main>
  );
}
