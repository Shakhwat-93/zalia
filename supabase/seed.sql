-- ==============================================================================
-- ZALIA PROPERTIES LTD — SEED DATA (AUTHENTIC EXISTING CONTENT ONLY)
-- File: supabase/seed.sql
-- ==============================================================================

-- 1. Site Settings
INSERT INTO public.site_settings (key, value, category, description) VALUES
('company_name', 'Zalia Properties Ltd', 'general', 'Official Company Name'),
('tagline', 'Invest • Develop • Transform', 'general', 'Company Tagline'),
('subtag', 'UK Residential Property Acquisition & Transformation', 'general', 'Company Subtitle'),
('email', 'contact@zaliaproperties.com', 'contact', 'Primary Contact Email'),
('phone', '+44 (0) 20 7946 0892', 'contact', 'Primary Office Telephone'),
('address', 'Mayfair, London W1J, United Kingdom', 'contact', 'Registered Office Address'),
('registration', 'Registered in England & Wales', 'legal', 'Company Registration Entity')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- 2. Navigation Links
INSERT INTO public.navigation (label, href, sort_order, is_active) VALUES
('Home', '/', 1, TRUE),
('About', '/about', 2, TRUE),
('What We Do', '/what-we-do', 3, TRUE),
('Projects', '/projects', 4, TRUE),
('Approach', '/approach', 5, TRUE),
('Team', '/team', 6, TRUE),
('Contact', '/contact', 7, TRUE)
ON CONFLICT DO NOTHING;

-- 3. Footer Links
INSERT INTO public.footer (section_title, label, href, sort_order, is_active) VALUES
('Explore', 'Our Projects', '/projects', 1, TRUE),
('Explore', 'Our Approach', '/approach', 2, TRUE),
('Explore', 'What We Do', '/what-we-do', 3, TRUE),
('Explore', 'Who We Are', '/about', 4, TRUE),
('Company', 'Philosophy', '/about', 5, TRUE),
('Company', 'Our Team', '/team', 6, TRUE),
('Company', 'Acquisitions', '/contact', 7, TRUE),
('Company', 'Contact', '/contact', 8, TRUE)
ON CONFLICT DO NOTHING;

-- 4. Pages
INSERT INTO public.pages (slug, title, description, status) VALUES
('home', 'Zalia Properties Ltd | Invest • Develop • Transform', 'UK Residential Property Acquisition & Transformation', 'published'),
('about', 'About Zalia Properties | Who We Are & Philosophy', 'We look beyond what a property is today to understand what it could become tomorrow.', 'published'),
('what-we-do', 'What We Do | Acquire • Transform • Create', 'Explore our core capabilities and architectural metamorphosis.', 'published'),
('projects', 'Our Projects | Architectural Portfolio', 'Portfolio of prime residential acquisitions and transformations.', 'published'),
('approach', 'Our Approach | Disciplined 5-Stage Methodology', 'Disciplined property acquisition backed by rigorous underwriting and design.', 'published'),
('team', 'Our Team | Leadership Directory', 'The experienced directors and architectural minds behind Zalia Properties.', 'published'),
('contact', 'Contact Zalia Properties | Central London HQ', 'Direct acquisitions and development enquiries.', 'published')
ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, description = EXCLUDED.description;

