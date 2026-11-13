import { useEffect, useRef, useState } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { FiHeart, FiMenu, FiPhone, FiSearch, FiShoppingBag, FiUser, FiX } from "react-icons/fi";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import BrandLogo from "@/components/BrandLogo";
import CartDrawer from "@/components/CartDrawer";
import SiteFooter from "@/components/layout/SiteFooter";
import SiteNavigation from "@/components/layout/SiteNavigation";
import FloatingSupport from "@/components/FloatingSupport";
import FlashSaleAnnouncement from "@/components/FlashSaleAnnouncement";
import ContentPreviewPopup from "@/components/ContentPreviewPopup";
import { contentPreviewAtom } from "@/stores/contentPreviewStore";
import { CONTACT } from "@/config/contact";
import { PATHS } from "@/config/paths";
import { capitanoAnnouncement, capitanoContent, capitanoNewsMenu } from "@/data/capitano-catalog";
import { cartItemsAtom, cartDrawerOpenAtom } from "@/stores/cartStore";

import { useCmsContent, useRestartLocalFlashSale, menuTree, recordSiteVisit } from "@/hooks/data/useCmsContent";
import CmsLink from "@/components/CmsLink";
import { previewEnabled, usePreviewFocus } from "@/hooks/data/cmsPreview";

