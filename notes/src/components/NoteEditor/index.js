import CodeMirror from "react-codemirror";
import "codemirror/mode/markdown/markdown";
import "codemirror/lib/codemirror.css";
import "./index.css";

function NoteEditor({ notes, activeNoteId, saveNote }) {
  const currentNote = notes[activeNoteId];

  return (
    <div className="note-editor">
      <CodeMirror
        key={activeNoteId}
        value={currentNote.text}
        onChange={(text) => saveNote({ text })}
        options={{
          mode: "markdown",
          lineWrapping: true,
        }}
      />
    </div>
  );
}

export default NoteEditor;
