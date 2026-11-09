import { useEffect, useRef, useState } from "react";
import {
  FiMail,
  FiMessageCircle,
  FiPhone,
  FiX,
} from "react-icons/fi";
import { CONTACT } from "@/config/contact";

export default function SupportWidget() {
  const [open, setOpen] = useState(false);
  const widgetRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  function closePanel() {
    setOpen(false);
    triggerRef.current?.focus();
  }

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    function onOutside(event: PointerEvent) {
      if (
        event.target instanceof Node &&
        !widgetRef.current?.contains(event.target)
      )
        setOpen(false);
    }
    function onEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }
    document.addEventListener("pointerdown", onOutside);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("pointerdown", onOutside);
      document.removeEventListener("keydown", onEscape);
    };
  }, [open]);

  return (
    <aside
      ref={widgetRef}
      className="support-widget"
      aria-label="Hỗ trợ khách hàng"
    >
      {open && (
        <section
          id="support-contact-panel"
          className="support-widget__panel"
          aria-labelledby="support-contact-title"
        >
          <div className="support-widget__panel-header">
            <h2 id="support-contact-title">Picare luôn sẵn sàng hỗ trợ</h2>
            <button
              ref={closeRef}
              type="button"
              aria-label="Đóng khung hỗ trợ"
              onClick={closePanel}
            >
              <FiX />
            </button>
          </div>
          <p>Liên hệ để được tư vấn sản phẩm và hỗ trợ mua hàng.</p>
          <a href={CONTACT.phoneHref}>
            <FiPhone />
            <span>
              <small>Gọi cho chúng tôi</small>
              {CONTACT.phone}
            </span>
          </a>
          <a href={CONTACT.emailHref}>
            <FiMail />
            <span>
              <small>Gửi lời nhắn qua email</small>
              {CONTACT.email}
            </span>
          </a>
        </section>
      )}
      <a
        className="support-widget__phone"
        href={CONTACT.phoneHref}
        aria-label={`Gọi hỗ trợ ${CONTACT.phone}`}
        title="Gọi tư vấn"
      >
        <FiPhone />
      </a>
      <button
        ref={triggerRef}
        className="support-widget__chat"
        type="button"
        aria-label={open ? "Đóng khung liên hệ" : "Mở khung liên hệ"}
        aria-expanded={open}
        aria-controls={open ? "support-contact-panel" : undefined}
        title="Liên hệ tư vấn"
        onClick={() => {
          if (open) closePanel();
          else setOpen(true);
        }}
      >
        <FiMessageCircle />
      </button>
    </aside>
  );
}
