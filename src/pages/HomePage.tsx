import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
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
    {content.banners?.map(item => <CmsBanner key={item.id} item={item} />)}
    <CmsFlashSales items={content.flashSales} productTypes={content.productTypes} />
    <StoreAssurance />
    {featured.length > 0 && <section className="section best-seller-section" id="ban-chay"><div className="container-wide">
      <div className="commerce-heading"><h2>Sản phẩm nổi bật</h2><Link className="text-link" to={PATHS.SHOP}>Xem sản phẩm <FiArrowRight /></Link></div>
      <div className="product-grid">{featured.map(product => <ProductCard key={product.id} product={product} />)}</div>
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
