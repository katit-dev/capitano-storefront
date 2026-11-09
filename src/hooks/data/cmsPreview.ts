import { useLayoutEffect, useSyncExternalStore } from "react";
import type { CmsContent } from "./useCmsContent";
const params = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
export const previewEnabled = params?.get("cms-preview") === "1" && window.parent !== window;
const code = import.meta.env.VITE_CMS_SITE_CODE || "paxmoly";
const adminOrigin = new URL(import.meta.env.VITE_CMS_ADMIN_URL || "http://localhost:5175").origin;
type Snapshot = { content: CmsContent; module: string; draftId: string };
let snapshot: Snapshot | null = null;
const listeners = new Set<() => void>();
if (previewEnabled && params?.get("cms-site") === code) {
  window.addEventListener("message", event => {
    if (event.origin !== adminOrigin || event.source !== window.parent || event.data?.type !== "picare:preview-content" || event.data.siteCode !== code) return;
    const content = event.data.content;
    if (!content || typeof content !== "object" || !Array.isArray(content.menu)) return;
    snapshot = { content, module: String(event.data.module || ""), draftId: String(event.data.draftId || "") };
    listeners.forEach(listener => listener());
  });
  window.parent.postMessage({ type: "picare:preview-ready", siteCode: code }, adminOrigin);
  // Preview can open menus and scroll, but links and purchase actions stay inert.
  window.addEventListener("click", event => {
    const target = event.target instanceof Element ? event.target : null;
    if (target?.closest('a, .header-cart, .product-card button, .newsletter button')) { event.preventDefault(); event.stopImmediatePropagation(); }
  }, true);
  window.addEventListener("submit", event => { event.preventDefault(); event.stopImmediatePropagation(); }, true);
}
function subscribe(listener: () => void) { listeners.add(listener); return () => { listeners.delete(listener); }; }
export function usePreviewSnapshot() { return useSyncExternalStore(subscribe, () => snapshot, () => null); }
export function usePreviewFocus() {
  const state = usePreviewSnapshot();
  const module = state?.module;
  const id = state?.draftId;
  useLayoutEffect(() => {
    if (!previewEnabled || !module) return;
    const selectors: Record<string, string> = { announcement: ".announcement", header: ".site-header", menu: ".site-header", skinNeedSection: "#nhu-cau-lan-da .commerce-heading", newsletter: ".newsletter", footer: ".site-footer", shopHero: ".shop-hero" };
    const selector = selectors[module] || `[data-cms-record="${CSS.escape(id || "")}"]`;
    const element = document.querySelector<HTMLElement>(selector);
    const style = document.createElement("style");
    style.textContent = `[data-cms-preview-hidden] { display: none !important; }
      html, body, #root, .site-shell, #main-content { min-height: 0 !important; height: auto !important; }
      html, body { overflow: hidden !important; scrollbar-gutter: auto !important; }
      .site-shell { display: block !important; } body { margin: 0 !important; }
      .cms-banner { margin-block: 0 !important; }
      ${module === "skinNeeds" ? '.skin-needs-grid { grid-template-columns: minmax(0, 300px) !important; justify-content: center; }' : ''}`;
    document.head.append(style);
    const hidden: Element[] = [];
    const hide = (node: Element) => { node.setAttribute("data-cms-preview-hidden", ""); hidden.push(node); };
    let placeholder: HTMLElement | null = null;
    if (element) {
      let node: Element = element;
      while (node.parentElement && node !== document.body) {
        for (const sibling of node.parentElement.children) if (sibling !== node && !["SCRIPT", "STYLE"].includes(sibling.tagName)) hide(sibling);
        node = node.parentElement;
      }
    } else {
      const root = document.getElementById("root"); if (root) hide(root);
      placeholder = document.createElement("p");
      placeholder.textContent = "Phần này đang tắt hoặc chưa có nội dung để xem trước.";
      placeholder.style.cssText = "margin:0;padding:28px;color:#555;font:16px/1.6 sans-serif;text-align:center";
      document.body.append(placeholder);
    }
    window.scrollTo(0, 0);
    const size = () => window.parent.postMessage({ type: "picare:preview-size", siteCode: code, module,
      height: Math.max(80, Math.ceil(document.body.getBoundingClientRect().height)) }, adminOrigin);
    const observer = new ResizeObserver(size); observer.observe(document.body); size();
    return () => { observer.disconnect(); hidden.forEach(node => node.removeAttribute("data-cms-preview-hidden")); placeholder?.remove(); style.remove(); };
  }, [module, id, state?.content]);
}
