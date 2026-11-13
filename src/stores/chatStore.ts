import { atom } from "jotai";
import { chatRequest, chatSessionKey, type ChatThread } from "@/apis/chat.service";

const sessionAtom = atom("");
const requestVersionAtom = atom(0);
const lastAttemptAtom = atom<{ text: string; requestId: string; handoff: boolean } | null>(null);
export const chatThreadAtom = atom<ChatThread | null>(null);
export const chatDraftAtom = atom("");
export const chatPendingAtom = atom(false);
export const chatPendingTextAtom = atom("");
export const chatErrorAtom = atom("");

function makeToken() {
  return Array.from(crypto.getRandomValues(new Uint8Array(32)), byte => byte.toString(16).padStart(2, "0")).join("");
}

const getSessionAtom = atom(null, (get, set) => {
  const current = get(sessionAtom);
  if (current) return current;
  let saved = "";
  try { saved = localStorage.getItem(chatSessionKey) || ""; } catch { /* Browser storage can be unavailable. */ }
  const token = /^[a-f0-9]{64}$/.test(saved) ? saved : makeToken();
  set(sessionAtom, token);
  try { localStorage.setItem(chatSessionKey, token); } catch { /* Keep this tab's session in memory. */ }
  return token;
});

export const loadChatAtom = atom(null, async (get, set, showError: boolean = false) => {
  if (get(chatPendingAtom)) return;
  const token = set(getSessionAtom);
  const version = get(requestVersionAtom) + 1;
  set(requestVersionAtom, version);
  try {
    const thread = await chatRequest(token);
    if (get(requestVersionAtom) === version) {
      set(chatThreadAtom, thread);
      if (!get(lastAttemptAtom)) set(chatErrorAtom, "");
    }
  } catch (error) {
    if (showError && get(requestVersionAtom) === version) {
      set(chatErrorAtom, error instanceof Error ? error.message : "Không thể tải hội thoại.");
    }
  }
});

export const newChatAtom = atom(null, (get, set) => {
  if (get(chatPendingAtom)) return;
  const token = makeToken();
  set(sessionAtom, token);
  set(requestVersionAtom, get(requestVersionAtom) + 1);
  set(chatThreadAtom, null);
  set(lastAttemptAtom, null);
  set(chatDraftAtom, "");
  set(chatErrorAtom, "");
  try { localStorage.setItem(chatSessionKey, token); } catch { /* Keep this tab's session in memory. */ }
  void set(loadChatAtom, true);
});

export const sendChatAtom = atom(null, async (get, set, value: string, handoff: boolean = false) => {
  const text = value.trim().slice(0, 1000);
  if (!text || get(chatPendingAtom)) return;
  const token = set(getSessionAtom);
  const previous = get(lastAttemptAtom);
  const message = previous?.text === text && previous.handoff === handoff ? previous : {
    text, handoff, requestId: crypto.randomUUID(),
  };
  set(requestVersionAtom, get(requestVersionAtom) + 1);
  set(lastAttemptAtom, message);
  if (!handoff) set(chatDraftAtom, "");
  set(chatErrorAtom, "");
  set(chatPendingTextAtom, text);
  set(chatPendingAtom, true);
  try {
    set(chatThreadAtom, await chatRequest(token, message));
    set(lastAttemptAtom, null);
  } catch (error) {
    if (!handoff) set(chatDraftAtom, text);
    set(chatErrorAtom, error instanceof Error ? error.message : "Không thể gửi tin nhắn. Vui lòng thử lại.");
  } finally {
    set(chatPendingTextAtom, "");
    set(chatPendingAtom, false);
    void set(loadChatAtom);
  }
});
