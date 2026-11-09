import type {
  ProductBodyArea,
  ProductCategory,
  ProductSkinType,
} from "@/types/Product";

export const PRODUCT_CATEGORIES: { value: ProductCategory; label: string }[] = [
  { value: "cleanser", label: "Sữa rửa mặt" },
  { value: "toner", label: "Toner" },
  { value: "serum", label: "Tinh chất/Serum" },
  { value: "mask", label: "Mặt nạ" },
  { value: "moisturizer", label: "Kem dưỡng" },
  { value: "sunscreen", label: "Kem chống nắng" },
  { value: "body-care", label: "Chăm sóc cơ thể" },
];

export const SKIN_TYPES: { value: ProductSkinType; label: string }[] = [
  { value: "dry", label: "Da khô" },
  { value: "oily-acne", label: "Da dầu, mụn" },
  { value: "aging", label: "Da lão hóa" },
  { value: "uneven-tone", label: "Da không đều màu" },
  { value: "sensitive", label: "Da nhạy cảm" },
];

export const BODY_AREAS: { value: ProductBodyArea; label: string }[] = [
  { value: "hands", label: "Vùng da tay" },
  { value: "body", label: "Toàn thân" },
];
