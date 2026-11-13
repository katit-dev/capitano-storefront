import { useEffect, useId, useRef } from "react";
import type { KeyboardEvent } from "react";
import { FiArrowRight, FiX, FiZap } from "react-icons/fi";
import type { CmsItem } from "@/hooks/data/useCmsContent";
import FlashSaleCountdown from "./FlashSaleCountdown";
import "./flash-sale-popup.css";

type Props = {
  sales: readonly CmsItem[];
  open: boolean;
  onShown?: () => void;
  onClose: () => void;
  onViewOffers: (sale: CmsItem) => void;
};

export default function FlashSalePopup({ sales, open, onShown, onClose, onViewOffers }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const descriptionId = useId();
  const hasSales = sales.length > 0;
  const singleSale = sales.length === 1 ? sales[0] : null;
  const title = singleSale ? singleSale.title?.trim() || "Ưu đãi Flash Sale" : `${sales.length} chương trình Flash Sale`;
  const description = singleSale ? singleSale.subtitle?.trim() : "Chọn chương trình để khám phá ưu đãi dành cho bạn.";

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!open || !hasSales || !dialog) return;

    const previousOverflow = document.body.style.overflow;
    contentRef.current?.scrollTo({ top: 0, behavior: "instant" });
    if (!dialog.open) dialog.showModal();
    document.body.style.overflow = "hidden";

    return () => {
      if (dialog.open) dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [open, hasSales]);

  useEffect(() => {
    if (open && hasSales && dialogRef.current?.open) onShown?.();
  }, [open, hasSales, onShown]);

  function keepFocusInPopup(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key !== "Tab") return;
    const controls = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('button:not([disabled]), [tabindex="0"]'))
      .filter(element => element.getClientRects().length > 0);
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  }
  return (
    <dialog
      ref={dialogRef}
      className={`flash-sale-popup${sales.length > 1 ? " flash-sale-popup--multiple" : ""}`}
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
      onKeyDown={keepFocusInPopup}
      onCancel={event => {
        event.preventDefault();
        onClose();
      }}
      onClick={event => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="flash-sale-popup__inner">
        <div className="flash-sale-popup__header">
          <button className="flash-sale-popup__close" type="button" aria-label="Đóng thông báo Flash Sale" onClick={onClose} autoFocus>
            <FiX aria-hidden="true" />
          </button>
          <span className="flash-sale-popup__brand">PASTA DEL CAPITANO</span>
          <div className="flash-sale-popup__label"><FiZap aria-hidden="true" /><span>Flash Sale</span></div>
          <span className="flash-sale-popup__status">Đang diễn ra</span>
        </div>

        <div ref={contentRef} className="flash-sale-popup__body" role="region" aria-label="Chi tiết Flash Sale" tabIndex={0}>
          <h2 id={titleId}>{title}</h2>
          {description && <p id={descriptionId} className="flash-sale-popup__description">{description}</p>}
          {singleSale ? (
            <FlashSaleCountdown key={singleSale.id} startsAt={singleSale.startsAt} endsAt={singleSale.endsAt} showDigits={singleSale.showCountdown !== false} />
          ) : (
            <ul className="flash-sale-popup__campaigns" aria-label="Các chương trình đang diễn ra">
              {sales.map(sale => (
                <li key={sale.id} className="flash-sale-popup__campaign">
                  <h3>{sale.title?.trim() || "Ưu đãi Flash Sale"}</h3>
                  {sale.subtitle?.trim() && <p className="flash-sale-popup__description">{sale.subtitle.trim()}</p>}
                  <FlashSaleCountdown startsAt={sale.startsAt} endsAt={sale.endsAt} showDigits={sale.showCountdown !== false} />
                  <button type="button" className="button flash-sale-popup__cta" aria-label={`Xem ưu đãi ${sale.title?.trim() || "Flash Sale"}`} onClick={() => onViewOffers(sale)}>
                    Xem ưu đãi <FiArrowRight aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="flash-sale-popup__footer">
          {singleSale && <button type="button" className="button flash-sale-popup__cta" onClick={() => onViewOffers(singleSale)}>
            Xem ưu đãi ngay <FiArrowRight aria-hidden="true" />
          </button>}
          <button type="button" className="flash-sale-popup__dismiss" onClick={onClose}>Tiếp tục xem website</button>
        </div>
      </div>
    </dialog>
  );
}
