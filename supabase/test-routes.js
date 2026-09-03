const http = require('http');

function check(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      console.log(`URL: ${url.padEnd(38)} => Status: ${res.statusCode} | Redirect: ${res.headers.location || 'None'}`);
      resolve({ status: res.statusCode, location: res.headers.location });
    }).on('error', reject);
  });
}

async function run() {
  console.log('=== ROUTE ACCESS & MIDDLEWARE VERIFICATION ===\n');
  await check('http://localhost:3000');
  await check('http://localhost:3000/about');
  await check('http://localhost:3000/projects');
  await check('http://localhost:3000/admin/login');
  await check('http://localhost:3000/admin');
  await check('http://localhost:3000/admin/dashboard');
  await check('http://localhost:3000/admin/homepage');
  await check('http://localhost:3000/admin/pages');
  await check('http://localhost:3000/admin/projects');
  await check('http://localhost:3000/admin/team');
  await check('http://localhost:3000/admin/contact');
  await check('http://localhost:3000/admin/media');
  await check('http://localhost:3000/admin/settings');
  await check('http://localhost:3000/admin/settings/navigation');
  await check('http://localhost:3000/admin/settings/footer');
  console.log('\n=== VERIFICATION COMPLETE ===');
}

run().catch(console.error);
