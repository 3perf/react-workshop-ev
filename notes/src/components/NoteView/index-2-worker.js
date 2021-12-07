import "./index.css";
// eslint-disable-next-line import/no-webpack-loader-syntax
import createWorker from "workerize-loader!./worker";
import { useEffect, useState } from "react";

const worker = createWorker();

export default function NoteView({ text }) {
  let [html, setHtml] = useState("");
  useEffect(() => {
    worker.convertMarkdownToHtml(text).then(setHtml);
  }, [text]);

  return (
    <div className="note-view" dangerouslySetInnerHTML={{ __html: html }}></div>
  );
}
