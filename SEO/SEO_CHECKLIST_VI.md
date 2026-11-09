# Checklist tiêu chuẩn SEO

**Mã tài liệu:** SEO-CHK-001  
**Phiên bản:** 1.0  
**Ngày cập nhật:** 23/09/2026  
**Phạm vi:** Website thương hiệu, nội dung và thương mại điện tử  
**Tài liệu gốc:** [Quy chuẩn SEO dùng chung](./SEO_STANDARD_VI.md)  
**Áp dụng cho dự án:** [Chiến lược SEO PaxMoly](./SEO_PAXMOLY_VI.md)

---

## Cách sử dụng

- **P0 — Bắt buộc:** Không được release nếu chưa đạt hoặc chưa có ngoại lệ được phê duyệt.
- **P1 — Quan trọng:** Nên hoàn thành trước release; nếu chưa hoàn thành phải có owner và deadline.
- **P2 — Tối ưu:** Thực hiện sau khi nền tảng crawl, index và đo lường đã ổn định.
- Mỗi mục chỉ được đánh dấu hoàn tất khi đã kiểm tra trên URL production hoặc môi trường giống production.
- Không xem Lighthouse, schema hay một lần tìm kiếm thủ công là bằng chứng duy nhất.

---

## 1. Domain, HTTPS và môi trường — P0

- [ ] Chốt domain production và host chuẩn: `www` hoặc non-`www`.
- [ ] Toàn bộ website sử dụng HTTPS với chứng chỉ hợp lệ.
- [ ] HTTP chuyển hướng `301/308` về HTTPS.
- [ ] Host phụ chuyển hướng một bước về host chuẩn.
- [ ] Không tồn tại chuỗi redirect hoặc redirect loop.
- [ ] Domain production không còn placeholder, localhost hoặc URL staging.
- [ ] Preview/staging được bảo vệ bằng xác thực hoặc network restriction.
- [ ] Preview/staging không xuất hiện trong sitemap, canonical hoặc Search Console production.
- [ ] Không để cả domain riêng và domain hosting cùng được index như hai website độc lập.

## 2. Crawl, render và HTTP status — P0

- [ ] Nội dung chính, heading, link và metadata có trong HTML ban đầu hoặc được SSR/prerender.
- [ ] Googlebot không bị chặn khỏi JavaScript, CSS và ảnh cần thiết.
- [ ] URL hợp lệ trả `200`.
- [ ] URL đã chuyển vĩnh viễn trả `301/308` đến đúng trang tương đương.
- [ ] URL không tồn tại trả `404/410`, không trả `200` với giao diện báo lỗi.
- [ ] Trang 404 có `noindex` hoặc status code 404 thật.
- [ ] Tải trực tiếp và refresh mọi route sâu đều hoạt động.
- [ ] Link điều hướng sử dụng thẻ `<a href>` có URL crawlable.
- [ ] Không yêu cầu click, scroll hoặc đăng nhập để tải nội dung SEO chính.
- [ ] URL Inspection/Rich Results Test nhìn thấy đúng nội dung sau render.

## 3. Robots và sitemap — P0

- [ ] Có `/robots.txt` trên production.
- [ ] `robots.txt` không chặn nhầm toàn site hoặc tài nguyên render quan trọng.
- [ ] `robots.txt` khai báo URL tuyệt đối của sitemap.
- [ ] Có `/sitemap.xml` hoặc sitemap index hợp lệ.
- [ ] Sitemap chỉ chứa URL canonical, indexable và trả `200`.
- [ ] Không đưa URL search, filter, cart, checkout, account, staging hoặc redirect vào sitemap.
- [ ] `lastmod` chỉ thay đổi khi nội dung chính thực sự được cập nhật.
- [ ] Sitemap đã được submit và fetch thành công trong Google Search Console.

## 4. Canonical và URL — P0

- [ ] Mỗi trang indexable có đúng một canonical tuyệt đối HTTPS.
- [ ] Canonical tự trỏ trừ khi có chiến lược gom duplicate rõ ràng.
- [ ] Canonical trỏ đến URL trả `200`, indexable và không redirect.
- [ ] Canonical, sitemap, internal link và Open Graph dùng cùng một URL chuẩn.
- [ ] Query tracking như `utm_*`, `gclid` canonical về URL sạch.
- [ ] URL filter/search không có giá trị độc lập được `noindex` hoặc canonical đúng chiến lược.
- [ ] Slug ngắn, có nghĩa, dùng chữ thường và dấu gạch ngang.
- [ ] Không tạo nhiều URL cho cùng một nội dung.
- [ ] Redirect cũ–mới được lập bản đồ khi đổi slug hoặc migration.

