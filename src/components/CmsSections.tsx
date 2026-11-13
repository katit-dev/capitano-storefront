import { useEffect, useRef, useState } from "react";
import { FiArrowRight, FiChevronLeft, FiChevronRight, FiMail } from "react-icons/fi";
import { PATHS } from "@/config/paths";
import CmsLink from "./CmsLink";
import FlashSaleCountdown from "./FlashSaleCountdown";
import ProductCard from "./ProductCard";
import SkinNeedCard from "./SkinNeedCard";
import { catalogProducts } from "@/apis/product.service";
import { cmsEnabled, subscribeNewsletter, type CmsItem, type CmsContent } from "@/hooks/data/useCmsContent";
import "./cms-content.css";
import { vercelBannerLayouts } from "@/config/vercel-banner-layouts";
import type { Product } from "@/types/Product";
import { isFlashSaleVisible } from "@/utils/flash-sale";
export function CmsBanner({ item, module = "banners", className, imageLoading }: {
  item: CmsItem | null | undefined;
  module?: string;
  className?: string;
  imageLoading?: "eager" | "lazy";
}) {
  const image = item?.imageUrl || item?.bannerImageUrl;
  if (!item || !image) return null;
  const layout = vercelBannerLayouts[image.split("?")[0].split("/").pop() || ""];
  const primary = Boolean(item.buttonLabel?.trim() && item.buttonLinkUrl?.trim());
  const secondary = Boolean(item.secondaryButtonLabel?.trim() && item.secondaryButtonLinkUrl?.trim());
  return <section className={className ? `cms-banner ${className}` : "cms-banner"} data-cms-record={item.id} data-cms-module={module}><img src={image} alt={item.imageAlt || item.bannerImageAlt || ""} loading={imageLoading} />
    {(primary || secondary) && <div className="cms-banner__actions" style={layout ? { left: layout.left, top: layout.top, bottom: "auto" } : undefined}>
      {primary && <CmsLink className={`button button--${layout?.variant || "primary"}`} to={item.buttonLinkUrl!.trim()} openInNewTab={item.openInNewTab}>{item.buttonLabel!.trim()}<FiArrowRight aria-hidden="true" /></CmsLink>}
      {secondary && <CmsLink className="button button--outline" to={item.secondaryButtonLinkUrl!.trim()} openInNewTab={item.secondaryOpenInNewTab}>{item.secondaryButtonLabel!.trim()}<FiArrowRight aria-hidden="true" /></CmsLink>}
    </div>}
  </section>;
}

