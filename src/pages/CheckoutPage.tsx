import { useState, type ChangeEvent, type FocusEvent, type FormEvent } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { Link } from "react-router-dom";
import { FiArrowLeft, FiArrowRight, FiCheck, FiCreditCard, FiHome, FiMapPin, FiShoppingBag, FiTruck } from "react-icons/fi";
import { PATHS } from "@/config/paths";
import { useProducts } from "@/hooks/data/useProductHooks";
import { cartDrawerOpenAtom, cartItemsAtom } from "@/stores/cartStore";

const currency = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
  maximumFractionDigits: 0,
});

const requiredFields = {
  name: "Vui lòng nhập họ và tên.",
  phone: "Vui lòng nhập số điện thoại.",
  address: "Vui lòng nhập địa chỉ nhận hàng.",
  city: "Vui lòng nhập tỉnh hoặc thành phố.",
  ward: "Vui lòng nhập phường hoặc xã.",
  "billing-name": "Vui lòng nhập họ và tên người thanh toán.",
  "billing-phone": "Vui lòng nhập số điện thoại thanh toán.",
  "billing-street": "Vui lòng nhập địa chỉ thanh toán.",
  "billing-city": "Vui lòng nhập tỉnh hoặc thành phố thanh toán.",
  "billing-ward": "Vui lòng nhập phường hoặc xã thanh toán.",
} as const;

type CheckoutField = keyof typeof requiredFields | "email";
type CheckoutErrors = Partial<Record<CheckoutField, string>>;

const shippingFields: CheckoutField[] = ["name", "phone", "email", "address", "city", "ward"];
const billingFields: CheckoutField[] = ["billing-name", "billing-phone", "billing-street", "billing-city", "billing-ward"];

function getFieldError(field: CheckoutField, value: string) {
  const trimmed = value.trim();
  if (field !== "email" && !trimmed) return requiredFields[field];
  if ((field === "phone" || field === "billing-phone") && !/^(?:0\d{9}|\+84\d{9})$/.test(trimmed.replace(/[\s.()-]/g, ""))) {
    return "Số điện thoại cần có 10 chữ số, bắt đầu bằng 0 (hoặc +84).";
  }
  if (field === "email" && trimmed && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
    return "Email chưa đúng định dạng. Ví dụ: ten@example.com.";
  }
  return "";
}

