import NotesPanel from "../Notes/NotesPanel";
import CalendarGrid from "./CalendarGrid";
import HeroSection from "./HeroSection";

const CalendarCard = () => {
  return (
    <div className="relative w-full max-w-[420px] sm:max-w-[480px] md:max-w-[520px] shadow-[0px_10px_13px_-7px_#000000,-50px_15px_43px_7px_rgba(60,60,60,0.6)] overflow-hidden rounded-md bg-white">
      <HeroSection />
      <div className="flex flex-col md:flex-row px-3 pb-4 md:px-5 md:pb-6 gap-4 md:gap-6">
        <div className="w-full order-2 md:order-1 md:w-1/3 pr-2">
          <NotesPanel />
        </div>

        <div className="w-full order-1 mt-1 md:order-2 md:w-2/3">
          <CalendarGrid />
        </div>
      </div>
    </div>
  );
};

export default CalendarCard;
