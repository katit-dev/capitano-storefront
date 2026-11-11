import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import capitanoHero from "@/assets/brand/banner-dau-trang-trong-suot.png";
import ProductCard from "@/components/ProductCard";
import StoreAssurance from "@/components/StoreAssurance";
import { PATHS } from "@/config/paths";
import { catalogProducts } from "@/apis/product.service";
import { useCmsContent } from "@/hooks/data/useCmsContent";
import { CmsBanner, CmsFlashSales, CmsSkinNeeds, CmsNewsletter } from "@/components/CmsSections";

export default function HomePage() {
  const cms = useCmsContent("home");
  const content = cms.data?.content;
  if (cms.isError) return <div className="empty-state empty-state--page" role="alert"><h1>Không thể tải nội dung website</h1><p>Vui lòng kiểm tra kết nối CMS.</p><button className="button button--outline" onClick={() => void cms.refetch()}>Thử lại</button></div>;
  if (!content) return <div className="detail-loading" role="status" aria-label="Đang tải nội dung CMS" />;
  const products = catalogProducts(content);
  const featured = products.filter(product => product.isFeatured);
  return <>
    {cms.isLocal ? (
      <section className="capitano-hero" aria-labelledby="capitano-hero-title">
        <div className="container-wide capitano-hero__layout">
          <div className="capitano-hero__copy">
            <p className="capitano-hero__heritage">Từ năm 1905</p>
            <h1 id="capitano-hero-title">Chăm sóc răng miệng từ Ý</h1>
            <p className="capitano-hero__description">Kem đánh răng, nước súc miệng và xịt thơm miệng cho nhu cầu hằng ngày.</p>
            <Link className="button button--primary" to={PATHS.SHOP}>
              Khám phá sản phẩm <FiArrowRight aria-hidden="true" />
            </Link>
          </div>
          <div className="capitano-hero__artwork">
            <img
              src={capitanoHero}
              alt="Các tuýp kem đánh răng Pasta del Capitano dòng 1905"
              width="1983"
              height="793"
              fetchPriority="high"
            />
          </div>
        </div>
      </section>
    ) : content.banners?.map(item => <CmsBanner key={item.id} item={item} />)}
    <StoreAssurance />
    <CmsFlashSales items={content.flashSales} productTypes={content.productTypes} />
    {featured.length > 0 && (
      <section className="section best-seller-section" id="ban-chay" aria-labelledby="featured-products-title">
        <div className="container-wide">
          <div className="commerce-heading">
            <h2 id="featured-products-title">Sản phẩm nổi bật</h2>
            <Link className="text-link" to={PATHS.SHOP}>
              Xem tất cả sản phẩm <FiArrowRight aria-hidden="true" />
            </Link>
          </div>
          <div className="product-grid product-grid--featured">
            {featured.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    )}
    <CmsSkinNeeds section={content.skinNeedSection} items={content.skinNeeds} id={cms.isLocal ? "chon-theo-nhu-cau" : undefined} />
    {content.featuredLines?.map(item => {
      const line = content.productLines?.find(line => line.id === item.productLineId);
      if (!line) return null;
      const collectionUrl = `${PATHS.SHOP}?collection=${encodeURIComponent(line.slug || line.code || line.id)}`;

      if (cms.isLocal) {
        const titleId = `${item.id}-title`;
        return (
          <section key={item.id} className="featured-line-promo" aria-labelledby={titleId}>
            <div className="container-wide featured-line-promo__layout">
              <div className="featured-line-promo__copy">
                <p className="eyebrow">Dòng sản phẩm nổi bật</p>
                <h2 id={titleId}>{item.title || line.name}</h2>
                {item.description && <p className="featured-line-promo__description">{item.description}</p>}
                <Link className="button button--primary" to={collectionUrl}>
                  Xem dòng sản phẩm <FiArrowRight aria-hidden="true" />
                </Link>
              </div>
              <div className="featured-line-promo__packshots">
                {item.products?.map(product => (
                  <img key={product.id} src={product.imageUrl} alt={product.name} loading="lazy" />
                ))}
              </div>
            </div>
          </section>
        );
      }

      const lineProducts = products.filter(product => product.productLineId === line.id);
      return <section key={item.id} data-cms-record={item.id} data-cms-module="featuredLines" aria-label={"Dòng sản phẩm " + line.name}>
        <CmsBanner item={item} module="featuredLines" />
        <div className="section"><div className="container-wide">
          <div className="commerce-heading"><div><p className="eyebrow">Dòng sản phẩm nổi bật</p><h2>{line.name}</h2></div><Link className="text-link" to={collectionUrl}>Xem dòng sản phẩm <FiArrowRight aria-hidden="true" /></Link></div>
          {lineProducts.length > 0 ? <div className="product-grid">{lineProducts.map(product => <ProductCard key={product.id} product={product} lineLabel={line.name} />)}</div> : <p>Chưa có sản phẩm đã xuất bản trong dòng này.</p>}
        </div></div>
      </section>;
    })}
    <CmsBanner
      item={content.underBanner}
      module="underBanner"
      className={cms.isLocal ? "capitano-fresco-campaign" : undefined}
      imageLoading={cms.isLocal ? "lazy" : undefined}
    />
    <CmsNewsletter item={content.newsletter} />
  </>;
}
