import { NextRequest, NextResponse } from 'next/server';
import { saveCapturedPatch, type CapturedPatchInput } from '@/lib/content/writer';
import { loadConfig } from '@/lib/config';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const input: CapturedPatchInput = {
      name: body.name,
      type: body.type,
      tags: body.tags ?? [],
      instrument: body.instrument,
      description: body.description ?? '',
      parameters: body.parameters,
      sequencer: body.sequencer,
      programNumber: body.programNumber,
    };

    if (!input.name || !input.type || !input.instrument || !input.parameters) {
      return NextResponse.json(
        { error: 'Missing required fields: name, type, instrument, parameters' },
        { status: 400 },
      );
    }

    const config = await loadConfig();
    const result = await saveCapturedPatch(input, config);

    return NextResponse.json(
      { slug: result.slug, mdPath: result.mdPath, jsonPath: result.jsonPath },
      { status: 201 },
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
