import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { CmsItem } from "@/hooks/data/useCmsContent";
import { previewEnabled } from "@/hooks/data/cmsPreview";
import { PATHS } from "@/config/paths";
import { getActiveFlashSales, isFlashSaleActive } from "@/utils/flash-sale";
import { createFlashSaleSession } from "@/utils/flash-sale-session";
import FlashSalePopup from "./FlashSalePopup";

type Props = {
  items?: readonly CmsItem[];
  enabled?: boolean;
};

const EMPTY_ITEMS: readonly CmsItem[] = [];

export default function FlashSaleAnnouncement({ items = EMPTY_ITEMS, enabled = true }: Props) {
  const [session] = useState(() => createFlashSaleSession(import.meta.env.VITE_CMS_SITE_CODE || "paxmoly"));
  const [sales, setSales] = useState<CmsItem[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const update = () => {
      const active = enabled && !previewEnabled ? getActiveFlashSales(items) : EMPTY_ITEMS;
      setSales(previous => {
        const displayed = new Set(previous.map(sale => sale.id));
        // Keep the current popup open after recording its campaigns as seen.
        const next = active.filter(sale => displayed.has(sale.id)
          || (!document.hidden && !session.hasSeen(sale.id)));
        return next.length === previous.length && next.every((sale, index) => sale === previous[index])
          ? previous
          : next;
      });
    };

    // Reconcile new API data after commit, then track campaign time boundaries.
    const initial = window.setTimeout(update, 0);
    if (previewEnabled || !enabled || !items.length) {
      return () => window.clearTimeout(initial);
    }
    const timer = window.setInterval(update, 1000);
    window.addEventListener("focus", update);
    document.addEventListener("visibilitychange", update);
    return () => {
      window.clearTimeout(initial);
      window.clearInterval(timer);
      window.removeEventListener("focus", update);
      document.removeEventListener("visibilitychange", update);
    };
  }, [items, enabled, session]);

  const saleIds = JSON.stringify(sales.map(sale => sale.id));
  const recordShown = useCallback(() => {
    session.markSeen(JSON.parse(saleIds) as string[]);
  }, [session, saleIds]);

  function dismiss() {
    recordShown();
    setSales([]);
  }

  function viewOffers(sale: CmsItem) {
    dismiss();
    // The campaign can end between the most recent clock tick and this click.
    if (!isFlashSaleActive(sale)) return;

    const sectionId = `flash-sale-${sale.id}`;
    navigate({ pathname: PATHS.HOME, hash: `#${sectionId}` });
    if (location.pathname === PATHS.HOME) {
      window.requestAnimationFrame(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "instant", block: "start" });
      });
    }
  }

  if (previewEnabled || !enabled || !sales.length) return null;

  return (
    <FlashSalePopup
      sales={sales}
      open
      onShown={recordShown}
      onClose={dismiss}
      onViewOffers={viewOffers}
    />
  );
}
