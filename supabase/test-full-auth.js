const http = require('http');
const { createBrowserClient } = require('@supabase/ssr');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'http://supabasekong-qybvw9y2o7gbhbzfyyrlit6p.187.77.159.209.sslip.io';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Mock cookie jar for createBrowserClient
const cookieJar = {};

global.document = {
  get cookie() {
    return Object.entries(cookieJar)
      .map(([k, v]) => `${k}=${v}`)
      .join('; ');
  },
  set cookie(val) {
    const parts = val.split(';')[0].split('=');
    const name = parts[0].trim();
    const value = parts.slice(1).join('=');
    cookieJar[name] = value;
  },
};

global.window = {};

async function testFullFlow() {
  console.log('1. Testing createBrowserClient signIn with admin...');
  const browserClient = createBrowserClient(supabaseUrl, supabaseAnonKey);

  const { data, error } = await browserClient.auth.signInWithPassword({
    email: 'admin@zaliaproperties.com',
    password: 'ZaliaPropertiesAdmin2026!',
  });

  if (error) {
    console.error('Sign in error:', error);
    process.exit(1);
  }

  console.log('✓ Successfully signed in as:', data.user.email);
  console.log('Cookies stored in jar:', Object.keys(cookieJar));

  // Build the Cookie header exactly as a real browser would send it
  const cookieHeader = Object.entries(cookieJar)
    .map(([k, v]) => `${k}=${v}`)
    .join('; ');

  console.log('\n2. Sending GET http://localhost:3000/admin with browser session cookies...');

  return new Promise((resolve) => {
    const req = http.request(
      'http://localhost:3000/admin',
      {
        headers: {
          Cookie: cookieHeader,
        },
      },
      (res) => {
        console.log(`Status Code: ${res.statusCode}`);
        console.log('Redirect Location:', res.headers.location || 'None');

        let html = '';
        res.on('data', (chunk) => (html += chunk));
        res.on('end', () => {
          if (res.statusCode === 200) {
            console.log('\n✓ EXCELLENT! Dashboard rendered with status 200 OK!');
            console.log('HTML snippet contains:');
            if (html.includes('Dashboard Overview')) console.log('  ✓ Found: "Dashboard Overview"');
            if (html.includes('Total Projects')) console.log('  ✓ Found: "Total Projects"');
            if (html.includes('Inbound Enquiries')) console.log('  ✓ Found: "Inbound Enquiries"');
            if (html.includes('Recent Enquiries')) console.log('  ✓ Found: "Recent Enquiries"');
            if (html.includes('Active Projects')) console.log('  ✓ Found: "Active Projects"');
            if (html.includes('Application error')) {
              console.error('  ✗ Found Application error in HTML!');
            }
          } else {
            console.log('Non-200 response:', html.slice(0, 500));
          }
          resolve();
        });
      }
    );

    req.on('error', console.error);
    req.end();
  });
}

testFullFlow().catch(console.error);
