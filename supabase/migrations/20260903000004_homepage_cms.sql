-- Migration 20260903000004_homepage_cms.sql
-- Add metadata JSONB column to public.homepage_sections for structured sub-content

ALTER TABLE public.homepage_sections 
ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}'::jsonb;

-- Seed authentic Zalia homepage sections if empty
INSERT INTO public.homepage_sections (
    section_key,
    title,
    eyebrow,
    headline,
    subheadline,
    body,
    primary_cta_label,
    primary_cta_href,
    secondary_cta_label,
    secondary_cta_href,
    media_url,
    status,
    sort_order,
    metadata
)
VALUES 
(
    'hero',
    'Hero Gateway',
    'ACQUIRE • TRANSFORM • CREATE',
    'WE BUY. WE TRANSFORM. WE CREATE.',
    'We identify residential properties with potential and transform them into exceptional homes designed for modern British living.',
    'London & Prime UK Residential Transformation',
    'Contact Mayfair HQ',
    '/contact',
    'Explore Portfolio',
    '/projects',
    '/images/hero-model.webp',
    'published',
    1,
    '{"trust_tag": "Mayfair, London • UK Residential Development"}'::jsonb
),
(
    'intro',
    'Company Introduction',
    'WHO WE ARE',
    'WE SEE MORE IN EVERY PROPERTY.',
    'We look beyond what a property is today to understand what it could become tomorrow.',
    NULL,
    'Discover Who We Are',
    '/about',
    NULL,
    NULL,
    '/images/about-zalia.webp',
    'published',
    2,
    '{}'::jsonb
),
(
    'what_we_do',
    'What We Do Overview',
    'WHAT WE DO',
    'FROM POTENTIAL TO POSSIBILITY.',
    'From acquisition through architectural transformation to turnkey delivery.',
    NULL,
    'Explore What We Do',
    '/what-we-do',
    NULL,
    NULL,
    NULL,
    'published',
    3,
    '{"pillars": [{"number": "01", "title": "ACQUIRE", "sentence": "Identify residential properties with genuine potential.", "is_active": true}, {"number": "02", "title": "TRANSFORM", "sentence": "Reimagine spaces through thoughtful design and renovation.", "is_active": true}, {"number": "03", "title": "CREATE", "sentence": "Deliver refined homes with lasting quality.", "is_active": true}]}'::jsonb
),
(
    'projects',
    'Featured Projects',
    'PORTFOLIO HIGHLIGHTS',
    'SELECTED PROJECTS',
    'Selected prime residential transformations across London and the UK.',
    NULL,
    'View All Projects',
    '/projects',
    NULL,
    NULL,
    NULL,
    'published',
    4,
    '{"max_display": 3}'::jsonb
),
(
    'statement',
    'Brand Statement',
    'ZALIA PERSPECTIVE',
    'PROPERTY HAS POTENTIAL. WE SEE WHAT IT CAN BECOME.',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    'published',
    5,
    '{}'::jsonb
),
(
    'cta',
    'Final Contact CTA',
    'START A DIALOGUE',
    'HAVE A PROPERTY WITH POTENTIAL?',
    'Let''s start a conversation.',
    NULL,
    'Get In Touch',
    '/contact',
    NULL,
    NULL,
    '/images/cta-model.webp',
    'published',
    6,
    '{}'::jsonb
)
ON CONFLICT (section_key) DO UPDATE SET
    eyebrow = EXCLUDED.eyebrow,
    headline = EXCLUDED.headline,
    subheadline = EXCLUDED.subheadline,
    primary_cta_label = EXCLUDED.primary_cta_label,
    primary_cta_href = EXCLUDED.primary_cta_href,
    media_url = EXCLUDED.media_url,
    metadata = EXCLUDED.metadata;
