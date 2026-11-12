import { useSetAtom } from "jotai";
import { FiArrowUpRight, FiPlus, FiZoomIn } from "react-icons/fi";
import { Link } from "react-router-dom";
import { PATHS } from "@/config/paths";
import { addToCartAtom } from "@/stores/cartStore";
import type { Product } from "@/types/Product";
import { getDiscountPercent } from "@/utils/pricing";
import { getProductSummary } from "@/utils/product-summary";
import { useProductPreview } from "@/hooks/useProductPreview";

const price = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
  maximumFractionDigits: 0,
});

export default function ProductCard({
  product,
  priority = false,
  lineLabel,
}: {
  product: Product;
  priority?: boolean;
  lineLabel?: string;
}) {
  const addToCart = useSetAtom(addToCartAtom);
  const preview = useProductPreview(product);
  const imageTreatment = product.catalogImage ? "catalog" : product.cardImageTreatment;
  const label = lineLabel || product.categoryLabel;
  const subtitle = [product.volume, getProductSummary(product)].filter(Boolean).join(" · ");
  const discountPercent = getDiscountPercent(
    product.price,
    product.compareAtPrice,
  );

  return (
    <article
      className={`product-card${imageTreatment ? ` product-card--${imageTreatment}` : ""}`}
    >
      <Link
        to={PATHS.product(product.slug)}
        className="product-card__media"
        {...preview.imageHold}
        style={{ "--product-tone": product.tone } as React.CSSProperties}
        aria-label={`Xem ${product.name}`}
      >
        {product.badge ? (
          <span className="product-card__badge">{product.badge}</span>
        ) : null}
        {product.isBestSeller ? (
          <span className="product-card__bestseller">
            Bestseller
          </span>
        ) : null}
        {discountPercent !== null ? (
          <span className="product-card__sale">{discountPercent > 0 ? `Giảm ${discountPercent}%` : "Giảm giá"}</span>
        ) : null}
        <img
          src={product.catalogImage || product.image}
          alt={product.name}
          draggable={false}
          loading={priority ? "eager" : "lazy"}
        />
        <span className="product-card__view" aria-hidden="true">
          <FiArrowUpRight />
        </span>
      </Link>
      <div className="product-card__body">
        <div className="product-card__info">
          {label && <p className="eyebrow">{label}</p>}
          <Link
            to={PATHS.product(product.slug)}
            className="product-card__title"
            {...preview.detailsHold}
            title={product.name}
          >
            {product.name}
          </Link>
          {subtitle && <p className="product-card__subtitle" title={subtitle} {...preview.detailsHold}>{subtitle}</p>}
        </div>
        <button type="button" className="product-preview-button" aria-label={`Giữ để xem ${product.name}`} {...preview.detailsHold} onClick={event => event.preventDefault()}><FiZoomIn aria-hidden="true" /> Giữ để xem</button>
        <div className="product-card__bottom">
          <div className="product-card__price">
            <strong>{price.format(product.price)}</strong>
            {discountPercent !== null && product.compareAtPrice !== undefined ? (
              <del
                aria-label={`Giá gốc ${price.format(product.compareAtPrice)}`}
              >
                {price.format(product.compareAtPrice)}
              </del>
            ) : null}
          </div>
          <button
            type="button"
            className="icon-button icon-button--add"
            onClick={() => addToCart(product.id)}
            aria-label={`Thêm ${product.name} vào giỏ`}
          >
            <FiPlus aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
}