## 5. Metadata — P0

- [ ] Mỗi trang indexable có `<title>` duy nhất và mô tả đúng intent.
- [ ] Mỗi trang quan trọng có meta description riêng.
- [ ] Title, H1 và nội dung chính nhất quán nhưng không cần giống hệt nhau.
- [ ] Không nhồi từ khóa hoặc lặp tên thương hiệu máy móc.
- [ ] Có `lang` đúng trên thẻ `<html>`.
- [ ] Có Open Graph: `og:type`, `og:site_name`, `og:title`, `og:description`, `og:url`, `og:image`.
- [ ] Có `twitter:card` phù hợp.
- [ ] Ảnh social dùng URL tuyệt đối, truy cập công khai và có tỷ lệ phù hợp.
- [ ] Trang không index có robots meta rõ ràng.

## 6. Cấu trúc trang và semantic HTML — P0

- [ ] Mỗi trang có một H1 mô tả nội dung chính.
- [ ] Heading theo thứ bậc logic, không dùng chỉ để tạo kiểu chữ.
- [ ] Có `main`, `header`, `nav`, `section`, `article`, `footer` phù hợp.
- [ ] Breadcrumb hiển thị trên trang sâu và liên kết được.
- [ ] Nội dung quan trọng là text thật trong DOM, không nằm trong ảnh hoặc CSS pseudo-element.
- [ ] Anchor text mô tả đúng trang đích.
- [ ] Các trang quan trọng truy cập được trong tối đa khoảng ba lần click từ trang chủ.
- [ ] Không có orphan page.
- [ ] Trang danh mục và sản phẩm liên kết qua lại hợp lý.

## 7. Nội dung và search intent — P1

- [ ] Mỗi trang có một intent chính và một URL đích ưu tiên.
- [ ] Keyword map không để nhiều trang cạnh tranh cùng một intent.
- [ ] Nội dung trả lời đúng nhu cầu người dùng, không viết chỉ để đạt số từ.
- [ ] Thông tin thương hiệu, sản phẩm, thành phần và công dụng có thể kiểm chứng.
- [ ] Claim y tế hoặc hiệu quả không vượt quá bằng chứng và phạm vi mỹ phẩm.
- [ ] Bài chuyên môn có tác giả, người kiểm duyệt và nguồn tham khảo khi cần.
- [ ] Có ngày xuất bản/cập nhật thật; không đổi ngày khi nội dung không thay đổi.
- [ ] Nội dung AI phải được kiểm tra fact, biên tập và bổ sung giá trị riêng.
- [ ] Không tạo hàng loạt trang mỏng chỉ để phủ biến thể từ khóa.
- [ ] Nội dung cũ được review, cập nhật, merge hoặc redirect theo chu kỳ.

## 8. Structured data — P1

- [ ] JSON-LD phản ánh đúng nội dung người dùng nhìn thấy.
- [ ] Trang chủ có `WebSite` và `Organization` hợp lệ.
- [ ] `name`, `alternateName`, logo, URL và `sameAs` sử dụng dữ liệu thật.
- [ ] Trang sản phẩm có `Product` và `Offer` với giá, tiền tệ, tình trạng hàng đúng dữ liệu hiển thị.
- [ ] Trang sâu có `BreadcrumbList` khớp breadcrumb UI.
- [ ] ID entity dùng URL tuyệt đối ổn định.
- [ ] Không khai báo review, rating, giá hoặc tồn kho giả.
- [ ] Không thêm schema không liên quan chỉ để tìm rich result.
- [ ] Không có critical error trong Rich Results Test và Schema Markup Validator.

## 9. Ecommerce SEO — P0/P1