function FlashSaleProductRow({ id, products }: { id: string; products: { product: Product; skuId: string }[] }) {
  const track = useRef<HTMLDivElement>(null);
  const [canScrollBack, setCanScrollBack] = useState(false);
  const [canScrollForward, setCanScrollForward] = useState(false);

  function updateControls(row: HTMLDivElement) {
    setCanScrollBack(row.scrollLeft > 1);
    setCanScrollForward(row.scrollLeft + row.clientWidth < row.scrollWidth - 1);
  }

  useEffect(() => {
    const row = track.current;
    if (!row) return;
    const measure = () => updateControls(row);
    const observer = new ResizeObserver(measure);
    observer.observe(row);
    return () => observer.disconnect();
  }, [products.length]);

  function scrollProducts(direction: -1 | 1) {
    const row = track.current;
    const card = row?.firstElementChild;
    if (!row || !card) return;
    const gap = parseFloat(window.getComputedStyle(row).columnGap);
    row.scrollBy({
      left: direction * (card.getBoundingClientRect().width + gap),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  }

  const canScroll = canScrollBack || canScrollForward;
  return (
    <div className="flash-sale-section__products">
      {canScroll && (
        <div className="flash-sale-section__controls">
          <button type="button" className="icon-button" aria-label="Xem sản phẩm trước" aria-controls={id}
            disabled={!canScrollBack} onClick={() => scrollProducts(-1)}>
            <FiChevronLeft aria-hidden="true" />
          </button>
          <button type="button" className="icon-button" aria-label="Xem sản phẩm tiếp theo" aria-controls={id}
            disabled={!canScrollForward} onClick={() => scrollProducts(1)}>
            <FiChevronRight aria-hidden="true" />
          </button>
        </div>
      )}
      <div ref={track} id={id} className="flash-sale-section__row" role="region" aria-label="Sản phẩm Flash Sale"
        tabIndex={canScroll ? 0 : undefined} onScroll={event => updateControls(event.currentTarget)}>
        {products.map(({ product, skuId }) => <ProductCard key={skuId} product={product} discountInDetails />)}
      </div>
    </div>
  );
}

export function CmsFlashSales({ items = [], productTypes = [] }: { items?: CmsItem[]; productTypes?: CmsContent["productTypes"] }) {
  const [now, setNow] = useState(Date.now);
  return <>{items.filter(item => isFlashSaleVisible(item, now)).map(item => {
    const titleId = `flash-sale-title-${item.id}`;
    const productsId = `flash-sale-products-${item.id}`;
    const products = (item.products || []).flatMap(row => catalogProducts({ products: [row], productTypes }, now)
      .map(product => ({ product, skuId: row.variants[0].id })));
    const customLink = item.buttonLinkUrl?.trim();
    const offersLink = `${PATHS.SHOP}?${new URLSearchParams({ flashSale: item.id })}`;
    return <section key={item.id} className="flash-sale-section" id={`flash-sale-${item.id}`} aria-labelledby={titleId} data-cms-record={item.id} data-cms-module="flashSales">
      <div className="container-wide">
        <div className="flash-sale-section__header">
          <div className="flash-sale-section__copy">
            <h2 id={titleId}>{item.title?.trim() || "Flash Sale"}</h2>
            {item.subtitle?.trim() && <p>{item.subtitle}</p>}
            <CmsLink className="button button--primary flash-sale-section__button" to={customLink || offersLink} openInNewTab={Boolean(customLink && item.openInNewTab)}>
              {item.buttonLabel?.trim() || "Xem ưu đãi"} <FiArrowRight aria-hidden="true" />
            </CmsLink>
          </div>
          <div className="flash-sale-section__timer">
            <FlashSaleCountdown
              compact
              startsAt={item.startsAt}
              endsAt={item.endsAt}
              showDigits={item.showCountdown !== false}
              onTick={setNow}
            />
          </div>
        </div>
        {products.length > 0 ? <FlashSaleProductRow id={productsId} products={products} />
          : <p className="flash-sale-section__empty">Ưu đãi đang được cập nhật.</p>}
      </div>
    </section>;
  })}</>;
}
export function CmsSkinNeeds({ section, items = [], id = "nhu-cau-lan-da" }: { section?: CmsItem | null; items?: CmsItem[]; id?: string }) {
  if (!section || !items.length) return null;
  return <section className="section category-section skin-needs-section" id={id} aria-labelledby={`${id}-title`}><div className="container-wide">
    <div className="commerce-heading commerce-heading--center"><h2 id={`${id}-title`}>{section.title}</h2></div>
    <div className="skin-needs-grid">{items.map(item => <SkinNeedCard key={item.id} item={item} linkLabel={section.linkLabel} />)}</div>
  </div></section>;
}
export function CmsNewsletter({ item }: { item: CmsItem | null | undefined }) {
  const [email, setEmail] = useState("");
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");
  const [failed, setFailed] = useState(false);
  if (!item) return null;
  return (
    <section className="newsletter newsletter--commerce" aria-labelledby="newsletter-title">
      <div className="container-wide newsletter__inner">
        <div className="newsletter__copy">
          <span className="newsletter__icon"><FiMail aria-hidden="true" /></span>
          <h2 id="newsletter-title">
            {item.titleLine1 || "Đăng ký nhận tin"}{item.titleLine2 && <><br />{item.titleLine2}</>}
          </h2>
          {item.description && <p>{item.description}</p>}
        </div>
        <form className="newsletter__form" onSubmit={async event => {
          event.preventDefault();
          if (pending) return;
          setPending(true);
          setMessage("");
          setFailed(false);
          try {
            const result = await subscribeNewsletter(email.trim());
            setMessage(result.message || item.successMessage || "Đăng ký thành công.");
            setEmail("");
          } catch {
            setFailed(true);
            setMessage(cmsEnabled
              ? item.errorMessage || "Chưa đăng ký được. Vui lòng thử lại."
              : "Chưa thể đăng ký vì website chưa kết nối hệ thống nhận tin.");
          } finally {
            setPending(false);
          }
        }}>
          <label className="newsletter__label" htmlFor="newsletter-email">Địa chỉ email</label>
          <div className="newsletter__fields">
            <input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={event => setEmail(event.target.value)}
              placeholder={item.inputPlaceholder || ""}
              autoComplete="email"
              required
              disabled={pending}
            />
            <button type="submit" disabled={pending}>{pending ? "Đang đăng ký…" : item.buttonLabel || "Đăng ký"}</button>
          </div>
          {message && <p className="newsletter__status" role={failed ? "alert" : "status"}>{message}</p>}
        </form>
      </div>
    </section>
  );
}
