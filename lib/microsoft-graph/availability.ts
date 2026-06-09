import {
  getDemoSchedulingConfig,
  isIsoDate,
  type DemoSchedulingConfig,
} from '@/lib/demo-scheduling/config';
import { zonedDateTimeToUtcMs } from '@/lib/demo-scheduling/timezone';
import { getMicrosoftGraphAccessToken } from '@/lib/microsoft-graph/auth';

type CalendarEvent = {
  start?: { dateTime?: string; date?: string; timeZone?: string };
  end?: { dateTime?: string; date?: string; timeZone?: string };
  isAllDay?: boolean;
  showAs?: string;
};

type CalendarViewResponse = {
  value?: CalendarEvent[];
};

export type DemoTimeSlot = {
  time: string;
  label: string;
};

type BusyInterval = {
  startMs: number;
  endMs: number;
};

function parseGraphDateTimeToUtcMs(dateTime: string, timeZone: string): number | null {
  const normalized = dateTime.replace(/\.\d+/, '');
  const match = normalized.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/);
  if (!match) return null;

  return zonedDateTimeToUtcMs(
    Number(match[1]),
    Number(match[2]),
    Number(match[3]),
    Number(match[4]),
    Number(match[5]),
    timeZone
  );
}

function parseEventStartMs(event: CalendarEvent, timeZone: string): number | null {
  if (event.isAllDay && event.start?.date) {
    const [year, month, day] = event.start.date.split('-').map(Number);
    return zonedDateTimeToUtcMs(year, month, day, 0, 0, timeZone);
  }

  if (!event.start?.dateTime) return null;
  if (event.start.dateTime.endsWith('Z')) {
    return Date.parse(event.start.dateTime);
  }

  return parseGraphDateTimeToUtcMs(event.start.dateTime, timeZone);
}

function parseEventEndMs(event: CalendarEvent, timeZone: string): number | null {
  if (event.isAllDay && event.end?.date) {
    const [year, month, day] = event.end.date.split('-').map(Number);
    return zonedDateTimeToUtcMs(year, month, day, 0, 0, timeZone);
  }

  if (!event.end?.dateTime) return null;
  if (event.end.dateTime.endsWith('Z')) {
    return Date.parse(event.end.dateTime);
  }

  return parseGraphDateTimeToUtcMs(event.end.dateTime, timeZone);
}

function formatTime(hour: number, minute: number): string {
  return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
}

function getWeekdayInTimeZone(date: string, timeZone: string): number {
  const [year, month, day] = date.split('-').map(Number);
  const utcMs = zonedDateTimeToUtcMs(year, month, day, 12, 0, timeZone);
  const weekday = new Intl.DateTimeFormat('en-US', {
    timeZone,
    weekday: 'short',
  }).format(new Date(utcMs));

  const map: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };

  return map[weekday] ?? 0;
}

function generateCandidateSlots(date: string, config: DemoSchedulingConfig): string[] {
  const [year, month, day] = date.split('-').map(Number);
  const slots: string[] = [];

  for (let hour = config.startHour; hour < config.endHour; hour++) {
    for (let minute = 0; minute < 60; minute += config.slotMinutes) {
      const slotEndMinute = minute + config.slotMinutes;
      const slotEndHour = hour + Math.floor(slotEndMinute / 60);
      const normalizedEndMinute = slotEndMinute % 60;

      if (
        slotEndHour > config.endHour ||
        (slotEndHour === config.endHour && normalizedEndMinute > 0)
      ) {
        continue;
      }

      slots.push(formatTime(hour, minute));
    }
  }

  const now = Date.now();
  return slots.filter((time) => {
    const [hour, minute] = time.split(':').map(Number);
    const slotStartMs = zonedDateTimeToUtcMs(year, month, day, hour, minute, config.timezone);
    const slotEndMs = slotStartMs + config.slotMinutes * 60 * 1000;
    return slotEndMs > now;
  });
}

function overlaps(
  slotStartMs: number,
  slotEndMs: number,
  busyStartMs: number,
  busyEndMs: number
): boolean {
  return slotStartMs < busyEndMs && slotEndMs > busyStartMs;
}

async function fetchBusyIntervals(date: string, config: DemoSchedulingConfig): Promise<BusyInterval[]> {
  const accessToken = await getMicrosoftGraphAccessToken();
  const [year, month, day] = date.split('-').map(Number);
  const dayStartMs = zonedDateTimeToUtcMs(year, month, day, 0, 0, config.timezone);
  const dayEndMs = zonedDateTimeToUtcMs(year, month, day + 1, 0, 0, config.timezone);

  const startDateTime = new Date(dayStartMs).toISOString();
  const endDateTime = new Date(dayEndMs).toISOString();

  const response = await fetch(
    `https://graph.microsoft.com/v1.0/me/calendarView?startDateTime=${encodeURIComponent(startDateTime)}&endDateTime=${encodeURIComponent(endDateTime)}&$select=start,end,isAllDay,showAs`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Prefer: `outlook.timezone="${config.timezone}"`,
      },
      cache: 'no-store',
    }
  );

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Failed to read Teams calendar availability: ${detail}`);
  }

  const data = (await response.json()) as CalendarViewResponse;
  const events = data.value ?? [];

  return events
    .filter((event) => event.showAs !== 'free')
    .map((event) => {
      const startMs = parseEventStartMs(event, config.timezone);
      const endMs = parseEventEndMs(event, config.timezone);
      if (startMs == null || endMs == null) return null;
      return { startMs, endMs };
    })
    .filter((interval): interval is BusyInterval => interval !== null);
}

export async function getAvailableDemoSlots(date: string): Promise<DemoTimeSlot[]> {
  if (!isIsoDate(date)) {
    throw new Error('Invalid date format. Expected YYYY-MM-DD.');
  }

  const config = getDemoSchedulingConfig();
  const weekday = getWeekdayInTimeZone(date, config.timezone);

  if (!config.workDays.has(weekday)) {
    return [];
  }

  const [year, month, day] = date.split('-').map(Number);
  const candidateSlots = generateCandidateSlots(date, config);
  const busyIntervals = await fetchBusyIntervals(date, config);

  return candidateSlots
    .filter((time) => {
      const [hour, minute] = time.split(':').map(Number);
      const slotStartMs = zonedDateTimeToUtcMs(year, month, day, hour, minute, config.timezone);
      const slotEndMs = slotStartMs + config.slotMinutes * 60 * 1000;

      return !busyIntervals.some((busy) =>
        overlaps(slotStartMs, slotEndMs, busy.startMs, busy.endMs)
      );
    })
    .map((time) => {
      const [hour, minute] = time.split(':').map(Number);
      return {
        time,
        label: new Intl.DateTimeFormat('en-AU', {
          timeZone: config.timezone,
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        }).format(
          new Date(zonedDateTimeToUtcMs(year, month, day, hour, minute, config.timezone))
        ),
      };
    });
}

export async function isDemoSlotAvailable(date: string, time: string): Promise<boolean> {
  const slots = await getAvailableDemoSlots(date);
  return slots.some((slot) => slot.time === time);
}
