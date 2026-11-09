import { Link, useParams } from "react-router-dom";
import { PATHS } from "@/config/paths";
import {
  NEWS_ARTICLES,
  formatNewsDate,
  getArticleReadMinutes,
  getNewsCategory,
  hasNewsPicareStamp,
} from "@/data/news";
import { useProducts } from "@/hooks/data/useProductHooks";
import NewsCard from "@/components/NewsCard";
import NewsSeo from "@/components/NewsSeo";
import ProductCard from "@/components/ProductCard";
import PicareProductStamp from "@/components/PicareProductStamp";
import NotFoundPage from "@/pages/NotFoundPage";
import { useContentPreview } from "@/hooks/useContentPreview";

const imageCaption =
  "Hình ảnh minh họa sản phẩm; có sử dụng hình ảnh hỗ trợ AI.";

export default function NewsArticlePage() {
  const catalog = useProducts();
  const { slug } = useParams();
  const article = NEWS_ARTICLES.find((item) => item.slug === slug);
  const preview = useContentPreview(
    article
      ? {
          image: article.image,
          imageAlt: article.imageAlt,
          title: article.imageAlt || article.title,
          description: imageCaption,
        }
      : undefined,
  );
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
            Biên soạn cho PaxMoly Vietnam{" "}
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
        <figure
          className={`container-wide news-article__cover news-article__cover--${article.imageStyle}`}
        >
          <div
            className={
              hasNewsPicareStamp(article)
                ? "news-article__visual news-image--stamped"
                : "news-article__visual"
            }
            {...preview.imageHold}
          >
            {hasNewsPicareStamp(article) && <PicareProductStamp />}
            <img
              src={article.image}
              draggable={false}
              alt={article.imageAlt}
              width="1200"
              height="480"
            />
          </div>
          <figcaption {...preview.detailsHold}>{imageCaption}</figcaption>
        </figure>
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
              <p>
                Thông tin chăm sóc da mang tính tham khảo. Với phản ứng kéo dài
                hoặc tình trạng da cần điều trị, hãy trao đổi với bác sĩ da
                liễu.
              </p>
            </section>
            <Link className="news-read-link" to={PATHS.NEWS}>
              ← Xem tất cả bài viết
            </Link>
          </div>
        </div>
      </article>
      <section className="section news-related">
        <div className="container-wide">
          <div className="news-list-heading">
            <h2>Sản phẩm được nhắc đến</h2>
            <Link
              className="news-read-link"
              to={
                article.category === "hoat-dong-noi-bat"
                  ? `${PATHS.SHOP}?collection=cica`
                  : PATHS.SHOP
              }
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
      </section>
      <section className="section">
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
      </section>
    </div>
  );
}
