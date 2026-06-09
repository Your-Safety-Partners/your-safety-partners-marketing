const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const TIME_RE = /^([01]\d|2[0-3]):([0-5]\d)$/;

export type DemoSchedulingConfig = {
  timezone: string;
  slotMinutes: number;
  startHour: number;
  endHour: number;
  workDays: Set<number>;
};

function parseWorkDays(raw: string | undefined): Set<number> {
  const fallback = new Set([1, 2, 3, 4, 5]);
  if (!raw?.trim()) return fallback;

  const days = raw
    .split(',')
    .map((part) => Number.parseInt(part.trim(), 10))
    .filter((day) => day >= 0 && day <= 6);

  return days.length > 0 ? new Set(days) : fallback;
}

export function getDemoSchedulingConfig(): DemoSchedulingConfig {
  return {
    timezone: process.env.DEMO_SCHEDULING_TIMEZONE?.trim() || 'Australia/Sydney',
    slotMinutes: Number.parseInt(process.env.DEMO_SCHEDULING_SLOT_MINUTES ?? '30', 10) || 30,
    startHour: Number.parseInt(process.env.DEMO_SCHEDULING_START_HOUR ?? '9', 10) || 9,
    endHour: Number.parseInt(process.env.DEMO_SCHEDULING_END_HOUR ?? '17', 10) || 17,
    workDays: parseWorkDays(process.env.DEMO_SCHEDULING_WORK_DAYS),
  };
}

export function isIsoDate(value: string): boolean {
  return ISO_DATE_RE.test(value);
}

export function isTimeValue(value: string): boolean {
  return TIME_RE.test(value);
}
