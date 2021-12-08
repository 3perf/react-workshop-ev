import { parseISO } from "date-fns";
import defaultNotes from "./notes.json";

const transformNotesFromJson = (importedNotes) => {
  const transformedNotes = Object.fromEntries(
    Object.entries(importedNotes).map(([id, note]) => {
      const transformedNote = { ...note, date: parseISO(note.date) };
      return [id, transformedNote];
    })
  );

  return transformedNotes;
};

let notes = transformNotesFromJson(defaultNotes);

export const getNotes = () => {
  return notes;
};

export const putNote = (noteId, { text, date }) => {
  if (notes[noteId]) {
    // The note already exists; just update it
    notes = {
      ...notes,
      [noteId]: {
        ...notes[noteId],
        text: text || notes[noteId].text,
        date: date || notes[noteId].date,
      },
    };
  } else {
    // The note doesn’t exist; create it, filling the creation date
    notes = {
      ...notes,
      [noteId]: {
        id: noteId,
        text: text,
        date: date || new Date(),
      },
    };
  }
};

export const deleteNotes = () => {
  notes = {};
};
