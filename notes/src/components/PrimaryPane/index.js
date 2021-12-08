import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { unstable_batchedUpdates } from "react-dom";
import fakeApi from "../../utils/fakeApi";
import NoteEditor from "../NoteEditor";
import NoteView from "../NoteView";
import { ActiveAuthors } from "../ActiveAuthors";
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

/*

    useState = (initialState) => useReducer((state, action) => {
      return action;
    }), initialState)

    const [componentState, dispatch] = useReducer((state, action) => {
      if (action.type === "SET_IS_LOADING") {
        return {
          ...state,
          isLoading: action.payload,
        };
      }

      if (action.type === "SET_PUBLISHED_AT") {
        return {
          ...state,
          publishedAt: action.payload,
        };
      }

      if (action.type === "SET_IS_PUBLIC") {
        return {
          ...state,
          isPublic: action.payload,
        };
      }

      if (action.type === "SET_EVERYTHING") {
        return action.payload;
      }

      return {
        isLoading: false,
        isPublic: false,
        publishedAt: null,
      };
    });

    dispatch({
        type: "SET_EVERYTHING",
        payload: {
          isLoading: false,
          isPublic: true,
          publishedAt: publishedDate,
        },
      });

    */

/*
      const loadAllData = () => {
    fakeApi.loadUser().then((user) => setUser(user));
    fakeApi
      .loadBillingData()
      .then((billingData) => setBillingData(billingData));
    fakeApi.loadUserNotes().then((notes) => setNotes(notes));

    // ↓

    Promise.all([
      fakeApi.loadUser(),
      fakeApi.loadBillingData(),
      fakeApi.loadUserNotes(),
    ])
      .then(([user, billingData, notes]) => {
        unstable_batchedUpdates(() => {
          setUser(user);
          setBillingData(billingData);
          setNotes(notes);
        });
      })
      .catch(() => {
        // Show an error
      });
  };
  */

/*
  let shouldBatchUpdates = false;

  button.addEventListener("click", () => {
    unstable_batchedUpdates(() => {
      togglePublic();
    });
  })

  unstable_batchedUpdates = (callback) => {
    shouldBatchUpdates = true;
    callback();
    shouldBatchUpdates = false;
    processPendingUpdates();
  }

  useState => setState => (newState) => {
    if (!shouldBatchUpdates) {
      // trigger a render immediately with newState
    } else {
      renderQueueToProcessLater.push({
        component: PrimaryPane,
        stateChanges: [
          { index: 2, value: newState },
        ]
      })
    }
  }
  */

function PrimaryPane({ activeNoteId, notes, saveNote }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isPublic, setIsPublic] = useState(false);
  const [publishedAt, setPublishedAt] = useState(null);

  const togglePublic = async () => {
    setIsLoading(true);

    if (isPublic) {
      await fakeApi.setPublicStatus(false);
      unstable_batchedUpdates(() => {
        setIsPublic(false);
        setIsLoading(false);
      });
    } else {
      await fakeApi.setPublicStatus(true);
      const publishedDate = await fakeApi.getPublishedDate();
      unstable_batchedUpdates(() => {
        setIsPublic(true);
        setPublishedAt(publishedDate.toLocaleTimeString());
        setIsLoading(false);
      });
    }
  };

  const flipIsLoading = () => {
    setIsLoading(true);
    setIsLoading(false);
    setIsLoading(true);
    setIsLoading(false);
    setIsLoading(true);
    setIsPublic(false);
    setIsPublic(true);
    setIsPublic(false);
    setIsPublic(true);
    setPublishedAt("21 Dec " + Math.floor(Math.random() * 3000));
  };

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
        <ActiveAuthors
          activeAuthors={
            authors.filter((i) => i.lastActiveDate.includes("2021-12")) || []
          }
        />
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
          <Button variant="outlined" onClick={flipIsLoading}>
            Flip everything
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
