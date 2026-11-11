import { FiGlobe, FiHeadphones, FiShield, FiTruck } from "react-icons/fi";

const assurances = [
  { icon: FiShield, title: "Sản phẩm chính hãng", detail: "Phân phối bởi Picare" },
  { icon: FiTruck, title: "Thông tin giao hàng", detail: "Liên hệ để xác nhận phí và khu vực giao" },
  { icon: FiHeadphones, title: "Tư vấn sản phẩm", detail: "Hỗ trợ chọn sản phẩm chăm sóc răng miệng" },
  { icon: FiGlobe, title: "Thương hiệu từ Ý", detail: "Pasta del Capitano từ năm 1905" },
];

export default function StoreAssurance() {
  return (
    <section className="store-assurance" aria-label="Cam kết và hỗ trợ mua hàng">
      <ul className="container-wide store-assurance__grid" role="list">
        {assurances.map(({ icon: Icon, title, detail }) => (
          <li key={title}>
            <div className="store-assurance__icon">
              <Icon aria-hidden="true" />
            </div>
            <p>
              <strong>{title}</strong>
              <span>{detail}</span>
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
