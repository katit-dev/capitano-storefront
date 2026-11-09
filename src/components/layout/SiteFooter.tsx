import { useRef, useState } from "react";
import { FiInstagram, FiShoppingBag, FiX } from "react-icons/fi";
import { FaFacebookF, FaTiktok } from "react-icons/fa6";
import { Link } from "react-router-dom";
import picareLogo from "@/assets/brand/picare-logo-green-transparent.png";
import capitanoLogo from "@/assets/brand/capitano-logo.png";
import { CONTACT } from "@/config/contact";
import { PATHS } from "@/config/paths";
import CmsLink from "@/components/CmsLink";
import { useCmsContent } from "@/hooks/data/useCmsContent";

const policies = [
  "Chính sách bảo mật thông tin",
  "Chính sách vận chuyển, giao hàng",
  "Chính sách thanh toán",
  "Chính sách kiểm hàng",
  "Chính sách quy định chung",
];
const customerCare = [
  "Hướng dẫn mua hàng",
  "Hình thức thanh toán",
  "Kiểm tra đơn hàng",
  "Quyền lợi thành viên",
];

export default function SiteFooter() {
  const { data } = useCmsContent("home");
  const badge = data?.content.footer;
  const infoDialog = useRef<HTMLDialogElement>(null);
  const [topic, setTopic] = useState("");

  function showInfo(title: string) {
    setTopic(title);
    infoDialog.current?.showModal();
  }

  return (
    <footer className="site-footer">
      <div className="container-wide site-footer__grid">
        <div className="site-footer__brand">
          <Link
            to={PATHS.HOME}
            className="site-footer__logo"
            aria-label="Picare — Pasta del Capitano Việt Nam"
          >
            <img
              src={picareLogo}
              alt="Picare — Do More For A Better Life"
              width="1500"
              height="1048"
              loading="lazy"
            />
          </Link>
          <Link
            to={PATHS.HOME}
            className="site-footer__capitano-logo"
            aria-label="Pasta del Capitano — Trang chủ"
          >
            <img src={capitanoLogo} alt="Pasta del Capitano" width="448" height="233" loading="lazy" />
          </Link>
          <p className="site-footer__intro">
            Pasta del Capitano · Chăm sóc răng miệng từ Ý.
          </p>
          <div className="site-footer__social-links" aria-label="Kênh kết nối">
            <button
              type="button"
              disabled
              aria-label="Facebook — đang cập nhật"
              title="Link Facebook đang cập nhật"
            >
              <FaFacebookF />
            </button>
            <button
              type="button"
              disabled
              aria-label="Instagram — đang cập nhật"
              title="Link Instagram đang cập nhật"
            >
              <FiInstagram />
            </button>
            <button
              type="button"
              disabled
              aria-label="TikTok — đang cập nhật"
              title="Link TikTok đang cập nhật"
            >
              <FaTiktok />
            </button>
            <Link
              to={PATHS.SHOP}
              aria-label="Cửa hàng Capitano"
              title="Cửa hàng Capitano"
            >
              <FiShoppingBag />
            </Link>
          </div>
          {badge?.isActive && badge.imageUrl && (
            <div className="site-footer__ministry-badge">
              {badge.linkUrl ? (
                <CmsLink to={badge.linkUrl} openInNewTab={badge.openInNewTab}>
                  <img src={badge.imageUrl} alt={badge.imageAlt || "Đã thông báo Bộ Công Thương"} loading="lazy" />
                </CmsLink>
              ) : (
                <img src={badge.imageUrl} alt={badge.imageAlt || "Đã thông báo Bộ Công Thương"} loading="lazy" />
              )}
            </div>
          )}
        </div>

        <section
          className="site-footer__contact"
          aria-labelledby="footer-contact-title"
        >
          <h2 id="footer-contact-title">Thông tin liên hệ</h2>
          <address>
            <p>
              <strong>Địa chỉ:</strong> {CONTACT.address}
            </p>
            <p>
              <strong>Điện thoại:</strong>{" "}
              <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
            </p>
            <p>
              <strong>Email:</strong>{" "}
              <a href={CONTACT.emailHref}>{CONTACT.email}</a>
            </p>
          </address>
        </section>

        <nav
          className="site-footer__links"
          aria-labelledby="footer-policy-title"
        >
          <h2 id="footer-policy-title">Chính sách</h2>
          <ul>
            {policies.map((title) => (
              <li key={title}>
                <button type="button" onClick={() => showInfo(title)}>
                  {title}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="site-footer__links" aria-labelledby="footer-care-title">
          <h2 id="footer-care-title">Chăm sóc khách hàng</h2>
          <ul>
            {customerCare.map((title) => (
              <li key={title}>
                <button type="button" onClick={() => showInfo(title)}>
                  {title}
                </button>
              </li>
            ))}
            <li>
              <a href={CONTACT.emailHref}>Liên hệ</a>
            </li>
          </ul>
        </nav>
      </div>

      <div className="container-wide site-footer__bottom">
        <span>© {new Date().getFullYear()} Pasta del Capitano Việt Nam</span>
        <span>Picare · Do More For A Better Life</span>
      </div>

      <dialog
        ref={infoDialog}
        className="footer-info-dialog"
        aria-labelledby="footer-info-title"
        onClick={(event) => {
          if (event.target === event.currentTarget) infoDialog.current?.close();
        }}
      >
        <div className="footer-info-dialog__content">
          <button
            className="footer-info-dialog__close"
            type="button"
            autoFocus
            aria-label="Đóng thông tin"
            onClick={() => infoDialog.current?.close()}
          >
            <FiX />
          </button>
          <h2 id="footer-info-title">{topic}</h2>
          <p>
            Nội dung này đang được cập nhật. Bạn có thể liên hệ đội ngũ Picare /
            Dermacoon để được hỗ trợ.
          </p>
          <a href={CONTACT.phoneHref}>Gọi {CONTACT.phone}</a>
          <a href={CONTACT.emailHref}>{CONTACT.email}</a>
        </div>
      </dialog>
    </footer>
  );
}
