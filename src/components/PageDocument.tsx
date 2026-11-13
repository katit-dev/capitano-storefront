import { Fragment, type ReactNode } from "react";
import type { PageContent, PageNode } from "@/types/Page";
import CmsLink from "./CmsLink";
function safeLink(value: unknown): value is string {
  if (typeof value !== "string" || !value || value.length > 2048 || [...value].some(character => character.charCodeAt(0) <= 32 || character === "\\")) return false;
  if (value.startsWith("/")) return !value.startsWith("//");
  if (value.startsWith("#")) return /^#[a-z0-9_:.-]+$/i.test(value);
  try { const url = new URL(value); return !url.username && !url.password && (url.protocol === "https:" && Boolean(url.hostname) || ["mailto:", "tel:"].includes(url.protocol) && Boolean(url.pathname)); } catch { return false; }
}
function renderNode(node: PageNode, depth = 0): ReactNode {
  if (!node || depth > 16) return null;
  if (node.type === "text") {
    let text: ReactNode = typeof node.text === "string" ? node.text : "";
    for (const mark of node.marks || []) {
      if (mark.type === "bold") text = <strong>{text}</strong>;
      else if (mark.type === "italic") text = <em>{text}</em>;
      else if (mark.type === "underline") text = <u>{text}</u>;
      else if (mark.type === "strike") text = <s>{text}</s>;
      else if (mark.type === "link" && safeLink(mark.attrs?.href)) text = <CmsLink to={mark.attrs.href} openInNewTab={mark.attrs.target === "_blank"}>{text}</CmsLink>;
    }
    return text;
  }
  const children = (node.content || []).map((child, index) => <Fragment key={index}>{renderNode(child, depth + 1)}</Fragment>);
  switch (node.type) {
    case "doc": return <>{children}</>;
    case "paragraph": return <p>{children.length ? children : <br />}</p>;
    case "heading": return node.attrs?.level === 3 ? <h3>{children}</h3> : <h2>{children}</h2>;
    case "bulletList": return <ul>{children}</ul>;
    case "orderedList": return <ol start={node.attrs?.start || 1} type={['1','a','A','i','I'].includes(node.attrs?.type || '') ? node.attrs!.type as '1' | 'a' | 'A' | 'i' | 'I' : undefined}>{children}</ol>;
    case "listItem": return <li>{children}</li>;
    case "blockquote": return <blockquote>{children}</blockquote>;
    case "hardBreak": return <br />;
    case "horizontalRule": return <hr />;
    default: return null;
  }
}
export default function PageDocument({ content }: { content: PageContent }) {
  return <div className="cms-text-page__body">{content.doc?.type === "doc" ? renderNode(content.doc) : (content.text || "").split(/\n\s*\n/).filter(Boolean).map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>;
}
