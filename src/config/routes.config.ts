export interface NavigationItem {
  id?: string;
  openInNewTab?: boolean;
  label: string;
  to: string;
  children?: NavigationItem[];
}

export const NEWS_CATEGORIES = [
  { value: "kien-thuc-rang-mieng", label: "Kiến thức răng miệng" },
  { value: "huong-dan-san-pham", label: "Hướng dẫn chọn và sử dụng sản phẩm" },
  { value: "hoat-dong-thuong-hieu", label: "Hoạt động thương hiệu" },
] as const;
