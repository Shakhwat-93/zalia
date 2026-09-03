import { redirect } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/supabase-server';
import AdminLayoutShell from '@/components/admin/AdminLayoutShell';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/admin/login');
  }

  // Fetch admin profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  // Fetch unread enquiries count
  const { count: unreadCount } = await supabase
    .from('contact_submissions')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'new');

  return (
    <AdminLayoutShell
      adminName={profile?.full_name || user.email || 'Administrator'}
      adminEmail={user.email || 'admin@zaliaproperties.com'}
      adminRole={profile?.role === 'superadmin' ? 'Superadmin' : 'Administrator'}
      unreadCount={unreadCount || 0}
    >
      {children}
    </AdminLayoutShell>
  );
}
