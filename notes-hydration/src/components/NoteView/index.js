import "./index.css";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

export default function NoteView({ text }) {
  const textWithHeader = "## " + text;

  return (
    <div className="note-view">
      <ReactMarkdown remarkPlugins={[gfm]}>{textWithHeader}</ReactMarkdown>
    </div>
  );
}
