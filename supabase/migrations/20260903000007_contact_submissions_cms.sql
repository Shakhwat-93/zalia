-- Migration 20260903000007_contact_submissions_cms.sql
-- Expand contact_submissions schema with standard fields and status constraints

-- 1. Add missing standard columns
ALTER TABLE public.contact_submissions
ADD COLUMN IF NOT EXISTS name TEXT,
ADD COLUMN IF NOT EXISTS subject TEXT,
ADD COLUMN IF NOT EXISTS source_page TEXT DEFAULT 'contact';

-- 2. Drop legacy status check constraint if exists and add comprehensive status check
ALTER TABLE public.contact_submissions
DROP CONSTRAINT IF EXISTS contact_submissions_status_check;

ALTER TABLE public.contact_submissions
ADD CONSTRAINT contact_submissions_status_check
CHECK (status IN ('new', 'read', 'replied', 'archived', 'reviewed', 'contacted'));

-- 3. Synchronize name and full_name
UPDATE public.contact_submissions
SET name = full_name
WHERE name IS NULL AND full_name IS NOT NULL;

UPDATE public.contact_submissions
SET subject = enquiry_type
WHERE subject IS NULL AND enquiry_type IS NOT NULL;

-- 4. Set default status to 'new'
ALTER TABLE public.contact_submissions
ALTER COLUMN status SET DEFAULT 'new';

-- 5. Seed sample submission if empty to ensure instant verification
INSERT INTO public.contact_submissions (full_name, name, email, phone, subject, enquiry_type, message, source_page, status)
SELECT 
    'Lord Alistair Sterling',
    'Lord Alistair Sterling',
    'alistair.sterling@mayfairoffice.co.uk',
    '+44 20 7946 0912',
    'Off-Market Belgravia Freehold',
    'Property Opportunity',
    'We are representing an estate in Belgravia considering a discreet off-market residential restructuring. The property includes substantial private mews and garden potential. We would welcome an introductory meeting with your acquisition directors.',
    'contact',
    'new'
WHERE NOT EXISTS (SELECT 1 FROM public.contact_submissions);
