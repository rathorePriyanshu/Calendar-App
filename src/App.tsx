import { useEffect } from "react";
import CalendarPage from "./components/Calendar/CalendarPage";
import { useCalendarStore } from "./store/useCalendarStore";

function App() {
  const loadNotes = useCalendarStore((s) => s.loadNotes);

  useEffect(() => {
    loadNotes();
  }, []);

  return <CalendarPage />;
}

export default App;
