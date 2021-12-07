import "./index.css";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { memo } from "react";

// function computeNumberOfAuthors(authors) {
//   console.log("I’m expensive!");
//   return authors.length;
// }
// const computeNumberOfAuthorsMemoizedOne = memoizeOne(computeNumberOfAuthors);
// const authors = ["John", "Jane", "Jack"];
// computeNumberOfAuthorsMemoizedOne(authors); // → "I’m expensive!" → 3
// computeNumberOfAuthorsMemoizedOne(authors); // → 3
// computeNumberOfAuthorsMemoizedOne(authors); // → 3
// computeNumberOfAuthorsMemoizedOne(authors); // → 3
// const authors2 = ["John", "Jane", "Jack", "Lady Gaga"];
// computeNumberOfAuthorsMemoizedOne(authors2); // → "I’m expensive!" → 4
// computeNumberOfAuthorsMemoizedOne(authors2); // → 4
// computeNumberOfAuthorsMemoizedOne(authors2); // → 4
// computeNumberOfAuthorsMemoizedOne(authors); // → "I’m expensive!" → 3

// // expensiveFunction() outside of React
// // → If the input stays the same and the memory is concern: memoizeOne()
// // → If the input changes back and forth and the memory is not a concern: _.memoize()

// const computeNumberOfAuthorsMemoizedLodash = _.memoize(computeNumberOfAuthors);
// computeNumberOfAuthorsMemoizedLodash(authors); // → "I’m expensive!" → 3
// computeNumberOfAuthorsMemoizedLodash(authors); // → 3
// computeNumberOfAuthorsMemoizedLodash(authors); // → 3
// computeNumberOfAuthorsMemoizedLodash(authors2); // → "I’m expensive!" → 4
// computeNumberOfAuthorsMemoizedLodash(authors2); // → 4
// computeNumberOfAuthorsMemoizedLodash(authors2); // → 4
// computeNumberOfAuthorsMemoizedLodash(authors); // → 3

// V8: lite one and advanced one

const ReactMarkdownOptimized = memo(function ReactMarkdownOptimized({ text }) {
  return <ReactMarkdown remarkPlugins={[gfm]}>{text}</ReactMarkdown>;
});

export default function NoteView({ text }) {
  const textParagraphs = text.split("\n\n");

  const markdownParagraphs = textParagraphs.map((paragraph, index) => (
    <ReactMarkdownOptimized key={index} text={paragraph} />
  ));

  return <div className="note-view">{markdownParagraphs}</div>;
}
