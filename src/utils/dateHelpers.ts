import type { Note } from "../types";
import { dynamicHolidays2026, fixedHolidays } from "./constant";

export const isInRange = (
  date: Date,
  start: Date | null,
  end: Date | null,
  hover: Date | null,
) => {
  if (!start) return false;

  const normalize = (d: Date) => {
    const x = new Date(d);
    x.setHours(0, 0, 0, 0);
    return x;
  };

  const d = normalize(date);
  const s = normalize(start);

  if (end) {
    const e = normalize(end);

    const min = s < e ? s : e;
    const max = s > e ? s : e;

    return d >= min && d <= max;
  }

  if (hover) {
    const h = normalize(hover);

    const min = s < h ? s : h;
    const max = s > h ? s : h;

    return d >= min && d <= max;
  }

  return false;
};

export const getNoteKey = (start: Date | null, end: Date | null) => {
  if (!start) return null;

  const format = (d: Date) => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  if (start && end) {
    const s = format(start);
    const e = format(end);

    return s <= e ? `${s}_to_${e}` : `${e}_to_${s}`;
  }

  return format(start);
};

export const getNotesForDate = (date: Date, notes: Note[]) => {
  const normalize = (d: Date) => {
    const x = new Date(d);
    x.setHours(0, 0, 0, 0);
    return x;
  };

  const selected = normalize(date);

  return notes.filter((note) => {
    if (note.key.includes("_to_")) {
      const [startStr, endStr] = note.key.split("_to_");

      const start = normalize(new Date(startStr));
      const end = normalize(new Date(endStr));

      const min = start < end ? start : end;
      const max = start > end ? start : end;

      return selected >= min && selected <= max;
    }

    const noteDate = normalize(new Date(note.key));
    return selected.getTime() === noteDate.getTime();
  });
};

export const getHolidays = (date: Date) => {
  const key = `${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

  if (date.getFullYear() === 2026) {
    return dynamicHolidays2026[key] || fixedHolidays[key];
  }
};

export const hasNoteForDate = (date: Date, notes: Note[]) => {
  const normalize = (d: Date) => {
    const x = new Date(d);
    x.setHours(0, 0, 0, 0);
    return x;
  };

  const d = normalize(date);

  for (const note of notes) {
    if (note.key.includes("_to_")) {
      const [startStr, endStr] = note.key.split("_to_");

      const start = normalize(new Date(startStr));
      const end = normalize(new Date(endStr));

      const min = start < end ? start : end;
      const max = start > end ? start : end;

      if (d >= min && d <= max) return true;
    } else {
      const noteDate = normalize(new Date(note.key));
      if (d.getTime() === noteDate.getTime()) return true;
    }
  }

  return false;
};
