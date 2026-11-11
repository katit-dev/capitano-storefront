import { Link, useSearchParams } from "react-router-dom";
import { PATHS } from "@/config/paths";
import { NEWS_ARTICLES, getNewsCategory, publishedNewsCategories } from "@/data/news";
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
            <p className="eyebrow eyebrow--line">Pasta del Capitano</p>
            <h1>{category?.label ?? "Tất cả tin tức"}</h1>
          </div>
          <p>
            Kiến thức chăm sóc răng miệng, hướng dẫn sản phẩm và hoạt động của Pasta del Capitano.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container-wide">
          {publishedNewsCategories.length > 0 && <nav className="news-categories" aria-label="Chuyên mục tin tức">
            <Link to={PATHS.NEWS} aria-current={!category ? "page" : undefined}>
              Tất cả tin tức
            </Link>
            {publishedNewsCategories.map((item) => (
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
          </nav>}
          {articles.length > 0 ? (
            <>
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
            </>
          ) : (
            <div className="empty-state">
              <p>Chưa có bài viết.</p>
              <Link className="button button--outline" to={PATHS.SHOP}>Khám phá sản phẩm</Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
