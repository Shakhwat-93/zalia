const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const envFile = fs.readFileSync(path.join(__dirname, '../.env.local'), 'utf8');
const env = {};
envFile.split('\n').forEach(line => {
  const [k, ...v] = line.split('=');
  if (k && v.length) env[k.trim()] = v.join('=').trim();
});

const baseUrl = env.NEXT_PUBLIC_SUPABASE_URL || env.SERVICE_URL_SUPABASEKONG;
const serviceKey = env.SUPABASE_SERVICE_ROLE_KEY || env.SERVICE_SUPABASESERVICE_KEY;

const supabaseAdmin = createClient(baseUrl, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false }
});

async function provisionAdmin() {
  const email = 'admin@zaliaproperties.com';
  const password = 'ZaliaPropertiesAdmin2026!'; // Standard secure bootstrap password

  console.log(`Checking if admin user exists: ${email}...`);
  const { data: users, error: listErr } = await supabaseAdmin.auth.admin.listUsers();
  
  let adminUser = users?.users?.find(u => u.email === email);

  if (!adminUser) {
    console.log('Creating admin user in auth.users...');
    const { data: created, error: createErr } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      app_metadata: { role: 'admin' },
      user_metadata: { full_name: 'Zalia Administrator', role: 'admin' }
    });

    if (createErr) {
      console.error('Failed to create auth user:', createErr);
      process.exit(1);
    }
    adminUser = created.user;
    console.log('Admin auth user created with ID:', adminUser.id);
  } else {
    console.log('Admin auth user already exists with ID:', adminUser.id);
    // Update password and metadata to ensure known credentials
    await supabaseAdmin.auth.admin.updateUserById(adminUser.id, {
      password,
      app_metadata: { role: 'admin' },
      user_metadata: { full_name: 'Zalia Administrator', role: 'admin' }
    });
  }

  // Ensure profile in public.profiles
  const { error: profileErr } = await supabaseAdmin
    .from('profiles')
    .upsert({
      id: adminUser.id,
      email: adminUser.email,
      full_name: 'Zalia Administrator',
      role: 'superadmin'
    }, { onConflict: 'id' });

  if (profileErr) {
    console.error('Failed to upsert profile:', profileErr);
  } else {
    console.log('Admin profile verified in public.profiles with role: superadmin');
  }

  console.log('\n=========================================');
  console.log('ADMIN CREDENTIALS CONFIGURED:');
  console.log(`Email:    ${email}`);
  console.log(`Password: ${password}`);
  console.log('=========================================\n');
}

provisionAdmin().catch(console.error);
