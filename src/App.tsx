import { Navigate, Route, Routes } from "react-router-dom";
import SiteLayout from "@/components/layout/SiteLayout";
import HomePage from "@/pages/HomePage";
import ShopPage from "@/pages/ShopPage";
import NewsPage from "@/pages/NewsPage";
import NewsArticlePage from "@/pages/NewsArticlePage";
import CheckoutPage from "@/pages/CheckoutPage";
import ProductDetailPage from "@/pages/ProductDetailPage";
import ContentPage from "@/pages/ContentPage";
import NotFoundPage from "@/pages/NotFoundPage";
import { PATHS } from "@/config/paths";

export default function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path={PATHS.HOME} element={<HomePage />} />
        <Route path={PATHS.SHOP} element={<ShopPage />} />
        <Route path={PATHS.NEWS} element={<NewsPage />} />
        <Route path={PATHS.NEWS_ARTICLE} element={<NewsArticlePage />} />
        <Route path={PATHS.CHECKOUT} element={<CheckoutPage />} />
        <Route path={PATHS.PRODUCT} element={<ProductDetailPage />} />
        <Route path="/san-pham" element={<Navigate to={PATHS.SHOP} replace />} />
        <Route path="/:slug" element={<ContentPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
