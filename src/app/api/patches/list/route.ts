import { NextRequest, NextResponse } from 'next/server';
import { listPatches } from '@/lib/content/reader';
import { loadConfig } from '@/lib/config';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const instrument = searchParams.get('instrument');

    if (!instrument) {
      return NextResponse.json(
        { error: 'Missing required query parameter: instrument' },
        { status: 400 },
      );
    }

    const config = await loadConfig();
    const patches = await listPatches(instrument, config);

    const result = patches.map((p) => ({
      slug: p.slug,
      name: p.data.name,
      type: p.data.type,
      sysexData: p.sysexData,
    }));

    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
