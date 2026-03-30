import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';
import { loadConfig } from '@/lib/config';
import { getContentRoot } from '@/lib/content/reader';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path: segments } = await params;
  const filename = segments.join('/');

  // Sanitize: only allow PDF files, no directory traversal
  if (filename.includes('..') || !filename.endsWith('.pdf')) {
    return new NextResponse('Not found', { status: 404 });
  }

  const config = await loadConfig();
  const contentRoot = getContentRoot(config);
  const filePath = path.join(contentRoot, 'references', filename);

  try {
    const data = await readFile(filePath);
    return new NextResponse(data, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="${path.basename(filename)}"`,
        'Cache-Control': 'public, max-age=86400',
      },
    });
  } catch {
    return new NextResponse('Not found', { status: 404 });
  }
}
