import type { AnchorHTMLAttributes } from "react";
import { Link } from "react-router-dom";
type Props = AnchorHTMLAttributes<HTMLAnchorElement> & { to: string; openInNewTab?: boolean };
export default function CmsLink({ to, openInNewTab, children, ...props }: Props) {
  if (!/^(https?:\/\/|\/|#|mailto:|tel:)/i.test(to) || to.startsWith("//")) return <span className={props.className}>{children}</span>;
  if (openInNewTab || !to.startsWith("/")) return <a {...props} href={to} target={openInNewTab ? "_blank" : undefined} rel={openInNewTab ? "noopener noreferrer" : undefined}>{children}</a>;
  return <Link {...props} to={to}>{children}</Link>;
}
