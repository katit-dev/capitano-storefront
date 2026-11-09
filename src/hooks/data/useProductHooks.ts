import { filterProducts, type ProductFilters } from "@/apis/product.service";
import { useCmsContent } from "@/hooks/data/useCmsContent";

export function useProducts(filters: ProductFilters = {}) {
  const query = useCmsContent("shop");
  const content = query.data?.content;
  return { ...query, data: content ? filterProducts(content, filters) : undefined };
}

export function useProduct(slug?: string) {
  const query = useProducts();
  return { ...query, data: query.data?.find(product => product.slug === slug) ?? null };
}
