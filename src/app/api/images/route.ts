import { NextRequest, NextResponse } from 'next/server';
import { uploadImage, deleteImage } from '@/lib/cloudinary';
import { requireAdmin } from '@/lib/auth';

// Handle image uploads
export async function POST(request: NextRequest) {
  try {
    // Check admin authorization
    const isAuthorized = await requireAdmin();
    if (!isAuthorized) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get the form data
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Convert File to Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary
    const result = await uploadImage(buffer);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error handling image upload:', error);
    return NextResponse.json(
      { error: 'Error uploading image' },
      { status: 500 }
    );
  }
}

// Handle image deletions
export async function DELETE(request: NextRequest) {
  try {
    // Check admin authorization
    const isAuthorized = await requireAdmin();
    if (!isAuthorized) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get publicId from URL
    const url = new URL(request.url);
    const publicId = url.searchParams.get('publicId');

    if (!publicId) {
      return NextResponse.json(
        { error: 'No publicId provided' },
        { status: 400 }
      );
    }

    // Delete from Cloudinary
    const result = await deleteImage(publicId);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error deleting image:', error);
    return NextResponse.json(
      { error: 'Error deleting image' },
      { status: 500 }
    );
  }
}
