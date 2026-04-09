import { create } from "zustand";
import type { Note, Range } from "../types";

interface CalendarStore {
  currentYear: number;
  currentMonth: number;
  range: Range;
  hoverDate: Date | null;
  notes: Note[];
  direction: "next" | "prev" | null;

  setMonth: (month: number) => void;
  setYear: (year: number) => void;
  nextMonth: () => void;
  prevMonth: () => void;
  setRange: (range: Range) => void;
  setHoverDate: (hover: Date | null) => void;
  addNote: (note: Note) => void;
  deleteNote: (id: string) => void;
  getNotesByKey: (key: string) => Note[];
  loadNotes: () => void;
  setDirection: (dir: "next" | "prev" | null) => void;
}

export const useCalendarStore = create<CalendarStore>()((set, get) => ({
  currentYear: new Date().getFullYear(),
  currentMonth: new Date().getMonth(),
  range: { start: null, end: null },
  hoverDate: null,
  notes: [],
  direction: null,

  setMonth: (month: number) => set({ currentMonth: month }),
  setYear: (year: number) => set({ currentYear: year }),
  nextMonth: () =>
    set((state) => {
      let m = state.currentMonth + 1;
      let y = state.currentYear;

      if (m > 11) {
        m = 0;
        y++;
      }

      return { currentMonth: m, currentYear: y };
    }),
  prevMonth: () =>
    set((state) => {
      let m = state.currentMonth - 1;
      let y = state.currentYear;

      if (m < 0) {
        m = 11;
        y--;
      }

      return { currentMonth: m, currentYear: y };
    }),
  setRange: (range) => set({ range }),
  setHoverDate: (hover) => set({ hoverDate: hover }),
  addNote: (note) =>
    set((state) => {
      const updated = [...state.notes, note];
      localStorage.setItem("notes", JSON.stringify(updated));
      return { notes: updated };
    }),
  deleteNote: (id) =>
    set((state) => {
      const updated = state.notes.filter((note) => note.id !== id);
      localStorage.setItem("notes", JSON.stringify(updated));
      return { notes: updated };
    }),
  getNotesByKey: (key) => {
    return get().notes.filter((n) => n.key === key);
  },
  loadNotes: () =>
    set(() => {
      const saved = JSON.parse(localStorage.getItem("notes") || "[]");
      return { notes: saved };
    }),
  setDirection: (dir) => set({ direction: dir }),
}));
