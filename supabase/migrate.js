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
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if (res.statusCode >= 400 || (parsed && parsed.error)) {
            reject(new Error(parsed.error || parsed.message || JSON.stringify(parsed)));
          } else {
            resolve({ status: res.statusCode, data: parsed });
          }
        } catch (e) {
          if (res.statusCode >= 400) {
            reject(new Error(`HTTP ${res.statusCode}: ${data}`));
          } else {
            resolve({ status: res.statusCode, raw: data });
          }
        }
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

async function migrate() {
  console.log('--- Checking & Applying Supabase Migrations ---');
  
  // 1. Ensure migrations tracking table exists
  await runSql(`
    CREATE TABLE IF NOT EXISTS public._migrations (
      id SERIAL PRIMARY KEY,
      name TEXT UNIQUE NOT NULL,
      executed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  // 2. Fetch already executed migrations
  await runSql("INSERT INTO public._migrations (name) VALUES ('20260903000001_init_zalia_schema.sql') ON CONFLICT (name) DO NOTHING;");
  const existing = await runSql('SELECT name FROM public._migrations;');
  const executedSet = new Set(existing.data.map(m => m.name));

  const migrationsDir = path.join(__dirname, 'migrations');
  const files = fs.readdirSync(migrationsDir).filter(f => f.endsWith('.sql')).sort();

  for (const file of files) {
    if (executedSet.has(file)) {
      console.log(`- Skipping ${file} (already executed)`);
      continue;
    }

    console.log(`> Executing migration: ${file}...`);
    const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf8');
    await runSql(sql);
    await runSql(`INSERT INTO public._migrations (name) VALUES ('${file}');`);
    console.log(`✓ ${file} applied successfully!`);
  }

  console.log('\nMigration check complete.');
}

migrate().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});
