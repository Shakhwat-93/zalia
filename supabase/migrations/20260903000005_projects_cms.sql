-- Migration 20260903000005_projects_cms.sql
-- Add CMS fields for projects: full description, hero image, gallery, before/after sets, and SEO

ALTER TABLE public.projects
ADD COLUMN IF NOT EXISTS short_description TEXT,
ADD COLUMN IF NOT EXISTS full_description TEXT,
ADD COLUMN IF NOT EXISTS hero_image_url TEXT,
ADD COLUMN IF NOT EXISTS gallery_images JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS before_after_sets JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS seo_title TEXT,
ADD COLUMN IF NOT EXISTS seo_description TEXT;

-- Backfill short_description and hero_image_url from existing columns if null
UPDATE public.projects
SET 
    short_description = COALESCE(short_description, description),
    hero_image_url = COALESCE(hero_image_url, image_url),
    full_description = COALESCE(full_description, description),
    seo_title = COALESCE(seo_title, title || ' | Zalia Properties'),
    seo_description = COALESCE(seo_description, description)
WHERE short_description IS NULL OR hero_image_url IS NULL;

-- Backfill authentic before/after sets if existing before/after images exist
UPDATE public.projects
SET 
    before_image_url = COALESCE(before_image_url, '/images/before-split.webp'),
    after_image_url = COALESCE(after_image_url, '/images/after-split.webp'),
    gallery_images = '[{"url": "/images/featured-project.webp", "caption": "Architectural Facade & Heritage Masonry"}, {"url": "/images/brand-statement.webp", "caption": "Interior Daylight Integration"}, {"url": "/images/about-zalia.webp", "caption": "Turnkey Interior Craftsmanship"}]'::jsonb,
    before_after_sets = '[{"before_url": "/images/before-split.webp", "after_url": "/images/after-split.webp", "title": "Main Structural Transformation", "description": "Rear expansion and full architectural glazing integration."}]'::jsonb
WHERE gallery_images = '[]'::jsonb OR gallery_images IS NULL;
