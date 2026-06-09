'use client';

import { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

import { cn } from '@/lib/utils';

type DemoSlot = {
  time: string;
  label: string;
};

type AvailabilityResponse = {
  configured?: boolean;
  slots?: DemoSlot[];
  error?: string;
};

type DemoTimeSlotPickerProps = {
  date?: string;
  value?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  error?: string;
};

export function DemoTimeSlotPicker({
  date,
  value,
  onChange,
  disabled,
  error,
}: DemoTimeSlotPickerProps) {
  const [slots, setSlots] = useState<DemoSlot[]>([]);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!date) {
      setSlots([]);
      setStatusMessage(null);
      return;
    }

    let cancelled = false;

    const loadSlots = async () => {
      setLoading(true);
      setStatusMessage(null);

      try {
        const response = await fetch(`/api/demo/availability?date=${encodeURIComponent(date)}`);
        const data = (await response.json()) as AvailabilityResponse;

        if (cancelled) return;

        if (!response.ok) {
          setSlots([]);
          setStatusMessage(data.error ?? 'Unable to load available times.');
          onChange('');
          return;
        }

        const nextSlots = data.slots ?? [];
        setSlots(nextSlots);

        if (nextSlots.length === 0) {
          setStatusMessage('No available times on this date. Please choose another day.');
          onChange('');
        }
      } catch {
        if (!cancelled) {
          setSlots([]);
          setStatusMessage('Unable to load available times. Please try again.');
          onChange('');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void loadSlots();

    return () => {
      cancelled = true;
    };
  }, [date, onChange]);

  if (!date) {
    return null;
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
        <Clock className="size-4 text-violet-600" aria-hidden />
        <span>
          Pick a time <span className="text-destructive">*</span>
        </span>
      </div>

      <div
        className={cn(
          'rounded-xl border border-gray-200 bg-white p-3',
          error && 'border-destructive',
          disabled && 'pointer-events-none opacity-60'
        )}
      >
        {loading ? (
          <p className="px-1 py-2 text-sm text-gray-500">Loading available times…</p>
        ) : slots.length > 0 ? (
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {slots.map((slot) => {
              const isSelected = value === slot.time;
              return (
                <button
                  key={slot.time}
                  type="button"
                  disabled={disabled}
                  onClick={() => onChange(slot.time)}
                  className={cn(
                    'rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors',
                    isSelected
                      ? 'border-violet-700 bg-violet-700 text-white'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-violet-300 hover:bg-violet-50 hover:text-violet-700'
                  )}
                  aria-pressed={isSelected}
                >
                  {slot.label}
                </button>
              );
            })}
          </div>
        ) : (
          <p className="px-1 py-2 text-sm text-gray-500">
            {statusMessage ?? 'No available times on this date.'}
          </p>
        )}
      </div>

      {error ? (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
