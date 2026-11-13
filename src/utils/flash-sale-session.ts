type SessionStorage = Pick<Storage, "getItem" | "setItem">;

function browserSessionStorage(): SessionStorage | undefined {
  try {
    return typeof window === "undefined" ? undefined : window.sessionStorage;
  } catch {
    return undefined;
  }
}

export function createFlashSaleSession(siteCode = "capitano", storage = browserSessionStorage()) {
  const key = `cms:${siteCode}:flash-sale:seen`;
  const seen = new Set<string>();

  try {
    const saved: unknown = JSON.parse(storage?.getItem(key) ?? "[]");
    if (Array.isArray(saved)) {
      for (const id of saved) {
        if (typeof id === "string" && id.length > 0) seen.add(id);
      }
    }
  } catch {
    // Storage can be unavailable or contain invalid data; keep working in memory.
  }

  return {
    hasSeen(id: string): boolean {
      return seen.has(id);
    },
    markSeen(ids: readonly string[]): void {
      let changed = false;
      for (const id of ids) {
        if (id && !seen.has(id)) {
          seen.add(id);
          changed = true;
        }
      }
      if (!changed) return;
      try {
        storage?.setItem(key, JSON.stringify([...seen]));
      } catch {
        // The in-memory set still prevents repeat popups during this page visit.
      }
    },
  };
}
