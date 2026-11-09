export const PATHS = {
  HOME: "/",
  SHOP: "/cua-hang",
  NEWS: "/tin-tuc",
  NEWS_ARTICLE: "/tin-tuc/:slug",
  newsArticle: (slug: string) => `/tin-tuc/${slug}`,
  CHECKOUT: "/thanh-toan",
  PRODUCT: "/san-pham/:slug",
  product: (slug: string) => `/san-pham/${slug}`,
} as const;
