import { NextResponse } from 'next/server';

import { isIsoDate } from '@/lib/demo-scheduling/config';
import { getAvailableDemoSlots } from '@/lib/microsoft-graph/availability';
import { isMicrosoftCalendarConfigured } from '@/lib/microsoft-graph/config';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get('date')?.trim() ?? '';

  if (!isIsoDate(date)) {
    return NextResponse.json({ error: 'A valid date query parameter is required.' }, { status: 400 });
  }

  if (!isMicrosoftCalendarConfigured()) {
    return NextResponse.json(
      {
        error: 'Teams calendar booking is not configured yet.',
        configured: false,
        slots: [],
      },
      { status: 503 }
    );
  }

  try {
    const slots = await getAvailableDemoSlots(date);
    return NextResponse.json({ configured: true, slots });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to load availability.';
    return NextResponse.json({ error: message, configured: true, slots: [] }, { status: 500 });
  }
}
