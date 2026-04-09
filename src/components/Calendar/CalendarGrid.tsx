import { useMemo } from "react";
import { useCalendarStore } from "../../store/useCalendarStore";
import { generateCalendar } from "../../utils/generateCalendar";
import DayCell from "./DayCell";
import { monthConfig } from "../../utils/monthConfig";

const CalendarGrid = () => {
  const currentMonth = useCalendarStore((s) => s.currentMonth);
  const currentYear = useCalendarStore((s) => s.currentYear);
  const nextMonth = useCalendarStore((s) => s.nextMonth);
  const prevMonth = useCalendarStore((s) => s.prevMonth);
  const setDirection = useCalendarStore((s) => s.setDirection);

  const theme = monthConfig[currentMonth];

  const days = useMemo(
    () => generateCalendar(currentMonth, currentYear),
    [currentMonth, currentYear],
  );

  return (
    <>
      <div className="flex justify-between mb-3">
        <button
          onClick={() => {
            prevMonth();
            setDirection("prev");
          }}
        >
          ←
        </button>
        <button
          onClick={() => {
            nextMonth();
            setDirection("next");
          }}
        >
          →
        </button>
      </div>
      <div className="grid grid-cols-7 gap-y-2 text-[10px] text-gray-500 mb-3 tracking-wide">
        {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((d) => (
          <div
            key={d}
            className={`text-center ${d === "SAT" || d === "SUN" ? theme.text : "text-gray-800"} font-bold`}
          >
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 text-sm text-center gap-y-2">
        {days.map((day, i) => (
          <DayCell key={i} day={day} />
        ))}
      </div>
    </>
  );
};

export default CalendarGrid;
