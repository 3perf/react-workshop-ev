import "./index.css";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

export default function NoteView({ text }) {
  const textWithHeader = "## " + text;

  const isServer = typeof window === "undefined";

  return (
    <div className="note-view">
      {isServer ? (
        <div>
          <ReactMarkdown remarkPlugins={[gfm]}>{textWithHeader}</ReactMarkdown>
        </div>
      ) : (
        <div dangerouslySetInnerHTML={{ __html: "" }} />
      )}
    </div>
  );
}

/*
// Controlled:
const [value, setValue] = useState("");
const handleChange = (text) => {
  setValue(text);
  dispatch(saveValue(text));
}
<input value={value} onChange={setValue} />

// Uncontrolled:
const handleChange = (text) => {
  dispatch(saveValue(text));
}
<input defaultValue={value} onChange={handleChange} />
*/
