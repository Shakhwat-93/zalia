-- Migration 20260903000008_seed_media_assets.sql
-- Seed existing images into media_assets and configure RLS

-- 1. Ensure columns exist on media_assets
ALTER TABLE public.media_assets
ADD COLUMN IF NOT EXISTS storage_path TEXT,
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- 2. Index existing authentic photography and WebP assets
INSERT INTO public.media_assets (filename, file_url, file_type, file_size, dimensions, alt_text)
SELECT * FROM (VALUES
  ('about-zalia.webp', '/images/about-zalia.webp', 'image/webp', 157388, '1536x1024', 'Zalia Mayfair Prime Residential Transformation'),
  ('what-we-do.webp', '/images/what-we-do.webp', 'image/webp', 106496, '1536x1024', 'Zalia Acquire Transform Create Methodology'),
  ('hero-floating-villa.webp', '/images/hero-floating-villa.webp', 'image/webp', 49152, '1536x1024', 'Zalia Prime Villa Architecture with Cantilevered Glass'),
  ('hero-model.webp', '/images/hero-model.webp', 'image/webp', 105472, '1536x1024', 'Zalia 3D Architectural Model Residence'),
  ('before-split.webp', '/images/before-split.webp', 'image/webp', 90112, '1536x1024', 'Period Residential Façade Prior to Transformation'),
  ('after-split.webp', '/images/after-split.webp', 'image/webp', 77824, '1536x1024', 'Completed Zalia Spatial Reconfiguration'),
  ('before-after.webp', '/images/before-after.webp', 'image/webp', 168960, '1536x1024', 'Architectural Metamorphosis Split Comparison'),
  ('brand-statement.webp', '/images/brand-statement.webp', 'image/webp', 261120, '1536x1024', 'Limestone Courtyard and Architectural Fenestration'),
  ('featured-project.webp', '/images/featured-project.webp', 'image/webp', 128000, '1536x1024', 'The Kensington Mews Finished Residence'),
  ('3d-transformation.webp', '/images/3d-transformation.webp', 'image/webp', 140288, '1536x1024', 'Interactive Volumetric Reconfiguration Render'),
  ('cta-model.webp', '/images/cta-model.webp', 'image/webp', 45056, '1536x1024', 'Turnkey Contemporary Residential Living'),
  ('logo.png', '/images/logo.png', 'image/png', 39424, '400x400', 'Zalia Properties Brand Emblem'),
  ('Zaki shamseer.webp', '/images/Zaki shamseer.webp', 'image/webp', 54272, '800x1000', 'Zaki Shamseer - Founder & Managing Director'),
  ('Selina Shamseer.webp', '/images/Selina Shamseer.webp', 'image/webp', 88064, '800x1000', 'Selina Shamseer - Design & Interiors Director'),
  ('Sayek AHMED.webp', '/images/Sayek AHMED.webp', 'image/webp', 49152, '800x1000', 'Sayek Ahmed - Development & Structural Director'),
  ('Abdullah Al Faruq.webp', '/images/Abdullah Al Faruq.webp', 'image/webp', 54272, '800x1000', 'Abdullah Al Faruq - Acquisition & Strategy Director'),
  ('Md. Shahinur Rahman Utsha.webp', '/images/Md. Shahinur Rahman Utsha.webp', 'image/webp', 64512, '800x1000', 'Md. Shahinur Rahman Utsha - Architectural Planning Lead'),
  ('Mithu Huda.webp', '/images/Mithu Huda.webp', 'image/webp', 51200, '800x1000', 'Mithu Huda - Client Relations Director')
) AS v(filename, file_url, file_type, file_size, dimensions, alt_text)
WHERE NOT EXISTS (
  SELECT 1 FROM public.media_assets WHERE filename = v.filename
);
