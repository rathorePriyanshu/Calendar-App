import { useState } from "react";
import { useCalendarStore } from "../../store/useCalendarStore";
import {
  getHolidays,
  getNoteKey,
  getNotesForDate,
} from "../../utils/dateHelpers";

const NotesPanel = () => {
  const range = useCalendarStore((state) => state.range);
  const addNote = useCalendarStore((state) => state.addNote);
  const deleteNote = useCalendarStore((state) => state.deleteNote);
  const allNotes = useCalendarStore((state) => state.notes);

  const [text, setText] = useState("");
  const key = getNoteKey(range.start, range.end);
  const notes = range.start ? getNotesForDate(range.start, allNotes) : [];
  const holiday = range.start ? getHolidays(range.start) : null;

  const handleAddNote = () => {
    if (!key || !text.trim()) return;

    addNote({
      id: crypto.randomUUID(),
      key,
      text: text.trim(),
    });
    setText("");
  };

  const handleDeleteNote = (id: string) => {
    deleteNote(id);
  };

  if (!range.start) {
    return (
      <>
        <div className="text-xs text-gray-400">Select a date to add notes</div>
        <div className="space-y-2 hidden md:block mt-4 md:mt-0">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="border-b border-gray-500 opacity-60 p-2"
            ></div>
          ))}
        </div>
      </>
    );
  }

  return (
    <div className="flex flex-col">
      <p className="text-[12px] text-gray-500 mb-2 tracking-wider">NOTES</p>

      <p className="text-gray-700 mb-2 text-[11px]">
        {range.start.toDateString()}
        {range.end && ` → ${range.end.toDateString()}`}
      </p>
      {holiday && <div className="text-xs text-red-500 mb-2">🎉 {holiday}</div>}

      <p className="text-[12px] text-gray-400 mb-2">
        {range.end ? "Range Note" : "Date Note"}
      </p>

      <div className="flex flex-col gap-1 mb-3">
        <input
          type="text"
          placeholder="Add a note..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="border border-gray-300 text-xs px-2 py-1 outline-none focus:border-blue-400"
        />
        <button
          onClick={handleAddNote}
          className="text-xs bg-blue-500 text-white py-1 rounded hover:bg-blue-600"
        >
          Add Note
        </button>
      </div>

      <div className="flex flex-col gap-2">
        {notes.length === 0 && (
          <p className="text-xs text-gray-400">No notes yet</p>
        )}

        {notes.map((note) => (
          <div
            key={note.id}
            className="flex justify-between items-center bg-gray-100 px-2 py-1 rounded text-xs"
          >
            <span className="truncate">{note.text}</span>

            <button
              onClick={() => handleDeleteNote(note.id)}
              className="text-red-400 hover:text-red-600 ml-2"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotesPanel;
