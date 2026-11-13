import { NEWS_ARTICLES, getNewsCategory } from "@/data/news";

export const SITE_ORIGIN = (import.meta.env.VITE_SITE_ORIGIN || "").trim().replace(/\/$/, "");
const SITE_NAME = "Pasta del Capitano Việt Nam";
export const DEFAULT_TITLE = "Pasta del Capitano Việt Nam | Chăm sóc răng miệng";
export const DEFAULT_DESCRIPTION =
  "Pasta del Capitano Việt Nam. Khám phá kem đánh răng, nước súc miệng và xịt thơm miệng từ Ý.";
export const newsSeoSelectors =
  'title, meta[name="description"], meta[name="robots"], link[rel="canonical"], meta[property^="og:"], meta[name^="twitter:"], script#news-structured-data';

export function getNewsSeo(path: string) {
  const location = new URL(path, SITE_ORIGIN || "http://localhost");
  const slug = location.pathname
    .replace(/^\/tin-tuc\/?/, "")
    .replace(/\/$/, "");
  const article = NEWS_ARTICLES.find((item) => item.slug === slug);
  const category = getNewsCategory(location.searchParams.get("category") ?? "");
  const url = `${SITE_ORIGIN}/tin-tuc${article ? `/${article.slug}` : ""}`;
  const title = article
    ? `${article.title} | ${SITE_NAME}`
    : slug
      ? `Không tìm thấy bài viết | ${SITE_NAME}`
      : `${category?.label ?? "Tất cả tin tức"} | ${SITE_NAME}`;
  const description =
    article?.description ??
    "Kiến thức chăm sóc răng miệng, hướng dẫn sản phẩm và hoạt động của Pasta del Capitano.";
  const schema: Record<string, unknown>[] =
    slug && !article
      ? []
      : [
          article
            ? {
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                headline: article.title,
                description,
                datePublished: `${article.published}T09:00:00+07:00`,
                dateModified: `${article.published}T09:00:00+07:00`,
                inLanguage: "vi-VN",
                mainEntityOfPage: url,
                articleSection: getNewsCategory(article.category)?.label,
                author: {
                  "@type": "Organization",
                  name: SITE_NAME,
                  url: SITE_ORIGIN,
                },
                publisher: {
                  "@type": "Organization",
                  name: SITE_NAME,
                  url: SITE_ORIGIN,
                },
              }
            : {
                "@context": "https://schema.org",
                "@type": "CollectionPage",
                name: title,
                description,
                url,
                inLanguage: "vi-VN",
                mainEntity: {
                  "@type": "ItemList",
                  itemListElement: NEWS_ARTICLES.filter((item) => !category || item.category === category.value).map((item, index) => ({
                    "@type": "ListItem",
                    position: index + 1,
                    name: item.title,
                    url: `${SITE_ORIGIN}/tin-tuc/${item.slug}`,
                  })),
                },
              },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Trang chủ",
                item: SITE_ORIGIN,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Tin tức",
                item: `${SITE_ORIGIN}/tin-tuc`,
              },
              ...(article
                ? [
                    {
                      "@type": "ListItem",
                      position: 3,
                      name: article.title,
                      item: url,
                    },
                  ]
                : []),
            ],
          },
        ];
  return {
    title,
    description,
    url,
    article: !!article,
    robots:
      import.meta.env.DEV || !SITE_ORIGIN || !NEWS_ARTICLES.length || (slug && !article) || category
        ? "noindex, follow"
        : "index, follow, max-image-preview:large",
    schema,
  };
}

const escape = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        character
      ]!,
  );

export function renderNewsSeoHead(seo: ReturnType<typeof getNewsSeo>) {
  return [
    `<title>${escape(seo.title)}</title>`,
    `<meta name="description" content="${escape(seo.description)}">`,
    `<meta name="robots" content="${escape(seo.robots)}">`,
    ...(SITE_ORIGIN ? [`<link rel="canonical" href="${escape(seo.url)}">`] : []),
    ...Object.entries({
      "og:title": seo.title,
      "og:description": seo.description,
      ...(SITE_ORIGIN ? { "og:url": seo.url } : {}),
      "og:type": seo.article ? "article" : "website",
      "og:locale": "vi_VN",
      "og:site_name": SITE_NAME,
    }).map(
      ([property, content]) =>
        `<meta property="${property}" content="${escape(content)}">`,
    ),
    '<meta name="twitter:card" content="summary">',
    `<meta name="twitter:title" content="${escape(seo.title)}">`,
    `<meta name="twitter:description" content="${escape(seo.description)}">`,
    `<script type="application/ld+json" id="news-structured-data">${JSON.stringify(seo.schema).replace(/</g, "\\u003c")}</script>`,
  ].join("\n");
}