- [ ] Mỗi sản phẩm có URL riêng, tên, mô tả, ảnh, giá và trạng thái hàng.
- [ ] Giá hiển thị, giá trong schema và giá thanh toán nhất quán.
- [ ] Giá giảm có giá hiện tại, giá gốc và thời hạn/chính sách rõ ràng khi áp dụng.
- [ ] Variant có chiến lược URL/canonical rõ ràng.
- [ ] Hết hàng tạm thời vẫn giữ URL và cập nhật `availability`.
- [ ] Sản phẩm ngừng bán có sản phẩm thay thế thì redirect đến trang tương đương.
- [ ] Không redirect mọi sản phẩm ngừng bán về trang chủ.
- [ ] Filter/facet không tạo không giới hạn URL indexable.
- [ ] Product feed/Merchant Center đồng bộ nếu được sử dụng.
- [ ] Review chỉ hiển thị khi có dữ liệu thật và chính sách kiểm duyệt rõ ràng.

## 10. Hình ảnh và media — P1

- [ ] Ảnh có tên file mô tả được nội dung.
- [ ] Ảnh có `alt` phù hợp; ảnh trang trí dùng `alt=""`.
- [ ] Khai báo kích thước hoặc aspect ratio để tránh layout shift.
- [ ] Dùng WebP/AVIF hoặc định dạng tối ưu khi phù hợp.
- [ ] Có `srcset`/`sizes` cho ảnh responsive quan trọng.
- [ ] Hero/LCP image không lazy-load và được ưu tiên hợp lý.
- [ ] Ảnh dưới màn hình đầu được lazy-load.
- [ ] Không nhúng text quan trọng duy nhất vào hình ảnh.
- [ ] Video có title, mô tả, thumbnail và transcript/caption khi cần.

## 11. Performance và Core Web Vitals — P1

- [ ] LCP ở percentile 75 ≤ 2,5 giây.
- [ ] INP ở percentile 75 ≤ 200 mili giây.
- [ ] CLS ở percentile 75 ≤ 0,1.
- [ ] Không có ảnh hoặc font gây layout shift đáng kể.
- [ ] JavaScript được chia theo route/feature khi hợp lý.
- [ ] Font quan trọng có chiến lược preload và `font-display` phù hợp.
- [ ] Third-party script được kiểm soát và không chặn luồng chính không cần thiết.
- [ ] Cache header và CDN được cấu hình cho static asset.
- [ ] Đo cả field data; không chỉ dựa vào Lighthouse lab.

## 12. Mobile, accessibility và UX — P0/P1

- [ ] Nội dung và chức năng chính tương đương giữa mobile và desktop.
- [ ] Không có horizontal scroll ngoài chủ đích.
- [ ] Text có kích thước đọc được và không bị cắt khi zoom.
- [ ] Touch target đủ lớn và có khoảng cách phù hợp.
- [ ] Focus state hiển thị rõ; thao tác chính dùng được bằng bàn phím.
- [ ] Icon-only button có accessible name.
- [ ] Màu chữ và UI đạt contrast phù hợp.
- [ ] Form có label, thông báo lỗi rõ và trạng thái thành công.
- [ ] Animation tôn trọng `prefers-reduced-motion`.
- [ ] Banner, popup và sticky element không che nội dung chính.

## 13. Trust và thương hiệu — P1

- [ ] Tên thương hiệu được viết nhất quán trên toàn site.
- [ ] Có trang Giới thiệu, Liên hệ và thông tin đơn vị vận hành.
- [ ] Có chính sách giao hàng, đổi trả, thanh toán và quyền riêng tư.
- [ ] Email, số điện thoại, địa chỉ và social profile là dữ liệu thật.
- [ ] Website chính thức/nhà phân phối/đối tác liên kết đúng domain production khi có thể.
- [ ] Logo và hình ảnh thương hiệu là tài sản được phép sử dụng.
- [ ] Không tạo testimonial, đánh giá hoặc chứng nhận giả.
- [ ] Nếu có địa điểm hợp lệ, Google Business Profile dùng thông tin nhất quán.

## 14. Analytics và Search Console — P0/P1

- [ ] Xác minh Domain Property trong Google Search Console.
- [ ] Kết nối GA4 bằng tài khoản thuộc quyền sở hữu của doanh nghiệp.
- [ ] Không gửi PII vào URL, analytics hoặc schema.
- [ ] Ecommerce event dùng tên và dữ liệu nhất quán.
- [ ] `purchase` chỉ gửi sau khi backend xác nhận giao dịch.
- [ ] Theo dõi clicks, impressions, CTR và average position theo query/page/country/device.
- [ ] Theo dõi index coverage, Core Web Vitals, manual actions và security issues.
- [ ] Có annotation khi release, migration hoặc thay đổi lớn.
- [ ] Dashboard tách brand và non-brand.
- [ ] Có owner xử lý cảnh báo và lịch review định kỳ.

