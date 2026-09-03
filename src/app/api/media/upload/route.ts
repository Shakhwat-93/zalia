import { NextRequest, NextResponse } from 'next/server';
import { createAdminSupabaseClient } from '@/lib/supabase-admin';

const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/avif',
  'image/svg+xml',
];

const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20 MB

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const altText = (formData.get('alt_text') as string) || '';

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided.' },
        { status: 400 }
      );
    }

    // Validate MIME type
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        {
          success: false,
          error: `Invalid file type "${file.type}". Allowed types: JPEG, PNG, WebP, AVIF, SVG.`,
        },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          success: false,
          error: 'File exceeds 20MB limit. Please optimize image before uploading.',
        },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // Generate safe clean filename
    const ext = file.name.split('.').pop()?.toLowerCase() || 'webp';
    const baseName = file.name
      .replace(/\.[^/.]+$/, '')
      .toLowerCase()
      .replace(/[^a-z0-9-_]/g, '-');
    const timestamp = Date.now();
    const storagePath = `uploads/${timestamp}-${baseName}.${ext}`;

    const supabase = createAdminSupabaseClient();

    // 1. Upload to Supabase Storage bucket 'media'
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('media')
      .upload(storagePath, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      console.error('Supabase Storage upload error:', uploadError);
      return NextResponse.json(
        { success: false, error: 'Failed to upload image to storage: ' + uploadError.message },
        { status: 500 }
      );
    }

    // 2. Retrieve public URL
    const { data: publicUrlData } = supabase.storage
      .from('media')
      .getPublicUrl(storagePath);

    const publicUrl = publicUrlData.publicUrl;

    // 3. Record in media_assets table
    const { data: assetRecord, error: dbError } = await supabase
      .from('media_assets')
      .insert([
        {
          filename: file.name,
          file_url: publicUrl,
          file_type: file.type,
          file_size: file.size,
          storage_path: storagePath,
          dimensions: 'Optimized',
          alt_text: altText || file.name.replace(/\.[^/.]+$/, ''),
        },
      ])
      .select('*')
      .single();

    if (dbError) {
      console.error('Supabase media_assets database insert error:', dbError);
      return NextResponse.json(
        { success: false, error: 'Failed to record asset in media library.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Asset uploaded and registered successfully.',
      asset: assetRecord,
    });
  } catch (err: any) {
    console.error('Server error processing media upload:', err);
    return NextResponse.json(
      { success: false, error: 'Internal server error processing media.' },
      { status: 500 }
    );
  }
}
