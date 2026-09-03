-- ==============================================================================
-- ZALIA PROPERTIES LTD — RESOLVE RLS CIRCULAR DEPENDENCY & BOOST PERFORMANCE
-- Migration: 20260903000003_fix_circular_rls.sql
-- ==============================================================================

-- 1. Create robust, high-performance is_admin() function
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
DECLARE
    found_role TEXT;
BEGIN
    IF auth.uid() IS NULL THEN
        RETURN FALSE;
    END IF;

    -- 1. Fast path: check JWT app_metadata or user_metadata
    IF (auth.jwt() -> 'app_metadata' ->> 'role') IN ('admin', 'superadmin')
       OR (auth.jwt() -> 'user_metadata' ->> 'role') IN ('admin', 'superadmin') THEN
        RETURN TRUE;
    END IF;

    -- 2. Direct lookup in profiles bypassing RLS via table alias
    SELECT p.role INTO found_role
    FROM public.profiles p
    WHERE p.id = auth.uid();

    RETURN found_role IN ('admin', 'superadmin');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- 2. Fix profiles policies to prevent circular recursion
DROP POLICY IF EXISTS "Users can read their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins have full access to profiles" ON public.profiles;

-- Allow any authenticated user to view their own profile
CREATE POLICY "Users can read their own profile"
    ON public.profiles
    FOR SELECT
    TO authenticated
    USING (id = auth.uid());

-- Allow admins or users to update their own profile
CREATE POLICY "Admins and self update profile"
    ON public.profiles
    FOR UPDATE
    TO authenticated
    USING (id = auth.uid() OR public.is_admin())
    WITH CHECK (id = auth.uid() OR public.is_admin());

-- Allow admins to insert/delete profiles
CREATE POLICY "Admins insert profile"
    ON public.profiles
    FOR INSERT
    TO authenticated
    WITH CHECK (public.is_admin() OR id = auth.uid());

CREATE POLICY "Admins delete profile"
    ON public.profiles
    FOR DELETE
    TO authenticated
    USING (public.is_admin());
