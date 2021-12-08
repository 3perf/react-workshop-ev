import { Avatar } from "@material-ui/core";
import { AvatarGroup } from "@material-ui/lab";
import { useSelector } from "react-redux";
import NoteView from "../NoteView";
import "./index.css";

function Authors() {
  const activeThisMonth = useSelector((state) =>
    state.users.filter((i) => i.lastActiveDate.includes("2021-09"))
  );

  return (
    <div className="primary-pane__authors">
      <div className="primary-pane__authors-last-active">
        {activeThisMonth.length} users active this month:{" "}
        {activeThisMonth.map((i) => i.name).join(", ")}
      </div>
      <AvatarGroup max={2}>
        <Avatar src="/avatar1.jpg" />
        <Avatar src="/avatar2.jpg" />
        <Avatar src="/avatar3.jpg" />
      </AvatarGroup>
    </div>
  );
}
function AppPrimaryPane({ activeNoteId, notes, saveNote }) {
  if (!activeNoteId) {
    return (
      <div className="primary-pane__empty-editor">
        <div className="primary-pane__eyes"></div>
        <div className="primary-pane__eyes-caption">
          Select a note to view it
        </div>
      </div>
    );
  }

  return (
    <div className="primary-pane">
      <div className="primary-pane__header">
        <h1>Note</h1>
        <Authors />
      </div>

      <div className="primary-pane__content">
        <div className="primary-pane__view">
          <NoteView text={notes[activeNoteId].text} />
        </div>
      </div>
    </div>
  );
}

export default AppPrimaryPane;
