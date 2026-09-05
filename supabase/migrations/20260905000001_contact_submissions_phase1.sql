-- Migration 20260905000001_contact_submissions_phase1.sql
-- Ensure contact_submissions strictly fulfills Phase 1 specifications

-- 1. Ensure required columns exist with proper defaults
ALTER TABLE public.contact_submissions
ADD COLUMN IF NOT EXISTS full_name TEXT,
ADD COLUMN IF NOT EXISTS email TEXT,
ADD COLUMN IF NOT EXISTS phone TEXT,
ADD COLUMN IF NOT EXISTS subject TEXT,
ADD COLUMN IF NOT EXISTS message TEXT,
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'new',
ADD COLUMN IF NOT EXISTS email_sent BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS email_sent_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS source TEXT DEFAULT 'website',
ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW(),
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- 2. Synchronize legacy source / name if needed
UPDATE public.contact_submissions
SET source = COALESCE(source_page, 'website')
WHERE source IS NULL;

UPDATE public.contact_submissions
SET full_name = name
WHERE full_name IS NULL AND name IS NOT NULL;

-- 3. Add performance indexes for created_at, status, and email
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON public.contact_submissions (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON public.contact_submissions (status);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_email ON public.contact_submissions (email);

-- 4. Set up updated_at trigger mechanism
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_contact_submissions_updated_at ON public.contact_submissions;
CREATE TRIGGER set_contact_submissions_updated_at
BEFORE UPDATE ON public.contact_submissions
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();
