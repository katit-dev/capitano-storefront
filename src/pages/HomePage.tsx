import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import frescoBanner from "@/assets/collections/capitano-fresco-banner-17.png";
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
  const fresco = cms.isLocal ? products.find(product => product.sku === "CAP018") : undefined;
  return <>
    {fresco ? (
      <section className="capitano-hero" aria-labelledby="capitano-hero-title">
        <div className="container-wide capitano-hero__layout">
          <img
            className="capitano-hero__banner"
            src={frescoBanner}
            alt="Banner Fresco của Pasta del Capitano với chai xịt và lá bạc hà"
            width="1983"
            height="793"
            fetchPriority="high"
          />
          <div className="capitano-hero__copy">
            <h1 id="capitano-hero-title">Xịt thơm miệng Fresco</h1>
            <div className="capitano-hero__actions">
              <Link className="button button--primary" to={PATHS.product(fresco.slug)}>
                Xem Fresco <FiArrowRight aria-hidden="true" />
              </Link>
              <Link className="text-link" to={PATHS.SHOP}>Tất cả sản phẩm</Link>
            </div>
          </div>
        </div>
      </section>
    ) : content.banners?.map(item => <CmsBanner key={item.id} item={item} />)}
    <CmsFlashSales items={content.flashSales} productTypes={content.productTypes} />
    {!cms.isLocal && <StoreAssurance />}
    {featured.length > 0 && <section className="section best-seller-section" id="ban-chay"><div className="container-wide">
      <div className="commerce-heading"><h2>Sản phẩm nổi bật</h2><Link className="text-link" to={PATHS.SHOP}>Xem sản phẩm <FiArrowRight /></Link></div>
      <div className="product-grid product-grid--featured">{featured.map(product => <ProductCard key={product.id} product={product} />)}</div>
    </div></section>}
    <CmsSkinNeeds section={content.skinNeedSection} items={content.skinNeeds} />
    {content.featuredLines?.map(item => {
      const line = content.productLines?.find(line => line.id === item.productLineId);
      if (!line) return null;
      const lineProducts = products.filter(product => product.productLineId === line.id);
      return <section key={item.id} data-cms-record={item.id} data-cms-module="featuredLines" aria-label={"Dòng sản phẩm " + line.name}>
        <CmsBanner item={item} module="featuredLines" />
        <div className="section"><div className="container-wide">
          <div className="commerce-heading"><div><p className="eyebrow">Dòng sản phẩm nổi bật</p><h2>{line.name}</h2></div><Link className="text-link" to={PATHS.SHOP + "?collection=" + encodeURIComponent(line.slug || line.code || line.id)}>Xem dòng sản phẩm <FiArrowRight /></Link></div>
          {lineProducts.length > 0 ? <div className="product-grid">{lineProducts.map(product => <ProductCard key={product.id} product={product} lineLabel={line.name} />)}</div> : <p>Chưa có sản phẩm đã xuất bản trong dòng này.</p>}
        </div></div>
      </section>;
    })}
    <CmsBanner item={content.underBanner} module="underBanner" />
    <CmsNewsletter item={content.newsletter} />
  </>;
}
