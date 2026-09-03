-- ==============================================================================
-- ZALIA PROPERTIES LTD — PRODUCTION DATABASE SCHEMA
-- Migration: 20260903000001_init_zalia_schema.sql
-- ==============================================================================

-- 1. Helper function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 2. Profiles (Admin Users linked to Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    full_name TEXT,
    role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'superadmin', 'editor')),
    avatar_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to check if current authenticated user is an admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND role IN ('admin', 'superadmin')
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Site Settings (Global Key-Value Configuration)
CREATE TABLE IF NOT EXISTS public.site_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key TEXT UNIQUE NOT NULL,
    value TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'general',
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_site_settings_updated_at
BEFORE UPDATE ON public.site_settings
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 4. Navigation Links
CREATE TABLE IF NOT EXISTS public.navigation (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    label TEXT NOT NULL,
    href TEXT NOT NULL,
    sort_order INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    is_external BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_navigation_updated_at
BEFORE UPDATE ON public.navigation
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 5. Footer Links
CREATE TABLE IF NOT EXISTS public.footer (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    section_title TEXT NOT NULL,
    label TEXT NOT NULL,
    href TEXT NOT NULL,
    sort_order INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_footer_updated_at
BEFORE UPDATE ON public.footer
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 6. Pages
CREATE TABLE IF NOT EXISTS public.pages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_pages_updated_at
BEFORE UPDATE ON public.pages
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 7. Homepage Sections
CREATE TABLE IF NOT EXISTS public.homepage_sections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    section_key TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    eyebrow TEXT,
    headline TEXT,
    subheadline TEXT,
    body TEXT,
    primary_cta_label TEXT,
    primary_cta_href TEXT,
    secondary_cta_label TEXT,
    secondary_cta_href TEXT,
    media_url TEXT,
    status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_homepage_sections_updated_at
BEFORE UPDATE ON public.homepage_sections
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 8. Projects (Architectural Portfolio)
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    tag TEXT,
    location TEXT NOT NULL,
    category TEXT NOT NULL,
    status_badge TEXT NOT NULL DEFAULT 'COMPLETED' CHECK (status_badge IN ('COMPLETED', 'CURRENT', 'IN DEVELOPMENT')),
    description TEXT NOT NULL,
    image_url TEXT NOT NULL,
    before_image_url TEXT,
    after_image_url TEXT,
    featured BOOLEAN NOT NULL DEFAULT FALSE,
    status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_projects_slug ON public.projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_status ON public.projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_sort_order ON public.projects(sort_order);

CREATE TRIGGER set_projects_updated_at
BEFORE UPDATE ON public.projects
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 9. Project Gallery (Case Study Deep Dive Imagery)
CREATE TABLE IF NOT EXISTS public.project_gallery (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    caption TEXT,
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_project_gallery_project_id ON public.project_gallery(project_id);
CREATE INDEX IF NOT EXISTS idx_project_gallery_sort_order ON public.project_gallery(sort_order);

-- 10. Team Members (Leadership Roster)
CREATE TABLE IF NOT EXISTS public.team_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    initials TEXT NOT NULL,
    bio TEXT,
    image_url TEXT,
    status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_team_members_status ON public.team_members(status);
CREATE INDEX IF NOT EXISTS idx_team_members_sort_order ON public.team_members(sort_order);

CREATE TRIGGER set_team_members_updated_at
BEFORE UPDATE ON public.team_members
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 11. Contact Submissions (Inbound Client Leads & Enquiries)
CREATE TABLE IF NOT EXISTS public.contact_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    enquiry_type TEXT NOT NULL DEFAULT 'Property Opportunity',
    property_location TEXT,
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'reviewed', 'contacted', 'archived')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON public.contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON public.contact_submissions(created_at DESC);

CREATE TRIGGER set_contact_submissions_updated_at
BEFORE UPDATE ON public.contact_submissions
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 12. Media Assets (Media Library Inventory)
CREATE TABLE IF NOT EXISTS public.media_assets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    filename TEXT NOT NULL,
    file_url TEXT NOT NULL,
    file_type TEXT NOT NULL,
    file_size INT NOT NULL,
    dimensions TEXT,
    alt_text TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 13. SEO Metadata
CREATE TABLE IF NOT EXISTS public.seo_metadata (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    page_slug TEXT UNIQUE NOT NULL,
    meta_title TEXT NOT NULL,
    meta_description TEXT NOT NULL,
    og_image_url TEXT,
    canonical_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_seo_metadata_updated_at
BEFORE UPDATE ON public.seo_metadata
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();


-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS across all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.navigation ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.footer ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.homepage_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seo_metadata ENABLE ROW LEVEL SECURITY;

-- ------------------------------------------------------------------------------
-- Profiles Policies
-- ------------------------------------------------------------------------------
CREATE POLICY "Users can read their own profile"
    ON public.profiles FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Admins have full access to profiles"
    ON public.profiles FOR ALL
    USING (public.is_admin());

-- ------------------------------------------------------------------------------
-- Public Content Policies (Read-Only for Published Content)
-- ------------------------------------------------------------------------------

-- Projects
CREATE POLICY "Public can view published projects"
    ON public.projects FOR SELECT
    USING (status = 'published');

CREATE POLICY "Admins have full access to projects"
    ON public.projects FOR ALL
    USING (public.is_admin());

-- Project Gallery
CREATE POLICY "Public can view gallery for published projects"
    ON public.project_gallery FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.projects
            WHERE projects.id = project_gallery.project_id AND projects.status = 'published'
        )
    );

CREATE POLICY "Admins have full access to project_gallery"
    ON public.project_gallery FOR ALL
    USING (public.is_admin());

-- Team Members
CREATE POLICY "Public can view published team members"
    ON public.team_members FOR SELECT
    USING (status = 'published');

CREATE POLICY "Admins have full access to team_members"
    ON public.team_members FOR ALL
    USING (public.is_admin());

-- Navigation
CREATE POLICY "Public can view active navigation"
    ON public.navigation FOR SELECT
    USING (is_active = TRUE);

CREATE POLICY "Admins have full access to navigation"
    ON public.navigation FOR ALL
    USING (public.is_admin());

-- Footer
CREATE POLICY "Public can view active footer links"
    ON public.footer FOR SELECT
    USING (is_active = TRUE);

CREATE POLICY "Admins have full access to footer"
    ON public.footer FOR ALL
    USING (public.is_admin());

-- Site Settings
CREATE POLICY "Public can view site settings"
    ON public.site_settings FOR SELECT
    USING (TRUE);

CREATE POLICY "Admins have full access to site_settings"
    ON public.site_settings FOR ALL
    USING (public.is_admin());

-- Pages
CREATE POLICY "Public can view published pages"
    ON public.pages FOR SELECT
    USING (status = 'published');

CREATE POLICY "Admins have full access to pages"
    ON public.pages FOR ALL
    USING (public.is_admin());

-- Homepage Sections
CREATE POLICY "Public can view published homepage sections"
    ON public.homepage_sections FOR SELECT
    USING (status = 'published');

CREATE POLICY "Admins have full access to homepage_sections"
    ON public.homepage_sections FOR ALL
    USING (public.is_admin());

-- SEO Metadata
CREATE POLICY "Public can view SEO metadata"
    ON public.seo_metadata FOR SELECT
    USING (TRUE);

CREATE POLICY "Admins have full access to seo_metadata"
    ON public.seo_metadata FOR ALL
    USING (public.is_admin());

-- Media Assets
CREATE POLICY "Public can view media assets"
    ON public.media_assets FOR SELECT
    USING (TRUE);

CREATE POLICY "Admins have full access to media_assets"
    ON public.media_assets FOR ALL
    USING (public.is_admin());

-- ------------------------------------------------------------------------------
-- Contact Submissions Policies (Public Insert, Admin Only Read/Write)
-- ------------------------------------------------------------------------------
CREATE POLICY "Public can submit contact enquiries"
    ON public.contact_submissions FOR INSERT
    WITH CHECK (TRUE);

CREATE POLICY "Admins have full access to contact_submissions"
    ON public.contact_submissions FOR ALL
    USING (public.is_admin());
