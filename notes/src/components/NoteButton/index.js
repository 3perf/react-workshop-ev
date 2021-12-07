import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { format } from "date-fns";
import { memo, useMemo } from "react";

function NoteButton({
  isActive,
  onNoteActivated,
  noteId,
  text,
  filterText,
  date,
}) {
  const className = [
    "notes-list__button",
    "notes-list__note",
    isActive && "notes-list__note_active",
  ]
    .filter((i) => i !== false)
    .join(" ");

  let firstLine = text
    .split("\n")
    .map((i) => i.trim())
    .filter((i) => i.length > 0)[0];

  const noteHeader = useMemo(
    () => generateNoteHeader(firstLine, filterText), // => { $$typeof: Symbol(react.element), type: "mark", props: { children: "bbb~~aa~~ccc~~aa~~c" } }
    [firstLine, firstLine.includes(filterText) ? filterText : null]
  );

  return (
    <button className={className} onClick={() => onNoteActivated(noteId)}>
      <span className="notes-list__note-meta">
        {format(date, "d MMM yyyy")}
      </span>
      {noteHeader}
    </button>
  );
}

function generateNoteHeader(firstLine, filterText) {
  // Wrap the filter text with a `<mark>` tag.
  // (The algorithm below is a bit buggy: if the note itself has any `~~something~~` entries,
  // they will be turned into `<mark>` as well. But this is alright for demo purposes.)
  let componentsMapping = {};
  if (
    filterText &&
    firstLine.toLowerCase().includes(filterText.toLowerCase())
  ) {
    // If `filterText` is `aa`, this splits `bbbbaacccaac` into ['bbb', 'aa', 'ccc', 'aa', 'c']
    // Based on example 2 in https://stackoverflow.com/a/25221523/1192426
    const firstLineParts = firstLine.split(
      new RegExp(
        "(" + filterText.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&") + ")",
        "gi"
      )
    );

    // This wraps all `filterText` entries with a `del` tag.
    // ['bbb', 'aa', 'ccc', 'aa', 'c'] => ['bbb', '~~aa~~', 'ccc', '~~aa~~', 'c'] => 'bbb~~aa~~ccc~~aa~~c'
    firstLine = firstLineParts
      .map((part) => {
        if (part.toLowerCase() === filterText.toLowerCase()) {
          return `~~${part}~~`;
        }

        return part;
      })
      .join("");

    // This ensures that all `filterText` entries are actually wrapped with `mark`, not with `del`
    componentsMapping = {
      del: "mark",
    };
  }

  return (
    <ReactMarkdown
      remarkPlugins={[gfm]}
      disallowedElements={["p", "h1", "h2", "h3", "h4", "h5", "h6"]}
      unwrapDisallowed={true}
      components={componentsMapping}
    >
      {firstLine}
    </ReactMarkdown>
  );
}

const NoteButtonMemo = memo(NoteButton);

export default NoteButtonMemo;
