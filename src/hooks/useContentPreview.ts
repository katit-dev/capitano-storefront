import { useCallback, useEffect, useMemo } from "react";
import type {
  DragEvent as ReactDragEvent,
  KeyboardEvent as ReactKeyboardEvent,
  MouseEvent as ReactMouseEvent,
  PointerEvent as ReactPointerEvent,
} from "react";
import { useSetAtom } from "jotai";
import { previewEnabled } from "@/hooks/data/cmsPreview";
import { contentPreviewAtom } from "@/stores/contentPreviewStore";
import type {
  ContentPreview,
  ContentPreviewData,
} from "@/stores/contentPreviewStore";
import { createLongPress } from "@/utils/long-press";

// Arm on release, not on opening: even a very long hold must consume its click.
function suppressReleaseClick() {
  const cleanup = () => {
    clearTimeout(expiry);
    window.removeEventListener("click", consume, true);
    window.removeEventListener("pointerdown", cleanup, true);
    window.removeEventListener("keydown", cleanup, true);
  };
  const consume = (event: MouseEvent) => {
    event.preventDefault();
    event.stopImmediatePropagation();
    cleanup();
  };
  const expiry = setTimeout(cleanup, 800);
  window.addEventListener("click", consume, true);
  window.addEventListener("pointerdown", cleanup, true);
  window.addEventListener("keydown", cleanup, true);
}

type OpenPreview = () => (() => void) | undefined;

function createPreviewGesture(onOpen: OpenPreview) {
  let detach = () => {};
  let close: (() => void) | undefined;
  let activePointer = 0;
  let heldKey = "";
  const hold = createLongPress(
    () => {
      close = onOpen();
      if (!close) cancel();
    },
    {
      onRelease: () => {
        if (close) {
          suppressReleaseClick();
          close();
          close = undefined;
        }
      },
    },
  );
  const cancel = () => {
    hold.cancel();
    detach();
  };
  const end = (event: PointerEvent) => {
    if (event.pointerId !== activePointer) return;
    hold.end(event.pointerId);
    detach();
  };
  const move = (event: PointerEvent) => {
    hold.move(event);
    if (!hold.active) detach();
  };
  const additionalContact = (event: PointerEvent) => {
    if (event.pointerId !== activePointer) cancel();
  };
  const keyUp = (event: KeyboardEvent) => {
    if (heldKey && event.key === heldKey) {
      event.preventDefault();
      cancel();
    }
  };
  const otherKey = (event: KeyboardEvent) => {
    if (event.key !== heldKey) cancel();
  };

  function start(
    pointerId: number,
    clientX: number,
    clientY: number,
    key = "",
  ) {
    cancel();
    activePointer = pointerId;
    heldKey = key;
    hold.start({ pointerId, clientX, clientY });
    window.addEventListener("pointerup", end, true);
    window.addEventListener("pointercancel", end, true);
    window.addEventListener("pointermove", move, true);
    window.addEventListener("pointerdown", additionalContact, true);
    window.addEventListener("keyup", keyUp, true);
    window.addEventListener("keydown", otherKey, true);
    window.addEventListener("scroll", cancel, true);
    window.addEventListener("blur", cancel);
    window.addEventListener("resize", cancel);
    document.addEventListener("visibilitychange", cancel);
    detach = () => {
      window.removeEventListener("pointerup", end, true);
      window.removeEventListener("pointercancel", end, true);
      window.removeEventListener("pointermove", move, true);
      window.removeEventListener("pointerdown", additionalContact, true);
      window.removeEventListener("keyup", keyUp, true);
      window.removeEventListener("keydown", otherKey, true);
      window.removeEventListener("scroll", cancel, true);
      window.removeEventListener("blur", cancel);
      window.removeEventListener("resize", cancel);
      document.removeEventListener("visibilitychange", cancel);
    };
  }
  return {
    start,
    cancel,
    get active() {
      return hold.active;
    },
  };
}

function usePreviewHold(onOpen: OpenPreview) {
  const gesture = useMemo(() => createPreviewGesture(onOpen), [onOpen]);
  useEffect(() => () => gesture.cancel(), [gesture]);
  return {
    "data-product-preview-hold": "",
    // Links and images otherwise remain native drag sources on iOS.
    draggable: false,
    onDragStart(event: ReactDragEvent<HTMLElement>) {
      if (!previewEnabled) event.preventDefault();
    },
    onPointerDown(event: ReactPointerEvent<HTMLElement>) {
      const button = event.currentTarget.tagName === "BUTTON";
      if (
        previewEnabled ||
        !event.isPrimary ||
        (!button && event.pointerType !== "touch") ||
        (button && event.button !== 0)
      )
        return;
      gesture.start(event.pointerId, event.clientX, event.clientY);
    },
    onKeyDown(event: ReactKeyboardEvent<HTMLElement>) {
      if (
        previewEnabled ||
        event.currentTarget.tagName !== "BUTTON" ||
        ![" ", "Enter"].includes(event.key)
      )
        return;
      event.preventDefault();
      if (!event.repeat) gesture.start(-1, 0, 0, event.key);
    },
    onContextMenu(event: ReactMouseEvent<HTMLElement>) {
      if (
        !previewEnabled &&
        (gesture.active || window.matchMedia("(any-pointer: coarse)").matches)
      )
        event.preventDefault();
    },
  };
}

export function useContentPreview(content: ContentPreviewData | undefined) {
  const setPreview = useSetAtom(contentPreviewAtom);
  const image = content?.image;
  const title = content?.title ?? "";
  const description = content?.description ?? "";
  const imageAlt = content?.imageAlt || title;
  const open = useCallback(
    (mode: ContentPreview["mode"]) => {
      if (
        !image ||
        previewEnabled ||
        document.hidden ||
        document.querySelector("dialog[open]")
      )
        return;
      const value: ContentPreview = {
        content: { image, imageAlt, title, description },
        mode,
      };
      setPreview(value);
      return () =>
        setPreview((current) => (current === value ? null : current));
    },
    [image, imageAlt, title, description, setPreview],
  );
  const openImage = useCallback(() => open("image"), [open]);
  const openDetails = useCallback(() => open("details"), [open]);
  const imageHold = usePreviewHold(openImage);
  const detailsHold = usePreviewHold(openDetails);
  // Guard a surrounding link without making its CTA another hold trigger.
  const nativeGuard = {
    "data-product-preview-hold": "",
    draggable: false,
    onDragStart: detailsHold.onDragStart,
    onContextMenu: detailsHold.onContextMenu,
  };
  return { imageHold, detailsHold, nativeGuard };
}
