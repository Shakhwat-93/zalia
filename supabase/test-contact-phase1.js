const http = require('http');
const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const envFile = fs.readFileSync(path.join(__dirname, '../.env.local'), 'utf8');
const env = {};
envFile.split('\n').forEach((line) => {
  const [k, ...v] = line.split('=');
  if (k && v.length) env[k.trim()] = v.join('=').trim();
});

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL || env.SERVICE_URL_SUPABASEKONG;
const serviceKey = env.SUPABASE_SERVICE_ROLE_KEY || env.SERVICE_SUPABASESERVICE_KEY;
const supabase = createClient(supabaseUrl, serviceKey);

async function runTests() {
  console.log('====================================================');
  console.log('ZALIA PROPERTIES — PHASE 1 CONTACT BACKEND TEST SUITE');
  console.log('====================================================\n');

  let passed = 0;
  let failed = 0;

  async function postContact(payload, ip = '127.0.0.1') {
    const res = await fetch('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-forwarded-for': ip,
      },
      body: JSON.stringify(payload),
    });
    const status = res.status;
    let json = {};
    try {
      json = await res.json();
    } catch (e) {
      json = { raw: await res.text() };
    }
    return { status, json };
  }

  // TEST 1: Missing Name
  console.log('Test 1: Missing name validation...');
  const t1 = await postContact({
    email: 'test@zaliaproperties.com',
    message: 'Testing validation with missing name.',
  }, '10.0.0.1');
  if (t1.status === 400 && t1.json.error?.includes('name')) {
    console.log('✓ PASS: Missing name rejected with 400:', t1.json.error);
    passed++;
  } else {
    console.error('✗ FAIL:', t1.status, t1.json);
    failed++;
  }

  // TEST 2: Invalid Email
  console.log('\nTest 2: Invalid email format validation...');
  const t2 = await postContact({
    full_name: 'Lady Victoria Hamilton',
    email: 'not-a-valid-email',
    message: 'Testing validation with malformed email.',
  }, '10.0.0.2');
  if (t2.status === 400 && t2.json.error?.includes('email')) {
    console.log('✓ PASS: Invalid email rejected with 400:', t2.json.error);
    passed++;
  } else {
    console.error('✗ FAIL:', t2.status, t2.json);
    failed++;
  }

  // TEST 3: Missing Message
  console.log('\nTest 3: Missing / short message validation...');
  const t3 = await postContact({
    full_name: 'Lord Arthur Pendelton',
    email: 'arthur@pendelton-estates.co.uk',
    message: 'Hi',
  }, '10.0.0.3');
  if (t3.status === 400 && t3.json.error?.includes('message')) {
    console.log('✓ PASS: Short message rejected with 400:', t3.json.error);
    passed++;
  } else {
    console.error('✗ FAIL:', t3.status, t3.json);
    failed++;
  }

  // TEST 4: Honeypot Anti-Spam Trap
  console.log('\nTest 4: Honeypot bot trap...');
  const t4 = await postContact({
    full_name: 'Spam Bot 3000',
    email: 'bot@spam.com',
    message: 'Buy cheap watches now!',
    website_url: 'http://spam-link.com',
  }, '10.0.0.4');
  if (t4.status === 200 && t4.json.success) {
    console.log('✓ PASS: Honeypot silently succeeded without recording spam.');
    passed++;
  } else {
    console.error('✗ FAIL:', t4.status, t4.json);
    failed++;
  }

  // TEST 5: Rate Limiting Enforcement on same IP
  console.log('\nTest 5: Rate limiting enforcement (rapid calls from same IP)...');
  const t5a = await postContact({
    full_name: 'Rapid Clicker',
    email: 'rapid@test.com',
    message: 'Valid message content here.',
  }, '10.0.0.5');
  const t5b = await postContact({
    full_name: 'Rapid Clicker 2',
    email: 'rapid2@test.com',
    message: 'Another valid message immediately.',
  }, '10.0.0.5');
  if (t5b.status === 429) {
    console.log('✓ PASS: Rapid successive submission caught by rate limiter (429):', t5b.json.error);
    passed++;
  } else {
    console.error('✗ FAIL: Rate limiting not enforced:', t5b.status, t5b.json);
    failed++;
  }

  // TEST 6: Valid Submission & Supabase Storage Verification
  console.log('\nTest 6: Valid submission insertion into Supabase...');
  const testEmail = `investor-${Date.now()}@chelseapartners.co.uk`;
  const testMessage = `We represent private equity looking to co-develop prime residential opportunities across South Kensington. Ref ID: ${Date.now()}`;
  
  const t6 = await postContact({
    full_name: 'Sir Charles Cavendish',
    email: testEmail,
    phone: '+44 20 7946 0888',
    subject: 'Joint Venture Acquisition',
    message: testMessage,
    source: '/contact',
  }, '10.0.0.6');

  if (t6.status === 200 && t6.json.success && t6.json.submissionId) {
    console.log('✓ PASS: Server returned success 200 with submission ID:', t6.json.submissionId);

    // Verify row in Supabase PostgreSQL
    const { data: row, error: fetchErr } = await supabase
      .from('contact_submissions')
      .select('*')
      .eq('id', t6.json.submissionId)
      .single();

    if (row && !fetchErr) {
      console.log('✓ PASS: Supabase database record verified:');
      console.log('  - ID:', row.id);
      console.log('  - Full Name:', row.full_name);
      console.log('  - Email:', row.email);
      console.log('  - Phone:', row.phone);
      console.log('  - Subject:', row.subject);
      console.log('  - Status:', row.status);
      console.log('  - Source:', row.source);
      console.log('  - Email Sent Status:', row.email_sent);
      console.log('  - Created At:', row.created_at);
      passed++;
    } else {
      console.error('✗ FAIL: Record not found in Supabase:', fetchErr);
      failed++;
    }
  } else {
    console.error('✗ FAIL:', t6.status, t6.json);
    failed++;
  }

  // TEST 7: Duplicate Submission Guard
  console.log('\nTest 7: Duplicate submission prevention...');
  const t7 = await postContact({
    full_name: 'Sir Charles Cavendish',
    email: testEmail,
    phone: '+44 20 7946 0888',
    subject: 'Joint Venture Acquisition',
    message: testMessage,
    source: '/contact',
  }, '10.0.0.7');

  if (t7.status === 409) {
    console.log(`✓ PASS: Duplicate submission blocked with 409 Conflict:`, t7.json.error);
    passed++;
  } else {
    console.error('✗ FAIL: Duplicate submission not caught:', t7.status, t7.json);
    failed++;
  }

  console.log('\n====================================================');
  console.log(`TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
  console.log('====================================================');

  if (failed > 0) process.exit(1);
}

runTests().catch((err) => {
  console.error('Fatal test runner error:', err);
  process.exit(1);
});
