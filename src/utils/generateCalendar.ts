import type { CalendarDay } from "../types";

export const generateCalendar = (
  month: number,
  year: number,
): CalendarDay[] => {
  const result: CalendarDay[] = [];

  const firstDay = new Date(Date.UTC(year, month, 1));
  const startDay = (firstDay.getUTCDay() + 6) % 7;

  const daysInMonth = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  const daysInPrevMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();

  for (let i = startDay; i > 0; i--) {
    result.push({
      date: new Date(Date.UTC(year, month - 1, daysInPrevMonth - i + 1)),
      currentMonth: false,
    });
  }

  for (let d = 1; d <= daysInMonth; d++) {
    result.push({
      date: new Date(Date.UTC(year, month, d)),
      currentMonth: true,
    });
  }

  let nextDay = 1;
  while (result.length < 42) {
    result.push({
      date: new Date(Date.UTC(year, month + 1, nextDay++)),
      currentMonth: false,
    });
  }

  return result;
};
