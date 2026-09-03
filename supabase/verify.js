const http = require('http');
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
    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

async function main() {
  console.log('--- Verifying Seeded Table Record Counts ---');
  const counts = await runSql(`
    SELECT 'projects' as tbl, count(*)::int as count FROM public.projects
    UNION ALL SELECT 'team_members', count(*)::int FROM public.team_members
    UNION ALL SELECT 'site_settings', count(*)::int FROM public.site_settings
    UNION ALL SELECT 'navigation', count(*)::int FROM public.navigation
    UNION ALL SELECT 'pages', count(*)::int FROM public.pages
    UNION ALL SELECT 'footer', count(*)::int FROM public.footer
    UNION ALL SELECT 'seo_metadata', count(*)::int FROM public.seo_metadata;
  `);
  console.table(counts);

  console.log('\n--- Sample Projects from Database ---');
  const projects = await runSql("SELECT id, slug, title, status_badge, status, sort_order FROM public.projects ORDER BY sort_order;");
  console.table(projects);

  console.log('\n--- Sample Team Members from Database ---');
  const team = await runSql("SELECT id, name, role, initials, status, sort_order FROM public.team_members ORDER BY sort_order;");
  console.table(team);
}

main().catch(console.error);