## 15. Checklist riêng khi deploy Vercel — P0

- [ ] Build command, output directory và Node version đúng với project.
- [ ] React Router có rewrite/fallback để route sâu không trả 404 khi refresh.
- [ ] Custom domain được gắn và đặt làm production domain.
- [ ] Domain `*.vercel.app` không cạnh tranh index với custom domain.
- [ ] Canonical luôn trỏ về production domain, không trỏ về deployment preview.
- [ ] Preview deployment không được index.
- [ ] Redirect `www`/non-`www` và HTTPS không tạo nhiều bước.
- [ ] Environment variable production không chứa localhost/staging.
- [ ] Security headers và cache headers được kiểm tra trên response thật.
- [ ] Test trực tiếp `/`, danh mục, sản phẩm, URL 404, `robots.txt` và `sitemap.xml` sau deploy.

## 16. Quality gate trước release

### Chặn release — P0

- [ ] Không có `noindex` hoặc robots rule chặn nhầm production.
- [ ] Không có canonical trỏ về localhost, staging hoặc sai host.
- [ ] Không có sitemap chứa URL staging/preview.
- [ ] Không có route quan trọng trả 404/500 hoặc soft 404.
- [ ] Không có metadata mặc định dùng chung cho toàn bộ trang indexable.
- [ ] Không có dữ liệu giá, tồn kho, review hoặc schema sai sự thật.
- [ ] Không có regression nghiêm trọng trên mobile hoặc checkout.

### Có thể release với owner và deadline — P1

- [ ] Core Web Vitals chưa đạt nhưng không có regression lớn.
- [ ] Thiếu một số social image hoặc metadata phụ.
- [ ] Internal link hoặc alt text còn thiếu ở URL ít quan trọng.
- [ ] Schema có warning nhưng không có critical error và dữ liệu vẫn đúng.

## 17. Kiểm tra sau release

### Trong 24 giờ

- [ ] Crawl smoke test các URL đại diện.
- [ ] Kiểm tra status, canonical, robots, sitemap và rendered HTML.
- [ ] Kiểm tra analytics nhận page view/event đúng.
- [ ] Submit sitemap và request index URL cốt lõi.
- [ ] Kiểm tra log lỗi, console và response 4xx/5xx.

### Sau 7 ngày

- [ ] Kiểm tra Pages/Indexing trong Search Console.
- [ ] Kiểm tra Google-selected canonical.
- [ ] Kiểm tra query thương hiệu và landing page tương ứng.
- [ ] Kiểm tra structured data report.
- [ ] So sánh impressions/clicks với baseline.

### Sau 28 ngày

- [ ] So sánh clicks, impressions, CTR và position với 28 ngày trước.
- [ ] Kiểm tra cannibalization và query có impression nhưng CTR thấp.
- [ ] Review Core Web Vitals field data.
- [ ] Ưu tiên tối ưu trang đã có impression trước khi tạo thêm hàng loạt nội dung.
- [ ] Ghi nhận bài học và cập nhật backlog SEO.

## 18. KPI tối thiểu cho PaxMoly

- [ ] Trang chủ là landing page chính cho `paxmoly`.
- [ ] Theo dõi riêng `paxmoly`, `pax moly`, `paxmoly vietnam` và `paxmolly`.
- [ ] Mục tiêu `paxmoly`: average position ≤ 5 tại Việt Nam trong 28 ngày liên tục.
- [ ] Không tuyên bố đạt top 5/top 10 nếu query chưa có impression đủ để đánh giá.
- [ ] Báo cáo đồng thời position, impressions, clicks và CTR.
- [ ] Theo dõi riêng brand và non-brand.
- [ ] Review hằng tuần trong 90 ngày đầu sau index; sau đó review hằng tháng.

---

## Mẫu kết luận nghiệm thu

```text
Ngày kiểm tra:
Phiên bản/release:
Domain production:
Người kiểm tra:

P0 đạt: __ / __
P1 đạt: __ / __
P2/backlog:

Các mục chặn release:
1.

Ngoại lệ được phê duyệt:
1. Mục vi phạm:
   Lý do:
   Owner:
   Người phê duyệt:
   Ngày hết hạn:

Kết luận: PASS / PASS CÓ ĐIỀU KIỆN / FAIL
```
