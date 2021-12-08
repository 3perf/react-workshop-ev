import "./index.css";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { useState } from "react";
import { Button } from "@material-ui/core";

export default function NoteView({ text }) {
  const [sizes, setSizes] = useState([]);

  const randomizeSizes = () => {
    const newRandomSizes = text.split("\n\n").map(() => {
      return Math.floor(Math.random() * 20) + 10;
    });

    setSizes(newRandomSizes);
  };

  return (
    <div className="note-view">
      <style>
        {sizes
          .map(
            (size, i) =>
              ".note-view__text p:nth-child(" +
              (i + 1) +
              ") { font-size: " +
              size +
              "px; }"
          )
          .join("\n")}
      </style>
      <Button variant="outlined" onClick={randomizeSizes} size="small">
        Randomize sizes
      </Button>
      <div className="note-view__text">
        <ReactMarkdown remarkPlugins={[gfm]}>{text}</ReactMarkdown>
      </div>
    </div>
  );
}
