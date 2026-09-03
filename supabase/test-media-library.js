// Automated End-to-End Media Library Verification
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const env = fs.readFileSync('.env.local', 'utf8');
const url = env.match(/NEXT_PUBLIC_SUPABASE_URL=(.*)/)[1].trim();
const serviceKey = env.match(/SUPABASE_SERVICE_ROLE_KEY=(.*)/)[1].trim();

const supabase = createClient(url, serviceKey);

async function runTest() {
  console.log('--- Testing Phase 9 Zalia Media Library ---');

  // 1. Verify media_assets table
  const { data: initialAssets, error: fetchErr } = await supabase
    .from('media_assets')
    .select('*')
    .order('created_at', { ascending: false });

  if (fetchErr) {
    console.error('FAILED: Could not query media_assets:', fetchErr);
    process.exit(1);
  }

  console.log(`✓ media_assets query successful: ${initialAssets.length} assets indexed.`);
  const sample = initialAssets[0];
  console.log(`  Sample: ${sample.filename} | ${sample.file_url} | ${sample.file_size} bytes`);

  // 2. Verify Storage Bucket 'media'
  const { data: buckets, error: bucketErr } = await supabase.storage.listBuckets();
  if (bucketErr) {
    console.error('FAILED: Could not list storage buckets:', bucketErr);
    process.exit(1);
  }
  const mediaBucket = buckets.find((b) => b.name === 'media');
  if (!mediaBucket) {
    console.error('FAILED: Bucket "media" not found.');
    process.exit(1);
  }
  console.log(`✓ Supabase Storage bucket "${mediaBucket.name}" verified (Public: ${mediaBucket.public}).`);

  // 3. Test Direct Storage Upload & Registration
  const testFileName = `test-verify-${Date.now()}.png`;
  const dummyBuffer = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==', 'base64');
  const storagePath = `automated-tests/${testFileName}`;

  console.log(`> Uploading test image to bucket "media" at path "${storagePath}"...`);
  const { data: uploadRes, error: uploadErr } = await supabase.storage
    .from('media')
    .upload(storagePath, dummyBuffer, {
      contentType: 'image/png',
      upsert: false,
    });

  if (uploadErr) {
    console.error('FAILED: Upload to storage failed:', uploadErr);
    process.exit(1);
  }
  console.log('✓ Storage upload successful!');

  // 4. Get Public URL
  const { data: publicUrlData } = supabase.storage.from('media').getPublicUrl(storagePath);
  console.log(`✓ Public URL generated: ${publicUrlData.publicUrl}`);

  // 5. Insert Record into media_assets
  const { data: insertedAsset, error: insertErr } = await supabase
    .from('media_assets')
    .insert([
      {
        filename: testFileName,
        file_url: publicUrlData.publicUrl,
        file_type: 'image/png',
        file_size: dummyBuffer.length,
        storage_path: storagePath,
        dimensions: '1x1',
        alt_text: 'Automated verification test asset',
      },
    ])
    .select('*')
    .single();

  if (insertErr) {
    console.error('FAILED: Database insert error:', insertErr);
    process.exit(1);
  }
  console.log(`✓ Asset recorded in media_assets table with ID: ${insertedAsset.id}`);

  // 6. Cleanup Test Asset from Storage & Database
  console.log(`> Cleaning up test asset ${insertedAsset.id}...`);
  const { error: removeStorageErr } = await supabase.storage.from('media').remove([storagePath]);
  if (removeStorageErr) console.warn('Warning: Storage removal error:', removeStorageErr);

  const { error: deleteDbErr } = await supabase
    .from('media_assets')
    .delete()
    .eq('id', insertedAsset.id);
  if (deleteDbErr) console.warn('Warning: DB delete error:', deleteDbErr);

  console.log('✓ Cleanup completed successfully.');
  console.log('--- ALL PHASE 9 VERIFICATIONS PASSED ---');
}

runTest();
