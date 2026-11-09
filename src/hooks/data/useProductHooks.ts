import { useQuery } from "@tanstack/react-query";
import { getProductBySlug, getProducts, type ProductFilters } from "@/apis/product.service";

export function useProducts(filters: ProductFilters = {}) {
  return useQuery({
    queryKey: ["products", filters],
    queryFn: ({ signal }) => getProducts(filters, signal),
    staleTime: 0, refetchInterval: 30_000, refetchOnWindowFocus: true,
  });
}

export function useProduct(slug?: string) {
  return useQuery({
    queryKey: ["products", slug],
    queryFn: ({ signal }) => getProductBySlug(slug!, signal),
    staleTime: 0, refetchInterval: 30_000, refetchOnWindowFocus: true,
    enabled: Boolean(slug),
  });
}
