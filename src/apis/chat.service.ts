export interface ChatInput {
  role: "user" | "assistant";
  content: string;
}
export async function sendChat(messages: ChatInput[]): Promise<string> {
  const base = (import.meta.env.VITE_CMS_API_URL || "").replace(/\/$/, "");
  const code = import.meta.env.VITE_CMS_SITE_CODE || "paxmoly";
  if (!base) throw new Error("Chưa cấu hình CMS API cho chatbot.");
  try {
    const response = await fetch(`${base}/api/public/v1/sites/${encodeURIComponent(code)}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages }),
      signal: AbortSignal.timeout(60000),
    });
    const result = await response.json().catch(() => null);
    if (!response.ok || !result?.success) throw new Error(result?.message || "Không thể gửi tin nhắn. Vui lòng thử lại.");
    if (typeof result.data?.reply !== "string") throw new Error("AI chưa trả về nội dung.");
    return result.data.reply;
  } catch (error) {
    if (error instanceof TypeError) throw new Error("Không kết nối được CMS API. Vui lòng thử lại.");
    if (error instanceof DOMException && error.name === "TimeoutError") throw new Error("AI phản hồi quá lâu. Vui lòng thử lại.");
    throw error;
  }
}
