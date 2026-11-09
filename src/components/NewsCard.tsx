import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { PATHS } from "@/config/paths";
import PicareProductStamp from "@/components/PicareProductStamp";
import { useContentPreview } from "@/hooks/useContentPreview";
import {
  formatNewsDate,
  getArticleReadMinutes,
  getNewsCategory,
  hasNewsPicareStamp,
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
  const preview = useContentPreview({
    image: article.image,
    imageAlt: article.imageAlt,
    title: article.title,
    description: article.description,
  });
  return (
    <article
      className={featured ? "news-card news-card--featured" : "news-card"}
    >
      <Link
        className={[
          "news-card__image",
          `news-card__image--${article.imageStyle}`,
          hasNewsPicareStamp(article) ? "news-image--stamped" : "",
        ].join(" ")}
        to={href}
        {...preview.imageHold}
        aria-label={`Đọc bài: ${article.title}`}
      >
        {hasNewsPicareStamp(article) && <PicareProductStamp />}
        <img
          src={article.image}
          draggable={false}
          alt={article.imageAlt}
          width="640"
          height="400"
          loading={featured ? "eager" : "lazy"}
        />
      </Link>
      <div className="news-card__body">
        <p className="eyebrow">{getNewsCategory(article.category)?.label}</p>
        <p className="news-meta">
          <time dateTime={article.published}>
            {formatNewsDate(article.published)}
          </time>
          <span>· {getArticleReadMinutes(article)} phút đọc</span>
        </p>
        <h2>
          <Link to={href} {...preview.detailsHold}>
            {article.title}
          </Link>
        </h2>
        <p className="news-card__description" {...preview.detailsHold}>
          {article.description}
        </p>
        <Link className="news-read-link" to={href}>
          Đọc bài viết <FiArrowRight aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
