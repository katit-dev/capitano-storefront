import { startTransition, useEffect, useOptimistic, useRef, useState } from "react";
import { FiSearch, FiSliders, FiX } from "react-icons/fi";
import { useLocation, useSearchParams } from "react-router-dom";
import ProductCard from "@/components/ProductCard";
import { catalogProducts, filterProducts } from "@/apis/product.service";
import { useCmsContent } from "@/hooks/data/useCmsContent";
import type { ProductBodyArea, ProductCategory, ProductSkinType } from "@/types/Product";

type CategoryFilter = ProductCategory | "all";
const sortOrders = ["featured", "bestSeller", "newest", "priceAsc", "priceDesc"] as const;
type SortOrder = (typeof sortOrders)[number];
type FilterDraft = {
  locationKey: string;
  collection: string;
  category: CategoryFilter;
  skinType: ProductSkinType | "";
  bodyArea: ProductBodyArea | "";
  concern: string;
  minPrice: number;
  maxPrice: number;
  discountOnly: boolean;
  flashSaleOnly: boolean;
  sort: SortOrder;
};
const formatPrice = (value: number) => `${new Intl.NumberFormat("vi-VN").format(value)} ₫`;
const demoBestSellers = new Set(["xit-thom-mieng-fresco", "maxi-baking-soda"]);
const demoPublicationDates = new Map([
  ["1905-huong-chanh", "2026-10-20"],
  ["nuoc-suc-mieng-junior-6-bac-ha", "2026-10-05"],
]);

function readPriceParam(value: string | null) {
  if (!value || !/^\d+$/.test(value)) return undefined;
  const price = Number(value);
  return Number.isSafeInteger(price) ? price : undefined;
}

