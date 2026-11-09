import { FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";
import { PATHS } from "@/config/paths";

export default function NotFoundPage() {
  return (
    <div className="not-found">
      <span>404</span>
      <p className="eyebrow">Trang không tồn tại</p>
      <h1>Có vẻ bạn đã đi hơi xa khỏi chu trình.</h1>
      <Link className="button button--primary" to={PATHS.HOME}><FiArrowLeft /> Trở về trang chủ</Link>
    </div>
  );
}
