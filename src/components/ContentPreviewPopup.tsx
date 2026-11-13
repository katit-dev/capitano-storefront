import { useEffect, useId } from "react";
import { useAtom } from "jotai";
import { useLocation } from "react-router-dom";
import BrandLogo from "@/components/BrandLogo";
import { contentPreviewAtom } from "@/stores/contentPreviewStore";
import "./product-preview.css";

const normalizeText = (value: string) =>
  value.normalize("NFC").replace(/\s+/g, " ").trim().toLocaleLowerCase("vi");

export default function ContentPreviewPopup() {
  const [preview, setPreview] = useAtom(contentPreviewAtom);
  const titleId = useId();
  const route = useLocation().key;
  const description = preview?.content.description?.trim() || "";
  const hasDescription =
    Boolean(description) &&
    normalizeText(description) !== normalizeText(preview?.content.title || "");

  useEffect(() => {
    if (!preview) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [preview]);
  useEffect(
    () => () => {
      setPreview(null);
    },
    [route, setPreview],
  );

  if (!preview) return null;
  // No modal or focus transfer: the original finger must keep receiving events.
  return (
    <div className="product-preview-layer">
      <section
        className="product-preview"
        data-mode={preview.mode}
        role="region"
        aria-labelledby={titleId}
      >
        <header className="product-preview__header">
          <BrandLogo compact />
        </header>
        <div className="product-preview__body">
          <img
            className="product-preview__image"
            draggable={false}
            src={preview.content.image}
            alt={preview.content.imageAlt || preview.content.title}
          />
          <div
            className={
              preview.mode === "image" ? "sr-only" : "product-preview__copy"
            }
          >
            <h2 id={titleId} className="product-preview__title">
              {preview.content.title}
            </h2>
            {preview.mode === "details" && hasDescription && (
              <p className="product-preview__description">{description}</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
