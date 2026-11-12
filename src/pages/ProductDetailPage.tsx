import { useState } from "react";
import { useSetAtom } from "jotai";
import {
  FiArrowLeft,
  FiCheck,
  FiMinus,
  FiPlus,
  FiShield,
  FiTruck,
  FiZoomIn,
} from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
import ProductCard from "@/components/ProductCard";
import ProductFormulaTabs from "@/components/ProductFormulaTabs";
import { useProductPreview } from "@/hooks/useProductPreview";
import { PATHS } from "@/config/paths";
import { useProduct, useProducts } from "@/hooks/data/useProductHooks";
import { addToCartAtom } from "@/stores/cartStore";
import type { Product } from "@/types/Product";
import { getDiscountPercent } from "@/utils/pricing";
import { getProductSummary } from "@/utils/product-summary";

const price = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
  maximumFractionDigits: 0,
});

function ProductPurchase({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const addToCart = useSetAtom(addToCartAtom);

  return (
    <div className="product-detail__buy">
      <div className="quantity-control quantity-control--large" role="group" aria-label="Số lượng">
        <button
          type="button"
          onClick={() => setQuantity(current => Math.max(1, current - 1))}
          aria-label="Giảm số lượng"
          disabled={quantity === 1}
        >
          <FiMinus aria-hidden="true" />
        </button>
        <output>{quantity}</output>
        <button
          type="button"
          onClick={() => setQuantity(current => current + 1)}
          aria-label="Tăng số lượng"
        >
          <FiPlus aria-hidden="true" />
        </button>
      </div>
      <button
        className="button button--primary button--buy"
        type="button"
        onClick={() => addToCart(product.id, quantity)}
      >
        Thêm vào giỏ · {price.format(product.price * quantity)}
      </button>
    </div>
  );
}

export default function ProductDetailPage() {
  const catalog = useProducts();
  const { slug } = useParams();
  const query = useProduct(slug);
  const preview = useProductPreview(query.data ?? undefined);

  if (query.isLoading)
    return <div className="detail-loading" aria-label="Đang tải sản phẩm" />;
  if (query.isError) return <div className="empty-state empty-state--page" role="alert"><h1>Không thể tải sản phẩm</h1><button className="button button--outline" onClick={() => void query.refetch()}>Thử lại</button></div>;
  if (!query.data)
    return (
      <div className="empty-state empty-state--page">
        <h1>Không tìm thấy sản phẩm</h1>
        <Link className="button button--primary" to={PATHS.SHOP}>
          Về cửa hàng
        </Link>
      </div>
    );

  const product = query.data;
  const productLabel = [product.categoryLabel, product.volume].filter(Boolean).join(" · ");
  const summary = getProductSummary(product);
  const description = product.overview?.trim() || product.description.trim();
  const ingredients = product.ingredients.map(value => value.trim()).filter(Boolean);
  const benefits = product.benefits
    .map(value => value.trim().replace(/^(?:[•·–—]\s*|-\s+)/, ""))
    .filter(Boolean);
  const discountPercent = getDiscountPercent(
    product.price,
    product.compareAtPrice,
  );
  const otherProducts = (catalog.data ?? []).filter(item => item.id !== product.id);
  const isSameLine = (item: Product) =>
    Boolean(product.productLineId && item.productLineId === product.productLineId);
  const related = [
    ...otherProducts.filter(isSameLine),
    ...otherProducts.filter(item =>
      product.category && item.category === product.category && !isSameLine(item),
    ),
  ].slice(0, 3);
  return (
    <div className={query.isLocal ? "product-detail-page product-detail-page--local" : "product-detail-page"}>
      <div className="container-wide product-detail">
        <div className={product.catalogImage ? "product-detail__media product-detail__media--catalog" : "product-detail__media"}>
          <Link to={PATHS.SHOP} className="product-detail__back">
            <FiArrowLeft aria-hidden="true" /> Cửa hàng
          </Link>
          {product.badge ? (
            <span className="product-detail__badge">{product.badge}</span>
          ) : null}
          <img src={product.catalogImage || product.image} alt={product.name} {...preview.imageHold} />
          <button type="button" className="product-preview-button" aria-label={`Giữ để xem ảnh ${product.name}`} {...preview.imageHold} onClick={event => event.preventDefault()}><FiZoomIn aria-hidden="true" /> Giữ để xem</button>
        </div>
        <div className="product-detail__content">
          {productLabel && <p className="eyebrow">{productLabel}</p>}
          <h1>{product.name}</h1>
          {summary && <p className="product-detail__subtitle">{summary}</p>}
          <div className="product-detail__price">
            <strong>{price.format(product.price)}</strong>
            {discountPercent !== null && product.compareAtPrice !== undefined ? (
              <del
                aria-label={`Giá gốc ${price.format(product.compareAtPrice)}`}
              >
                {price.format(product.compareAtPrice)}
              </del>
            ) : null}
            {discountPercent !== null ? (
              <span className="product-detail__discount">
                {discountPercent > 0 ? `Tiết kiệm ${discountPercent}%` : "Giảm giá"}
              </span>
            ) : null}
          </div>
          {description && description !== summary && (
            <p className="product-detail__description">{description}</p>
          )}
          {ingredients.length > 0 && (
            <ul className="product-detail__ingredients" role="list" aria-label="Hoạt chất nổi bật">
              {ingredients.map((ingredient, index) => (
                <li key={`${ingredient}-${index}`}>{ingredient}</li>
              ))}
            </ul>
          )}
          {benefits.length > 0 && (
            <ul className="product-detail__benefits" role="list" aria-label="Công dụng">
              {benefits.map((benefit, index) => (
                <li key={`${benefit}-${index}`}>
                  <FiCheck aria-hidden="true" />
                  {benefit}
                </li>
              ))}
            </ul>
          )}
          <ProductPurchase key={product.id} product={product} />

          <div className="product-detail__assurance">
            <div>
              <FiTruck aria-hidden="true" />
              <span>
                <strong>Thông tin giao hàng</strong>Liên hệ để xác nhận phí và khu vực giao
              </span>
            </div>
            <div>
              <FiShield aria-hidden="true" />
              <span>
                <strong>Sản phẩm chính hãng</strong>Phân phối bởi Picare
              </span>
            </div>
          </div>
        </div>
      </div>

      <ProductFormulaTabs key={product.id} product={product} />

      {related.length > 0 && (
        <section className="section related-section">
          <div className="container-wide">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Gợi ý cho bạn</p>
                <h2>Có thể bạn cũng thích</h2>
              </div>
            </div>
            <div className="product-grid product-grid--related">
              {related.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
