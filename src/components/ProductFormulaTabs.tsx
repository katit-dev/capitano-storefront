import { useId, useRef, useState, type KeyboardEvent } from "react";
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
  const id = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const content: Record<FormulaTabId, string> = {
    overview: product.description.trim(),
    ingredients: product.ingredients
      .map((value) => value.trim())
      .filter(Boolean)
      .join("\n\n"),
    usage: product.usageInstructions?.trim() || "",
    benefits: product.benefits
      .map((value) => value.trim())
      .filter(Boolean)
      .join("\n\n"),
  };
  const tabs = FORMULA_TABS.filter((tab) => content[tab.id]);
  const selectedTab = tabs.some((tab) => tab.id === activeTab)
    ? activeTab
    : tabs[0]?.id;
  const preview = useContentPreview(
    selectedTab
      ? {
          image: product.image,
          title: tabs.find((tab) => tab.id === selectedTab)!.label,
          description: content[selectedTab],
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

  if (!tabs.length) return null;

  return (
    <div className="formula-story__copy">
      <div
        className="formula-story__tabs"
        role="tablist"
        aria-label="Thông tin sản phẩm"
      >
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            ref={(element) => {
              tabRefs.current[index] = element;
            }}
            id={`${id}-${tab.id}-tab`}
            className="formula-story__tab"
            type="button"
            role="tab"
            aria-selected={selectedTab === tab.id}
            aria-controls={`${id}-${tab.id}-panel`}
            tabIndex={selectedTab === tab.id ? 0 : -1}
            onClick={() => setActiveTab(tab.id)}
            onKeyDown={(event) => handleTabKeyDown(event, index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="formula-story__panels">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            id={`${id}-${tab.id}-panel`}
            className={
              selectedTab === tab.id
                ? "formula-story__panel is-active"
                : "formula-story__panel"
            }
            role="tabpanel"
            aria-labelledby={`${id}-${tab.id}-tab`}
            aria-hidden={selectedTab !== tab.id}
            inert={selectedTab !== tab.id}
            tabIndex={selectedTab === tab.id ? 0 : -1}
          >
            <p
              className="formula-story__text"
              {...(selectedTab === tab.id ? preview.detailsHold : {})}
            >
              {content[tab.id]}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
