import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import PageDocument from "@/components/PageDocument";
import { PATHS } from "@/config/paths";
import { cmsEnabled, CmsResponseError, fetchCmsPage } from "@/hooks/data/useCmsContent";
import NotFoundPage from "@/pages/NotFoundPage";

export default function ContentPage() {
  const { slug = "" } = useParams();
  const available = cmsEnabled && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) && slug.length <= 160;
  const query = useQuery({
    queryKey: ["cms-page", slug],
    queryFn: ({ signal }) => fetchCmsPage(slug, signal),
    enabled: available,
    retry: (failures, error) => failures < 1 && !(error instanceof CmsResponseError && error.status === 404),
  });

  if (!available || (query.error instanceof CmsResponseError && query.error.status === 404)) {
    return <NotFoundPage />;
  }
  if (query.isPending) {
    return <div className="detail-loading" role="status" aria-label="Đang tải trang" />;
  }
  if (query.isError) {
    return (
      <section className="empty-state empty-state--page" role="alert">
        <h1>Không thể tải nội dung trang</h1>
        <button className="button button--outline" onClick={() => void query.refetch()}>Thử lại</button>
      </section>
    );
  }
  const page = query.data;
  return (
    <article className="container-wide cms-text-page">
      <nav aria-label="Đường dẫn"><Link to={PATHS.HOME}>Trang chủ</Link><span> / {page.title}</span></nav>
      <h1>{page.title}</h1>
      {page.excerpt && <p className="cms-text-page__excerpt">{page.excerpt}</p>}
      <PageDocument content={page.content} />
    </article>
  );
}
