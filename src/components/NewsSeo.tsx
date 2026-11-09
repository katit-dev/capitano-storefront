import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
  getNewsSeo,
  newsSeoSelectors,
  renderNewsSeoHead,
} from "@/utils/news-seo";

export default function NewsSeo() {
  const { pathname, search } = useLocation();
  useEffect(() => {
    document.head
      .querySelectorAll(newsSeoSelectors)
      .forEach((node) => node.remove());
    const template = document.createElement("template");
    template.innerHTML = renderNewsSeoHead(getNewsSeo(`${pathname}${search}`));
    document.head.append(template.content);
    return () => {
      document.head
        .querySelectorAll(newsSeoSelectors)
        .forEach((node) => node.remove());
      document.title = DEFAULT_TITLE;
      const description = document.createElement("meta");
      description.name = "description";
      description.content = DEFAULT_DESCRIPTION;
      document.head.append(description);
    };
  }, [pathname, search]);
  return null;
}
