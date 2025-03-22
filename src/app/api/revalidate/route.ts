import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { withAdmin } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    return await withAdmin(async () => {
      const path = request.nextUrl.searchParams.get('path');
      if (!path) {
        return NextResponse.json({ error: 'Path is required' }, { status: 400 });
      }

      revalidatePath(path);
      return NextResponse.json({ revalidated: true, now: Date.now() });
    });
  } catch (error) {
    console.error('Revalidation error:', error);
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}
