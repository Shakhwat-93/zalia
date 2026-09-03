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
const anonKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY || env.SERVICE_SUPABASEANON_KEY;

async function test() {
  console.log('--- 1. Testing Anon Insert into contact_submissions (PUBLIC ALLOWED) ---');
  const anonClient = createClient(baseUrl, anonKey);
  const { error: insErr } = await anonClient
    .from('contact_submissions')
    .insert({
      full_name: 'Lord Harrington',
      email: 'harrington@mayfair-estates.co.uk',
      phone: '+44 20 7946 0123',
      enquiry_type: 'Property Opportunity',
      property_location: 'Mayfair, London',
      message: 'Exclusive off-market residential townhouse discussion.'
    });

  if (insErr) {
    console.error('Anon Insert Failed:', insErr);
  } else {
    console.log('✓ Anon Insert Succeeded!');
  }

  console.log('\n--- 2. Testing Anon SELECT from contact_submissions (PUBLIC BLOCKED BY RLS) ---');
  const { data: selAnon } = await anonClient
    .from('contact_submissions')
    .select('*');
  console.log('✓ Anon Select returned rows:', selAnon?.length || 0, '(Expected: 0)');

  console.log('\n--- 3. Testing Authenticated Admin SELECT from contact_submissions (ADMIN ALLOWED) ---');
  const adminClient = createClient(baseUrl, anonKey);
  const { error: authErr } = await adminClient.auth.signInWithPassword({
    email: 'admin@zaliaproperties.com',
    password: 'ZaliaPropertiesAdmin2026!'
  });

  if (authErr) {
    console.error('Admin auth failed:', authErr);
    return;
  }

  const { data: selAdmin, error: selAdminErr } = await adminClient
    .from('contact_submissions')
    .select('*');

  if (selAdminErr) {
    console.error('Admin select failed:', selAdminErr);
  } else {
    console.log('✓ Admin Select Succeeded!');
    console.log(`✓ Admin retrieved ${selAdmin.length} submission(s).`);
    console.log(`✓ Lead Name: "${selAdmin[0]?.full_name}", Email: "${selAdmin[0]?.email}"`);
  }
}

test().catch(console.error);
