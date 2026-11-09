/* eslint-disable react-refresh/only-export-components -- Build-time SSR entry, never used by Fast Refresh. */
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "@/App";
import { NEWS_ARTICLES } from "@/data/news";
import { getNewsSeo, renderNewsSeoHead, SITE_ORIGIN } from "@/utils/news-seo";

export const newsRoutes = [
  "/tin-tuc",
  ...NEWS_ARTICLES.map((article) => `/tin-tuc/${article.slug}`),
];
export const sitemapUrls = [
  "/",
  "/cua-hang",
  ...newsRoutes,
].map((path) => `${SITE_ORIGIN}${path}`);
export { SITE_ORIGIN };

export function validateNewsContent() {
  if (new Set(NEWS_ARTICLES.map((article) => article.slug)).size !== NEWS_ARTICLES.length) throw new Error("Duplicate article slug");
  for (const article of NEWS_ARTICLES) {
    if (new Set(article.sections.map((section) => section.id)).size !== article.sections.length) throw new Error(`Duplicate section: ${article.slug}`);
    for (const source of article.sources) {
      if (!source.url.startsWith("/")) continue;
      const path = source.url.split("?")[0];
      if (path !== "/cua-hang" && !path.startsWith("/san-pham/") && !sitemapUrls.includes(`${SITE_ORIGIN}${path}`)) throw new Error(`Broken source link: ${source.url}`);
    }
  }
}

export function renderNewsRoute(path: string) {
  const client = new QueryClient();
  const html = renderToString(
    <QueryClientProvider client={client}>
      <StaticRouter location={path}>
        <App />
      </StaticRouter>
    </QueryClientProvider>,
  );
  client.clear();
  return { html, head: renderNewsSeoHead(getNewsSeo(path)) };
}
