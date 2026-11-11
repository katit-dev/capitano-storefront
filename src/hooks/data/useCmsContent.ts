import { useQuery } from "@tanstack/react-query";
import { capitanoContent } from "@/data/capitano-catalog";
import type { NavigationItem } from "@/config/routes.config";
import { previewEnabled, usePreviewSnapshot } from "./cmsPreview";
export type CmsItem = {
  id: string; isActive: boolean; sortOrder?: number; parentId?: string | null; productLineId?: string | null; products?: CatalogProduct[];
  message?: string | null; partnerLabel?: string | null; partnerLogoUrl?: string | null; partnerLogoAlt?: string | null; partnerLinkUrl?: string | null;
  logoUrl?: string | null; logoAlt?: string | null; logoLinkUrl?: string | null; showCart?: boolean; showHotline?: boolean; hotlineLabel?: string | null; hotlineNumber?: string | null;
  label?: string | null; linkUrl?: string | null; openInNewTab?: boolean;
  imageUrl?: string | null; imageAlt?: string | null; bannerImageUrl?: string | null; bannerImageAlt?: string | null; buttonLabel?: string | null; buttonLinkUrl?: string | null;
  secondaryButtonLabel?: string | null; secondaryButtonLinkUrl?: string | null; secondaryOpenInNewTab?: boolean;
  title?: string | null; subtitle?: string | null; titleLine1?: string | null; titleLine2?: string | null; description?: string | null; linkLabel?: string | null;
  inputPlaceholder?: string | null; successMessage?: string | null; errorMessage?: string | null;
  startsAt?: string; endsAt?: string; showCountdown?: boolean; showAfterEnd?: boolean;
};
export type CatalogType = { id: string; code: string; slug?: string; name: string };
export type CatalogVariant = { id: string; sku: string; name: string; packaging?: string; unitVolume?: number | string | null; volumeUnit?: string | null; listPrice: number | string; sellingPrice: number | string; flashPrice?: number | string; flashStartsAt?: string; flashEndsAt?: string };
export type CatalogProduct = {
  id: string; code: string; slug: string; name: string; shortName?: string; categoryId?: string;
  productLineId?: string; description?: string; overview?: string; suitableSkinTypes?: string; careNeeds?: string[]; keyIngredients?: string;
  ingredients?: string; benefits?: string; usageInstructions?: string; displayLabel?: string;
  isFeatured?: boolean; isBestSeller?: boolean; publishedAt?: string | null; imageUrl: string; variants: CatalogVariant[];
};
export type CmsContent = {
  products?: CatalogProduct[]; productTypes?: CatalogType[]; productLines?: CatalogType[];
  announcement: CmsItem | null; header: CmsItem | null; menu: CmsItem[];
  banners?: CmsItem[]; flashSales?: CmsItem[]; skinNeedSection?: CmsItem | null; skinNeeds?: CmsItem[]; featuredLines?: CmsItem[];
  underBanner?: CmsItem | null; newsletter: CmsItem | null; footer?: CmsItem | null; shopHero?: CmsItem | null;
};
type Envelope<T> = { success: boolean; data: T; message?: string };
const base = (import.meta.env.VITE_CMS_API_URL || "").replace(/\/$/, "");
const code = import.meta.env.VITE_CMS_SITE_CODE || "capitano";
export const cmsEnabled = Boolean(base);
const endpoint = `${base}/api/public/v1/sites/${encodeURIComponent(code)}`;
async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${endpoint}/${path}`, options);
  if (!response.ok) throw new Error("Không thể tải nội dung. Vui lòng thử lại.");
  const result: Envelope<T> = await response.json();
  if (!result.success) throw new Error(result.message || "Yêu cầu chưa thành công.");
  return result.data;
}
const localData = { content: capitanoContent };

export function useCmsContent(page: "home" | "shop") {
  const preview = usePreviewSnapshot();
  const query = useQuery({
    queryKey: ["cms", base, code, page],
    queryFn: ({ signal }) => request<{ content: CmsContent }>(page, { signal }),
    enabled: !previewEnabled && cmsEnabled && typeof window !== "undefined",
    staleTime: 0,
    retry: false,
    refetchInterval: cmsEnabled && !previewEnabled ? 30_000 : false,
    refetchOnWindowFocus: true,
  });

  if (previewEnabled && preview) {
    return { ...query, data: { content: preview.content }, isPending: false, isLoading: false, isError: false, isLocal: false };
  }
  if (!previewEnabled && (!cmsEnabled || (query.isError && !query.data))) {
    return { ...query, data: localData, isPending: false, isLoading: false, isError: false, isLocal: true };
  }
  return { ...query, isError: query.isError && !query.data, isLocal: false };
}
export function subscribeNewsletter(email: string) {
  if (previewEnabled) return Promise.reject(new Error("Form đăng ký chỉ hoạt động trên website thật."));
  if (!cmsEnabled) return Promise.reject(new Error("Đăng ký nhận tin chưa sẵn sàng."));
  return request<{ message: string }>("newsletter", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
}
export function menuTree(rows: CmsItem[], parentId: string | null = null): NavigationItem[] {
  return rows.filter(row => (row.parentId || null) === parentId).map(row => ({ id: row.id, label: row.label || "", to: row.linkUrl || "#", openInNewTab: row.openInNewTab, children: menuTree(rows, row.id) }));
}

export function recordSiteVisit(id: string) {
  if (!cmsEnabled || previewEnabled || window.self !== window.top) return Promise.resolve();
  return request<{ recorded: boolean }>("visits", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }), keepalive: true });
}
