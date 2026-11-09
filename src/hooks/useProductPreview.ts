import { useContentPreview } from "@/hooks/useContentPreview";
import type { Product } from "@/types/Product";

// Product cards retain the phase-one API while sharing the same hold lifecycle.
export function useProductPreview(
  product: Pick<Product, "image" | "name" | "shortName"> | undefined,
) {
  return useContentPreview(
    product
      ? {
          image: product.image,
          title: product.name,
          description: product.shortName,
        }
      : undefined,
  );
}
