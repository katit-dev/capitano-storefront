import type { CatalogProduct, CmsItem } from "@/hooks/data/useCmsContent";

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

export function isFlashSaleVisible(sale: CmsItem, now = Date.now()): boolean {
  return sale.isActive && (sale.showAfterEnd === true || now < Date.parse(sale.endsAt ?? ""));
}

export function getNextFlashPriceChange(products: readonly CatalogProduct[] = [], now = Date.now()): number | undefined {
  let next = Infinity;
  for (const product of products) {
    const variant = product.variants[0];
    if (variant?.flashPrice == null) continue;
    const start = Date.parse(variant.flashStartsAt ?? "");
    const end = Date.parse(variant.flashEndsAt ?? "");
    if (!Number.isFinite(start) || !Number.isFinite(end) || start >= end || now >= end) continue;
    next = Math.min(next, now < start ? start : end);
  }
  return Number.isFinite(next) ? next : undefined;
}
