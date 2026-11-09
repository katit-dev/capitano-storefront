import CmsLink from "@/components/CmsLink";
import { FiArrowRight } from "react-icons/fi";
import { useContentPreview } from "@/hooks/useContentPreview";
import type { CmsItem } from "@/hooks/data/useCmsContent";

export default function SkinNeedCard({
  item,
  linkLabel,
}: {
  item: CmsItem;
  linkLabel?: string | null;
}) {
  const preview = useContentPreview({
    image: item.imageUrl || "",
    imageAlt: item.imageAlt || item.title || "",
    title: item.title || item.imageAlt || "Nhu cầu làn da",
  });
  return (
    <CmsLink
      data-cms-record={item.id}
      to={item.linkUrl || "#"}
      openInNewTab={item.openInNewTab}
      className="skin-need-card"
      {...preview.nativeGuard}
    >
      {item.imageUrl && (
        <div className="skin-need-card__media" {...preview.imageHold}>
          <img
            src={item.imageUrl}
            alt={item.imageAlt || ""}
            loading="lazy"
            draggable={false}
          />
        </div>
      )}
      <div className="skin-need-card__body">
        <h3 {...preview.detailsHold}>{item.title}</h3>
        <span>
          {linkLabel}
          <FiArrowRight aria-hidden="true" />
        </span>
      </div>
    </CmsLink>
  );
}
