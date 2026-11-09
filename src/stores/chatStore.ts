import { atom } from "jotai";
import { sendChat } from "@/apis/chat.service";

export interface ChatMessage {
  id: number;
  role: "user" | "assistant";
  text: string;
}

// Keep this conversation only in memory until the page reloads.
export const chatMessagesAtom = atom<ChatMessage[]>([]);
export const chatDraftAtom = atom("");
export const chatPendingAtom = atom(false);
export const chatErrorAtom = atom("");
let nextId = 0;

export const sendChatAtom = atom(null, async (get, set, value: string) => {
  const text = value.trim().slice(0, 1000);
  if (!text || get(chatPendingAtom)) return;
  const previous = get(chatMessagesAtom);
  const messages: ChatMessage[] = [...previous, { id: nextId++, role: "user", text }];
  set(chatMessagesAtom, messages);
  set(chatDraftAtom, "");
  set(chatErrorAtom, "");
  set(chatPendingAtom, true);
  try {
    const reply = await sendChat(messages.slice(-20).map(message => ({
      role: message.role, content: message.text.slice(0, message.role === "user" ? 1000 : 12000),
    })));
    set(chatMessagesAtom, [...messages, { id: nextId++, role: "assistant", text: reply }]);
  } catch (error) {
    set(chatMessagesAtom, previous);
    set(chatDraftAtom, text);
    set(chatErrorAtom, error instanceof Error ? error.message : "Không thể gửi tin nhắn. Vui lòng thử lại.");
  } finally {
    set(chatPendingAtom, false);
  }
});
