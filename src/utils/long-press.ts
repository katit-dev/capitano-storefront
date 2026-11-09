type Contact = { pointerId: number; clientX: number; clientY: number };
type Options = { delay?: number; tolerance?: number; onRelease?: () => void };

// Retain the original contact after opening so only its release ends the preview.
export function createLongPress(
  onHold: () => void,
  { delay = 500, tolerance = 10, onRelease = () => {} }: Options = {},
) {
  let contact: Contact | null = null;
  let opened = false;
  let timer: ReturnType<typeof setTimeout> | undefined;

  function cancel() {
    clearTimeout(timer);
    timer = undefined;
    contact = null;
    const wasOpen = opened;
    opened = false;
    if (wasOpen) onRelease();
  }

  return {
    get active() {
      return contact !== null;
    },
    start(next: Contact) {
      cancel();
      contact = next;
      timer = setTimeout(() => {
        timer = undefined;
        opened = true;
        onHold();
      }, delay);
    },
    move(next: Contact) {
      if (opened || contact?.pointerId !== next.pointerId) return;
      if (
        Math.hypot(
          next.clientX - contact.clientX,
          next.clientY - contact.clientY,
        ) > tolerance
      )
        cancel();
    },
    end(pointerId: number) {
      if (contact?.pointerId === pointerId) cancel();
    },
    cancel,
  };
}
