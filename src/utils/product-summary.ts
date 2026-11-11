import type { Product } from "@/types/Product";

export function getProductSummary(product: Product) {
  const shortName = product.shortName.trim();
  if (shortName && shortName !== product.name.trim() && shortName !== product.volume.trim()) {
    return shortName;
  }

  return product.description.trim().split(/\r?\n[ \t]*\r?\n/, 1)[0];
}
