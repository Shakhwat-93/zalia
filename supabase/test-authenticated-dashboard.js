const http = require('http');
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

async function testAuthDashboard() {
  console.log('1. Signing in with admin credentials via GoTrue...');
  const supabase = createClient(supabaseUrl, anonKey);
  const { data, error } = await supabase.auth.signInWithPassword({
    email: 'admin@zaliaproperties.com',
    password: 'ZaliaPropertiesAdmin2026!',
  });

  if (error || !data.session) {
    console.error('Sign in failed:', error);
    process.exit(1);
  }

  console.log('✓ Successfully authenticated!');
  console.log('  Access Token:', data.session.access_token.slice(0, 20) + '...');
  console.log('  User ID:', data.user.id);

  // In Supabase SSR, auth tokens are stored in cookies
  // @supabase/ssr uses cookie name format: `sb-<project-ref>-auth-token`
  // Let's test accessing http://localhost:3000/admin with cookie headers
  const projectRef = new URL(supabaseUrl).hostname.split('.')[0];
  const cookieVal = JSON.stringify([
    data.session.access_token,
    data.session.refresh_token,
    null,
    null,
    null,
  ]);
  const cookieHeader = `sb-${projectRef}-auth-token=${encodeURIComponent(cookieVal)}`;

  console.log('\n2. Testing authenticated GET /admin request with SSR session cookie...');
  
  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/admin',
    method: 'GET',
    headers: {
      'Cookie': cookieHeader,
    },
  };

  const req = http.request(options, (res) => {
    console.log(`✓ Response status: ${res.statusCode}`);
    console.log(`  Headers:`, res.headers['content-type']);

    let body = '';
    res.on('data', (chunk) => {
      body += chunk;
    });

    res.on('end', () => {
      if (res.statusCode === 200) {
        console.log('✓ SUCCESS! Server rendered /admin successfully with 200 OK!');
        if (body.includes('Dashboard Overview') || body.includes('Total Projects')) {
          console.log('✓ Verified: Real dashboard content rendered in HTML response!');
        } else {
          console.log('Response excerpt:', body.slice(0, 300));
        }
      } else {
        console.log(`Redirect / Error response (${res.statusCode}):`, res.headers.location || body.slice(0, 300));
      }
    });
  });

  req.on('error', (e) => {
    console.error('Request error:', e);
  });

  req.end();
}

testAuthDashboard().catch(console.error);
