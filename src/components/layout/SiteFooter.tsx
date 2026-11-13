import { FiInstagram, FiShoppingBag } from "react-icons/fi";
import { FaFacebookF, FaTiktok } from "react-icons/fa6";
import { Link } from "react-router-dom";
import picareLogo from "@/assets/brand/picare-logo-green-transparent.png";
import capitanoLogo from "@/assets/brand/capitano-logo.png";
import { CONTACT } from "@/config/contact";
import { PATHS } from "@/config/paths";
import CmsLink from "@/components/CmsLink";
import { useCmsContent } from "@/hooks/data/useCmsContent";

export default function SiteFooter() {
  const { data } = useCmsContent("home");
  const badge = data?.content.footer;
  const groups = data?.content.footerGroups?.filter(group => group.links.length > 0) || [];

  return (
    <footer className="site-footer" id="lien-he">
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

        {groups.map(group => (
          <nav key={group.id} className="site-footer__links" aria-labelledby={"footer-group-" + group.id}>
            <h2 id={"footer-group-" + group.id}>{group.title}</h2>
            <ul>
              {group.links.map(link => (
                <li key={link.id}>
                  <CmsLink to={link.linkUrl} openInNewTab={link.openInNewTab}>{link.label}</CmsLink>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="container-wide site-footer__bottom">
        <span>© {new Date().getFullYear()} Pasta del Capitano Việt Nam</span>
        <span>Picare · Do More For A Better Life</span>
      </div>
    </footer>
  );
}
