import type { CmsItem } from "@/hooks/data/useCmsContent";

type FlashSaleSchedule = Pick<CmsItem, "isActive" | "startsAt" | "endsAt">;

export function isFlashSaleActive(sale: FlashSaleSchedule, now = Date.now()): boolean {
  const startsAt = Date.parse(sale.startsAt ?? "");
  const endsAt = Date.parse(sale.endsAt ?? "");

  // An expired campaign may remain visible, but must not trigger the popup.
  return sale.isActive === true
    && Number.isFinite(now)
    && Number.isFinite(startsAt)
    && Number.isFinite(endsAt)
    && startsAt <= now
    && now < endsAt;
}

export function getActiveFlashSales(items: readonly CmsItem[] = [], now = Date.now()): CmsItem[] {
  return items.filter(item => isFlashSaleActive(item, now));
}
