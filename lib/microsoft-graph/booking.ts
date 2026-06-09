import {
  getDemoSchedulingConfig,
  isIsoDate,
  isTimeValue,
} from '@/lib/demo-scheduling/config';
import { formatDemoDateTime } from '@/lib/demo-scheduling/timezone';
import { getMicrosoftGraphAccessToken } from '@/lib/microsoft-graph/auth';
import { isDemoSlotAvailable } from '@/lib/microsoft-graph/availability';

export type BookDemoEventInput = {
  name: string;
  email: string;
  company: string;
  preferredDate: string;
  preferredTime: string;
};

type CreateEventResponse = {
  id?: string;
  onlineMeeting?: { joinUrl?: string };
  webLink?: string;
};

function getSlotDateTimes(date: string, time: string, slotMinutes: number, timeZone: string) {
  const [year, month, day] = date.split('-').map(Number);
  const [hour, minute] = time.split(':').map(Number);
  const endTotalMinutes = hour * 60 + minute + slotMinutes;
  const endHour = Math.floor(endTotalMinutes / 60);
  const endMinute = endTotalMinutes % 60;

  const startDateTime = `${date}T${time}:00`;
  const endDateTime = `${date}T${String(endHour).padStart(2, '0')}:${String(endMinute).padStart(2, '0')}:00`;

  return { startDateTime, endDateTime, timeZone };
}

export async function createTeamsDemoEvent(
  input: BookDemoEventInput
): Promise<{ formattedDateTime: string; teamsJoinUrl?: string }> {
  const { name, email, company, preferredDate, preferredTime } = input;

  if (!isIsoDate(preferredDate) || !isTimeValue(preferredTime)) {
    throw new Error('Invalid demo date or time.');
  }

  const config = getDemoSchedulingConfig();
  const slotStillAvailable = await isDemoSlotAvailable(preferredDate, preferredTime);

  if (!slotStillAvailable) {
    throw new Error('That time slot is no longer available. Please choose another time.');
  }

  const accessToken = await getMicrosoftGraphAccessToken();
  const { startDateTime, endDateTime, timeZone } = getSlotDateTimes(
    preferredDate,
    preferredTime,
    config.slotMinutes,
    config.timezone
  );

  const response = await fetch('https://graph.microsoft.com/v1.0/me/events', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      subject: `Your Safety Partners demo — ${company}`,
      body: {
        contentType: 'HTML',
        content: [
          `<p><strong>Demo booked via yoursafetypartners.com</strong></p>`,
          `<p><strong>Name:</strong> ${name}</p>`,
          `<p><strong>Email:</strong> ${email}</p>`,
          `<p><strong>Company:</strong> ${company}</p>`,
        ].join(''),
      },
      start: { dateTime: startDateTime, timeZone },
      end: { dateTime: endDateTime, timeZone },
      attendees: [
        {
          emailAddress: { address: email, name },
          type: 'required',
        },
      ],
      isOnlineMeeting: true,
      onlineMeetingProvider: 'teamsForBusiness',
    }),
    cache: 'no-store',
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Failed to create Teams calendar event: ${detail}`);
  }

  const event = (await response.json()) as CreateEventResponse;

  return {
    formattedDateTime: formatDemoDateTime(preferredDate, preferredTime, config.timezone),
    teamsJoinUrl: event.onlineMeeting?.joinUrl,
  };
}
