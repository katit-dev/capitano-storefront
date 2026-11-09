import { NEWS_ARTICLES, getNewsCategory } from "@/data/news";

export const SITE_ORIGIN = "https://paxmoly-storefront.vercel.app";
export const DEFAULT_TITLE = "PaxMoly Vietnam | Serum & Mask Pack Hàn Quốc";
export const DEFAULT_DESCRIPTION =
  "PaxMoly Vietnam - Serum và mặt nạ Hàn Quốc với hoạt chất rõ ràng, dễ chọn theo nhu cầu da.";
export const newsSeoSelectors =
  'title, meta[name="description"], meta[name="robots"], link[rel="canonical"], meta[property^="og:"], meta[name^="twitter:"], script#news-structured-data';

export function getNewsSeo(path: string) {
  const location = new URL(path, SITE_ORIGIN);
  const slug = location.pathname
    .replace(/^\/tin-tuc\/?/, "")
    .replace(/\/$/, "");
  const article = NEWS_ARTICLES.find((item) => item.slug === slug);
  const category = getNewsCategory(location.searchParams.get("category") ?? "");
  const url = `${SITE_ORIGIN}/tin-tuc${article ? `/${article.slug}` : ""}`;
  const title = article
    ? `${article.title} | PaxMoly Vietnam`
    : slug
      ? "Không tìm thấy bài viết | PaxMoly Vietnam"
      : `${category?.label ?? "Tin tức & kiến thức chăm sóc da"} | PaxMoly Vietnam`;
  const description =
    article?.description ??
    "Tìm hiểu dòng CICA PaxMoly, serum, mặt nạ và cách xây dựng chu trình chăm sóc da. Bài viết có nguồn tham khảo và thông tin sản phẩm liên quan.";
  const image = new URL(article?.image ?? NEWS_ARTICLES[0].image, SITE_ORIGIN)
    .href;
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
                image: [image],
                datePublished: `${article.published}T09:00:00+07:00`,
                dateModified: `${article.published}T09:00:00+07:00`,
                inLanguage: "vi-VN",
                mainEntityOfPage: url,
                articleSection: getNewsCategory(article.category)?.label,
                author: {
                  "@type": "Organization",
                  name: "PaxMoly Vietnam",
                  url: SITE_ORIGIN,
                },
                publisher: {
                  "@type": "Organization",
                  name: "PaxMoly Vietnam",
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
    image,
    article: !!article,
    robots:
      (slug && !article) || category
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
    `<link rel="canonical" href="${escape(seo.url)}">`,
    ...Object.entries({
      "og:title": seo.title,
      "og:description": seo.description,
      "og:url": seo.url,
      "og:image": seo.image,
      "og:type": seo.article ? "article" : "website",
      "og:locale": "vi_VN",
      "og:site_name": "PaxMoly Vietnam",
    }).map(
      ([property, content]) =>
        `<meta property="${property}" content="${escape(content)}">`,
    ),
    '<meta name="twitter:card" content="summary_large_image">',
    `<meta name="twitter:title" content="${escape(seo.title)}">`,
    `<meta name="twitter:description" content="${escape(seo.description)}">`,
    `<meta name="twitter:image" content="${escape(seo.image)}">`,
    `<script type="application/ld+json" id="news-structured-data">${JSON.stringify(seo.schema).replace(/</g, "\\u003c")}</script>`,
  ].join("\n");
}
