import { useState, useCallback } from "react";
import { Button, ButtonGroup } from "@material-ui/core";
import "./index.css";
import FilterInput from "../FilterInput";
import NoteButton from "../NoteButton";

function NotesList({
  notes,
  activeNoteId,
  onNoteActivated,
  onNewNotesRequested,
  onDeleteAllRequested,
}) {
  const [filter, setFilter] = useState("");

  return (
    <div className="notes-list" style={{ position: "relative" }}>
      <div className="notes-list__filter">
        <FilterInput
          filter={filter}
          onChange={setFilter}
          noteCount={Object.keys(notes).length}
        />
      </div>

      <div className="notes-list__notes">
        {Object.values(notes)
          .sort((a, b) => b.date.getTime() - a.date.getTime())
          .filter(({ text }) => {
            if (!filter) {
              return true;
            }

            return text.toLowerCase().includes(filter.toLowerCase());
          })
          .map(({ id, text, date }) => {
            return (
              <NoteButtonOptimized
                key={id}
                onNoteActivated={onNoteActivated}
                id={id}
                activeNoteId={activeNoteId}
                text={text}
                filter={filter}
                date={date}
              />
            );
          })}
      </div>

      <div className="notes-list__controls">
        <ButtonGroup size="small">
          <Button
            classes={{ root: "notes-list__control" }}
            onClick={() => onNewNotesRequested({ count: 1, paragraphs: 1 })}
          >
            + Note
          </Button>
          <Button
            classes={{ root: "notes-list__control" }}
            onClick={() => onNewNotesRequested({ count: 1, paragraphs: 300 })}
          >
            + Huge
          </Button>
          <Button
            classes={{ root: "notes-list__control" }}
            onClick={() => onNewNotesRequested({ count: 100, paragraphs: 1 })}
          >
            + 100
          </Button>
        </ButtonGroup>
        <ButtonGroup size="small">
          <Button
            classes={{ root: "notes-list__control" }}
            onClick={() => onDeleteAllRequested()}
          >
            Delete all
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
}

export default NotesList;

function NoteButtonOptimized({
  onNoteActivated,
  id,
  activeNoteId,
  text,
  filter,
  date,
}) {
  const onNoteActivatedProp = useCallback(
    () => onNoteActivated(id),
    [onNoteActivated, id]
  );

  /*
    let memoizedFn
    let memoizedDeps
    const useCallback = (fn, deps) => {
      if (deps[0] === memoizedDeps[0] && deps[1] === memoizedDeps[1] && ...) {
        return memoizedFn
      }

      memoizedFn = fn
      return fn
    }
  */
  return (
    <NoteButton
      isActive={activeNoteId === id}
      onNoteActivated={onNoteActivatedProp}
      text={text}
      filterText={filter}
      date={date}
    />
  );
}
