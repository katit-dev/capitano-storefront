import { useEffect, useId, useRef, useState } from "react";
import { FiMessageCircle, FiPhone, FiX } from "react-icons/fi";
import AiChatPanel from "@/components/AiChatPanel";

export default function FloatingSupport() {
  const [open, setOpen] = useState(false);
  const id = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const previouslyOpen = useRef(false);

  useEffect(() => {
    if (open) {
      closeRef.current?.focus({ preventScroll: true });
    } else if (previouslyOpen.current) {
      triggerRef.current?.focus({ preventScroll: true });
    }
    previouslyOpen.current = open;
  }, [open]);

  function closeChat() {
    setOpen(false);
  }

  return (
    <div
      className={open ? "floating-support is-open" : "floating-support"}
      onKeyDown={(event) => {
        if (open && event.key === "Escape") {
          event.preventDefault();
          closeChat();
        }
      }}
    >
      {open && <AiChatPanel id={id} onClose={closeChat} closeRef={closeRef} />}
      {!open && (
        <a
          className="floating-support__button floating-support__button--phone"
          href="tel:0916163516"
          aria-label="Gọi hotline PaxMoly: 0916 163 516"
        >
          <FiPhone aria-hidden="true" />
          <span className="floating-support__tooltip">0916 163 516</span>
        </a>
      )}
      <button
        ref={triggerRef}
        className="floating-support__button floating-support__button--chat"
        type="button"
        aria-label={open ? "Thu gọn chat PaxMoly" : "Mở chat PaxMoly"}
        aria-expanded={open}
        aria-controls={`${id}-chat`}
        onClick={() => (open ? closeChat() : setOpen(true))}
      >
        {open ? (
          <FiX aria-hidden="true" />
        ) : (
          <FiMessageCircle aria-hidden="true" />
        )}
        {!open && (
          <span className="floating-support__tooltip">
            Trò chuyện cùng PaxMoly
          </span>
        )}
      </button>
    </div>
  );
}