export default function SiteLayout() {
  usePreviewFocus();
  const cms = useCmsContent("home");
  const restartLocalFlashSale = useRestartLocalFlashSale();
  const content = cms.data?.content;
  const header = content?.header;
  const showLocalHeader = !previewEnabled && !content;
  const localHeader = cms.isLocal || showLocalHeader;
  const announcement = (showLocalHeader ? capitanoContent : content)?.announcement;
  const navigation = menuTree(showLocalHeader ? capitanoContent.menu : content?.menu || []);
  if (!previewEnabled && !localHeader) {
    const [news] = menuTree(capitanoNewsMenu);
    const newsIndex = navigation.findIndex(item =>
      item.to === PATHS.NEWS || item.label.trim().toLocaleLowerCase("vi") === "tin tức");
    if (newsIndex === -1) navigation.push(news);
    else navigation[newsIndex] = news;
  }
  const logoSrc = header?.logoUrl || undefined;
  const logoAlt = logoSrc ? header?.logoAlt || "Pasta del Capitano" : undefined;
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDialogElement>(null);
  const location = useLocation();
  const lastVisit = useRef<string | null>(null);
  let visitPath = location.pathname + location.search;
  if (location.pathname === PATHS.SHOP) {
    const visitParams = new URLSearchParams(location.search);
    // Search input, sort and price changes are interactions within the same page view.
    for (const key of ["q", "sort", "minPrice", "maxPrice", "discount", "flashSale", "focus"]) visitParams.delete(key);
    const query = visitParams.toString();
    visitPath = query ? `${location.pathname}?${query}` : location.pathname;
  }
  useEffect(() => {
    // Plain HTTP on a LAN does not expose randomUUID; analytics must not break the page.
    if (typeof window.crypto?.randomUUID !== "function") return;
    if (lastVisit.current === visitPath) return;
    lastVisit.current = visitPath;
    // A page view is counted once; StrictMode and CMS previews do not add visits.
    void recordSiteVisit(crypto.randomUUID()).catch(() => {});
  }, [visitPath]);
  const cartItems = useAtomValue(cartItemsAtom);
  const cartCount = cartItems.filter(item => content?.products?.some(product => product.id === item.productId)).reduce((count, item) => count + item.quantity, 0);
  const cartOpen = useAtomValue(cartDrawerOpenAtom);
  const contentPreview = useAtomValue(contentPreviewAtom);
  const setCartOpen = useSetAtom(cartDrawerOpenAtom);

  useEffect(() => {
    const section = location.hash ? document.getElementById(location.hash.slice(1)) : null;
    if (section) section.scrollIntoView({ behavior: "instant", block: "start" });
    else window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (menuOpen && !menuRef.current?.open) menuRef.current?.showModal();
    if (!menuOpen) {
      if (menuRef.current?.open) menuRef.current.close();
      menuRef.current?.querySelectorAll<HTMLDetailsElement>("details[open]")
        .forEach(details => { details.open = false; });
      return;
    }
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [menuOpen]);

  return (
    <div id="site-shell-root" className="site-shell">
      <a className="skip-link" href="#main-content">Đi tới nội dung chính</a>
      {announcement && (
        <div className={localHeader ? "announcement announcement--local" : "announcement"}>
          <span className="announcement__primary">{announcement.message}</span>
          {localHeader && <span className="announcement__compact">{capitanoAnnouncement.mobileMessage}</span>}
          <span className="picare-signature">
            <span>{announcement.partnerLabel}</span>
            {localHeader ? (
              <span className="picare-signature__mark">
                <img src={capitanoAnnouncement.partnerLogoUrl} alt={capitanoAnnouncement.partnerLogoAlt} />
              </span>
            ) : announcement.partnerLogoUrl && (
              <CmsLink
                to={announcement.partnerLinkUrl || "#"}
                className={`picare-signature__mark${announcement.partnerLogoUrl.split("?")[0].endsWith("/7db24069-c674-4d32-afc2-3c3d80bc9d35.png") ? " picare-signature__mark--padded" : ""}`}
              >
                <img src={announcement.partnerLogoUrl} alt={announcement.partnerLogoAlt || ""} />
              </CmsLink>
            )}
          </span>
        </div>
      )}
      {(header || showLocalHeader) && <header className={localHeader ? "site-header site-header--local" : "site-header"} data-template-fixed="site-header">
        <div className="site-header__inner container-wide">
          <button className="header-action header-action--menu" type="button" onClick={() => setMenuOpen(true)} aria-label="Mở menu" aria-expanded={menuOpen} aria-controls="mobile-navigation-dialog"><FiMenu /></button>
          <SiteNavigation items={navigation} />
          <CmsLink to={header?.logoLinkUrl || PATHS.HOME} className="header-logo" aria-label={`${logoAlt || "Pasta del Capitano"} - Trang chủ`}><BrandLogo src={logoSrc} alt={logoAlt} /></CmsLink>
          <div className="header-actions">
            {(header?.showHotline && header.hotlineNumber) && <a className="header-hotline" href={`tel:${(header.hotlineNumber || "").replace(/[^+0-9]/g, "")}`}>
              <FiPhone aria-hidden="true" />
              <span>{header.hotlineLabel} <strong>{header.hotlineNumber}</strong></span>
            </a>}
            <NavLink className="header-action header-action--search" to={`${PATHS.SHOP}?focus=search`} aria-label="Tìm kiếm"><FiSearch /></NavLink>
            {!localHeader && <>
              <button className="header-action header-action--desktop" type="button" aria-label="Tài khoản"><FiUser /></button>
              <button className="header-action header-action--desktop" type="button" aria-label="Sản phẩm yêu thích"><FiHeart /></button>
            </>}
            {header?.showCart && <button className="header-action header-cart" type="button" onClick={() => setCartOpen(true)} aria-label={`Giỏ hàng, ${cartCount} sản phẩm`}>
              <FiShoppingBag />
              {cartCount ? <span>{cartCount}</span> : null}
            </button>}
          </div>
        </div>
      </header>}

      <dialog ref={menuRef} id="mobile-navigation-dialog" className={menuOpen ? "mobile-menu is-open" : "mobile-menu"} aria-label="Menu chính" onClose={() => setMenuOpen(false)}>
        <div className="mobile-menu__top">
          <BrandLogo compact src={logoSrc} alt={logoAlt} />
          <button className="icon-button icon-button--light" type="button" onClick={() => setMenuOpen(false)} autoFocus aria-label="Đóng menu"><FiX /></button>
        </div>
        <SiteNavigation mobile items={navigation} onNavigate={() => setMenuOpen(false)} />
      </dialog>

      {import.meta.env.DEV && restartLocalFlashSale && (
        <div className="container-wide py-3">
          <button className="button button--outline" type="button" onClick={restartLocalFlashSale}>
            Chạy lại Flash Sale mẫu
          </button>
        </div>
      )}
      <main id="main-content"><Outlet /></main>
      <SiteFooter />
      {!menuOpen && !cartOpen && !previewEnabled && (
        <FloatingSupport hotline={localHeader ? CONTACT.phone : header?.showHotline ? header.hotlineNumber || undefined : undefined} />
      )}
      <CartDrawer />
      <ContentPreviewPopup />
      <FlashSaleAnnouncement items={content?.flashSales} enabled={!menuOpen && !cartOpen && !contentPreview && !cms.isError} />
    </div>
  );
}