-- 5. Projects
INSERT INTO public.projects (slug, title, tag, location, category, status_badge, description, image_url, before_image_url, after_image_url, featured, status, sort_order) VALUES
(
    'kensington-mews-glass-pavilion',
    'The Kensington Mews & Glass Pavilion',
    'PROJECT 01',
    'KENSINGTON, LONDON',
    'Residential Transformation',
    'COMPLETED',
    'A comprehensive heritage transformation marrying traditional brickwork with clean-line floor-to-ceiling glass architecture.',
    '/images/featured-project.webp',
    '/images/before-split.webp',
    '/images/after-split.webp',
    TRUE,
    'published',
    1
),
(
    'mayfair-glazed-residence',
    'The Mayfair Glazed Residence',
    'PROJECT 02',
    'MAYFAIR, LONDON',
    'Heritage Modernisation',
    'CURRENT',
    'Restoration of Victorian brick proportions seamlessly integrated with contemporary glazed living wings.',
    '/images/brand-statement.webp',
    NULL,
    NULL,
    FALSE,
    'published',
    2
),
(
    'surrey-garden-villa',
    'The Surrey Garden Villa',
    'PROJECT 03',
    'SURREY, UK',
    'Bespoke Architecture',
    'COMPLETED',
    'Double-height limestone residence with expansive courtyard daylighting and turnkey bespoke joinery.',
    '/images/about-zalia.webp',
    NULL,
    NULL,
    FALSE,
    'published',
    3
),
(
    'belgravia-courtyard-suite',
    'The Belgravia Courtyard Residence',
    'PROJECT 04',
    'BELGRAVIA, LONDON',
    'Spatial Reconfiguration',
    'CURRENT',
    'Precision structural reconfiguration unlocking seamless indoor-outdoor living and acoustic tranquility.',
    '/images/what-we-do.webp',
    NULL,
    NULL,
    TRUE,
    'published',
    4
),
(
    'chelsea-townhouse-refinement',
    'The Chelsea Townhouse Refinement',
    'PROJECT 05',
    'CHELSEA, LONDON',
    'Turnkey Development',
    'COMPLETED',
    'Complete four-storey townhouse renovation with integrated smart climate envelope and tactile natural stone.',
    '/images/hero-model.webp',
    NULL,
    NULL,
    FALSE,
    'published',
    5
)
ON CONFLICT (slug) DO UPDATE SET 
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    image_url = EXCLUDED.image_url;

-- 6. Team Members
INSERT INTO public.team_members (name, role, initials, image_url, status, sort_order) VALUES
('Zaki Shamseer', 'Founder & Managing Director', 'ZS', '/images/Zaki shamseer.webp', 'published', 1),
('Selina Shamseer', 'Design & Interiors Director', 'SS', '/images/Selina Shamseer.webp', 'published', 2),
('Sayek Ahmed', 'Development & Structural Director', 'SA', '/images/Sayek AHMED.webp', 'published', 3),
('Abdullah Al Faruq', 'Acquisition & Strategy Director', 'AF', '/images/Abdullah Al Faruq.webp', 'published', 4),
('Md. Shahinur Rahman Utsha', 'Architectural Planning & Project Lead', 'SR', '/images/Md. Shahinur Rahman Utsha.webp', 'published', 5),
('Mithu Huda', 'Client Relations & Operations Director', 'MH', '/images/Mithu Huda.webp', 'published', 6)
ON CONFLICT DO NOTHING;

-- 7. SEO Metadata
INSERT INTO public.seo_metadata (page_slug, meta_title, meta_description, og_image_url) VALUES
('home', 'Zalia Properties Ltd | Invest • Develop • Transform', 'We identify residential properties with potential, transform them through thoughtful development, and create quality homes designed for modern living.', '/images/hero-model.webp'),
('about', 'About Zalia Properties Ltd | Philosophy & Story', 'We see more in every property. Architectural rigor, enduring materials, and modern British design.', '/images/about-zalia.webp'),
('what-we-do', 'What We Do | Zalia Properties Ltd', 'Acquire, Transform, Create. Explore our end-to-end property development approach.', '/images/what-we-do.webp'),
('projects', 'Our Projects | Zalia Properties Ltd', 'Explore our portfolio of completed and active prime UK residential developments.', '/images/featured-project.webp'),
('approach', 'Our Approach | Zalia Properties Ltd', 'A disciplined 5-stage philosophy: Identify, Acquire, Transform, Refine, Create.', '/images/brand-statement.webp'),
('team', 'Our Team | Zalia Properties Ltd', 'Meet the directors and leaders shaping exceptional residential properties.', '/images/about-zalia.webp'),
('contact', 'Contact Us | Zalia Properties Ltd', 'Get in touch with our Mayfair headquarters regarding property acquisitions and collaborations.', '/images/cta-model.webp')
ON CONFLICT (page_slug) DO UPDATE SET 
    meta_title = EXCLUDED.meta_title,
    meta_description = EXCLUDED.meta_description;
