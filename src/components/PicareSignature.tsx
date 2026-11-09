import picareLogo from "@/assets/brand/picare-logo-dark.png";

export default function PicareSignature() {
  return (
    <span className="picare-signature">
      <span>Phân phối độc quyền bởi</span>
      <span className="picare-signature__mark">
        <img src={picareLogo} alt="Picare" width="1254" height="1254" />
      </span>
    </span>
  );
}
