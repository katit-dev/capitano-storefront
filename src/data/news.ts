import { NEWS_CATEGORIES } from "@/config/routes.config";
import { PATHS } from "@/config/paths";

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

const publishedArticles: NewsArticle[] = [];
const demoArticle: NewsArticle = {
  slug: "kham-pha-cua-hang-capitano",
  category: "huong-dan-san-pham",
  title: "Khám phá cửa hàng Pasta del Capitano",
  description: "Tìm sản phẩm theo danh mục và xem thông tin trên trang chi tiết.",
  intro: "Cửa hàng Pasta del Capitano tập hợp kem đánh răng, nước súc miệng và xịt thơm miệng trong cùng một danh mục.",
  published: "2026-11-12",
  sections: [
    {
      id: "tim-theo-danh-muc",
      title: "Tìm theo danh mục",
      paragraphs: ["Mở Cửa hàng và chọn loại sản phẩm. Bạn cũng có thể tìm theo tên hoặc mã sản phẩm."],
    },
    {
      id: "xem-thong-tin-san-pham",
      title: "Xem thông tin sản phẩm",
      paragraphs: ["Mở trang chi tiết để xem dung tích, thành phần và hướng dẫn sử dụng của từng sản phẩm."],
    },
  ],
  faqs: [{
    question: "Xem danh sách đầy đủ ở đâu?",
    answer: "Chọn Cửa hàng để xem tất cả sản phẩm Pasta del Capitano.",
  }],
  productIds: ["capitano-xit-thom-mieng-fresco"],
  sources: [{ title: "Cửa hàng Pasta del Capitano", url: PATHS.SHOP }],
  note: "Bài viết mẫu dùng để kiểm thử giao diện.",
};

export const NEWS_ARTICLES = import.meta.env.DEV && !publishedArticles.length
  ? [demoArticle]
  : publishedArticles;

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
