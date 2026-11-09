import { useEffect, useRef, useState } from "react";
import { FiSearch, FiSliders, FiX } from "react-icons/fi";
import { useSearchParams } from "react-router-dom";
import ProductCard from "@/components/ProductCard";
import { catalogProducts } from "@/apis/product.service";
import { useProducts } from "@/hooks/data/useProductHooks";
import type { ProductBodyArea, ProductCategory, ProductSkinType } from "@/types/Product";

type CategoryFilter = ProductCategory | "all";
type SortOrder = "featured" | "bestSeller" | "newest" | "priceAsc" | "priceDesc";
const formatPrice = (value: number) => `${new Intl.NumberFormat("vi-VN").format(value)} ₫`;

import { useCmsContent } from "@/hooks/data/useCmsContent";

export default function ShopPage() {
  const cms = useCmsContent("shop");
  const content = cms.data?.content;
  const hero = content?.shopHero;
  const catalog = content ? catalogProducts(content) : [];
  const SKIN_TYPES = [...new Set(catalog.flatMap(product => product.skinTypes || []))].map(value => ({ value, label: value }));
  const BODY_AREAS: { value: ProductBodyArea; label: string }[] = [];
  const concerns = [...new Set(catalog.map(product => product.concern).filter(Boolean))];
  const MAX_PRICE = Math.ceil(Math.max(0, ...catalog.map(product => product.price)) / 50000) * 50000;
  const categories = [{ value: "all", label: "Tất cả" }, ...(content?.productTypes || []).map(type => ({ value: type.code, label: type.name }))];
  const collections = (content?.productLines || []).map(line => ({ id: line.slug || line.code, name: line.name }));
  const [params, setParams] = useSearchParams();
  const requestedCategory = params.get("category");
  const category: CategoryFilter = categories.find((item) => item.value === requestedCategory)?.value ?? "all";
  const skinType = SKIN_TYPES.find((item) => item.value === params.get("skin"))?.value;
  const bodyArea = BODY_AREAS.find((item) => item.value === params.get("area"))?.value;
  const collection = collections.find((item) => item.id === params.get("collection"));
  const [draftCollection, setDraftCollection] = useState(collection?.id ?? "");
  const [draftCategory, setDraftCategory] = useState<CategoryFilter>(category);
  const [draftSkinType, setDraftSkinType] = useState<ProductSkinType | "">(skinType ?? "");
  const [draftBodyArea, setDraftBodyArea] = useState<ProductBodyArea | "">(bodyArea ?? "");
  const [search, setSearch] = useState("");
  const concern = params.get("concern") ?? "";
  const [draftConcern, setDraftConcern] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPriceLimit, setMaxPrice] = useState<number | null>(null);
  const maxPrice = maxPriceLimit ?? MAX_PRICE;
  const [draftMinPrice, setDraftMinPrice] = useState(0);
  const [draftMaxPriceLimit, setDraftMaxPrice] = useState<number | null>(null);
  const draftMaxPrice = draftMaxPriceLimit ?? MAX_PRICE;
  const [filterOpen, setFilterOpen] = useState(false);
  const [discountOnly, setDiscountOnly] = useState(false);
  const [draftDiscountOnly, setDraftDiscountOnly] = useState(false);
  const [sort, setSort] = useState<SortOrder>("featured");
  const [draftSort, setDraftSort] = useState<SortOrder>("featured");
  const searchRef = useRef<HTMLInputElement>(null);
  const filterPopoverRef = useRef<HTMLDivElement>(null);
  const filterTriggerRef = useRef<HTMLButtonElement>(null);
  const query = useProducts({ collection: collection?.id, category, skinType, bodyArea, search, concern, minPrice: minPrice || undefined, maxPrice: maxPrice < MAX_PRICE ? maxPrice : undefined, discountOnly, sort });

  useEffect(() => {
    if (params.get("focus") === "search") searchRef.current?.focus();
  }, [params]);

  useEffect(() => {
    if (!filterOpen) return;
    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!filterPopoverRef.current?.contains(event.target as Node)) setFilterOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setFilterOpen(false);
        filterTriggerRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [filterOpen]);

  const changeCategory = (next: CategoryFilter, nextConcern = concern, nextSkin: ProductSkinType | "" = skinType ?? "", nextArea: ProductBodyArea | "" = bodyArea ?? "", nextCollection = collection?.id ?? "") => {
    const newParams = new URLSearchParams(params);
    newParams.delete("focus");
    if (next === "all") newParams.delete("category"); else newParams.set("category", next);
    if (nextConcern) newParams.set("concern", nextConcern); else newParams.delete("concern");
    if (nextSkin) newParams.set("skin", nextSkin); else newParams.delete("skin");
    if (nextArea) newParams.set("area", nextArea); else newParams.delete("area");
    if (nextCollection) newParams.set("collection", nextCollection); else newParams.delete("collection");
    setParams(newParams, { replace: true });
  };

  const clearFilters = () => {
    setSearch("");
    setDraftConcern("");
    setMinPrice(0);
    setMaxPrice(null);
    setDraftMinPrice(0);
    setDraftMaxPrice(null);
    setFilterOpen(false);
    setDiscountOnly(false);
    setDraftDiscountOnly(false);
    setSort("featured");
    setDraftSort("featured");
    setDraftCategory("all");
    setDraftSkinType("");
    setDraftBodyArea("");
    setDraftCollection("");
    changeCategory("all", "", "", "", "");
  };

  const activeFilterCount = Number(Boolean(collection)) + Number(category !== "all") + Number(Boolean(concern)) + Number(Boolean(skinType)) + Number(Boolean(bodyArea)) + Number(minPrice > 0 || maxPrice < MAX_PRICE) + Number(discountOnly) + Number(sort !== "featured");
  const openFilters = () => {
    if (filterOpen) { setFilterOpen(false); return; }
    setDraftCategory(category);
    setDraftSkinType(skinType ?? "");
    setDraftBodyArea(bodyArea ?? "");
    setDraftCollection(collection?.id ?? "");
    setDraftConcern(concern);
    setDraftMinPrice(minPrice);
    setDraftMaxPrice(maxPrice);
    setDraftDiscountOnly(discountOnly);
    setDraftSort(sort);
    setFilterOpen(true);
  };
  const applyFilters = () => {
    changeCategory(draftCategory, draftConcern, draftSkinType, draftBodyArea, draftCollection);
    setMinPrice(draftMinPrice);
    setMaxPrice(draftMaxPrice >= MAX_PRICE ? null : draftMaxPrice);
    setDiscountOnly(draftDiscountOnly);
    setSort(draftSort);
    setFilterOpen(false);
  };

  return (
    <div className="shop-page">
      {hero && <section className="shop-hero"><div className="container-wide shop-hero__inner"><div><p className="eyebrow eyebrow--line">{hero.subtitle}</p><h1>{hero.titleLine1}<br /><em>{hero.titleLine2}</em></h1></div><p>{hero.description}</p></div></section>}

      <section className="section shop-content">
        <div className="container-wide">
          <div className="shop-toolbar" data-template-fixed="shop-toolbar">
            <div className="shop-toolbar-controls">
              <div className="shop-filter-anchor" ref={filterPopoverRef}>
                <button ref={filterTriggerRef} type="button" className="shop-filter-trigger" aria-expanded={filterOpen} aria-controls="shop-filter-popover" onClick={openFilters}>
                  <FiSliders aria-hidden="true" /> Bộ lọc {activeFilterCount > 0 ? <span className="shop-filter-trigger__count">{activeFilterCount}</span> : null}
                </button>
                {filterOpen ? (
                  <div className="shop-filter-popover" id="shop-filter-popover" role="group" aria-label="Bộ lọc sản phẩm">
                    <div className="shop-filter-popover__top"><h2>Lọc sản phẩm</h2><button type="button" aria-label="Đóng bộ lọc" onClick={() => setFilterOpen(false)}><FiX /></button></div>
                    <label className="shop-filter-field">Bộ sưu tập
                      <select value={draftCollection} onChange={(event) => setDraftCollection(event.target.value)}><option value="">Tất cả bộ sưu tập</option>{collections.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select>
                    </label>
                    <label className="shop-filter-field">Danh mục
                      <select value={draftCategory} onChange={(event) => {
                        const next = event.target.value as CategoryFilter;
                        setDraftCategory(next);
                        setDraftSkinType("");
                        if (next !== "all" && next !== "body-care") setDraftBodyArea("");
                      }}>{categories.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</select>
                    </label>
                    {SKIN_TYPES.length > 0 && <label className="shop-filter-field">Loại da
                      <select value={draftSkinType} onChange={(event) => setDraftSkinType(event.target.value as ProductSkinType | "")}><option value="">Tất cả loại da</option>{SKIN_TYPES.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</select>
                    </label>}
                    {BODY_AREAS.length > 0 && <label className="shop-filter-field">Vùng da
                      <select value={draftBodyArea} onChange={(event) => setDraftBodyArea(event.target.value as ProductBodyArea | "")}><option value="">Tất cả vùng da</option>{BODY_AREAS.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</select>
                    </label>}
                    <label className="shop-filter-field">Nhu cầu da
                      <select value={draftConcern} onChange={(event) => setDraftConcern(event.target.value)}><option value="">Tất cả nhu cầu</option>{concerns.map((item) => <option key={item} value={item}>{item}</option>)}</select>
                    </label>
                    <div className="shop-filter-price" role="group" aria-label="Khoảng giá">
                      <strong>Khoảng giá</strong>
                      <label>Giá từ <span>{formatPrice(draftMinPrice)}</span><input type="range" aria-label="Giá tối thiểu" min="0" max={MAX_PRICE} step="1000" value={draftMinPrice} onChange={(event) => setDraftMinPrice(Math.min(Number(event.target.value), draftMaxPrice))} /></label>
                      <label>Đến <span>{formatPrice(draftMaxPrice)}</span><input type="range" aria-label="Giá tối đa" min="0" max={MAX_PRICE} step="1000" value={draftMaxPrice} onChange={(event) => setDraftMaxPrice(Math.max(Number(event.target.value), draftMinPrice))} /></label>
                    </div>
                    <label className="shop-filter-field">Sắp xếp
                      <select value={draftSort} onChange={(event) => setDraftSort(event.target.value as SortOrder)}><option value="featured">Nổi bật</option><option value="bestSeller">Bán chạy</option><option value="newest">Mới nhất</option><option value="priceAsc">Giá thấp đến cao</option><option value="priceDesc">Giá cao đến thấp</option></select>
                    </label>
                    <label className="shop-filter-discount"><input type="checkbox" checked={draftDiscountOnly} onChange={(event) => setDraftDiscountOnly(event.target.checked)} /> Đang giảm giá</label>
                    <div className="shop-filter-actions"><button type="button" onClick={clearFilters}>Xóa bộ lọc</button><button type="button" onClick={applyFilters}>Áp dụng</button></div>
                  </div>
                ) : null}
              </div>
              <div className="shop-sort-buttons" role="group" aria-label="Sắp xếp nhanh">
                {([{ value: "bestSeller", label: "Bán chạy" }, { value: "newest", label: "Mới nhất" }] as const).map(option => <button key={option.value} type="button" className="shop-sort-button" aria-pressed={sort === option.value} onClick={() => { const next = sort === option.value ? "featured" : option.value; setSort(next); setDraftSort(next); }}>{option.label}</button>)}
              </div>
            </div>
            <div className="shop-search">
              <FiSearch aria-hidden="true" />
              <label className="sr-only" htmlFor="product-search">Tìm sản phẩm</label>
              <input ref={searchRef} id="product-search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Tìm theo tên hoặc nhu cầu da" />
              {search ? <button type="button" onClick={() => setSearch("")} aria-label="Xóa tìm kiếm"><FiX /></button> : null}
            </div>
          </div>

          {(collection || category !== "all" || skinType || bodyArea || concern) && <p className="shop-selection-label">Đang xem: {[collection?.name, category !== "all" ? categories.find((item) => item.value === category)?.label : null, SKIN_TYPES.find((item) => item.value === skinType)?.label, BODY_AREAS.find((item) => item.value === bodyArea)?.label, concern].filter(Boolean).join(" · ")}</p>}
          <div className="shop-result-meta" data-template-fixed="shop-result-meta">
            <p aria-live="polite"><FiSliders /> {query.isLoading ? "Đang lọc sản phẩm…" : `${query.data?.length ?? 0} sản phẩm`}</p>
          </div>

          {query.isLoading ? (
            <div className="product-grid" aria-label="Đang tải sản phẩm">{Array.from({ length: 8 }, (_, index) => <div className="product-skeleton" key={index} />)}</div>
          ) : query.isError || cms.isError ? (
            <div className="empty-state" role="alert"><h2>Không thể tải sản phẩm từ CMS</h2><button className="button button--outline" type="button" onClick={() => { void query.refetch(); void cms.refetch(); }}>Thử lại</button></div>
          ) : query.data?.length ? (
            <div className="product-grid product-grid--shop">{query.data.map((product) => <ProductCard key={product.id} product={product} />)}</div>
          ) : (
            <div className="empty-state"><span><FiSearch /></span><h2>{catalog.length ? "Chưa tìm thấy sản phẩm phù hợp" : "Chưa có sản phẩm được xuất bản"}</h2><p>{catalog.length ? "Thử lựa chọn lọc khác hoặc xem lại tất cả sản phẩm PaxMoly." : "Sản phẩm sẽ xuất hiện khi được thêm và xuất bản trong DB của website."}</p><button className="button button--outline" type="button" onClick={clearFilters}>Xem tất cả</button></div>
          )}
        </div>
      </section>
    </div>
  );
}
