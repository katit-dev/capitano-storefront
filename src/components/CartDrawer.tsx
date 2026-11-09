import { AnimatePresence, motion } from "framer-motion";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { Link } from "react-router-dom";
import { FiMinus, FiPlus, FiShoppingBag, FiTrash2, FiX } from "react-icons/fi";
import { PATHS } from "@/config/paths";
import { useProducts } from "@/hooks/data/useProductHooks";
import {
  cartDrawerOpenAtom,
  cartItemsAtom,
  removeFromCartAtom,
  updateCartQuantityAtom,
} from "@/stores/cartStore";

const price = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
  maximumFractionDigits: 0,
});

export default function CartDrawer() {
  const catalog = useProducts();
  const [open, setOpen] = useAtom(cartDrawerOpenAtom);
  const items = useAtomValue(cartItemsAtom);
  const updateQuantity = useSetAtom(updateCartQuantityAtom);
  const remove = useSetAtom(removeFromCartAtom);
  const detailedItems = items.flatMap((item) => {
    const product = (catalog.data || []).find((candidate) => candidate.id === item.productId);
    return product ? [{ ...item, product }] : [];
  });
  const subtotal = detailedItems.reduce((total, item) => total + item.product.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.button
            type="button"
            className="drawer-scrim"
            aria-label="Đóng giỏ hàng"
            onClick={() => setOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.aside
            className="cart-drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <header className="cart-drawer__header" data-template-fixed="cart-header">
              <div>
                <p className="eyebrow">PaxMoly cart</p>
                <h2 id="cart-title">Giỏ hàng của bạn</h2>
              </div>
              <button className="icon-button" type="button" onClick={() => setOpen(false)} aria-label="Đóng giỏ hàng">
                <FiX />
              </button>
            </header>

            {detailedItems.length ? (
              <div className="cart-drawer__content">
                <ul className="cart-list">
                  {detailedItems.map(({ product, quantity }) => (
                    <li key={product.id} className="cart-item">
                      <div className="cart-item__image" style={{ "--product-tone": product.tone } as React.CSSProperties}>
                        <img src={product.image} alt="" />
                      </div>
                      <div className="cart-item__info">
                        <p>{product.name}</p>
                        <span>{price.format(product.price)}</span>
                        <div className="quantity-control" aria-label={`Số lượng ${product.name}`}>
                          <button type="button" aria-label="Giảm số lượng" onClick={() => updateQuantity({ productId: product.id, quantity: quantity - 1 })}><FiMinus /></button>
                          <span>{quantity}</span>
                          <button type="button" aria-label="Tăng số lượng" onClick={() => updateQuantity({ productId: product.id, quantity: quantity + 1 })}><FiPlus /></button>
                        </div>
                      </div>
                      <button className="cart-item__remove" type="button" onClick={() => remove(product.id)} aria-label={`Xóa ${product.name}`}><FiTrash2 /></button>
                    </li>
                  ))}
                </ul>
                <div className="cart-summary" data-template-fixed="cart-summary">
                  <div><span>Tạm tính</span><strong>{price.format(subtotal)}</strong></div>
                  <p>Phí vận chuyển sẽ được tính ở bước thanh toán.</p>
                  <Link to={PATHS.CHECKOUT} className="button button--primary button--full" onClick={() => setOpen(false)}>Tiến hành thanh toán</Link>
                  <button type="button" className="button-link" onClick={() => setOpen(false)}>Tiếp tục mua sắm</button>
                </div>
              </div>
            ) : (
              <div className="cart-empty">
                <span><FiShoppingBag /></span>
                <h3>Giỏ hàng đang trống</h3>
                <p>Chọn một sản phẩm phù hợp để bắt đầu chu trình chăm sóc da của bạn.</p>
                <button type="button" className="button button--primary" onClick={() => setOpen(false)}>Khám phá sản phẩm</button>
              </div>
            )}
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
