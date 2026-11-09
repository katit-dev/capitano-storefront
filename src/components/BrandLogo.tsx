import logo from "@/assets/brand/capitano-logo.png";

export default function BrandLogo({ compact = false, src = logo, alt = "Pasta del Capitano" }: { compact?: boolean; src?: string; alt?: string }) {
  return (
    <span className={compact ? "brand-logo brand-logo--compact" : "brand-logo"}>
      <img src={src} alt={alt} />
    </span>
  );
}
