import { useEffect, useRef, type MouseEvent } from "react";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import type { NavigationItem } from "@/config/routes.config";
import { PATHS } from "@/config/paths";

import CmsLink from "@/components/CmsLink";
type Props = {
  mobile?: boolean;
  onNavigate?: () => void;
  items: NavigationItem[];
};

export default function SiteNavigation({
  mobile = false,
  onNavigate,
  items,
}: Props) {
  const navRef = useRef<HTMLElement>(null);
  const variant = mobile ? "mobile" : "desktop";
  const location = useLocation();
  const navigate = useNavigate();
  const currentParams = new URLSearchParams(location.search);

  function closeDropdowns() {
    navRef.current
      ?.querySelectorAll<HTMLDetailsElement>("details[open]")
      .forEach((details) => {
        details.open = false;
      });
  }

  useEffect(() => {
    function onOutside(event: PointerEvent) {
      if (
        event.target instanceof Node &&
        !navRef.current?.contains(event.target)
      ) {
        navRef.current
          ?.querySelectorAll<HTMLDetailsElement>("details[open]")
          .forEach((details) => {
            details.open = false;
          });
      }
    }
    document.addEventListener("pointerdown", onOutside);
    return () => document.removeEventListener("pointerdown", onOutside);
  }, []);

  function renderLink(item: NavigationItem, className?: string) {
    const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
      const internal = item.to.startsWith("/") && !item.to.startsWith("//");
      const sameTabClick =
        event.button === 0 &&
        !event.metaKey &&
        !event.ctrlKey &&
        !event.shiftKey &&
        !event.altKey &&
        !item.openInNewTab;
      // Navigate before hiding the touched link. Do not rely on focus or the
      // anchor's default action after the mobile drawer has started closing.
      if (mobile && internal && sameTabClick && !event.defaultPrevented) {
        event.preventDefault();
        navigate(item.to);
      }
      closeDropdowns();
      onNavigate?.();
    };
    const [route, hash] = item.to.split("#");
    const [pathname, search] = route.split("?");
    const linkParams = new URLSearchParams(search);
    const isActive =
      pathname === location.pathname &&
      (!hash || location.hash === `#${hash}`) &&
      ["category", "collection", "concern", "skin", "area"].every(
        (key) => currentParams.get(key) === linkParams.get(key),
      );
    return (
      <CmsLink
        to={item.to}
        openInNewTab={item.openInNewTab}
        className={
          [className, isActive ? "active" : undefined]
            .filter(Boolean)
            .join(" ") || undefined
        }
        aria-current={isActive ? "page" : undefined}
        onClick={onClick}
      >
        {item.label}
      </CmsLink>
    );
  }

  function renderItems(items: NavigationItem[], depth = 0) {
    return items.map((item) => (
      <li key={item.id || `${item.to}-${item.label}`} className="nav-item">
        {item.children?.length ? (
          <details
            className={
              depth === 0 ? "nav-dropdown" : "nav-dropdown nav-dropdown--nested"
            }
            name={`${variant}-navigation-${depth}`}
          >
            <summary className={depth === 0 ? "nav-trigger" : "nav-subtrigger"}>
              <span>{item.label}</span>
              {depth === 0 ? (
                <FiChevronDown aria-hidden="true" />
              ) : (
                <FiChevronRight aria-hidden="true" />
              )}
            </summary>
            <ul className="nav-panel">
              {item.to.trim() && item.to !== "#" && (
                <li className="nav-panel__all">
                  {renderLink({
                    ...item,
                    label:
                      depth === 0
                        ? item.to === PATHS.SHOP
                          ? "Tất cả sản phẩm"
                          : item.to === PATHS.NEWS
                            ? "Tất cả tin tức"
                            : `Tất cả ${item.label.toLocaleLowerCase("vi")}`
                        : `Tất cả ${item.label.toLocaleLowerCase("vi")}`,
                  })}
                </li>
              )}
              {renderItems(item.children, depth + 1)}
            </ul>
          </details>
        ) : (
          renderLink(item, depth === 0 ? "nav-link" : undefined)
        )}
      </li>
    ));
  }

  return (
    <nav
      ref={navRef}
      className={
        mobile
          ? "site-navigation site-navigation--mobile"
          : "desktop-nav site-navigation"
      }
      aria-label={mobile ? "Điều hướng di động" : "Điều hướng chính"}
      onBlur={(event) => {
        // The mobile drawer is dismissed explicitly; a touch may move focus to
        // body or another element before click. Keep the target available.
        if (mobile) return;
        // A touch can blur the summary without focusing the link. Hiding the
        // panel here would remove the link before the browser dispatches click.
        const nextTarget = event.relatedTarget;
        if (
          nextTarget instanceof Node &&
          !event.currentTarget.contains(nextTarget)
        )
          closeDropdowns();
      }}
      onKeyDown={(event) => {
        if (event.key !== "Escape" || !(event.target instanceof Element))
          return;
        const details =
          event.target.closest<HTMLDetailsElement>("details[open]");
        if (details) {
          event.preventDefault();
          event.stopPropagation();
          details
            .querySelectorAll<HTMLDetailsElement>("details[open]")
            .forEach((child) => {
              child.open = false;
            });
          details.open = false;
          details.querySelector<HTMLElement>(":scope > summary")?.focus();
        }
      }}
    >
      <ul className="nav-root">{renderItems(items)}</ul>
    </nav>
  );
}
