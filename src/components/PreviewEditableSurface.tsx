import {
  useCallback,
  useEffect,
  useRef,
  type ClipboardEvent,
  type KeyboardEvent,
  type MouseEvent,
} from "react";
import { useLocation } from "react-router-dom";

const previewCopy = new Map<string, string>();
const editableSelector = "h1, h2, h3, h4, h5, h6, p, span, strong, small, em, li, legend, figcaption, dt, dd";
const blockedSelector = "a, button, input, textarea, select, option, [data-preview-static], .sr-only";

type ActiveEdit = { element: HTMLElement; key: string; originalHtml: string };

function elementPath(element: HTMLElement, root: HTMLElement) {
  const parts: string[] = [];
  let current: HTMLElement | null = element;
  while (current && current !== root) {
    const siblings = current.parentElement
      ? Array.from(current.parentElement.children).filter((item) => item.tagName === current?.tagName)
      : [];
    parts.unshift(`${current.tagName.toLowerCase()}:nth-of-type(${siblings.indexOf(current) + 1})`);
    current = current.parentElement;
  }
  return parts.join(" > ");
}

function placeCaretAtEnd(element: HTMLElement) {
  const selection = window.getSelection();
  if (!selection) return;
  const range = document.createRange();
  range.selectNodeContents(element);
  range.collapse(false);
  selection.removeAllRanges();
  selection.addRange(range);
}

export default function usePreviewEditableSurface(rootId: string) {
  const location = useLocation();
  const activeRef = useRef<ActiveEdit | null>(null);
  const routePrefix = `${location.pathname}::`;

  const finish = useCallback((save: boolean) => {
    const active = activeRef.current;
    if (!active) return;
    if (save && active.element.textContent?.trim()) previewCopy.set(active.key, active.element.innerHTML);
    else active.element.innerHTML = active.originalHtml;
    active.element.removeAttribute("contenteditable");
    active.element.removeAttribute("role");
    active.element.removeAttribute("aria-label");
    active.element.classList.remove("preview-editable", "is-editing");
    activeRef.current = null;
  }, []);

  useEffect(() => {
    const root = document.getElementById(rootId);
    if (!root) return;
    for (const [key, html] of previewCopy) {
      if (!key.startsWith(routePrefix)) continue;
      const target = root.querySelector<HTMLElement>(key.slice(routePrefix.length));
      if (target) target.innerHTML = html;
    }
    return () => finish(true);
  }, [finish, rootId, routePrefix]);

  useEffect(() => {
    const saveOnOutsideClick = (event: PointerEvent) => {
      const active = activeRef.current?.element;
      if (active && event.target instanceof Node && !active.contains(event.target)) finish(true);
    };
    document.addEventListener("pointerdown", saveOnOutsideClick, true);
    return () => document.removeEventListener("pointerdown", saveOnOutsideClick, true);
  }, [finish]);

  const onDoubleClickCapture = (event: MouseEvent<HTMLElement>) => {
    const root = event.currentTarget;
    const target = event.target instanceof Element ? event.target : null;
    if (!target || target.closest(".preview-editable, a, button")) return;
    const candidate = target.closest<HTMLElement>(editableSelector);
    if (!candidate || !root.contains(candidate) || candidate.closest(blockedSelector)) return;
    if (candidate.querySelector("input, textarea, select, option, a, button")) return;
    if (!candidate.textContent?.trim()) return;

    event.preventDefault();
    event.stopPropagation();
    finish(true);
    activeRef.current = {
      element: candidate,
      key: `${routePrefix}${elementPath(candidate, root)}`,
      originalHtml: candidate.innerHTML,
    };
    candidate.classList.add("preview-editable", "is-editing");
    candidate.setAttribute("contenteditable", "plaintext-only");
    candidate.setAttribute("role", "textbox");
    candidate.setAttribute("aria-label", "Chỉnh sửa nội dung bản xem trước");
    candidate.focus({ preventScroll: true });
    placeCaretAtEnd(candidate);
  };

  const onClickCapture = (event: MouseEvent<HTMLElement>) => {
    if (event.detail === 2) onDoubleClickCapture(event);
  };

  const onKeyDownCapture = (event: KeyboardEvent<HTMLElement>) => {
    const active = activeRef.current?.element;
    if (!active || event.target !== active) return;
    if (event.key === "Enter") {
      event.preventDefault();
      finish(true);
    } else if (event.key === "Escape") {
      event.preventDefault();
      finish(false);
    }
  };

  const onPasteCapture = (event: ClipboardEvent<HTMLElement>) => {
    const active = activeRef.current?.element;
    if (!active || event.target !== active) return;
    event.preventDefault();
    const text = event.clipboardData.getData("text/plain").replace(/\s*\n\s*/g, " ");
    const selection = window.getSelection();
    if (!selection?.rangeCount) return;
    const range = selection.getRangeAt(0);
    range.deleteContents();
    const textNode = document.createTextNode(text);
    range.insertNode(textNode);
    range.setStartAfter(textNode);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
  };

  return { onClickCapture, onDoubleClickCapture, onKeyDownCapture, onPasteCapture };
}
