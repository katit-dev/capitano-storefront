import { PATHS } from "./paths";
import { BODY_AREAS, PRODUCT_CATEGORIES, SKIN_TYPES } from "./product-taxonomy";

export interface NavigationItem {
  id?: string;
  openInNewTab?: boolean;
  label: string;
  to: string;
  children?: NavigationItem[];
}

export const NEWS_CATEGORIES = [
  { value: "hoat-dong-noi-bat", label: "Hoạt động nổi bật" },
  { value: "kien-thuc-lam-dep", label: "Kiến thức làm đẹp" },
  { value: "review-san-pham", label: "Review sản phẩm" },
] as const;

export const NAVIGATION: NavigationItem[] = [
  { label: "Về chúng tôi", to: PATHS.HOME },
  {
    label: "Danh mục sản phẩm",
    to: PATHS.SHOP,
    children: PRODUCT_CATEGORIES.map(({ value, label }) => ({
      label,
      to: `${PATHS.SHOP}?category=${value}`,
      children:
        value === "serum" || value === "mask"
          ? SKIN_TYPES.map((skin) => ({
              label: skin.label,
              to: `${PATHS.SHOP}?category=${value}&skin=${skin.value}`,
            }))
          : value === "body-care"
            ? BODY_AREAS.map((area) => ({
                label: area.label,
                to: `${PATHS.SHOP}?category=${value}&area=${area.value}`,
              }))
            : undefined,
    })),
  },
  {
    label: "Tin tức",
    to: PATHS.NEWS,
    children: NEWS_CATEGORIES.map(({ value, label }) => ({
      label,
      to: `${PATHS.NEWS}?category=${value}`,
    })),
  },
];
