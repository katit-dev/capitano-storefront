import { NEWS_CATEGORIES } from "@/config/routes.config";

export type NewsCategory = (typeof NEWS_CATEGORIES)[number]["value"];
export interface NewsArticle {
  slug: string;
  category: NewsCategory;
  title: string;
  description: string;
  intro: string;
  published: string;
  sections: {
    id: string;
    title: string;
    paragraphs: string[];
    bullets?: string[];
  }[];
  faqs: { question: string; answer: string }[];
  productIds: string[];
  sources: { title: string; url: string }[];
  note?: string;
}

export const NEWS_ARTICLES: NewsArticle[] = [];

export const publishedNewsCategories = NEWS_CATEGORIES.filter((category) =>
  NEWS_ARTICLES.some((article) => article.category === category.value),
);

export function getNewsCategory(value: string) {
  return NEWS_CATEGORIES.find((category) => category.value === value);
}

export function getArticleReadMinutes(article: NewsArticle) {
  const text = [
    article.intro,
    ...article.sections.flatMap((section) => [
      ...section.paragraphs,
      ...(section.bullets ?? []),
    ]),
    ...article.faqs.map((faq) => `${faq.question} ${faq.answer}`),
  ].join(" ");
  return Math.max(1, Math.ceil(text.split(/\s+/).length / 200));
}

export const formatNewsDate = (date: string) =>
  new Intl.DateTimeFormat("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" }).format(
    new Date(`${date}T00:00:00+07:00`),
  );
