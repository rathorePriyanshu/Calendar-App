import { useEffect } from "react";
import { useCalendarStore } from "../../store/useCalendarStore";
import { monthConfig } from "../../utils/monthConfig";

const HeroSection = () => {
  const currentMonth = useCalendarStore((s) => s.currentMonth);
  const currentYear = useCalendarStore((s) => s.currentYear);

  const theme = monthConfig[currentMonth];

  useEffect(() => {
    const next = new Image();
    next.src = monthConfig[(currentMonth + 1) % 12].image;
  }, [currentMonth]);

  return (
    <div className="relative h-[180px] md:h-[280px] bg-white overflow-hidden">
      <div
        className={`absolute w-full h-full ${theme.primary} z-0`}
        style={{ clipPath: "polygon(100% 1%, 0 0, 0 100%)" }}
      ></div>
      <img
        src={theme.image}
        className="absolute w-full h-full object-cover z-20"
        style={{
          clipPath:
            "polygon(100% 0%, 0% 0%, 0% 72%, 20% 89%, 23% 90%, 26% 92%, 30% 93%, 35% 91%, 38% 88%, 42% 85%, 100% 40%)",
        }}
        loading="lazy"
      />
      <div
        className={`absolute w-full h-full ${theme.primary} z-10`}
        style={{
          clipPath:
            "polygon(0 0, 100% 0, 100% 78%, 84% 93%, 78% 95%, 72% 94%, 0 40%)",
        }}
      ></div>

      <div
        className={`absolute bottom-8 right-4 md:bottom-12 md:right-12 ${theme.primary}text-white z-30 text-right`}
      >
        <p className="text-[10px] md:text-sm text-white opacity-80 tracking-wide">
          {currentYear}
        </p>
        <h2 className="font-bold text-white text-xs md:text-xl tracking-wider">
          {theme.name}
        </h2>
      </div>
    </div>
  );
};

export default HeroSection;
