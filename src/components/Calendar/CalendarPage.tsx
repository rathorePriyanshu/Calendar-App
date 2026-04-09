import { AnimatePresence, motion } from "framer-motion";
import CalendarCard from "./CalendarCard";
import { useCalendarStore } from "../../store/useCalendarStore";

const CalendarPage = () => {
  const currentMonth = useCalendarStore((s) => s.currentMonth);
  const currentYear = useCalendarStore((s) => s.currentYear);
  const direction = useCalendarStore((s) => s.direction);

  const key = `${currentMonth}-${currentYear}`;
  return (
    <div className="min-h-screen bg-[#e5e7eb] flex items-center px-3 py-4 justify-center [perspective:1200px]">
      <AnimatePresence mode="wait">
        <motion.div
          className="w-full flex justify-center"
          key={key}
          initial={{
            rotateY: direction === "next" ? 90 : -90,
            opacity: 0,
          }}
          animate={{ rotateY: 0, opacity: 1 }}
          exit={{
            rotateY: direction === "next" ? -90 : 90,
            opacity: 0,
          }}
          transition={{ duration: 0.5 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <CalendarCard />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default CalendarPage;
