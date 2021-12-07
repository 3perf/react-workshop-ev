import { formatISO, parseISO } from "date-fns";

let notes;

const loadNotesFromLocalStorage = () => {
  const parsedNotes = JSON.parse(localStorage.reactWorkshopAppNotes || "{}");

  const transformedNotes = Object.fromEntries(
    Object.entries(parsedNotes).map(([id, note]) => {
      const transformedNote = { ...note, date: parseISO(note.date) };
      return [id, transformedNote];
    })
  );

  return transformedNotes;
};

const saveNotesToLocalStorage = (notes) => {
  const transformedNotes = Object.fromEntries(
    Object.entries(notes).map(([id, note]) => {
      const transformedNote = { ...note, date: formatISO(note.date) };
      return [id, transformedNote];
    })
  );

  const stringifiedNotes = JSON.stringify(transformedNotes);

  localStorage.reactWorkshopAppNotes = stringifiedNotes;
};

export const getNotes = () => {
  if (!notes) {
    notes = loadNotesFromLocalStorage();
  }

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

  saveNotesToLocalStorage(notes);
};

export const deleteNotes = () => {
  notes = {};

  saveNotesToLocalStorage(notes);
};
