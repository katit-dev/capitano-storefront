import picareStamp from "@/assets/products/catalog/picare-source-brand.png";

export default function PicareProductStamp() {
  return (
    <span className="picare-product-stamp">
      <img
        src={picareStamp}
        alt="Picare — Phân phối chính hãng"
        width="370"
        height="73"
        loading="lazy"
      />
    </span>
  );
}
