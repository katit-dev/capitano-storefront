import { useId, useRef, useState, type KeyboardEvent } from "react";
import { FiPause, FiPlay } from "react-icons/fi";
import type { Product } from "@/types/Product";
import { useContentPreview } from "@/hooks/useContentPreview";

const FORMULA_TABS = [
  { id: "overview", label: "Tổng quan sản phẩm" },
  { id: "ingredients", label: "Hoạt chất nổi bật" },
  { id: "usage", label: "Hướng dẫn sử dụng" },
  { id: "benefits", label: "Hiệu quả" },
] as const;

type FormulaTabId = (typeof FORMULA_TABS)[number]["id"];

export default function ProductFormulaTabs({ product }: { product: Product }) {
  const [activeTab, setActiveTab] = useState<FormulaTabId>("overview");
  const [motionPaused, setMotionPaused] = useState(false);
  const id = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const keyIngredients = product.ingredients.map(value => value.trim()).filter(Boolean).join("\n\n");
  const fullIngredients = product.fullIngredients?.trim() || "";
  const benefits = product.benefits
    .map(value => value.trim().replace(/^(?:[•·–—]\s*|-\s+)/, ""))
    .filter(Boolean);
  const content: Record<FormulaTabId, string> = {
    overview: product.overview?.trim() || product.description.trim(),
    ingredients: keyIngredients || fullIngredients,
    usage: product.usageInstructions?.trim() || "",
    benefits: benefits.join("\n\n"),
  };
  const tabs = FORMULA_TABS.filter(tab => content[tab.id]);
  const selectedTab = tabs.find(tab => tab.id === activeTab) ?? tabs[0];
  const preview = useContentPreview(
    selectedTab
      ? {
          image: product.image,
          title: selectedTab.label,
          description: content[selectedTab.id],
          imageAlt: product.name,
        }
      : undefined,
  );

  function handleTabKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    let nextIndex: number;
    switch (event.key) {
      case "ArrowRight":
        nextIndex = (index + 1) % tabs.length;
        break;
      case "ArrowLeft":
        nextIndex = (index - 1 + tabs.length) % tabs.length;
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = tabs.length - 1;
        break;
      default:
        return;
    }
    event.preventDefault();
    setActiveTab(tabs[nextIndex].id);
    tabRefs.current[nextIndex]?.focus({ preventScroll: true });
    tabRefs.current[nextIndex]?.scrollIntoView({
      block: "nearest",
      inline: "nearest",
    });
  }

  if (!selectedTab) return null;

  return (
    <section className="formula-story" aria-label="Thông tin sản phẩm">
      <div className="container-wide formula-story__grid">
        <div className="formula-story__copy">
          <div className="formula-story__tabs" role="tablist" aria-label="Thông tin sản phẩm">
            {tabs.map((tab, index) => (
              <button
                key={tab.id}
                ref={element => { tabRefs.current[index] = element; }}
                id={`${id}-${tab.id}-tab`}
                className="formula-story__tab"
                data-tab={tab.id}
                type="button"
                role="tab"
                aria-selected={selectedTab.id === tab.id}
                aria-controls={`${id}-${tab.id}-panel`}
                tabIndex={selectedTab.id === tab.id ? 0 : -1}
                onClick={() => setActiveTab(tab.id)}
                onKeyDown={event => handleTabKeyDown(event, index)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          {tabs.map(tab => (
            <div
              key={tab.id}
              id={`${id}-${tab.id}-panel`}
              className="formula-story__panel"
              role="tabpanel"
              aria-labelledby={`${id}-${tab.id}-tab`}
              hidden={selectedTab.id !== tab.id}
              tabIndex={selectedTab.id === tab.id ? 0 : -1}
              {...(selectedTab.id === tab.id ? preview.detailsHold : {})}
            >
              {tab.id === "overview" ? (
                content.overview.split(/\r?\n(?:[^\S\r\n]*\r?\n)+/).map((paragraph, index) => (
                  <p key={index} className="formula-story__text">{paragraph.trim()}</p>
                ))
              ) : tab.id === "ingredients" ? (
                <>
                  <p className="formula-story__text">{content.ingredients}</p>
                  {keyIngredients && fullIngredients && keyIngredients !== fullIngredients && (
                    <details className="formula-story__ingredients">
                      <summary>Thành phần đầy đủ</summary>
                      <p className="formula-story__text">{fullIngredients}</p>
                    </details>
                  )}
                </>
              ) : tab.id === "benefits" ? (
                <ul className="formula-story__text formula-story__list">
                  {benefits.map((benefit, index) => <li key={`${benefit}-${index}`}>{benefit}</li>)}
                </ul>
              ) : (
                <p className="formula-story__text">{content[tab.id]}</p>
              )}
            </div>
          ))}
        </div>
        {product.image && (
          <div className="formula-story__visual" data-motion-paused={motionPaused}>
            <div className="formula-story__orbit" aria-hidden="true" />
            <img src={product.image} alt={product.name} loading="lazy" {...preview.imageHold} />
            <button
              className="formula-story__motion"
              type="button"
              aria-label={motionPaused ? "Phát chuyển động ảnh" : "Tạm dừng chuyển động ảnh"}
              onClick={() => setMotionPaused(paused => !paused)}
            >
              {motionPaused ? <FiPlay aria-hidden="true" /> : <FiPause aria-hidden="true" />}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
