import "./index.css";

function PublishingTo({ publishingTarget, onPublishingTargetChange }) {
  return (
    <>
      Publishing to: {publishingTarget}{" "}
      <button
        className="publishing-to__button"
        onClick={() => {
          const newAuthor = prompt("New target?");
          onPublishingTargetChange(newAuthor);
        }}
      >
        (edit)
      </button>
    </>
  );
}

export default PublishingTo;
