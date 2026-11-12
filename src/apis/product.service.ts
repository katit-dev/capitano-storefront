import type { CatalogProduct, CmsContent } from "@/hooks/data/useCmsContent";
import type { Product, ProductBodyArea, ProductCategory, ProductSkinType } from "@/types/Product";

export interface ProductFilters {
  collection?: string; category?: ProductCategory | "all"; search?: string; concern?: string;
  skinType?: ProductSkinType; bodyArea?: ProductBodyArea; minPrice?: number; maxPrice?: number;
  discountOnly?: boolean; flashSaleOnly?: boolean; sort?: "featured" | "bestSeller" | "newest" | "priceAsc" | "priceDesc";
}
const lines = (value?: string) => value ? value.split(/\r?\n/).map(line => line.trim()).filter(Boolean) : [];
const volumeFormat = new Intl.NumberFormat("vi-VN", { maximumFractionDigits: 2 });
export function catalogProducts(content: Pick<CmsContent, "products" | "productTypes">, now = Date.now()): Product[] {
  return (content.products ?? []).flatMap((row: CatalogProduct) => {
    const variant = row.variants[0];
    if (!variant) return [];
    const flashActive = variant.flashPrice != null && Date.parse(variant.flashStartsAt || "") <= now && now < Date.parse(variant.flashEndsAt || "");
    const price = Number(flashActive ? variant.flashPrice : variant.sellingPrice);
    const listPrice = Number(variant.listPrice);
    if (!Number.isFinite(price) || price < 0) return [];
    const category = content.productTypes?.find(type => type.id === row.categoryId);
    const unitVolume = Number(variant.unitVolume);
    const volumeUnit = variant.volumeUnit?.trim();
    const volume = Number.isFinite(unitVolume) && unitVolume > 0 && volumeUnit
      ? `${volumeFormat.format(unitVolume)} ${volumeUnit}`
      : variant.name?.trim() || variant.packaging?.trim() || "";
    return [{
      id: row.id, slug: row.slug, sku: variant.sku || undefined, name: row.name, shortName: row.shortName || "",
      category: category?.code || "", categoryLabel: category?.name || "",
      skinTypes: row.suitableSkinTypes?.split(/[,;\n]/).map(value => value.trim()).filter(Boolean),
      concern: row.suitableSkinTypes || "", careNeeds: row.careNeeds, description: row.description || "",
      overview: row.overview,
      volume, price,
      compareAtPrice: Number.isFinite(listPrice) && listPrice > price ? listPrice : undefined,
      isFlashSale: flashActive,
      image: row.imageUrl, catalogImage: row.catalogImageUrl,
      badge: row.displayLabel || undefined, tone: "var(--color-surface)",
      ingredients: lines(row.keyIngredients), fullIngredients: row.ingredients || "",
      benefits: lines(row.benefits), usageInstructions: row.usageInstructions || "",
      isFeatured: row.isFeatured, isBestSeller: row.isBestSeller, publishedAt: row.publishedAt, productLineId: row.productLineId,
    }];
  });
}
const searchText = (value: string) =>
  value.toLocaleLowerCase("vi").normalize("NFD").replace(/\p{Diacritic}/gu, "").replace(/đ/g, "d");

export function filterProducts(content: CmsContent, filters: ProductFilters = {}): Product[] {
  const term = searchText(filters.search?.trim() || "");
  const collection = content.productLines?.find(line => [line.id, line.slug, line.code].includes(filters.collection || ""));
  const products = catalogProducts(content).filter(product => {
    return (!filters.category || filters.category === "all" || product.category === filters.category)
      && (!filters.collection || Boolean(collection && product.productLineId === collection.id))
      && (!term || [product.name, product.shortName, product.concern, product.sku || ""].some(value => searchText(value).includes(term)))
      && (!filters.concern || product.concern === filters.concern || product.careNeeds?.includes(filters.concern))
      && (!filters.skinType || Boolean(product.skinTypes?.includes(filters.skinType)))
      && (!filters.bodyArea || product.bodyArea === filters.bodyArea)
      && product.price >= (filters.minPrice ?? 0) && product.price <= (filters.maxPrice ?? Infinity)
      && (!filters.flashSaleOnly || product.isFlashSale)
      && (!filters.discountOnly || Boolean(product.compareAtPrice && product.compareAtPrice > product.price));
  });
  if (filters.sort === "bestSeller") products.sort((a, b) => Number(Boolean(b.isBestSeller)) - Number(Boolean(a.isBestSeller)));
  else if (filters.sort === "newest") products.sort((a, b) => (Date.parse(b.publishedAt || "") || 0) - (Date.parse(a.publishedAt || "") || 0));
  else if (filters.sort === "priceAsc") products.sort((a, b) => a.price - b.price);
  else if (filters.sort === "priceDesc") products.sort((a, b) => b.price - a.price);
  else products.sort((a, b) => Number(Boolean(b.isFeatured)) - Number(Boolean(a.isFeatured)));
  return products;
}
