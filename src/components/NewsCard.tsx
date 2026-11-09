import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { PATHS } from "@/config/paths";
import {
  formatNewsDate,
  getArticleReadMinutes,
  getNewsCategory,
  type NewsArticle,
} from "@/data/news";

export default function NewsCard({
  article,
  featured = false,
}: {
  article: NewsArticle;
  featured?: boolean;
}) {
  const href = PATHS.newsArticle(article.slug);
  return (
    <article
      className={featured ? "news-card news-card--featured" : "news-card"}
    >
      <div className="news-card__body">
        <p className="eyebrow">{getNewsCategory(article.category)?.label}</p>
        <p className="news-meta">
          <time dateTime={article.published}>
            {formatNewsDate(article.published)}
          </time>
          <span>· {getArticleReadMinutes(article)} phút đọc</span>
        </p>
        <h2>
          <Link to={href}>
            {article.title}
          </Link>
        </h2>
        <p className="news-card__description">
          {article.description}
        </p>
        <Link className="news-read-link" to={href}>
          Đọc bài viết <FiArrowRight aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
