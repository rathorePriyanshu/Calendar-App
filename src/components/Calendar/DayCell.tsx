import {
  getHolidays,
  hasNoteForDate,
  isInRange,
} from "../../utils/dateHelpers";
import { useCalendarStore } from "../../store/useCalendarStore";
import { monthConfig } from "../../utils/monthConfig";

interface Props {
  day: {
    date: Date;
    currentMonth: boolean;
  };
}

const DayCell = ({ day }: Props) => {
  const range = useCalendarStore((s) => s.range);
  const hoverDate = useCalendarStore((s) => s.hoverDate);
  const currentMonth = useCalendarStore((s) => s.currentMonth);
  const notes = useCalendarStore((s) => s.notes);
  const setRange = useCalendarStore((s) => s.setRange);
  const setHoverDate = useCalendarStore((s) => s.setHoverDate);

  const isSameDay = (a: Date | null, b: Date | null) => {
    if (!a || !b) return false;

    return a.toDateString() === b.toDateString();
  };

  const inRange = isInRange(day.date, range.start, range.end, hoverDate);
  const theme = monthConfig[currentMonth];
  const holidays = getHolidays(day.date);
  const hasNotes = hasNoteForDate(day.date, notes);

  const handleClick = () => {
    if (!range.start || (range.start && range.end)) {
      setRange({ start: day.date, end: null });
    } else if (day.date.getTime() === range.start.getTime()) {
      setRange({ start: null, end: null });
    } else if (day.date < range.start) {
      setRange({ start: day.date, end: range.start });
    } else {
      setRange({ start: range.start, end: day.date });
    }
  };

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => setHoverDate(day.date)}
      onMouseLeave={() => setHoverDate(null)}
      title={holidays || ""}
      className={`relative flex items-center justify-center h-6 md:h-8 text-sm text-center cursor-pointer rounded-md
        transition ${day.currentMonth ? "text-gray-900" : "text-gray-400"} ${inRange ? `${theme.light}` : ""}
        ${isSameDay(day.date, range.start) ? `${theme.primary} text-white` : ""}
        ${isSameDay(day.date, range.end) ? `${theme.primary} text-white` : ""}`}
    >
      <span>{day.date.getDate()}</span>

      {holidays && (
        <span
          className={`absolute top-0 right-1 w-1.5 h-1.5 text-center cursor-pointer ${theme.primary} rounded-full`}
        />
      )}

      {hasNotes && (
        <span
          className={`absolute bottom-0 right-1 w-1.5 h-1.5 text-center cursor-pointer bg-red-500 rounded-full`}
        />
      )}
    </div>
  );
};

export default DayCell;
