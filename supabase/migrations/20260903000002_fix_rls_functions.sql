-- ==============================================================================
-- ZALIA PROPERTIES LTD — RLS REFINEMENT & SECURITY DEFINER TUNING
-- Migration: 20260903000002_fix_rls_functions.sql
-- ==============================================================================

-- 1. Ensure is_admin() bypasses RLS and sets search_path
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
DECLARE
    current_role TEXT;
BEGIN
    IF auth.uid() IS NULL THEN
        RETURN FALSE;
    END IF;

    SELECT role INTO current_role
    FROM public.profiles
    WHERE id = auth.uid();

    RETURN current_role IN ('admin', 'superadmin');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- 2. Refine contact_submissions policies
DROP POLICY IF EXISTS "Public can submit contact enquiries" ON public.contact_submissions;
DROP POLICY IF EXISTS "Admins have full access to contact_submissions" ON public.contact_submissions;

-- Allow any client (anon or authenticated) to insert enquiries
CREATE POLICY "Public can submit contact enquiries"
    ON public.contact_submissions
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (TRUE);

-- Allow authenticated admins full access (SELECT, UPDATE, DELETE)
CREATE POLICY "Admins have full access to contact_submissions"
    ON public.contact_submissions
    FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- 3. Refine Profiles Policies
DROP POLICY IF EXISTS "Users can read their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins have full access to profiles" ON public.profiles;

CREATE POLICY "Users can read their own profile"
    ON public.profiles
    FOR SELECT
    TO authenticated
    USING (auth.uid() = id);

CREATE POLICY "Admins have full access to profiles"
    ON public.profiles
    FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- 4. Grant explicit table usage to anon and authenticated roles
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL ROUTINES IN SCHEMA public TO anon, authenticated;
