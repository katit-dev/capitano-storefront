export function getDiscountPercent(price: number, compareAtPrice?: number) {
  if (!compareAtPrice || compareAtPrice <= price) return null;

  return Math.round(((compareAtPrice - price) / compareAtPrice) * 100);
}
