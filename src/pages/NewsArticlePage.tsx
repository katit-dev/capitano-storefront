import { Link, useParams } from "react-router-dom";
import { PATHS } from "@/config/paths";
import {
  NEWS_ARTICLES,
  formatNewsDate,
  getArticleReadMinutes,
  getNewsCategory,
} from "@/data/news";
import { useProducts } from "@/hooks/data/useProductHooks";
import NewsCard from "@/components/NewsCard";
import NewsSeo from "@/components/NewsSeo";
import ProductCard from "@/components/ProductCard";
import NotFoundPage from "@/pages/NotFoundPage";

export default function NewsArticlePage() {
  const catalog = useProducts();
  const { slug } = useParams();
  const article = NEWS_ARTICLES.find((item) => item.slug === slug);
  if (!article)
    return (
      <>
        <NewsSeo />
        <NotFoundPage />
      </>
    );
  const category = getNewsCategory(article.category)!;
  const products = (catalog.data || []).filter((product) =>
    article.productIds.includes(product.id),
  );
  const related = NEWS_ARTICLES.filter((item) => item.slug !== article.slug)
    .sort(
      (a, b) =>
        Number(b.category === article.category) -
        Number(a.category === article.category),
    )
    .slice(0, 3);
  return (
    <div className="news-article">
      <NewsSeo />
      <article>
        <header className="container-wide news-article__header">
          <nav className="news-breadcrumb" aria-label="Đường dẫn">
            <Link to={PATHS.HOME}>Trang chủ</Link>
            <span>/</span>
            <Link to={PATHS.NEWS}>Tin tức</Link>
            <span>/</span>
            <span>{article.title}</span>
          </nav>
          <Link
            className="eyebrow news-category-link"
            to={`${PATHS.NEWS}?category=${article.category}`}
          >
            {category.label}
          </Link>
          <h1>{article.title}</h1>
          <p className="news-meta">
            Biên soạn cho Pasta del Capitano Việt Nam{" "}
            <span>
              ·{" "}
              <time dateTime={article.published}>
                {formatNewsDate(article.published)}
              </time>{" "}
              · {getArticleReadMinutes(article)} phút đọc
            </span>
          </p>
          <p className="news-article__intro">{article.intro}</p>
        </header>
        <div className="container-wide news-article__layout">
          <nav className="news-toc" aria-label="Mục lục bài viết">
            <h2>Trong bài viết</h2>
            <ol>
              {article.sections.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.title}</a>
                </li>
              ))}
              <li>
                <a href="#cau-hoi-thuong-gap">Câu hỏi thường gặp</a>
              </li>
            </ol>
          </nav>
          <div className="news-article__content">
            {article.note && (
              <p className="news-article__note">{article.note}</p>
            )}
            {article.sections.map((section) => (
              <section id={section.id} key={section.id}>
                <h2>{section.title}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.bullets && (
                  <ul>
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
            <section id="cau-hoi-thuong-gap">
              <h2>Câu hỏi thường gặp</h2>
              {article.faqs.map((faq) => (
                <div className="news-faq" key={faq.question}>
                  <h3>{faq.question}</h3>
                  <p>{faq.answer}</p>
                </div>
              ))}
            </section>
            <section className="news-sources">
              <h2>Nguồn tham khảo</h2>
              <ul>
                {article.sources.map((source) => (
                  <li key={source.url}>
                    {source.url.startsWith("/") ? (
                      <Link to={source.url}>{source.title}</Link>
                    ) : (
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {source.title}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </section>
            <Link className="news-read-link" to={PATHS.NEWS}>
              ← Xem tất cả bài viết
            </Link>
          </div>
        </div>
      </article>
      {products.length > 0 && <section className="section news-related">
        <div className="container-wide">
          <div className="news-list-heading">
            <h2>Sản phẩm được nhắc đến</h2>
            <Link
              className="news-read-link"
              to={PATHS.SHOP}
            >
              Xem cửa hàng →
            </Link>
          </div>
          <div className="news-related-products">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>}
      {related.length > 0 && <section className="section">
        <div className="container-wide">
          <div className="news-list-heading">
            <h2>Đọc thêm</h2>
          </div>
          <div className="news-grid">
            {related.map((item) => (
              <NewsCard key={item.slug} article={item} />
            ))}
          </div>
        </div>
      </section>}
    </div>
  );
}
