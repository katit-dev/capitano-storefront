import { useEffect, useRef, useState, type ClipboardEvent, type KeyboardEvent } from "react";

// Draft copy is intentionally memory-only: navigating within the app keeps it,
// while refreshing restores the published text.
const previewCopy = new Map<string, string>();

type Props = {
  copyKey: string;
  children: string;
};

export default function PreviewEditableText({ copyKey, children }: Props) {
  const [text, setText] = useState(() => previewCopy.get(copyKey) ?? children);
  const [editing, setEditing] = useState(false);
  const editorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (editing) editorRef.current?.focus();
  }, [editing]);

  function finish(save: boolean) {
    const next = editorRef.current?.textContent?.trim() ?? "";
    if (save && next) {
      previewCopy.set(copyKey, next);
      setText(next);
    } else {
      if (editorRef.current) editorRef.current.textContent = text;
    }
    setEditing(false);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLSpanElement>) {
    if (!editing && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      setEditing(true);
    } else if (editing && event.key === "Enter") {
      event.preventDefault();
      finish(true);
    } else if (editing && event.key === "Escape") {
      event.preventDefault();
      finish(false);
    }
  }

  function handlePaste(event: ClipboardEvent<HTMLSpanElement>) {
    event.preventDefault();
    const plainText = event.clipboardData.getData("text/plain").replace(/\s*\n\s*/g, " ");
    const selection = window.getSelection();
    if (!selection?.rangeCount) return;
    const range = selection.getRangeAt(0);
    range.deleteContents();
    const node = document.createTextNode(plainText);
    range.insertNode(node);
    range.setStartAfter(node);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
  }

  return (
    <span
      ref={editorRef}
      className={editing ? "preview-editable is-editing" : "preview-editable"}
      contentEditable={editing ? "plaintext-only" : undefined}
      suppressContentEditableWarning
      role="textbox"
      aria-label={`Sửa nội dung: ${text}`}
      aria-readonly={!editing}
      tabIndex={0}
      title="Nhấp đúp để sửa bản xem trước"
      onClick={(event) => { if (event.currentTarget.closest("a")) event.preventDefault(); }}
      onDoubleClick={() => setEditing(true)}
      onKeyDown={handleKeyDown}
      onPaste={editing ? handlePaste : undefined}
      onBlur={() => { if (editing) finish(true); }}
    >
      {text}
    </span>
  );
}
