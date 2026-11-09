import { useEffect, useRef, type Ref } from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { FiArrowUpRight, FiMessageCircle, FiSend, FiX } from "react-icons/fi";
import {
  chatDraftAtom,
  chatErrorAtom,
  chatMessagesAtom,
  chatPendingAtom,
  sendChatAtom,
} from "@/stores/chatStore";

interface AiChatPanelProps {
  id: string;
  onClose: () => void;
  closeRef: Ref<HTMLButtonElement>;
}

const SUGGESTIONS = ["Chọn serum", "Tìm mặt nạ", "Hướng dẫn sử dụng"];

export default function AiChatPanel({
  id,
  onClose,
  closeRef,
}: AiChatPanelProps) {
  const [draft, setDraft] = useAtom(chatDraftAtom);
  const messages = useAtomValue(chatMessagesAtom);
  const pending = useAtomValue(chatPendingAtom);
  const error = useAtomValue(chatErrorAtom);
  const sendMessage = useSetAtom(sendChatAtom);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const canSend = Boolean(draft.trim()) && !pending;

  useEffect(() => {
    const body = bodyRef.current;
    if (body) body.scrollTop = body.scrollHeight;
  }, [messages.length, pending]);

  function submitMessage() {
    if (!canSend) return;
    void sendMessage(draft);
    inputRef.current?.focus({ preventScroll: true });
  }

  return (
    <section
      id={`${id}-chat`}
      className="ai-chat"
      role="dialog"
      aria-modal="false"
      aria-labelledby={`${id}-chat-title`}
      aria-describedby={`${id}-chat-info`}
    >
      <header className="ai-chat__header">
        <div className="ai-chat__heading">
          <span className="ai-chat__avatar" aria-hidden="true">
            <FiMessageCircle />
          </span>
          <div>
            <p className="ai-chat__brand">PaxMoly · Chăm sóc da Hàn Quốc</p>
            <h2 id={`${id}-chat-title`}>Trợ lý PaxMoly</h2>
          </div>
        </div>
        <button
          ref={closeRef}
          className="ai-chat__close"
          type="button"
          aria-label="Đóng chat PaxMoly"
          onClick={onClose}
        >
          <FiX aria-hidden="true" />
        </button>
        <span className="ai-chat__badge">AI</span>
      </header>

      <div ref={bodyRef} className="ai-chat__body">
        <p className="ai-chat__eyebrow">Khám phá cùng PaxMoly</p>
        <div className="ai-chat__message ai-chat__message--assistant">
          <p>
            Xin chào! Bạn đang tìm serum, mặt nạ hay muốn tìm hiểu cách sử dụng
            sản phẩm?
          </p>
        </div>
        <div className="ai-chat__suggestions" aria-label="Gợi ý trò chuyện">
          {SUGGESTIONS.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              disabled={pending}
              onClick={() => void sendMessage(suggestion)}
            >
              {suggestion}
              <FiArrowUpRight aria-hidden="true" />
            </button>
          ))}
        </div>
        <div
          className="ai-chat__messages"
          role="log"
          aria-label="Lịch sử trò chuyện"
          aria-live="polite"
          aria-relevant="additions"
        >
          {messages.map((message) => (
            <div
              key={message.id}
              className={`ai-chat__message ai-chat__message--${message.role}`}
            >
              <span className="sr-only">
                {message.role === "user" ? "Bạn: " : "PaxMoly: "}
              </span>
              <p>{message.text}</p>
            </div>
          ))}
        </div>
        {pending && (
          <p className="ai-chat__typing" role="status">
            Đang trả lời…
          </p>
        )}
      </div>

      <footer className="ai-chat__footer">
        {error && <p className="ai-chat__error" role="alert">{error}</p>}
        <form
          className="ai-chat__composer"
          onSubmit={(event) => {
            event.preventDefault();
            submitMessage();
          }}
        >
          <textarea
            ref={inputRef}
            rows={1}
            maxLength={1000}
            disabled={pending}
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={(event) => {
              if (
                event.key === "Enter" &&
                !event.shiftKey &&
                !event.nativeEvent.isComposing
              ) {
                event.preventDefault();
                submitMessage();
              }
            }}
            placeholder="Nhập tin nhắn của bạn…"
            aria-label="Tin nhắn cho trợ lý PaxMoly"
            aria-describedby={`${id}-chat-info`}
          />
          <button type="submit" aria-label="Gửi tin nhắn" disabled={!canSend}>
            <FiSend aria-hidden="true" />
          </button>
        </form>
        <p id={`${id}-chat-info`} className="ai-chat__info">
          Trò chuyện với trợ lý PaxMoly
        </p>
      </footer>
    </section>
  );
}
