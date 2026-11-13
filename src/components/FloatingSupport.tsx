import { useEffect, useId, useRef, useState } from "react";
import { FiMessageCircle, FiPhone, FiX } from "react-icons/fi";
import AiChatPanel from "@/components/AiChatPanel";
import { chatConfigured } from "@/apis/chat.service";

export default function FloatingSupport({ hotline }: { hotline?: string }) {
  const [open, setOpen] = useState(false);
  const phone = hotline?.replace(/[^+0-9]/g, "");
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

  if (!chatConfigured && !phone) return null;

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
      {!open && phone && (
        <a
          className="floating-support__button floating-support__button--phone"
          href={"tel:" + phone}
          aria-label={"Gọi hotline Capitano: " + hotline}
        >
          <FiPhone aria-hidden="true" />
          <span className="floating-support__tooltip">{hotline}</span>
        </a>
      )}
      {chatConfigured && <button
        ref={triggerRef}
        className="floating-support__button floating-support__button--chat"
        type="button"
        aria-label={open ? "Thu gọn chat Capitano" : "Mở chat Capitano"}
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
            Trò chuyện cùng Capitano
          </span>
        )}
      </button>}
    </div>
  );
}