export default function CheckoutPage() {
  const catalog = useProducts();
  const items = useAtomValue(cartItemsAtom);
  const setCartOpen = useSetAtom(cartDrawerOpenAtom);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [billingAddress, setBillingAddress] = useState("same");
  const [showPreviewNotice, setShowPreviewNotice] = useState(false);
  const [errors, setErrors] = useState<CheckoutErrors>({});
  const detailedItems = items.flatMap((item) => {
    const product = (catalog.data || []).find((candidate) => candidate.id === item.productId);
    return product ? [{ ...item, product }] : [];
  });
  const subtotal = detailedItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  function handlePreview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const fields = billingAddress === "different" ? [...shippingFields, ...billingFields] : shippingFields;
    const nextErrors: CheckoutErrors = {};
    for (const field of fields) {
      const message = getFieldError(field, String(formData.get(field) ?? ""));
      if (message) nextErrors[field] = message;
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setShowPreviewNotice(false);
      const firstInvalid = form.elements.namedItem(Object.keys(nextErrors)[0]);
      if (firstInvalid instanceof HTMLElement) firstInvalid.focus();
      return;
    }
    setShowPreviewNotice(true);
  }

  function validateField(field: CheckoutField, value: string) {
    const message = getFieldError(field, value);
    setErrors((current) => {
      if (current[field] === message) return current;
      const next = { ...current };
      if (message) next[field] = message;
      else delete next[field];
      return next;
    });
  }

  function fieldProps(field: CheckoutField) {
    return {
      onBlur: (event: FocusEvent<HTMLInputElement>) => validateField(field, event.currentTarget.value),
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        if (errors[field]) validateField(field, event.currentTarget.value);
        setShowPreviewNotice(false);
      },
      "aria-invalid": Boolean(errors[field]),
      "aria-describedby": errors[field] ? `checkout-${field}-error` : undefined,
    };
  }

  function fieldError(field: CheckoutField) {
    return errors[field] ? <small className="checkout-field__error" id={`checkout-${field}-error`} role="alert">{errors[field]}</small> : null;
  }

  return (
    <div className="checkout-page">
      <div className="container-wide">
        <div className="checkout-intro">
          <Link className="checkout-back" to={PATHS.SHOP}><FiArrowLeft /> Tiếp tục mua sắm</Link>
          <div className="checkout-intro__heading">
            <div>
              <p className="eyebrow">PaxMoly / Checkout</p>
              <h1>Thanh toán<span>.</span></h1>
              <p>Hoàn tất thông tin nhận hàng và xem lại lựa chọn của bạn.</p>
            </div>
          </div>
        </div>

        {detailedItems.length === 0 ? (
          <div className="checkout-empty">
            <FiShoppingBag aria-hidden="true" />
            <h2>Giỏ hàng đang trống.</h2>
            <p>Hãy chọn sản phẩm phù hợp trước khi đến bước thanh toán.</p>
            <Link className="button button--primary" to={PATHS.SHOP}>Khám phá sản phẩm <FiArrowRight /></Link>
          </div>
        ) : (
          <div className="checkout-layout">
            <form id="checkout-form" className="checkout-form" onSubmit={handlePreview} noValidate>
              <section className="checkout-panel" data-template-fixed="checkout-shipping" aria-labelledby="checkout-shipping-title">
                <div className="checkout-panel__heading">
                  <span className="checkout-step">01</span>
                  <div>
                    <p className="eyebrow">Thông tin nhận hàng</p>
                    <h2 id="checkout-shipping-title">Giao đến bạn</h2>
                  </div>
                </div>
                <div className="checkout-fields">
                  <label className="checkout-field">
                    <span>Họ và tên <b>*</b></span>
                    <input name="name" autoComplete="name" placeholder="Tên người nhận" required {...fieldProps("name")} />
                    {fieldError("name")}
                  </label>
                  <label className="checkout-field">
                    <span>Số điện thoại <b>*</b></span>
                    <input name="phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="Số liên hệ khi giao hàng" required {...fieldProps("phone")} />
                    {fieldError("phone")}
                  </label>
                  <label className="checkout-field checkout-field--full">
                    <span>Email</span>
                    <input name="email" type="email" autoComplete="email" placeholder="Để nhận thông tin đơn hàng" {...fieldProps("email")} />
                    {fieldError("email")}
                  </label>
                  <label className="checkout-field checkout-field--full">
                    <span>Địa chỉ nhận hàng <b>*</b></span>
                    <input name="address" autoComplete="street-address" placeholder="Số nhà, tên đường" required {...fieldProps("address")} />
                    {fieldError("address")}
                  </label>
                  <label className="checkout-field">
                    <span>Tỉnh / Thành phố <b>*</b></span>
                    <input name="city" autoComplete="address-level1" placeholder="Tỉnh hoặc thành phố" required {...fieldProps("city")} />
                    {fieldError("city")}
                  </label>
                  <label className="checkout-field">
                    <span>Phường / Xã <b>*</b></span>
                    <input name="ward" autoComplete="address-level3" placeholder="Phường hoặc xã" required {...fieldProps("ward")} />
                    {fieldError("ward")}
                  </label>
                  <label className="checkout-field checkout-field--full">
                    <span>Ghi chú giao hàng <small>(không bắt buộc)</small></span>
                    <textarea name="note" rows={3} placeholder="Ví dụ: thời gian nhận hàng thuận tiện" />
                  </label>
                </div>
              </section>

              <section className="checkout-panel" data-template-fixed="checkout-delivery" aria-labelledby="checkout-delivery-title">
                <div className="checkout-panel__heading">
                  <span className="checkout-step">02</span>
                  <div>
                    <p className="eyebrow">Vận chuyển</p>
                    <h2 id="checkout-delivery-title">Cách bạn nhận hàng</h2>
                  </div>
                </div>
                <div className="checkout-delivery">
                  <FiTruck aria-hidden="true" />
                  <div><strong>Giao hàng toàn quốc</strong><span>Phí vận chuyển sẽ được xác nhận khi hệ thống đặt hàng được kết nối.</span></div>
                  <FiCheck aria-hidden="true" />
                </div>
              </section>

              <fieldset className="checkout-panel checkout-payment" data-template-fixed="checkout-payment">
                <legend className="sr-only">Phương thức thanh toán</legend>
                <div className="checkout-panel__heading">
                  <span className="checkout-step">03</span>
                  <div>
                    <p className="eyebrow">Thanh toán</p>
                    <h2>Phương thức thanh toán</h2>
                  </div>
                </div>
                <div className="checkout-payment__options">
                  <label className={paymentMethod === "cod" ? "checkout-option is-selected" : "checkout-option"}>
                    <input type="radio" name="payment" value="cod" checked={paymentMethod === "cod"} onChange={() => setPaymentMethod("cod")} />
                    <FiShoppingBag aria-hidden="true" />
                    <span><strong>Thanh toán khi nhận hàng</strong><small>Thanh toán sau khi nhận được sản phẩm</small></span>
                  </label>
                  <label className={paymentMethod === "transfer" ? "checkout-option is-selected" : "checkout-option"}>
                    <input type="radio" name="payment" value="transfer" checked={paymentMethod === "transfer"} onChange={() => setPaymentMethod("transfer")} />
                    <FiCreditCard aria-hidden="true" />
                    <span><strong>Chuyển khoản ngân hàng</strong><small>Thông tin chuyển khoản sẽ có khi tích hợp thanh toán</small></span>
                  </label>
                </div>
                <p className="checkout-payment__note">Hai lựa chọn trên chỉ minh họa giao diện; hiện chưa xử lý thanh toán.</p>
              </fieldset>

              <fieldset className="checkout-panel checkout-billing" data-template-fixed="checkout-billing">
                <legend className="sr-only">Địa chỉ thanh toán</legend>
                <div className="checkout-panel__heading">
                  <span className="checkout-step">04</span>
                  <div>
                    <p className="eyebrow">Thông tin thanh toán</p>
                    <h2>Địa chỉ thanh toán</h2>
                  </div>
                </div>
                <div className="checkout-payment__options">
                  <label className={billingAddress === "same" ? "checkout-option is-selected" : "checkout-option"}>
                    <input type="radio" name="billing-address-choice" value="same" checked={billingAddress === "same"} onChange={() => setBillingAddress("same")} />
                    <FiHome aria-hidden="true" />
                    <span><strong>Giống địa chỉ vận chuyển</strong><small>Sử dụng thông tin giao hàng ở trên</small></span>
                  </label>
                  <label className={billingAddress === "different" ? "checkout-option is-selected" : "checkout-option"}>
                    <input type="radio" name="billing-address-choice" value="different" checked={billingAddress === "different"} onChange={() => setBillingAddress("different")} />
                    <FiMapPin aria-hidden="true" />
                    <span><strong>Sử dụng địa chỉ thanh toán khác</strong><small>Nhập thông tin riêng cho địa chỉ thanh toán</small></span>
                  </label>
                </div>
                {billingAddress === "different" ? (
                  <div className="checkout-fields checkout-billing__fields">
                    <label className="checkout-field">
                      <span>Họ và tên <b>*</b></span>
                      <input name="billing-name" autoComplete="billing name" placeholder="Tên người thanh toán" required {...fieldProps("billing-name")} />
                      {fieldError("billing-name")}
                    </label>
                    <label className="checkout-field">
                      <span>Số điện thoại <b>*</b></span>
                      <input name="billing-phone" type="tel" autoComplete="billing tel" inputMode="tel" placeholder="Số liên hệ" required {...fieldProps("billing-phone")} />
                      {fieldError("billing-phone")}
                    </label>
                    <label className="checkout-field checkout-field--full">
                      <span>Địa chỉ thanh toán <b>*</b></span>
                      <input name="billing-street" autoComplete="billing street-address" placeholder="Số nhà, tên đường" required {...fieldProps("billing-street")} />
                      {fieldError("billing-street")}
                    </label>
                    <label className="checkout-field">
                      <span>Tỉnh / Thành phố <b>*</b></span>
                      <input name="billing-city" autoComplete="billing address-level1" placeholder="Tỉnh hoặc thành phố" required {...fieldProps("billing-city")} />
                      {fieldError("billing-city")}
                    </label>
                    <label className="checkout-field">
                      <span>Phường / Xã <b>*</b></span>
                      <input name="billing-ward" autoComplete="billing address-level3" placeholder="Phường hoặc xã" required {...fieldProps("billing-ward")} />
                      {fieldError("billing-ward")}
                    </label>
                  </div>
                ) : null}
              </fieldset>
            </form>

            <aside className="checkout-summary" data-template-fixed="checkout-summary" aria-labelledby="checkout-summary-title">
              <div className="checkout-summary__top">
                <p className="eyebrow">Your selection</p>
                <div className="checkout-summary__heading">
                  <h2 id="checkout-summary-title">Đơn hàng của bạn</h2>
                  <button type="button" onClick={() => setCartOpen(true)}>Sửa giỏ hàng</button>
                </div>
              </div>
              <ul className="checkout-summary__items">
                {detailedItems.map(({ product, quantity }) => (
                  <li key={product.id} className="checkout-summary__item">
                    <div className="checkout-summary__image" style={{ "--product-tone": product.tone } as React.CSSProperties}>
                      <img src={product.image} alt="" />
                      <span>{quantity}</span>
                    </div>
                    <div><strong>{product.name}</strong><small>{product.volume} · Số lượng {quantity}</small></div>
                    <b>{currency.format(product.price * quantity)}</b>
                  </li>
                ))}
              </ul>
              <div className="checkout-summary__totals">
                <div><span>Tạm tính</span><strong>{currency.format(subtotal)}</strong></div>
                <div><span>Phí vận chuyển</span><span>Chưa xác định</span></div>
              </div>
              <div className="checkout-summary__total"><span>Tổng tạm tính <small>Chưa gồm vận chuyển</small></span><strong>{currency.format(subtotal)}</strong></div>
              <button className="button button--primary button--full checkout-summary__submit" type="submit" form="checkout-form">Xem trước đặt hàng <FiArrowRight /></button>
              {showPreviewNotice ? <p className="checkout-preview-notice" role="status">Đây chỉ là bản xem trước. Thông tin chưa được gửi đi, đơn hàng chưa được tạo và không có khoản thanh toán nào được thực hiện.</p> : null}
              <p className="checkout-summary__disclaimer">Giao diện minh họa · Chưa hỗ trợ đặt hàng trực tuyến</p>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