export default function ShopPage() {
  const cms = useCmsContent("shop");
  const content = cms.data?.content;
  const hero = content?.shopHero;
  const catalog = content ? catalogProducts(content) : [];
  const SKIN_TYPES = [...new Set(catalog.flatMap(product => product.skinTypes || []))].map(value => ({ value, label: value }));
  const BODY_AREAS: { value: ProductBodyArea; label: string }[] = [];
  const concerns = [...new Set(catalog.flatMap(product => [product.concern, ...(product.careNeeds ?? [])]).filter(Boolean))];
  const MAX_PRICE = Math.ceil(Math.max(0, ...catalog.map(product => product.price)) / 50000) * 50000;
  const categories = [{ value: "all", label: "Tất cả" }, ...(content?.productTypes || []).map(type => ({ value: type.code, label: type.name }))];
  const collections = content?.productLines ?? [];
  const location = useLocation();
  const [params, setParams] = useSearchParams();
  const requestedCategory = params.get("category");
  const category: CategoryFilter = categories.find((item) => item.value === requestedCategory)?.value ?? "all";
  const skinType = SKIN_TYPES.find((item) => item.value === params.get("skin"))?.value;
  const bodyArea = BODY_AREAS.find((item) => item.value === params.get("area"))?.value;
  const requestedCollection = params.get("collection");
  const collection = requestedCollection
    ? collections.find(line => [line.id, line.slug, line.code].includes(requestedCollection))
    : undefined;
  const search = params.get("q") ?? "";
  const [searchInput, setSearchInput] = useOptimistic(search);
  const concern = params.get("concern") ?? "";
  const minPrice = Math.min(readPriceParam(params.get("minPrice")) ?? 0, MAX_PRICE);
  const maxPrice = Math.max(minPrice, Math.min(readPriceParam(params.get("maxPrice")) ?? MAX_PRICE, MAX_PRICE));
  const discountOnly = params.get("discount") === "1";
  const flashSaleOnly = params.get("flashSale") === "1";
  const sort = sortOrders.find(order => order === params.get("sort")) ?? "featured";
  const focusSearch = params.get("focus") === "search";
  const [draft, setDraft] = useState<FilterDraft | null>(null);
  if (draft && draft.locationKey !== location.key) setDraft(null);
  const filterOpen = draft?.locationKey === location.key;
  const searchRef = useRef<HTMLInputElement>(null);
  const filterPopoverRef = useRef<HTMLDivElement>(null);
  const filterTriggerRef = useRef<HTMLButtonElement>(null);
  const missingSortData = (sort === "bestSeller" && !catalog.some(product => product.isBestSeller))
    || (sort === "newest" && !catalog.some(product => Number.isFinite(Date.parse(product.publishedAt ?? ""))));
  const showDemoSort = cms.isLocal && missingSortData;
  const sortContent = content && showDemoSort ? {
    ...content,
    products: content.products?.map(product => sort === "bestSeller"
      ? { ...product, isBestSeller: demoBestSellers.has(product.slug) }
      : { ...product, publishedAt: demoPublicationDates.get(product.slug) }),
  } : content;
  const products = sortContent ? filterProducts(sortContent, {
    collection: collection?.id, category, skinType, bodyArea, search, concern,
    minPrice: minPrice || undefined, maxPrice: maxPrice < MAX_PRICE ? maxPrice : undefined,
    discountOnly, flashSaleOnly, sort: missingSortData && !showDemoSort ? "featured" : sort,
  }) : [];
  const sortAvailabilityMessage = missingSortData && !showDemoSort && catalog.length > 0
    ? "Chưa có dữ liệu cho cách sắp xếp này." : "";

  useEffect(() => {
    if (focusSearch) searchRef.current?.focus();
  }, [focusSearch, location.key]);

  useEffect(() => {
    if (!filterOpen) return;
    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!filterPopoverRef.current?.contains(event.target as Node)) setDraft(null);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setDraft(null);
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

  const updateFilters = (changes: Record<string, string>, replace = false) => {
    const next = new URLSearchParams(params);
    next.delete("focus");
    for (const [key, value] of Object.entries(changes)) {
      if (value) next.set(key, value);
      else next.delete(key);
    }
    if (replace || next.toString() !== params.toString()) setParams(next, { replace, preventScrollReset: true });
  };

  const changeSearch = (value: string) => {
    startTransition(() => {
      setSearchInput(value);
      updateFilters({ q: value }, true);
    });
  };

  const clearFilters = () => {
    setDraft(null);
    if (params.size) setParams(new URLSearchParams(), { preventScrollReset: true });
  };

  const activeFilterCount = Number(Boolean(collection)) + Number(category !== "all")
    + Number(Boolean(concern)) + Number(Boolean(skinType)) + Number(Boolean(bodyArea))
    + Number(minPrice > 0 || maxPrice < MAX_PRICE) + Number(discountOnly)
    + Number(flashSaleOnly) + Number(sort !== "featured");
  const openFilters = () => {
    if (filterOpen) {
      setDraft(null);
      return;
    }
    setDraft({
      locationKey: location.key,
      collection: collection?.slug || collection?.code || collection?.id || "",
      category,
      skinType: skinType ?? "",
      bodyArea: bodyArea ?? "",
      concern,
      minPrice,
      maxPrice,
      discountOnly,
      flashSaleOnly,
      sort,
    });
  };
  const applyFilters = (selection: FilterDraft) => {
    updateFilters({
      category: selection.category === "all" ? "" : selection.category,
      collection: selection.collection,
      concern: selection.concern,
      skin: selection.skinType,
      area: selection.bodyArea,
      minPrice: selection.minPrice > 0 ? String(selection.minPrice) : "",
      maxPrice: selection.maxPrice < MAX_PRICE ? String(selection.maxPrice) : "",
      discount: selection.discountOnly ? "1" : "",
      flashSale: selection.flashSaleOnly ? "1" : "",
      sort: selection.sort === "featured" ? "" : selection.sort,
    });
    setDraft(null);
  };

  return (
    <div className={cms.isLocal ? "shop-page shop-page--local" : "shop-page"}>
      {hero && <section className="shop-hero"><div className="container-wide shop-hero__inner"><div><p className="eyebrow eyebrow--line">{hero.subtitle}</p><h1>{hero.titleLine1}{hero.titleLine2 && <><br /><em>{hero.titleLine2}</em></>}</h1></div><p>{hero.description}</p></div></section>}

      <section className="section shop-content">
        <div className="container-wide">
          <div className="shop-toolbar" data-template-fixed="shop-toolbar">
            <div className="shop-toolbar-controls">
              <div className="shop-filter-anchor" ref={filterPopoverRef}>
                <button ref={filterTriggerRef} type="button" className="shop-filter-trigger" aria-expanded={filterOpen} aria-controls="shop-filter-popover" disabled={cms.isLoading} onClick={openFilters}>
                  <FiSliders aria-hidden="true" /> Bộ lọc {activeFilterCount > 0 ? <span className="shop-filter-trigger__count">{activeFilterCount}</span> : null}
                </button>
                {filterOpen ? (
                  <div className="shop-filter-popover" id="shop-filter-popover" role="group" aria-labelledby="shop-filter-title">
                    <div className="shop-filter-popover__top">
                      <h2 id="shop-filter-title">Lọc sản phẩm</h2>
                      <button type="button" aria-label="Đóng bộ lọc" onClick={() => {
                        setDraft(null);
                        filterTriggerRef.current?.focus();
                      }}><FiX aria-hidden="true" /></button>
                    </div>
                    <div className="shop-filter-popover__body">
                      <label className="shop-filter-field">Dòng sản phẩm
                        <select value={draft.collection} onChange={(event) => setDraft({ ...draft, collection: event.target.value })}>
                          <option value="">Tất cả dòng sản phẩm</option>
                          {collections.map(line => <option key={line.id} value={line.slug || line.code || line.id}>{line.name}</option>)}
                        </select>
                      </label>
                      <label className="shop-filter-field">Danh mục
                        <select value={draft.category} onChange={(event) => {
                          const category = event.target.value;
                          setDraft({
                            ...draft,
                            category,
                            skinType: "",
                            bodyArea: category === "all" || category === "body-care" ? draft.bodyArea : "",
                          });
                        }}>
                          {categories.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
                        </select>
                      </label>
                      {SKIN_TYPES.length > 0 && <label className="shop-filter-field">Loại da
                        <select value={draft.skinType} onChange={(event) => setDraft({ ...draft, skinType: event.target.value })}>
                          <option value="">Tất cả loại da</option>
                          {SKIN_TYPES.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
                        </select>
                      </label>}
                      {BODY_AREAS.length > 0 && <label className="shop-filter-field">Vùng da
                        <select value={draft.bodyArea} onChange={(event) => setDraft({ ...draft, bodyArea: event.target.value as ProductBodyArea | "" })}>
                          <option value="">Tất cả vùng da</option>
                          {BODY_AREAS.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
                        </select>
                      </label>}
                      {concerns.length > 0 && <label className="shop-filter-field">Nhu cầu răng miệng
                        <select value={draft.concern} onChange={(event) => setDraft({ ...draft, concern: event.target.value })}>
                          <option value="">Tất cả nhu cầu</option>
                          {concerns.map((item) => <option key={item} value={item}>{item}</option>)}
                        </select>
                      </label>}
                      <div className="shop-filter-price" role="group" aria-label="Khoảng giá">
                        <strong>Khoảng giá</strong>
                        <label>Giá từ <span>{formatPrice(draft.minPrice)}</span>
                          <input
                            type="range" aria-label="Giá tối thiểu" min="0" max={MAX_PRICE} step="1000" value={draft.minPrice}
                            onChange={(event) => setDraft({ ...draft, minPrice: Math.min(Number(event.target.value), draft.maxPrice) })}
                          />
                        </label>
                        <label>Đến <span>{formatPrice(draft.maxPrice)}</span>
                          <input
                            type="range" aria-label="Giá tối đa" min="0" max={MAX_PRICE} step="1000" value={draft.maxPrice}
                            onChange={(event) => setDraft({ ...draft, maxPrice: Math.max(Number(event.target.value), draft.minPrice) })}
                          />
                        </label>
                      </div>
                      <label className="shop-filter-field">Sắp xếp
                        <select
                          value={draft.sort}
                          aria-describedby={sortAvailabilityMessage ? "shop-sort-availability" : undefined}
                          onChange={(event) => setDraft({ ...draft, sort: event.target.value as SortOrder })}
                        >
                          <option value="featured">Nổi bật</option>
                          <option value="bestSeller">Bán chạy</option>
                          <option value="newest">Mới nhất</option>
                          <option value="priceAsc">Giá thấp đến cao</option>
                          <option value="priceDesc">Giá cao đến thấp</option>
                        </select>
                      </label>
                      <label className="shop-filter-discount">
                        <input type="checkbox" checked={draft.discountOnly} onChange={(event) => setDraft({ ...draft, discountOnly: event.target.checked })} /> Đang giảm giá
                      </label>
                      <label className="shop-filter-discount">
                        <input
                          type="checkbox"
                          checked={draft.flashSaleOnly}
                          onChange={(event) => setDraft({ ...draft, flashSaleOnly: event.target.checked })}
                        /> Đang Flash Sale
                      </label>
                    </div>
                    <div className="shop-filter-actions">
                      <button type="button" onClick={clearFilters}>Xóa bộ lọc</button>
                      <button type="button" onClick={() => applyFilters(draft)}>Áp dụng</button>
                    </div>
                  </div>
                ) : null}
              </div>
              <button
                type="button"
                className="shop-flash-sale-button"
                aria-pressed={flashSaleOnly}
                onClick={() => updateFilters({ flashSale: flashSaleOnly ? "" : "1" })}
              >Flash Sale</button>
            </div>
            <div className="shop-search">
              <FiSearch aria-hidden="true" />
              <label className="sr-only" htmlFor="product-search">Tìm sản phẩm</label>
              <input ref={searchRef} id="product-search" value={searchInput} onChange={(event) => changeSearch(event.target.value)} placeholder="Tìm theo tên hoặc mã sản phẩm" />
              {searchInput ? <button type="button" onClick={() => changeSearch("")} aria-label="Xóa tìm kiếm"><FiX /></button> : null}
            </div>
          </div>
          {sortAvailabilityMessage && <p id="shop-sort-availability" className="shop-sort-note">{sortAvailabilityMessage}</p>}

          {(collection || category !== "all" || skinType || bodyArea || concern) && <p className="shop-selection-label">Đang xem: {[collection?.name, category !== "all" ? categories.find((item) => item.value === category)?.label : null, SKIN_TYPES.find((item) => item.value === skinType)?.label, BODY_AREAS.find((item) => item.value === bodyArea)?.label, concern].filter(Boolean).join(" · ")}</p>}
          <div className="shop-result-meta" data-template-fixed="shop-result-meta">
            <p aria-live="polite"><FiSliders /> {cms.isLoading ? "Đang lọc sản phẩm…" : `${products.length} sản phẩm`}</p>
          </div>

          {cms.isLoading ? (
            <div className="product-grid" aria-label="Đang tải sản phẩm">{Array.from({ length: 8 }, (_, index) => <div className="product-skeleton" key={index} />)}</div>
          ) : cms.isError ? (
            <div className="empty-state" role="alert"><h2>Không thể tải sản phẩm</h2><button className="button button--outline" type="button" onClick={() => void cms.refetch()}>Thử lại</button></div>
          ) : products.length ? (
            <div className="product-grid product-grid--shop">
              {products.map(product => <ProductCard key={product.id} product={product} />)}
            </div>
          ) : (
            <div className="empty-state"><span><FiSearch /></span><h2>{catalog.length ? "Chưa tìm thấy sản phẩm phù hợp" : "Chưa có sản phẩm được xuất bản"}</h2><p>{catalog.length ? "Thử lựa chọn lọc khác hoặc xem lại tất cả sản phẩm Capitano." : "Sản phẩm sẽ xuất hiện khi được thêm và xuất bản trong DB của website."}</p><button className="button button--outline" type="button" onClick={clearFilters}>Xem tất cả</button></div>
          )}
        </div>
      </section>
    </div>
  );
}
