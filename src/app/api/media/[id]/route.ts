import { NextRequest, NextResponse } from 'next/server';
import { createAdminSupabaseClient } from '@/lib/supabase-admin';

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const supabase = createAdminSupabaseClient();

    // 1. Get asset details to check storage_path
    const { data: asset, error: fetchError } = await supabase
      .from('media_assets')
      .select('*')
      .eq('id', id)
      .single();

    if (fetchError || !asset) {
      return NextResponse.json(
        { success: false, error: 'Asset not found.' },
        { status: 404 }
      );
    }

    // 2. Delete from Supabase Storage bucket if it has storage_path
    if (asset.storage_path) {
      const { error: storageError } = await supabase.storage
        .from('media')
        .remove([asset.storage_path]);

      if (storageError) {
        console.warn('Could not remove file from storage:', storageError);
      }
    }

    // 3. Delete from media_assets table
    const { error: deleteError } = await supabase
      .from('media_assets')
      .delete()
      .eq('id', id);

    if (deleteError) {
      return NextResponse.json(
        { success: false, error: deleteError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Asset deleted successfully.',
    });
  } catch (err: any) {
    console.error('Error deleting media asset:', err);
    return NextResponse.json(
      { success: false, error: 'Internal server error.' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await req.json();
    const { alt_text, filename } = body;

    const supabase = createAdminSupabaseClient();
    const updatePayload: Record<string, any> = {};
    if (alt_text !== undefined) updatePayload.alt_text = alt_text;
    if (filename !== undefined) updatePayload.filename = filename;

    const { data: updated, error } = await supabase
      .from('media_assets')
      .update(updatePayload)
      .eq('id', id)
      .select('*')
      .single();

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      asset: updated,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
