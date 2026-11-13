export interface ChatLink {
  title: string;
  url: string;
  mentions?: { start: number; end: number }[];
}

export interface ChatMessage {
  id: string;
  sender: "customer" | "ai" | "staff";
  text: string;
  links: ChatLink[];
  createdAt: string;
}

export interface ChatThread {
  messages: ChatMessage[];
  aiEnabled: boolean;
  status: "unanswered" | "queued" | "replied";
  welcomeMessage: string;
}

const base = (import.meta.env.VITE_CMS_API_URL || "").replace(/\/$/, "");
export const chatConfigured = Boolean(base);
const code = import.meta.env.VITE_CMS_SITE_CODE || "capitano";
const endpoint = base + "/api/public/v1/sites/" + encodeURIComponent(code) + "/chat/messages";
export const chatSessionKey = "cms-chat:" + code + ":session";

export async function chatRequest(token: string, message?: { text: string; requestId: string; handoff: boolean }): Promise<ChatThread> {
  if (!base) throw new Error("Chưa cấu hình CMS API cho chat.");
  try {
    const response = await fetch(endpoint, {
      method: message ? "POST" : "GET",
      headers: { Authorization: "Bearer " + token, ...(message ? { "Content-Type": "application/json" } : {}) },
      body: message ? JSON.stringify(message) : undefined,
      signal: AbortSignal.timeout(message ? 65000 : 8000),
      cache: "no-store",
    });
    const result = await response.json().catch(() => null);
    if (!response.ok || !result?.success) throw new Error(result?.message || "Không thể tải tin nhắn. Vui lòng thử lại.");
    return result.data;
  } catch (error) {
    if (error instanceof TypeError) throw new Error("Không kết nối được CMS API. Vui lòng thử lại.");
    if (error instanceof DOMException && error.name === "TimeoutError") throw new Error("Kết nối chat mất nhiều thời gian. Bạn có thể thử lại.");
    throw error;
  }
}
