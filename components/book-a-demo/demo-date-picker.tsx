'use client';

import { useMemo, useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

import { cn } from '@/lib/utils';

const WEEKDAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'] as const;

type DemoDatePickerProps = {
  value?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  error?: string;
};

function toIsoDate(year: number, month: number, day: number): string {
  const paddedMonth = String(month + 1).padStart(2, '0');
  const paddedDay = String(day).padStart(2, '0');
  return `${year}-${paddedMonth}-${paddedDay}`;
}

function startOfToday(): Date {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getMondayFirstOffset(year: number, month: number): number {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1;
}

export function DemoDatePicker({ value, onChange, disabled, error }: DemoDatePickerProps) {
  const today = useMemo(() => startOfToday(), []);
  const [viewDate, setViewDate] = useState(() => {
    if (value) {
      const [year, month] = value.split('-').map(Number);
      return new Date(year, month - 1, 1);
    }
    return new Date(today.getFullYear(), today.getMonth(), 1);
  });

  const viewYear = viewDate.getFullYear();
  const viewMonth = viewDate.getMonth();
  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const leadingEmpty = getMondayFirstOffset(viewYear, viewMonth);

  const monthLabel = viewDate.toLocaleDateString('en-AU', {
    month: 'long',
    year: 'numeric',
  });

  const goToPreviousMonth = () => {
    setViewDate(new Date(viewYear, viewMonth - 1, 1));
  };

  const goToNextMonth = () => {
    setViewDate(new Date(viewYear, viewMonth + 1, 1));
  };

  const isPastDate = (day: number) => {
    const candidate = new Date(viewYear, viewMonth, day);
    candidate.setHours(0, 0, 0, 0);
    return candidate < today;
  };

  const selectedDay = value ? Number(value.split('-')[2]) : null;
  const selectedMonth = value ? Number(value.split('-')[1]) - 1 : null;
  const selectedYear = value ? Number(value.split('-')[0]) : null;

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
        <Calendar className="size-4 text-violet-600" aria-hidden />
        <span>
          Pick a date <span className="text-destructive">*</span>
        </span>
      </div>

      <div
        className={cn(
          'overflow-hidden rounded-xl border border-gray-200 bg-white',
          error && 'border-destructive',
          disabled && 'pointer-events-none opacity-60'
        )}
      >
        <div className="flex items-center justify-between bg-violet-700 px-4 py-3 text-white">
          <button
            type="button"
            onClick={goToPreviousMonth}
            disabled={disabled}
            className="inline-flex size-8 items-center justify-center rounded-md transition-colors hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            aria-label="Previous month"
          >
            <ChevronLeft className="size-4" />
          </button>
          <p className="text-sm font-semibold">{monthLabel}</p>
          <button
            type="button"
            onClick={goToNextMonth}
            disabled={disabled}
            className="inline-flex size-8 items-center justify-center rounded-md transition-colors hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            aria-label="Next month"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>

        <div className="p-4">
          <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-gray-400">
            {WEEKDAYS.map((day) => (
              <div key={day} className="py-1">
                {day}
              </div>
            ))}
          </div>

          <div className="mt-1 grid grid-cols-7 gap-1">
            {Array.from({ length: leadingEmpty }).map((_, index) => (
              <div key={`empty-${index}`} aria-hidden />
            ))}
            {Array.from({ length: daysInMonth }).map((_, index) => {
              const day = index + 1;
              const iso = toIsoDate(viewYear, viewMonth, day);
              const isSelected =
                selectedDay === day &&
                selectedMonth === viewMonth &&
                selectedYear === viewYear;
              const isDisabledDay = isPastDate(day);

              return (
                <button
                  key={day}
                  type="button"
                  disabled={disabled || isDisabledDay}
                  onClick={() => onChange(iso)}
                  className={cn(
                    'inline-flex h-9 w-full items-center justify-center rounded-md text-sm transition-colors',
                    isSelected
                      ? 'bg-violet-700 font-semibold text-white'
                      : 'text-gray-700 hover:bg-violet-50',
                    isDisabledDay && 'cursor-not-allowed text-gray-300 hover:bg-transparent'
                  )}
                  aria-pressed={isSelected}
                  aria-label={`${day} ${monthLabel}`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {error ? (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
