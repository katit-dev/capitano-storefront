export type ProductCategory = string;
export type ProductSkinType = string;
export type ProductBodyArea = "hands" | "body";

export interface Product {
  id: string;
  slug: string;
  sku?: string;
  name: string;
  shortName: string;
  category: ProductCategory;
  categoryLabel: string;
  concern: string;
  careNeeds?: string[];
  skinTypes?: ProductSkinType[];
  bodyArea?: ProductBodyArea;
  description: string;
  overview?: string;
  volume: string;
  price: number;
  isFlashSale?: boolean;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  publishedAt?: string | null;
  productLineId?: string;
  fullIngredients?: string;
  usageInstructions?: string;
  compareAtPrice?: number;
  image: string;
  cardImageTreatment?: "padded-mask" | "full-mask";
  badge?: string;
  tone: string;
  ingredients: string[];
  benefits: string[];
}

export interface CartItem {
  productId: string;
  quantity: number;
}
