export type CalendarDay = {
  date: Date;
  currentMonth: boolean;
};

export type Range = {
  start: Date | null;
  end: Date | null;
};

export type Note = {
  id: string;
  key: string;
  text: string;
};
