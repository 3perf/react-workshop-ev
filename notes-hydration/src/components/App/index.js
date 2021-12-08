import { formatISO } from "date-fns/esm";
import Jabber from "jabber";
import { nanoid } from "nanoid";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateLastActiveDate } from "../../store/userReducer";
import { deleteNotes, getNotes, putNote } from "../../utils/storage";
import NotesList from "../NotesList";
import AppPrimaryPane from "../AppPrimaryPane";
import "./index.css";

const jabber = new Jabber();

function App() {
  const [notes, setNotes] = useState(getNotes());

  const notesArray = Object.values(notes).sort(
    (a, b) => b.date.getTime() - a.date.getTime()
  );
  const [activeNoteId, setActiveNoteId] = useState(
    notesArray.length > 0 ? notesArray[0].id : null
  );

  const dispatch = useDispatch();

  const saveNote = (id, { text, date }) => {
    putNote(id, { text, date });

    const newNotes = getNotes();
    setNotes(newNotes);

    dispatch(updateLastActiveDate(formatISO(new Date()).split("T")[0]));
  };

  const createNewNotes = ({ count, paragraphs }) => {
    for (let i = 0; i < count; i++) {
      const noteId = nanoid();

      let noteText = jabber.createParagraph(6);
      for (let j = 0; j < paragraphs; j++) {
        let line = jabber.createParagraph(30);

        noteText += "\n\n" + line;
      }

      // Make random words bold or italic
      noteText = noteText
        .split("\n")
        .map((line) =>
          line
            .split(" ")
            .filter(Boolean)
            .map((word) => {
              if (Math.random() < 0.05) {
                return "**" + word + "**";
              }

              if (Math.random() < 0.05) {
                return "_" + word + "_";
              }

              return word;
            })
            .join(" ")
        )
        .join("\n");

      putNote(noteId, { text: noteText });
    }

    const newNotes = getNotes();
    setNotes(newNotes);

    // For convenience, if only a single note was created, activate it
    if (count === 1) {
      const noteIds = Object.keys(newNotes);
      setActiveNoteId(noteIds[noteIds.length - 1]);
    }
  };

  const deleteAllNotes = () => {
    deleteNotes();

    const newNotes = getNotes();
    setNotes(newNotes);
    setActiveNoteId(null);
  };

  return (
    <div className="notes">
      <div className="notes__column notes__column_list">
        <h1>NoteList</h1>
        <div className="notes__column-content">
          <NotesList
            notes={notes}
            activeNoteId={activeNoteId}
            onNoteActivated={setActiveNoteId}
            onNewNotesRequested={createNewNotes}
            onDeleteAllRequested={deleteAllNotes}
          />
        </div>
      </div>
      <div className="notes__column notes__column_primary">
        <div className="notes__column-content">
          <AppPrimaryPane
            activeNoteId={activeNoteId}
            notes={notes}
            saveNote={saveNote}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
