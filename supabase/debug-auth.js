const http = require('http');
const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const envFile = fs.readFileSync(path.join(__dirname, '../.env.local'), 'utf8');
const env = {};
envFile.split('\n').forEach(line => {
  const [k, ...v] = line.split('=');
  if (k && v.length) env[k.trim()] = v.join('=').trim();
});

const baseUrl = env.NEXT_PUBLIC_SUPABASE_URL || env.SERVICE_URL_SUPABASEKONG;
const serviceKey = env.SUPABASE_SERVICE_ROLE_KEY || env.SERVICE_SUPABASESERVICE_KEY;
const anonKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY || env.SERVICE_SUPABASEANON_KEY;

function runSql(sql) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({ query: sql });
    const u = new URL(baseUrl + '/pg/query');
    const req = http.request({
      hostname: u.hostname,
      port: u.port || 80,
      path: u.pathname,
      method: 'POST',
      headers: {
        'apikey': serviceKey,
        'Authorization': 'Bearer ' + serviceKey,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    }, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => resolve(JSON.parse(d)));
    });
    req.write(postData);
    req.end();
  });
}

async function debug() {
  await runSql(`
    CREATE OR REPLACE FUNCTION public.debug_claims()
    RETURNS JSONB AS $$
    DECLARE
      prof RECORD;
    BEGIN
      SELECT * INTO prof FROM public.profiles WHERE id = auth.uid();
      RETURN jsonb_build_object(
        'uid', auth.uid(),
        'role', auth.role(),
        'profile_found', prof.id IS NOT NULL,
        'profile_role', prof.role,
        'is_admin', public.is_admin()
      );
    END;
    $$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;
  `);

  const client = createClient(baseUrl, anonKey);
  const { data: auth } = await client.auth.signInWithPassword({
    email: 'admin@zaliaproperties.com',
    password: 'ZaliaPropertiesAdmin2026!'
  });

  const { data: claims, error } = await client.rpc('debug_claims');
  console.log('RPC debug_claims result:', claims, 'Error:', error);
}

debug().catch(console.error);
