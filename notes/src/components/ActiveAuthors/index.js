import { Avatar } from "@material-ui/core";
import { AvatarGroup } from "@material-ui/lab";
import { memo } from "react";

function ActiveAuthors({ activeAuthors }) {
  return (
    <div className="primary-pane__authors">
      <div className="primary-pane__authors-last-active">
        {activeAuthors.length} authors active this month:{" "}
        {activeAuthors.map((i) => i.name).join(", ")}
      </div>
      <AvatarGroup max={2}>
        {activeAuthors.map((i) => (
          <Avatar key={i.id} src={i.avatar} />
        ))}
      </AvatarGroup>
    </div>
  );
}

const ActiveAuthorsMemo = memo(ActiveAuthors);

export default ActiveAuthorsMemo;
