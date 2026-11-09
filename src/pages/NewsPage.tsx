import { Link, useSearchParams } from "react-router-dom";
import { PATHS } from "@/config/paths";
import { NEWS_CATEGORIES } from "@/config/routes.config";
import { NEWS_ARTICLES, getNewsCategory } from "@/data/news";
import NewsCard from "@/components/NewsCard";
import NewsSeo from "@/components/NewsSeo";

export default function NewsPage() {
  const [params] = useSearchParams();
  const category = getNewsCategory(params.get("category") ?? "");
  const articles = NEWS_ARTICLES.filter(
    (article) => !category || article.category === category.value,
  );
  return (
    <div className="news-page">
      <NewsSeo />
      <section className="shop-hero">
        <div className="container-wide shop-hero__inner">
          <div>
            <p className="eyebrow eyebrow--line">Tin tức PaxMoly</p>
            <h1>{category?.label ?? "Tin tức & kiến thức chăm sóc da"}</h1>
          </div>
          <p>
            {category?.value === "review-san-pham"
              ? "Tìm hiểu sản phẩm từ thông tin danh mục. Các bài viết không thay thế đánh giá sau trải nghiệm thực tế."
              : "Khám phá các dòng sản phẩm PaxMoly và kiến thức chăm sóc da có nguồn tham khảo."}
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container-wide">
          <nav className="news-categories" aria-label="Chuyên mục tin tức">
            <Link to={PATHS.NEWS} aria-current={!category ? "page" : undefined}>
              Tất cả tin tức
            </Link>
            {NEWS_CATEGORIES.map((item) => (
              <Link
                key={item.value}
                to={`${PATHS.NEWS}?category=${item.value}`}
                aria-current={
                  category?.value === item.value ? "page" : undefined
                }
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="news-list-heading">
            <p>{category?.label ?? "Bài viết mới nhất"}</p>
            <span>{articles.length} bài viết</span>
          </div>
          {!category && <NewsCard article={articles[0]} featured />}
          <div className="news-grid">
            {(category ? articles : articles.slice(1)).map((article) => (
              <NewsCard key={article.slug} article={article} />
            ))}
          </div>
          <aside className="news-editorial-note">
            <h2>Thông tin rõ ràng, lựa chọn có cơ sở.</h2>
            <p>
              Các bài kiến thức dẫn nguồn tham khảo; bài giới thiệu sản phẩm đối
              chiếu với danh mục PaxMoly. Nội dung không đưa ra chẩn đoán hoặc
              thay thế tư vấn của bác sĩ da liễu.
            </p>
            <Link className="news-read-link" to={PATHS.SHOP}>
              Khám phá sản phẩm PaxMoly →
            </Link>
          </aside>
        </div>
      </section>
    </div>
  );
}
