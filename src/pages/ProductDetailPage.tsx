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
import { useProducts } from "@/hooks/data/useProductHooks";
import { useProduct } from "@/hooks/data/useProductHooks";
import { addToCartAtom, updateCartQuantityAtom } from "@/stores/cartStore";
import { getDiscountPercent } from "@/utils/pricing";

const price = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
  maximumFractionDigits: 0,
});

export default function ProductDetailPage() {
  const catalog = useProducts();
  const { slug } = useParams();
  const query = useProduct(slug);
  const preview = useProductPreview(query.data ?? undefined);
  const [quantity, setQuantity] = useState(1);
  const addToCart = useSetAtom(addToCartAtom);
  const updateQuantity = useSetAtom(updateCartQuantityAtom);

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
  const discountPercent = getDiscountPercent(
    product.price,
    product.compareAtPrice,
  );
  const related = (catalog.data || []).filter(
    (item) => item.category === product.category && item.id !== product.id,
  ).slice(0, 3);
  const handleAdd = () => {
    addToCart(product.id);
    if (quantity > 1) updateQuantity({ productId: product.id, quantity });
  };

  return (
    <div className="product-detail-page">
      <div className="container-wide product-detail">
        <div
          className="product-detail__media"
          style={{ "--product-tone": product.tone } as React.CSSProperties}
        >
          <Link to={PATHS.SHOP} className="back-link">
            <FiArrowLeft /> Cửa hàng
          </Link>
          {product.badge ? (
            <span className="product-detail__badge">{product.badge}</span>
          ) : null}
          <img src={product.image} alt={product.name} {...preview.imageHold} />
          <button type="button" className="product-preview-button" aria-label={`Giữ để xem ảnh ${product.name}`} {...preview.imageHold} onClick={event => event.preventDefault()}><FiZoomIn aria-hidden="true" /> Giữ để xem</button>
          <span className="product-detail__watermark">PAXMOLY</span>
        </div>
        <div className="product-detail__content">
          <p className="eyebrow">
            {product.categoryLabel} · {product.volume}
          </p>
          <h1>{product.name}</h1>
          <p className="product-detail__subtitle">{product.shortName}</p>
          <div className="product-detail__price">
            <strong>{price.format(product.price)}</strong>
            {discountPercent && product.compareAtPrice ? (
              <del
                aria-label={`Giá gốc ${price.format(product.compareAtPrice)}`}
              >
                {price.format(product.compareAtPrice)}
              </del>
            ) : null}
            {discountPercent ? (
              <span className="product-detail__discount">
                Tiết kiệm {discountPercent}%
              </span>
            ) : null}
          </div>
          <p className="product-detail__description">{product.description}</p>

          <div className="ingredient-row">
            {product.ingredients.map((ingredient) => (
              <span key={ingredient}>{ingredient}</span>
            ))}
          </div>

          <ul className="benefit-list">
            {product.benefits.map((benefit) => (
              <li key={benefit}>
                <FiCheck /> {benefit}
              </li>
            ))}
          </ul>

          <div className="product-detail__buy">
            <div className="quantity-control quantity-control--large">
              <button
                type="button"
                onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                aria-label="Giảm số lượng"
              >
                <FiMinus />
              </button>
              <span>{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((value) => value + 1)}
                aria-label="Tăng số lượng"
              >
                <FiPlus />
              </button>
            </div>
            <button
              className="button button--primary button--buy"
              type="button"
              onClick={handleAdd}
            >
              Thêm vào giỏ · {price.format(product.price * quantity)}
            </button>
          </div>

          <div className="product-detail__assurance">
            <div>
              <FiTruck />
              <span>
                <strong>Giao hàng toàn quốc</strong>Phí hiển thị khi thanh toán
              </span>
            </div>
            <div>
              <FiShield />
              <span>
                <strong>Sản phẩm chính hãng</strong>Phân phối độc quyền bởi Picare
              </span>
            </div>
          </div>
        </div>
      </div>

      {(product.description.trim() || product.ingredients.some(value => value.trim()) || product.usageInstructions?.trim() || product.benefits.some(value => value.trim())) && <section
        className="formula-story"
        style={{ "--product-tone": product.tone } as React.CSSProperties}
      >
        <span className="formula-story__wordmark" aria-hidden="true">
          ACTIVE FORMULA
        </span>
        <div className="container-wide formula-story__grid">
          <ProductFormulaTabs key={product.id} product={product} />
          <div className="formula-story__visual">
            <div className="formula-story__orbit" aria-hidden="true" />
            <img
              src={product.image}
              alt={`${product.name} — công thức nổi bật`}
              {...preview.imageHold}
            />
            <span className="formula-story__note formula-story__note--bottom">
              CONCENTRATED · DAILY CARE
            </span>
          </div>
        </div>
      </section>}



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
    </div>
  );
}
