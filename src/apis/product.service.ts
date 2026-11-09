import { fetchCmsContent, type CatalogProduct, type CmsContent } from "@/hooks/data/useCmsContent";
import type { Product, ProductBodyArea, ProductCategory, ProductSkinType } from "@/types/Product";

export interface ProductFilters {
  collection?: string; category?: ProductCategory | "all"; search?: string; concern?: string;
  skinType?: ProductSkinType; bodyArea?: ProductBodyArea; minPrice?: number; maxPrice?: number;
  discountOnly?: boolean; sort?: "featured" | "bestSeller" | "newest" | "priceAsc" | "priceDesc";
}
const lines = (value?: string) => value ? value.split(/\r?\n/).map(line => line.trim()).filter(Boolean) : [];
export function catalogProducts(content: Pick<CmsContent, "products" | "productTypes">, now = Date.now()): Product[] {
  return (content.products ?? []).flatMap((row: CatalogProduct) => {
    const variant = row.variants[0];
    if (!variant) return [];
    const flashActive = variant.flashPrice != null && Date.parse(variant.flashStartsAt || "") <= now && now < Date.parse(variant.flashEndsAt || "");
    const price = Number(flashActive ? variant.flashPrice : variant.sellingPrice);
    const listPrice = Number(variant.listPrice);
    if (!Number.isFinite(price) || price < 0) return [];
    const category = content.productTypes?.find(type => type.id === row.categoryId);
    return [{
      id: row.id, slug: row.slug, name: row.name, shortName: row.shortName || "",
      category: category?.code || "", categoryLabel: category?.name || "",
      skinTypes: row.suitableSkinTypes?.split(/[,;\n]/).map(value => value.trim()).filter(Boolean),
      concern: row.suitableSkinTypes || "", description: row.description || "",
      volume: variant.name || variant.packaging || "", price,
      compareAtPrice: listPrice > price ? listPrice : undefined,
      image: row.imageUrl, badge: row.displayLabel || undefined, tone: "var(--color-surface)",
      ingredients: lines(row.keyIngredients), fullIngredients: row.ingredients || "",
      benefits: lines(row.benefits), usageInstructions: row.usageInstructions || "",
      isFeatured: row.isFeatured, isBestSeller: row.isBestSeller, publishedAt: row.publishedAt, productLineId: row.productLineId,
    }];
  });
}
export async function getProducts(filters: ProductFilters = {}, signal?: AbortSignal): Promise<Product[]> {
  const { content } = await fetchCmsContent("shop", signal);
  const term = filters.search?.trim().toLocaleLowerCase("vi") ?? "";
  const collection = content.productLines?.find(line => [line.id, line.slug, line.code].includes(filters.collection || ""));
  const products = catalogProducts(content).filter(product => {
    return (!filters.category || filters.category === "all" || product.category === filters.category)
      && (!filters.collection || Boolean(collection && product.productLineId === collection.id))
      && (!term || [product.name, product.shortName, product.concern].some(value => value.toLocaleLowerCase("vi").includes(term)))
      && (!filters.concern || product.concern === filters.concern)
      && (!filters.skinType || Boolean(product.skinTypes?.includes(filters.skinType)))
      && (!filters.bodyArea || product.bodyArea === filters.bodyArea)
      && product.price >= (filters.minPrice ?? 0) && product.price <= (filters.maxPrice ?? Infinity)
      && (!filters.discountOnly || Boolean(product.compareAtPrice && product.compareAtPrice > product.price));
  });
  if (filters.sort === "bestSeller") products.sort((a, b) => Number(Boolean(b.isBestSeller)) - Number(Boolean(a.isBestSeller)));
  else if (filters.sort === "newest") products.sort((a, b) => (Date.parse(b.publishedAt || "") || 0) - (Date.parse(a.publishedAt || "") || 0));
  else if (filters.sort === "priceAsc") products.sort((a, b) => a.price - b.price);
  else if (filters.sort === "priceDesc") products.sort((a, b) => b.price - a.price);
  else products.sort((a, b) => Number(Boolean(b.isFeatured)) - Number(Boolean(a.isFeatured)));
  return products;
}
export async function getProductBySlug(slug: string, signal?: AbortSignal): Promise<Product | null> {
  return (await getProducts({}, signal)).find(product => product.slug === slug) ?? null;
}
