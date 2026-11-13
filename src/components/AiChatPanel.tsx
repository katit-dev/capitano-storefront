import { useEffect, useRef, type ReactNode, type Ref } from "react";
import type { ChatLink, ChatMessage } from "@/apis/chat.service";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { FiArrowUpRight, FiMessageCircle, FiSend, FiX } from "react-icons/fi";
import {
  chatDraftAtom,
  chatErrorAtom,
  chatThreadAtom,
  chatPendingTextAtom,
  loadChatAtom,
  newChatAtom,
  chatPendingAtom,
  sendChatAtom,
} from "@/stores/chatStore";

interface AiChatPanelProps {
  id: string;
  onClose: () => void;
  closeRef: Ref<HTMLButtonElement>;
}

const SUGGESTIONS = ["Chọn kem đánh răng", "Tìm nước súc miệng", "Hướng dẫn sử dụng"];

const isProductLink = (url: string) => /^\/san-pham\/[a-z0-9]+(?:-[a-z0-9]+)*$/.test(url);
const isSafeLink = (url: string) => url.startsWith("/") && !url.startsWith("//") &&
  !/[\\\s]/.test(url) && ![...url].some(character => character.charCodeAt(0) < 32);

function ProductLink({ link, label }: { link: ChatLink; label?: string }) {
  return <a className="ai-chat__product-link" href={link.url} target="_blank" rel="noopener noreferrer">{label || link.title}</a>;
}

function ChatMessageContent({ message }: { message: ChatMessage }) {
  const { text } = message;
  const links = message.links.filter(link => isSafeLink(link.url));
  const mentions = links.filter(link => isProductLink(link.url) && link.title).flatMap(link => {
    if (link.mentions?.length) {
      return link.mentions.filter(({ start, end }) => Number.isInteger(start) && Number.isInteger(end) &&
        start >= 0 && end <= text.length && end > start && text.slice(start, end) === link.title)
        .map(range => ({ ...range, link }));
    }
    const label = link.title.replace(/[.*+?^$(){}|[\]\\]/g, "\\$&");
    return [...text.matchAll(new RegExp(label, "giu"))]
      .map(match => ({ start: match.index, end: match.index + match[0].length, link }));
  }).sort((a, b) => a.start - b.start || b.end - a.end);

  const used = new Set<string>();
  let cursor = 0;
  const content: ReactNode[] = [];
  for (const { start, end, link } of mentions) {
    if (start < cursor) continue;
    content.push(text.slice(cursor, start), <ProductLink key={start} link={link} label={text.slice(start, end)} />);
    cursor = end;
    used.add(link.url);
  }

  return <>
    <p>{content}{text.slice(cursor)}</p>
    {links.filter(link => !used.has(link.url)).map(link => (
      <p key={link.url}>{isProductLink(link.url) ? <ProductLink link={link} />
        : <a className="ai-chat__message-link" href={link.url}>{link.title}</a>}</p>
    ))}
  </>;
}

export default function AiChatPanel({
  id,
  onClose,
  closeRef,
}: AiChatPanelProps) {
  const [draft, setDraft] = useAtom(chatDraftAtom);
  const thread = useAtomValue(chatThreadAtom);
  const messages = thread?.messages;
  const lastMessageId = messages?.at(-1)?.id;
  const pendingText = useAtomValue(chatPendingTextAtom);
  const pending = useAtomValue(chatPendingAtom);
  const error = useAtomValue(chatErrorAtom);
  const sendMessage = useSetAtom(sendChatAtom);
  const loadChat = useSetAtom(loadChatAtom);
  const newChat = useSetAtom(newChatAtom);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const canSend = Boolean(draft.trim()) && !pending;

  useEffect(() => {
    let stopped = false;
    let timer: number;
    async function refresh(first = false) {
      if (first || !document.hidden) await loadChat(first);
      if (!stopped) timer = window.setTimeout(() => void refresh(), 3000);
    }
    void refresh(true);
    return () => { stopped = true; window.clearTimeout(timer); };
  }, [loadChat]);

  useEffect(() => {
    const body = bodyRef.current;
    if (body) body.scrollTop = body.scrollHeight;
  }, [lastMessageId, pending]);

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
          <h2 id={`${id}-chat-title`}>Trợ lý AI Capitano</h2>
        </div>
        <button
          ref={closeRef}
          className="ai-chat__close"
          type="button"
          aria-label="Đóng chat Capitano"
          onClick={onClose}
        >
          <FiX aria-hidden="true" />
        </button>
      </header>

      <div ref={bodyRef} className="ai-chat__body">
        <p className="ai-chat__eyebrow">Khám phá cùng Capitano</p>
        <div className="ai-chat__message ai-chat__message--assistant">
          <p>
            {thread?.welcomeMessage || "Xin chào! Bạn đang tìm kem đánh răng, nước súc miệng hay muốn hỏi cách sử dụng sản phẩm Capitano?"}
          </p>
        </div>
        <div className="ai-chat__suggestions" aria-label="Gợi ý trò chuyện">
          {!messages?.length && SUGGESTIONS.map((suggestion) => (
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
          {!!messages?.length && <button type="button" disabled={pending} onClick={() => newChat()}>Cuộc trò chuyện mới</button>}
          {thread?.aiEnabled && <button type="button" disabled={pending} onClick={() => void sendMessage("Mình muốn gặp nhân viên hỗ trợ.", true)}>Gặp nhân viên</button>}
        </div>
        <div
          className="ai-chat__messages"
          role="log"
          aria-label="Lịch sử trò chuyện"
          aria-live="polite"
          aria-relevant="additions"
        >
          {messages?.map((message) => (
            <div
              key={message.id}
              className={`ai-chat__message ai-chat__message--${message.sender === "customer" ? "user" : "assistant"}`}
            >
              <span className="sr-only">
                {message.sender === "customer" ? "Bạn: " : message.sender === "ai" ? "Trợ lý AI: " : ""}
              </span>
              {message.sender === "staff" && <strong>Nhân viên Capitano</strong>}
              <ChatMessageContent message={message} />
            </div>
          ))}
          {pendingText && <div className="ai-chat__message ai-chat__message--user"><p>{pendingText}</p></div>}
        </div>
        {thread?.aiEnabled && (pending || thread.status === "queued") && (
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
            aria-label="Tin nhắn cho trợ lý Capitano"
            aria-describedby={`${id}-chat-info`}
          />
          <button type="submit" aria-label="Gửi tin nhắn" disabled={!canSend}>
            <FiSend aria-hidden="true" />
          </button>
        </form>
        <p id={`${id}-chat-info`} className="ai-chat__info">
          {thread && !thread.aiEnabled ? "Trò chuyện với nhân viên Capitano" : "Trò chuyện với trợ lý AI Capitano"}
        </p>
      </footer>
    </section>
  );
}
