import type { CmsContent } from "@/hooks/data/useCmsContent";

const duration = 5 * 60_000;
const startKey = "capitano:local-flash-sale:start";

export function readLocalFlashSaleStart(): number | null {
  try {
    const start = Number(window.sessionStorage.getItem(startKey));
    const now = Date.now();
    return Number.isSafeInteger(start) && start > 0 && start <= now && now < start + duration
      ? start
      : null;
  } catch {
    return null;
  }
}

export function saveLocalFlashSaleStart(start: number) {
  try {
    window.sessionStorage.setItem(startKey, String(start));
  } catch {
    // The current demo can still run in memory when storage is unavailable.
  }
}

export function withLocalFlashSale(content: CmsContent, now: number): CmsContent {
  const startsAt = new Date(now - 1000).toISOString();
  const endsAt = new Date(now + duration).toISOString();
  const prices: Record<string, number> = { CAP012: 109_000, CAP018: 119_000 };
  const products = (content.products ?? []).map(product => {
    const flashPrice = prices[product.variants[0]?.sku];
    if (flashPrice === undefined) return product;
    return {
      ...product,
      variants: product.variants.map((variant, index) => index === 0
        ? { ...variant, flashPrice, flashStartsAt: startsAt, flashEndsAt: endsAt }
        : variant),
    };
  });
  return {
    ...content,
    products,
    flashSales: [{
      id: `capitano-local-flash-sale-${now}`,
      isActive: true,
      title: "Flash Sale Capitano",
      subtitle: "Ưu đãi mẫu cho nước súc miệng và xịt thơm miệng Fresco.",
      startsAt,
      endsAt,
      buttonLabel: "Xem ưu đãi",
      products: products.filter(product => prices[product.variants[0]?.sku] !== undefined),
    }],
  };
}
