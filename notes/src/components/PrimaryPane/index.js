import { Button } from "@material-ui/core";
import { useMemo, useState } from "react";
import fakeApi from "../../utils/fakeApi";
import NoteEditor from "../NoteEditor";
import NoteView from "../NoteView";
import ActiveAuthors from "../ActiveAuthors";
import spinner from "./spinner.svg";
import "./index.css";
import ThemeSwitcher from "../ThemeSwitcher";

const authors = [
  {
    id: 1,
    name: "Alexa",
    lastActiveDate: "2021-12-05",
    avatar: "/avatar1.jpg",
  },
  {
    id: 2,
    name: "Jake",
    lastActiveDate: "2021-12-04",
    avatar: "/avatar2.jpg",
  },
  {
    id: 3,
    name: "Josh",
    lastActiveDate: "2021-12-01",
    avatar: "/avatar3.jpg",
  },
  {
    id: 4,
    name: "Kate",
    lastActiveDate: "2020-04-04",
    avatar: "/avatar4.jpg",
  },
  {
    id: 5,
    name: "Jake",
    lastActiveDate: "2020-04-04",
    avatar: "/avatar5.jpg",
  },
];

const defaultArray = [];

function PrimaryPane({ activeNoteId, notes, saveNote, activeMonth }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isPublic, setIsPublic] = useState(false);
  const [publishedAt, setPublishedAt] = useState(null);

  const togglePublic = async () => {
    setIsLoading(true);

    if (isPublic) {
      await fakeApi.setPublicStatus(false);
      setIsPublic(false);
    } else {
      await fakeApi.setPublicStatus(true);
      const publishedDate = await fakeApi.getPublishedDate();
      setIsPublic(true);
      setPublishedAt(publishedDate.toLocaleTimeString());
    }

    setIsLoading(false);
  };

  const authorsActiveThisMonth = useMemo(
    () => authors.filter((i) => i.lastActiveDate.includes(activeMonth)),
    [activeMonth]
  );

  /* MobX → @computed get authorsActiveThisMonth() { return this.authors?.filter((i) => i.lastActiveDate.includes(this.activeMonth)) }
      reselect’s createSelector()
  */

  /*
    let memoizedValue
    let memoizedDeps
    const useMemo = (fn, deps) => {
      if (deps[0] === memoizedDeps[0] && deps[1] === memoizedDeps[1] && ...) {
        return memoizedValue
      }

      memoizedValue = fn()
      return memoizedValue
    }

    const useCallback = (fn, deps) => useMemo(() => fn, deps)
  */

  if (!activeNoteId) {
    return (
      <div className="primary-pane__empty-editor">
        <div className="primary-pane__eyes"></div>
        <div className="primary-pane__eyes-caption">
          Select a note to start editing
        </div>
      </div>
    );
  }

  return (
    <div className="primary-pane">
      <div className="primary-pane__header">
        <h1 className="primary-pane__header-text">Editor</h1>
        <ActiveAuthors activeAuthors={authorsActiveThisMonth || defaultArray} />
        <ThemeSwitcher />
      </div>

      <div className="primary-pane__content">
        <div className="primary-pane__controls">
          <Button
            variant="outlined"
            onClick={togglePublic}
            disabled={isLoading}
          >
            {isLoading
              ? "Loading..."
              : isPublic
              ? "🤫 Make Private"
              : "👀 Make Public"}
          </Button>
          {!isLoading && isPublic && <span>Published at: {publishedAt}</span>}
        </div>
        <NoteEditor
          saveNote={({ text, date }) => saveNote(activeNoteId, { text, date })}
          notes={notes}
          activeNoteId={activeNoteId}
        />
        <div className="primary-pane__view">
          <NoteView text={notes[activeNoteId].text} />
        </div>
      </div>
      <div
        className={
          "primary-pane__spinner-wrapper" +
          (isLoading ? " primary-pane__spinner-wrapper_visible" : "")
        }
      >
        <img className="primary-pane__spinner" src={spinner} alt="" />
      </div>
    </div>
  );
}

export default PrimaryPane;
