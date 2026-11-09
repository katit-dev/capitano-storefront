# Tài liệu chiến lược và triển khai SEO cho PaxMoly Vietnam

**Phiên bản:** 1.0  
**Ngày audit:** 23/09/2026  
**Phạm vi:** Website PaxMoly storefront hiện tại — React 19, Vite 7, React Router 7  
**Đối tượng sử dụng:** Marketing, Content, Design, Frontend, Backend và đơn vị vận hành thương mại điện tử

> Tài liệu này là bản áp dụng riêng cho PaxMoly và phải tuân theo [Quy chuẩn SEO dùng chung](./SEO_STANDARD_VI.md). Khi hai tài liệu khác nhau, quy chuẩn dùng chung là baseline; mọi ngoại lệ của dự án phải được ghi nhận, có người phê duyệt và ngày hết hạn.

> Dùng [Checklist tiêu chuẩn SEO](./SEO_CHECKLIST_VI.md) để nghiệm thu trước và sau mỗi lần release.

---

## 1. Tóm tắt điều hành

Website PaxMoly hiện có nền tảng nội dung và trải nghiệm khá tốt để phát triển SEO:

- Có URL riêng cho cửa hàng và từng sản phẩm.
- Nội dung tiếng Việt tập trung vào serum, mặt nạ, hoạt chất và nhu cầu da.
- Trang chủ, cửa hàng và trang sản phẩm đều có một `h1` rõ ràng.
- Tên sản phẩm, mô tả, thành phần và lợi ích đã được tách thành dữ liệu có cấu trúc trong source.
- Hầu hết ảnh sản phẩm chính đã có `alt` mô tả.
- Internal link giữa danh mục, sản phẩm và sản phẩm liên quan đã tồn tại.

Tuy nhiên, website hiện vẫn là **SPA render phía client** và chỉ có một bộ metadata tĩnh trong `index.html`. Vì vậy, mọi route đang dùng chung title và meta description; chưa có canonical, Open Graph, sitemap, robots.txt, structured data, status 404 thật hoặc HTML được render sẵn cho từng sản phẩm.

### Mục tiêu ưu tiên

1. Làm cho mỗi URL sản phẩm có HTML, title, description và canonical riêng ngay từ response đầu tiên.
2. Giúp Google hiểu đây là website chính thức của PaxMoly Vietnam và hiểu rõ từng sản phẩm.
3. Xây dựng topical authority quanh hoạt chất và nhu cầu chăm sóc da, không tạo nội dung hàng loạt chỉ để phủ từ khóa.
4. Đảm bảo các tuyên bố mỹ phẩm chính xác, có nguồn và không biến nội dung SEO thành lời hứa điều trị.
5. Đo lường được organic traffic → xem sản phẩm → thêm giỏ → thanh toán.

### Kết luận ngắn

SEO hiện tại chưa gặp vấn đề vì nội dung kém; vấn đề chính là **cách phân phối nội dung cho crawler và thiếu metadata theo route**. Ưu tiên cao nhất là prerender/SSR, metadata động, sitemap, canonical và schema sản phẩm. Content marketing chỉ nên mở rộng mạnh sau khi nền tảng kỹ thuật này hoàn tất.

### 1.1. North Star SEO: top 5 cho truy vấn thương hiệu

Mục tiêu ưu tiên số một của dự án là đưa **trang chủ PaxMoly Vietnam vào top 5 kết quả tự nhiên tại Google Việt Nam** cho nhóm truy vấn thương hiệu:

- `paxmoly` — cách viết chính thức, ưu tiên cao nhất.
- `pax moly` — biến thể có khoảng trắng.
- `paxmoly vietnam` — truy vấn thương hiệu theo thị trường.
- `paxmolly` — biến thể người dùng thường gõ sai, chỉ dùng để theo dõi và giải đáp tự nhiên; không đổi tên thương hiệu và không nhồi lỗi chính tả trên website.

Đây là **mục tiêu kinh doanh**, không phải cam kết thứ hạng. Google tự quyết định crawl, index và xếp hạng; vị trí còn thay đổi theo thời gian, vị trí địa lý, thiết bị và lịch sử tìm kiếm. Mục tiêu chỉ được xem là đạt khi thỏa đồng thời:

| Điều kiện         | Tiêu chí nghiệm thu                                                           |
| ----------------- | ----------------------------------------------------------------------------- |
| Thị trường        | Việt Nam                                                                      |
| Loại tìm kiếm     | Google Web                                                                    |
| Trang đích        | Trang chủ canonical của PaxMoly Vietnam                                       |
| Thứ hạng          | Average position ≤ 5                                                          |
| Khoảng đo         | 28 ngày liên tục, so sánh thêm với 28 ngày trước đó                           |
| Dữ liệu chính     | Google Search Console, lọc từng query và nhóm regex thương hiệu               |
| Điều kiện dữ liệu | Có impression thực; không kết luận đạt nếu truy vấn chưa phát sinh impression |
| Chỉ số phụ        | Impressions, clicks và CTR của nhóm brand đều không suy giảm bất thường       |

Không dùng một lần tìm kiếm thủ công làm kết quả nghiệm thu vì SERP có thể bị cá nhân hóa. Search Console định nghĩa average position là vị trí trung bình của kết quả cao nhất từ website cho truy vấn tương ứng: [Google Search Console — Impressions, position and clicks](https://support.google.com/webmasters/answer/7042828).

### 1.2. Vì sao Long Châu có thể đứng trên dù chỉ có ít sản phẩm

Số SKU không quyết định thứ hạng cho truy vấn thương hiệu. Một website bán ít sản phẩm vẫn có thể đứng cao hơn nếu có:

- Domain và hệ thống internal link đã được Google crawl lâu dài.
- Trang sản phẩm có HTML, title, nội dung tiếng Việt và URL indexable rõ ràng.
- Nhiều tín hiệu bên ngoài cùng xác nhận thương hiệu/sản phẩm.
- Độ tin cậy của nhà bán lẻ, thông tin doanh nghiệp, chính sách và trải nghiệm người dùng tốt.
- Trang đích khớp với ý định tìm kiếm tại Việt Nam hơn website thương hiệu chưa được index hoặc chưa có bản địa hóa.

Vì vậy, chiến lược không phải tăng số sản phẩm cho đủ nhiều. Cần làm cho Google hiểu **trang chủ nào là đại diện chính thức của PaxMoly tại Việt Nam**, sau đó củng cố thực thể thương hiệu bằng dữ liệu nhất quán và nguồn xác nhận bên ngoài.

### 1.3. Thứ tự ưu tiên để đạt mục tiêu thương hiệu

1. Chốt domain production và xác minh quyền sử dụng danh xưng “PaxMoly Vietnam”.
2. Prerender/SSR trang chủ và các URL chính; crawler phải nhận nội dung, title và canonical ngay trong HTML response.
3. Thêm `WebSite` và `Organization` schema trên trang chủ; dùng `name: "PaxMoly Vietnam"`, `alternateName: "PaxMoly"` hoặc `"Pax Moly"`, logo, URL và `sameAs` thật. Không khai báo hồ sơ không thuộc quyền quản lý.
4. Tạo trang Giới thiệu, Liên hệ, Chính sách giao hàng/đổi trả/quyền riêng tư và thông tin đơn vị phân phối có thể kiểm chứng.
5. Đồng nhất tên, logo, domain, địa chỉ và mô tả thương hiệu trên website, mạng xã hội, hồ sơ nhà phân phối và marketplace chính thức.
6. Xin liên kết/xác nhận từ website PaxMoly Hàn Quốc, nhà nhập khẩu/phân phối, báo chí hoặc đối tác bán lẻ phù hợp. Ưu tiên nguồn thật; không mua backlink hàng loạt.
7. Submit sitemap trong Search Console, yêu cầu index các URL cốt lõi và theo dõi query brand hằng tuần.
8. Chỉ mở rộng content non-brand sau khi các hạng mục P0 về crawl, index, canonical và identity hoàn tất.

Google dùng nội dung trang chủ và các tham chiếu trên web để xác định site name; `WebSite` structured data là tín hiệu quan trọng để khai báo tên mong muốn: [Google — Site names in Search](https://developers.google.com/search/docs/appearance/site-names).

---

## 2. Nguyên tắc SEO áp dụng cho PaxMoly

### 2.1. SEO phục vụ người dùng trước

Google khuyến nghị nội dung phải hữu ích, đáng tin cậy và được tạo chủ yếu cho con người. Không nên tạo nhiều bài gần giống nhau chỉ để phủ mọi biến thể từ khóa. Với nội dung chăm sóc da — chủ đề có thể tác động tới sức khỏe và quyết định mua hàng — tín hiệu về trải nghiệm, chuyên môn và độ tin cậy đặc biệt quan trọng.

Áp dụng cho PaxMoly:

- Viết từ trải nghiệm sản phẩm thật, hình ảnh thật và hướng dẫn thật.
- Công khai người biên soạn và người kiểm duyệt chuyên môn khi xuất bản nội dung sâu về hoạt chất.
- Dẫn nguồn cho thông tin khoa học hoặc thông tin an toàn.
- Phân biệt rõ thông tin mỹ phẩm với tư vấn/điều trị y khoa.
- Không đổi ngày bài viết nếu nội dung không được cập nhật đáng kể.
- Không dùng AI để sản xuất hàng loạt bài mỏng, lặp lại hoặc không có giá trị riêng.

Nguồn: [Google — Creating helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content).

### 2.2. Không có “mật độ từ khóa chuẩn”

Không đặt KPI kiểu “từ khóa phải xuất hiện 3–5%”. Google có thể hiểu nhiều cách diễn đạt liên quan. Nội dung nên:

- Dùng từ khóa chính trong title, h1, đoạn mở đầu và anchor phù hợp.
- Dùng tên hoạt chất, nhu cầu da và ngôn ngữ tự nhiên xuyên suốt nội dung.
- Tránh lặp từ khóa làm câu văn gượng hoặc khó đọc.
- Trả lời đầy đủ ý định tìm kiếm thay vì cố đạt một số lượng từ cố định.

Nguồn: [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide).

### 2.3. Structured data không bảo đảm rich result

Schema giúp Google hiểu nội dung và làm URL đủ điều kiện cho một số dạng hiển thị nâng cao, nhưng không bảo đảm Google sẽ hiển thị rich result. Dữ liệu schema phải khớp với nội dung người dùng nhìn thấy trên trang.

Nguồn: [Google Search Gallery](https://developers.google.com/search/docs/appearance/structured-data/search-gallery).

---

## 3. Audit SEO hiện trạng

## 3.1. Điểm đang làm tốt

| Hạng mục             | Hiện trạng                                                  | Nhận xét                                  |
| -------------------- | ----------------------------------------------------------- | ----------------------------------------- |
| Ngôn ngữ             | `<html lang="vi">`                                          | Đúng với thị trường Việt Nam              |
| Viewport             | Có viewport meta                                            | Phù hợp mobile-first                      |
| Cấu trúc heading     | Mỗi page chính có `h1`                                      | Cơ bản tốt                                |
| URL sản phẩm         | `/san-pham/:slug`                                           | URL rõ nghĩa, không dùng hash route       |
| Product data         | Name, slug, category, concern, price, ingredients, benefits | Nền tảng tốt để tạo metadata/schema       |
| Internal link        | Product card và sản phẩm liên quan dùng link thật           | Google có thể khám phá URL sau khi render |
| Image alt            | Ảnh sản phẩm chính có alt theo tên sản phẩm                 | Tốt cho accessibility và image SEO        |
| Lazy loading         | Product card không ưu tiên dùng `loading="lazy"`            | Hợp lý cho ảnh ngoài viewport             |
| Nội dung thương hiệu | Trang chủ có nhiều section editorial/showcase               | Có thể phát triển thành topical authority |

## 3.2. Khoảng trống ưu tiên cao

### P0 — Có thể ảnh hưởng trực tiếp tới crawl/index

1. **Tất cả route dùng chung title và meta description**

   `index.html` chỉ chứa một title và description tĩnh. Trang cửa hàng và 11 trang sản phẩm không có metadata riêng.

2. **Không có canonical URL**

   Các URL có query như `/cua-hang?category=serum` và `/cua-hang?focus=search` có thể tạo nhiều biến thể của cùng một trang.

3. **Không có sitemap.xml và robots.txt**

   Google vẫn có thể tìm URL qua link, nhưng sitemap giúp cung cấp tập URL canonical mà website muốn index. `robots.txt` cũng là nơi khai báo vị trí sitemap.

4. **SPA chỉ trả app shell ban đầu**

   Google có thể render JavaScript, nhưng quá trình này có thêm hàng đợi render. Các crawler khác có thể không chạy JavaScript đầy đủ. Google vẫn khuyến nghị SSR hoặc static rendering khi phù hợp vì nhanh hơn cho người dùng và crawler.

5. **Trang không tồn tại có thể trả HTTP 200**

   Nginx hiện fallback mọi URL về `index.html`. Product slug không tồn tại hiển thị thông báo trong React nhưng server vẫn có thể trả `200`, tạo soft 404.

Nguồn kỹ thuật: [Google — JavaScript SEO basics](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics).

### P1 — Ảnh hưởng khả năng hiểu nội dung và CTR

1. Chưa có Open Graph/Twitter Card theo route.
2. Chưa có `Product`, `Offer`, `Organization` và `BreadcrumbList` JSON-LD.
3. Product model chưa có SKU, brand, GTIN, availability, URL ảnh tuyệt đối, chính sách vận chuyển và đổi trả.
4. Chưa có breadcrumb trực quan trên trang sản phẩm.
5. Chưa có trang Giới thiệu, Liên hệ, Chính sách giao hàng, Đổi trả, Bảo mật và Điều khoản với URL riêng.
6. Chưa có tác giả/người kiểm duyệt và nguồn tham khảo cho nội dung về hoạt chất.
7. Chưa có Search Console, GA4 và Merchant Center được xác nhận trong source.

### P2 — Tăng trưởng dài hạn

1. Chưa có content hub/bài viết cho từng hoạt chất và nhu cầu da.
2. Chưa có route danh mục indexable riêng cho serum và mặt nạ.
3. Ảnh PNG sản phẩm tương đối lớn; chưa có `srcset`, kích thước khai báo và format AVIF/WebP.
4. Font tải trực tiếp từ Google Fonts trong CSS có thể ảnh hưởng render nếu chưa preconnect/self-host.
5. Chưa có đo lường Core Web Vitals thực tế từ người dùng.

---

## 4. Kiến trúc SEO mục tiêu

## 4.1. Cấu trúc URL đề xuất

```text
/
/cua-hang
/serum
/mat-na
/san-pham/niacinamide-zinc-trouble-relief-serum
/san-pham/hyaluronic-acid-intensive-moisture-serum
/san-pham/collagen-b5-elasticity-serum
/san-pham/vitamin-c-brightening-serum
/san-pham/retinol-bakuchiol-firmness-serum
/san-pham/ac-serum-vitamin-c-collagen
/san-pham/ac-serum-niacinamide-hyaluronic
/san-pham/super-aqua-mask-pack
/san-pham/real-hyaluronic-acid-mask-pack
/san-pham/real-retinol-mask-pack
/san-pham/real-green-tea-mask-pack
/hoat-chat/niacinamide
/hoat-chat/hyaluronic-acid
/hoat-chat/vitamin-c
/hoat-chat/retinol
/nhu-cau/da-dau-lo-chan-long
/nhu-cau/da-thieu-am
/nhu-cau/da-xin-mau
/kien-thuc-da/<slug-bai-viet>
/gioi-thieu
/lien-he
/chinh-sach-giao-hang
/chinh-sach-doi-tra
/chinh-sach-bao-mat
/dieu-khoan
```

### Quy tắc URL

- Chữ thường, không dấu, dùng dấu gạch ngang.
- Một nội dung chỉ có một URL canonical.
- Không thay slug đã index nếu không thật sự cần thiết.
- Khi đổi slug, redirect HTTP 301 từ URL cũ sang URL mới.
- Không đưa URL tìm kiếm nội bộ vào sitemap.
- Query `?focus=search` luôn canonical về `/cua-hang`.
- Nếu vẫn dùng `?category=serum|mask`, nên canonical về route danh mục tương ứng hoặc `/cua-hang`, tùy chiến lược index.
- Không index các tổ hợp filter không có nội dung độc lập và nhu cầu tìm kiếm rõ ràng.

Google xem redirect và `rel="canonical"` là tín hiệu canonical mạnh; sitemap là tín hiệu bổ sung. Nguồn: [Google — Specify a canonical URL](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls).

## 4.2. Rendering đề xuất

### Phương án khuyến nghị

Prerender/static-generate các route ổn định:

- Trang chủ.
- Trang cửa hàng.
- Hai trang danh mục.
- Tất cả trang sản phẩm.
- Các bài content hub.
- Trang chính sách.

Mỗi URL phải trả HTML ban đầu có sẵn:

- Title.
- Meta description.
- Canonical.
- H1 và nội dung chính.
- Link tới các URL liên quan.
- JSON-LD.
- HTTP status đúng.

### Điều không nên làm

- Không dùng bot detection để trả HTML khác cho Google và người dùng.
- Không xem dynamic rendering là giải pháp lâu dài.
- Không phụ thuộc vào thao tác click/scroll mới tải nội dung quan trọng.

Google khuyến nghị static rendering, SSR hoặc hydration thay cho dynamic rendering lâu dài. Nguồn: [Google — Dynamic rendering is a workaround](https://developers.google.com/search/docs/crawling-indexing/javascript/dynamic-rendering).

---

## 5. Chiến lược từ khóa

## 5.1. Nhóm thương hiệu

| Từ khóa            | Ý định                   | Trang đích            |
| ------------------ | ------------------------ | --------------------- |
| paxmoly            | Điều hướng/thương hiệu   | Trang chủ             |
| pax moly           | Điều hướng/thương hiệu   | Trang chủ             |
| paxmolly           | Sai chính tả thương hiệu | Trang chủ             |
| paxmoly vietnam    | Thương hiệu + địa phương | Trang chủ/Giới thiệu  |
| mỹ phẩm paxmoly    | Điều tra thương mại      | Trang chủ/Cửa hàng    |
| serum paxmoly      | Danh mục                 | `/serum`              |
| mặt nạ paxmoly     | Danh mục                 | `/mat-na`             |
| paxmoly chính hãng | Tin cậy/mua hàng         | Giới thiệu + Cửa hàng |

## 5.2. Nhóm danh mục giao dịch

| Cụm chủ đề | Từ khóa chính    | Từ khóa hỗ trợ                                                   |
| ---------- | ---------------- | ---------------------------------------------------------------- |
| Serum      | serum Hàn Quốc   | tinh chất dưỡng da, serum PaxMoly, serum theo nhu cầu da         |
| Dưỡng ẩm   | serum cấp ẩm     | serum hyaluronic acid, serum B5, serum cho da thiếu nước         |
| Da dầu     | serum cho da dầu | niacinamide zinc, serum hỗ trợ kiểm soát dầu, serum lỗ chân lông |
| Sáng da    | serum vitamin C  | serum cho da xỉn màu, serum chống oxy hóa                        |
| Đàn hồi    | serum collagen   | serum B5 collagen, serum chăm sóc độ đàn hồi                     |
| Lão hóa    | serum retinol    | retinol bakuchiol, serum chăm sóc nếp nhăn                       |
| Mặt nạ     | mặt nạ Hàn Quốc  | mặt nạ giấy, mask pack, mặt nạ cấp ẩm/làm dịu                    |

## 5.3. Nhóm thông tin

- Niacinamide là gì và phù hợp với nhu cầu da nào?
- Niacinamide và Zinc PCA nên dùng thế nào?
- Hyaluronic Acid khác gì Vitamin B5?
- Serum cấp ẩm dùng trước hay sau kem dưỡng?
- Vitamin C nên dùng buổi sáng hay tối?
- Retinol và Bakuchiol có thể kết hợp thế nào?
- Cách bắt đầu chu trình retinol cho người mới.
- Mặt nạ giấy dùng bao nhiêu lần mỗi tuần?
- Da dầu có cần cấp ẩm không?
- Cách đọc nồng độ hoạt chất trên serum.
- Cách patch test mỹ phẩm mới.
- Chu trình tối giản cho từng nhu cầu da.

## 5.4. Nguyên tắc mapping

- Một từ khóa chính chỉ có một trang đích ưu tiên.
- Trang danh mục nhắm truy vấn mua hàng rộng.
- Trang sản phẩm nhắm tên sản phẩm + hoạt chất + nhu cầu cụ thể.
- Bài viết giải quyết câu hỏi và dẫn sang danh mục/sản phẩm phù hợp.
- Tránh để nhiều bài cạnh tranh cùng một từ khóa và cùng một search intent.
- Định kỳ kiểm tra cannibalization bằng Search Console: nhiều URL cùng nhận impression cho một query nhưng CTR/rank đều yếu.

---

## 6. Metadata đề xuất

**Lưu ý:** Thay `https://paxmoly.example` bằng domain production chính thức trước khi triển khai.

## 6.1. Công thức title

- Trang chủ: `[Định vị chính] | PaxMoly Vietnam`
- Danh mục: `[Danh mục] [lợi ích chính] | PaxMoly`
- Sản phẩm: `[Tên sản phẩm] | PaxMoly Vietnam`
- Bài viết: `[Câu hỏi/lợi ích chính] | Kiến thức da PaxMoly`

Title cần duy nhất, mô tả đúng trang, rõ ràng và súc tích. Google có thể dùng title, heading và nội dung khác để tạo title link. Nguồn: [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide).

## 6.2. Metadata cho trang chính

| URL           | Title đề xuất                                          | Meta description đề xuất                                                                                                                 |
| ------------- | ------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `/`           | PaxMoly Vietnam — Serum & Mặt Nạ Hàn Quốc              | Khám phá serum và mặt nạ PaxMoly với thông tin hoạt chất, nồng độ và nhu cầu da rõ ràng. Chọn chu trình chăm sóc da phù hợp mỗi ngày.    |
| `/cua-hang`   | Cửa Hàng PaxMoly — Serum & Mặt Nạ Chính Hãng           | Xem toàn bộ serum và mặt nạ PaxMoly. Lọc theo nhu cầu da, thành phần và công dụng; thông tin sản phẩm và mức giá được trình bày rõ ràng. |
| `/serum`      | Serum PaxMoly — Chọn Theo Hoạt Chất & Nhu Cầu Da       | Khám phá serum PaxMoly: Niacinamide, Hyaluronic Acid, Vitamin C, Collagen và Retinol. Chọn công thức phù hợp với nhu cầu chăm sóc da.    |
| `/mat-na`     | Mặt Nạ PaxMoly — Cấp Ẩm, Làm Dịu & Săn Chắc            | Khám phá mặt nạ giấy PaxMoly cho nhu cầu cấp ẩm, làm dịu và chăm sóc độ săn chắc. Xem thành phần, cách dùng và giá sản phẩm.             |
| `/gioi-thieu` | Về PaxMoly Vietnam — Chăm Sóc Da Với Hoạt Chất Rõ Ràng | Tìm hiểu câu chuyện PaxMoly, triết lý công thức, nguồn gốc sản phẩm và đơn vị phân phối chính thức tại Việt Nam.                         |

## 6.3. Metadata cho sản phẩm hiện tại

| Slug                                       | Title đề xuất                     | Từ khóa chính |
| ------------------------------------------ | --------------------------------- | ------------- |
| `niacinamide-zinc-trouble-relief-serum`    | Niacinamide 15% + Zinc 5% Serum   | PaxMoly       | serum niacinamide zinc, serum cho da dầu |
| `hyaluronic-acid-intensive-moisture-serum` | Hyaluronic Acid 10% + B5 Serum    | PaxMoly       | serum hyaluronic acid B5, serum cấp ẩm   |
| `collagen-b5-elasticity-serum`             | Collagen 5% + B5 Serum            | PaxMoly       | serum collagen B5, serum đàn hồi         |
| `vitamin-c-brightening-serum`              | Vitamin C 15% + B5 Serum          | PaxMoly       | serum vitamin C, serum sáng da           |
| `retinol-bakuchiol-firmness-serum`         | Retinol 0.1% + Bakuchiol Serum    | PaxMoly       | serum retinol bakuchiol                  |
| `ac-serum-vitamin-c-collagen`              | AC Serum Vitamin C + Collagen     | PaxMoly       | serum vitamin C collagen                 |
| `ac-serum-niacinamide-hyaluronic`          | AC Serum Niacinamide + Hyaluronic | PaxMoly       | serum niacinamide hyaluronic             |
| `super-aqua-mask-pack`                     | Super Aqua Mask Pack Cấp Nước     | PaxMoly       | mặt nạ cấp nước PaxMoly                  |
| `real-hyaluronic-acid-mask-pack`           | Real Hyaluronic Acid Mask Pack    | PaxMoly       | mặt nạ hyaluronic acid                   |
| `real-retinol-mask-pack`                   | Real Retinol Mask Pack            | PaxMoly       | mặt nạ retinol PaxMoly                   |
| `real-green-tea-mask-pack`                 | Real Green Tea Mask Pack          | PaxMoly       | mặt nạ trà xanh làm dịu                  |

### Công thức meta description sản phẩm

```text
[Tên sản phẩm] [dung tích] với [2–3 hoạt chất chính], hỗ trợ [lợi ích chính].
Xem thành phần, cách dùng, lưu ý và giá chính hãng tại PaxMoly Vietnam.
```

Meta description phải phản ánh đúng thông tin hiển thị trên trang. Không chèn “miễn phí giao hàng”, “giảm giá” hoặc “còn hàng” nếu hệ thống vận hành không xác nhận được.

## 6.4. Open Graph tối thiểu

Mỗi route indexable cần có:

```html
<meta property="og:type" content="product" />
<meta property="og:site_name" content="PaxMoly Vietnam" />
<meta property="og:title" content="Tên trang" />
<meta property="og:description" content="Mô tả trang" />
<meta property="og:url" content="https://paxmoly.example/san-pham/slug" />
<meta
  property="og:image"
  content="https://paxmoly.example/og/product-slug.jpg"
/>
<meta property="og:locale" content="vi_VN" />
<meta name="twitter:card" content="summary_large_image" />
```

Trang chủ/danh mục dùng `og:type="website"`; trang sản phẩm dùng `product`.

Ảnh OG đề xuất:

- Kích thước 1200 × 630 px.
- Có sản phẩm, logo và khoảng trống an toàn.
- Text ngắn, tương phản tốt.
- URL tuyệt đối và truy cập công khai.
- Không dùng ảnh dung lượng quá lớn.

---

## 7. Canonical, robots và sitemap

## 7.1. Canonical

Ví dụ trang sản phẩm:

```html
<link
  rel="canonical"
  href="https://paxmoly.example/san-pham/niacinamide-zinc-trouble-relief-serum"
/>
```

Quy tắc:

- Canonical self-reference trên mọi trang indexable.
- Chỉ một canonical trên mỗi trang.
- Canonical dùng HTTPS, host chính và URL tuyệt đối.
- URL trong sitemap, canonical, internal link và Open Graph phải thống nhất.
- `/cua-hang?focus=search` canonical về `/cua-hang`.
- URL search rỗng, tracking UTM và filter không index không được đưa vào sitemap.

## 7.2. robots.txt đề xuất

`public/robots.txt`:

```text
User-agent: *
Allow: /

Sitemap: https://paxmoly.example/sitemap.xml
```

Không dùng `robots.txt` để xóa URL khỏi Google. Robots.txt chủ yếu kiểm soát crawler request; muốn ngăn index cần `noindex` hoặc xác thực truy cập. Nguồn: [Google — robots.txt introduction](https://developers.google.com/search/docs/crawling-indexing/robots/intro).

## 7.3. Sitemap

Sitemap cần chứa:

- Trang chủ.
- Cửa hàng.
- Danh mục indexable.
- Tất cả sản phẩm còn kinh doanh.
- Bài kiến thức chất lượng.
- Trang giới thiệu và chính sách quan trọng.

Không chứa:

- URL search/filter nội bộ.
- URL redirect.
- URL trả 404.
- URL canonical sang trang khác.
- Trang noindex.
- URL localhost/staging.

Ví dụ tối giản:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://paxmoly.example/</loc>
  </url>
  <url>
    <loc>https://paxmoly.example/cua-hang</loc>
  </url>
  <url>
    <loc>https://paxmoly.example/san-pham/niacinamide-zinc-trouble-relief-serum</loc>
  </url>
</urlset>
```

Google yêu cầu URL đầy đủ, tuyệt đối và khuyến nghị đặt sitemap ở site root. Việc submit sitemap là tín hiệu/hint, không bảo đảm index. Nguồn: [Google — Build and submit a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap).

---

## 8. Structured data

## 8.1. Organization trên trang chủ

Chỉ điền dữ liệu đã được doanh nghiệp xác nhận.

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://paxmoly.example/#organization",
  "name": "PaxMoly Vietnam",
  "url": "https://paxmoly.example/",
  "logo": "https://paxmoly.example/logo.png",
  "sameAs": [
    "https://www.facebook.com/URL-CHINH-THUC",
    "https://www.instagram.com/URL-CHINH-THUC"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "telephone": "+84-SO-DIEN-THOAI",
    "email": "EMAIL-CHINH-THUC",
    "availableLanguage": ["Vietnamese"]
  }
}
```

Nguồn: [Google — Organization structured data](https://developers.google.com/search/docs/appearance/structured-data/organization).

## 8.2. Product + Offer trên trang sản phẩm

Chỉ dùng `Offer`/merchant listing khi khách hàng thực sự có thể mua sản phẩm và giá/tình trạng hàng được đồng bộ chính xác.

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "@id": "https://paxmoly.example/san-pham/niacinamide-zinc-trouble-relief-serum#product",
  "name": "Niacinamide 15% + Zinc 5% Serum",
  "description": "Tinh chất cân bằng da với kết cấu nhẹ, hỗ trợ kiểm soát dầu và chăm sóc vùng da dễ nổi mụn.",
  "image": [
    "https://paxmoly.example/images/niacinamide-zinc-trouble-relief-serum.jpg"
  ],
  "sku": "SKU-DO-VAN-HANH-CUNG-CAP",
  "brand": {
    "@type": "Brand",
    "name": "PaxMoly"
  },
  "offers": {
    "@type": "Offer",
    "url": "https://paxmoly.example/san-pham/niacinamide-zinc-trouble-relief-serum",
    "priceCurrency": "VND",
    "price": "389000",
    "availability": "https://schema.org/InStock",
    "itemCondition": "https://schema.org/NewCondition",
    "seller": {
      "@id": "https://paxmoly.example/#organization"
    }
  }
}
```

### Dữ liệu cần bổ sung vào product model

```ts
interface ProductSeoCommerceFields {
  sku: string;
  gtin?: string;
  brand: "PaxMoly";
  availability: "InStock" | "OutOfStock" | "PreOrder";
  canonicalUrl: string;
  imageUrls: string[];
  metaTitle: string;
  metaDescription: string;
}
```

Google phân biệt product snippet và merchant listing. Trang có khả năng mua trực tiếp phù hợp merchant listing và cần dữ liệu price/availability chính xác. Nguồn: [Google — Product structured data](https://developers.google.com/search/docs/appearance/structured-data/product) và [Merchant listing](https://developers.google.com/search/docs/appearance/structured-data/merchant-listing).

## 8.3. BreadcrumbList

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Cửa hàng",
      "item": "https://paxmoly.example/cua-hang"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Serum",
      "item": "https://paxmoly.example/serum"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Niacinamide 15% + Zinc 5% Serum",
      "item": "https://paxmoly.example/san-pham/niacinamide-zinc-trouble-relief-serum"
    }
  ]
}
```

Breadcrumb nên phản ánh đường đi hợp lý của người dùng, không nhất thiết sao chép nguyên cấu trúc URL. Nguồn: [Google — Breadcrumb structured data](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb).

## 8.4. Chính sách review

- Không thêm `Review` hoặc `AggregateRating` nếu chưa có hệ thống review thật.
- Không tự viết review giả hoặc số sao giả.
- Review/schema phải hiển thị cho người dùng trên chính trang đó.
- Cần lưu nguồn, người đánh giá, thời gian và cơ chế kiểm duyệt.
- Không đánh dấu review do doanh nghiệp tự tạo như review độc lập.

Điểm này đặc biệt quan trọng vì review giả vừa làm giảm niềm tin vừa có thể khiến structured data không hợp lệ.

---

## 9. On-page SEO cho trang sản phẩm

Mỗi trang sản phẩm cần tối thiểu:

1. Breadcrumb có link thật.
2. Một `h1` là tên đầy đủ sản phẩm.
3. Ảnh chính có alt mô tả sản phẩm.
4. Giá và tình trạng hàng thực tế.
5. Dung tích/quy cách.
6. Danh sách thành phần đầy đủ hoặc INCI khi có.
7. Hoạt chất nổi bật và nồng độ đã xác minh.
8. Lợi ích bằng ngôn ngữ mỹ phẩm phù hợp.
9. Hướng dẫn sử dụng cụ thể.
10. Tần suất và vị trí trong chu trình.
11. Đối tượng phù hợp.
12. Lưu ý, patch test và điều kiện bảo quản.
13. Xuất xứ, đơn vị chịu trách nhiệm/phân phối theo hồ sơ thực tế.
14. Chính sách giao hàng và đổi trả.
15. Sản phẩm liên quan theo nhu cầu, không chỉ cùng category.
16. FAQ thật, phát sinh từ tư vấn khách hàng.

### Cấu trúc nội dung đề xuất

```text
H1: Tên sản phẩm
  Định vị ngắn + giá + CTA
H2: Công thức tập trung vào nhu cầu nào?
H2: Thành phần và hoạt chất nổi bật
H2: Cách sử dụng trong chu trình
H2: Sản phẩm phù hợp với ai?
H2: Lưu ý khi sử dụng
H2: Câu hỏi thường gặp
H2: Có thể bạn cũng thích
```

### Nguyên tắc claim mỹ phẩm

- Ưu tiên: “hỗ trợ”, “giúp”, “duy trì”, “mang lại cảm giác”, “da trông…”.
- Tránh nếu không có căn cứ pháp lý/chuyên môn: “điều trị mụn”, “chữa nám”, “xóa nếp nhăn”, “tái tạo da”, “cam kết khỏi”.
- Nồng độ, thành phần và hướng dẫn phải khớp bao bì/hồ sơ sản phẩm.
- Nội dung retinol cần có lưu ý bắt đầu từ tần suất thấp, patch test và chống nắng; nội dung cụ thể phải được người có chuyên môn/pháp chế duyệt.

---

## 10. Image SEO

### Hiện trạng

- Tên file ảnh phần lớn mô tả sản phẩm tốt.
- Product card và ảnh chính có alt.
- Một số ảnh trang trí dùng `alt=""`, đây là đúng nếu ảnh không bổ sung thông tin.
- PNG sản phẩm có thể tối ưu thêm về dung lượng và responsive delivery.

### Việc cần làm

- Chuyển ảnh photographic/product render sang WebP hoặc AVIF, giữ PNG nếu cần alpha và chất lượng tốt hơn.
- Khai báo `width` và `height` để hạn chế layout shift.
- Dùng `srcset`/`sizes` cho màn hình khác nhau.
- Hero/LCP image: không lazy-load; cân nhắc preload và `fetchpriority="high"`.
- Ảnh dưới fold: `loading="lazy"`, nhưng không phụ thuộc vào thao tác click/scroll mới đưa URL ảnh vào DOM.
- Alt mô tả nội dung và mục đích, không nhồi từ khóa.
- Tạo image sitemap chỉ khi hình ảnh là nguồn acquisition quan trọng và khó được khám phá qua page sitemap.

Google yêu cầu lazy-loaded content phải tải khi nó đi vào viewport và không nên phụ thuộc vào hành động người dùng. Nguồn: [Google — Fix lazy-loaded content](https://developers.google.com/search/docs/crawling-indexing/javascript/lazy-loading).

---

## 11. Core Web Vitals và performance

### Mục tiêu chính thức

Đo ở percentile 75, tách mobile và desktop:

| Chỉ số | Mục tiêu tốt | Ý nghĩa                           |
| ------ | ------------ | --------------------------------- |
| LCP    | ≤ 2,5 giây   | Tốc độ hiển thị nội dung lớn nhất |
| INP    | ≤ 200 ms     | Khả năng phản hồi tương tác       |
| CLS    | ≤ 0,1        | Độ ổn định bố cục                 |

Nguồn: [web.dev — Web Vitals](https://web.dev/articles/vitals) và [Google Search Central — Core Web Vitals](https://developers.google.com/search/docs/appearance/core-web-vitals).

### Rủi ro hiện tại cần kiểm tra

- Hero dùng nhiều ảnh sản phẩm lớn.
- Bundle JavaScript SPA phải chạy trước khi nội dung xuất hiện đầy đủ.
- Framer Motion và animation có thể tăng main-thread work.
- Google Fonts tải từ domain khác.
- Ảnh thiếu `width`/`height` có thể tạo CLS.
- Product catalog và page data đều nằm trong client bundle.

### Hướng tối ưu

1. Prerender HTML cho route.
2. Code-split theo page bằng lazy route.
3. Preload duy nhất ảnh LCP đúng breakpoint.
4. Tối ưu ảnh và khai báo kích thước.
5. Self-host font hoặc thêm preconnect/preload phù hợp.
6. Chỉ animate `transform` và `opacity` khi có thể.
7. Tôn trọng `prefers-reduced-motion`.
8. Tránh hydration/render work không cần thiết trên trang sản phẩm.
9. Dùng CDN, Brotli và cache immutable cho asset có hash.
10. Đo field data, không chỉ Lighthouse lab.

---

## 12. Content strategy 90 ngày

## 12.1. Content pillar

### Pillar 1 — Hiểu hoạt chất

- Niacinamide: công dụng, nồng độ và cách bắt đầu.
- Hyaluronic Acid: cấp nước khác cấp ẩm như thế nào?
- Vitamin C: cách dùng và bảo quản.
- Retinol + Bakuchiol: chu trình cho người mới.
- Collagen trong mỹ phẩm bôi ngoài da: nên kỳ vọng điều gì?

### Pillar 2 — Chọn theo nhu cầu da

- Chu trình tối giản cho da dầu.
- Chu trình cho da thiếu nước/căng khô.
- Chăm sóc da xỉn màu thiếu sức sống.
- Chăm sóc bề mặt da và độ đàn hồi.
- Mặt nạ theo từng nhu cầu da.

### Pillar 3 — Cách dùng sản phẩm

- Thứ tự dùng toner, serum, kem dưỡng và chống nắng.
- Patch test đúng cách.
- Cách tăng tần suất retinol an toàn.
- Có nên dùng nhiều serum trong một chu trình?
- Mặt nạ giấy nên dùng khi nào?

### Pillar 4 — Thương hiệu và độ tin cậy

- PaxMoly là thương hiệu nào?
- Cách đọc nhãn và nồng độ hoạt chất PaxMoly.
- Quy trình lựa chọn danh mục tại PaxMoly Vietnam.
- Hướng dẫn nhận biết kênh phân phối chính thức.
- Chính sách tư vấn, giao hàng và đổi trả.

## 12.2. Lịch nội dung mẫu

| Tuần | Nội dung chính                  | Nội dung hỗ trợ                     | Trang thương mại liên kết |
| ---- | ------------------------------- | ----------------------------------- | ------------------------- |
| 1    | Niacinamide là gì?              | Da dầu có cần cấp ẩm?               | Niacinamide + Zinc Serum  |
| 2    | Hyaluronic Acid và B5           | Chu trình cho da thiếu nước         | HA 10% + B5 Serum         |
| 3    | Vitamin C cho người mới         | Cách bảo quản serum Vitamin C       | Vitamin C 15% Serum       |
| 4    | Retinol + Bakuchiol             | Cách tăng tần suất retinol          | Retinol Firmness Serum    |
| 5    | Cách đọc nồng độ hoạt chất      | Patch test đúng cách                | Cửa hàng Serum            |
| 6    | Mặt nạ giấy theo nhu cầu        | Tần suất dùng mask                  | Cửa hàng Mặt nạ           |
| 7    | Chu trình tối giản buổi sáng    | Serum dùng trước hay sau kem dưỡng? | Vitamin C/HA Serum        |
| 8    | Chu trình tối giản buổi tối     | Có nên layer nhiều serum?           | Niacinamide/Retinol       |
| 9    | Chăm sóc da xỉn màu             | Chống oxy hóa là gì?                | Vitamin C Serum           |
| 10   | Chăm sóc bề mặt và đàn hồi      | Collagen bôi ngoài da               | Collagen Serum            |
| 11   | Giải đáp câu hỏi khách hàng     | Tổng hợp lỗi dùng serum             | Product hub               |
| 12   | Cập nhật/refresh 3 bài tốt nhất | Case sử dụng có bằng chứng          | Trang liên quan           |

### Tiêu chuẩn bài viết

- Có mục tiêu người đọc và search intent rõ ràng.
- Có người viết/người duyệt và ngày cập nhật thật.
- Có nguồn tham khảo uy tín cho claim chuyên môn.
- Có hình ảnh/quy trình/case gốc khi phù hợp.
- Có tóm tắt, mục lục và câu trả lời trực tiếp.
- Internal link sang pillar, bài hỗ trợ và sản phẩm liên quan.
- Không ép sản phẩm vào bài nếu không phù hợp nhu cầu.
- Không dùng FAQ schema chỉ vì muốn chiếm diện tích SERP; chỉ thêm FAQ hữu ích thật trên trang.

---

## 13. Internal linking

### Mô hình đề xuất

```text
Trang chủ
├── Danh mục Serum
│   ├── Product Serum
│   ├── Hub Niacinamide
│   ├── Hub Hyaluronic Acid
│   ├── Hub Vitamin C
│   └── Hub Retinol
├── Danh mục Mặt nạ
│   ├── Product Mask
│   └── Hướng dẫn dùng mặt nạ
└── Kiến thức da
    ├── Bài theo hoạt chất
    ├── Bài theo nhu cầu
    └── Bài hướng dẫn chu trình
```

### Quy tắc anchor

- Anchor mô tả đúng trang đích: “serum Niacinamide + Zinc” tốt hơn “xem thêm”.
- Không dùng một anchor giao dịch giống hệt quá nhiều lần một cách máy móc.
- Mỗi bài thông tin nên link tới pillar và tối đa một vài sản phẩm thật sự liên quan.
- Product page link ngược tới bài hướng dẫn hoạt chất/cách dùng.
- Không tạo orphan page; mọi URL indexable phải được link từ ít nhất một trang crawlable.

Google khuyến nghị dùng thẻ `<a>` crawlable và bảo đảm mọi trang có thể đi tới từ một trang đã được tìm thấy. Nguồn: [Google — Developer SEO guide](https://developers.google.com/search/docs/fundamentals/get-started-developers).

---

## 14. Local SEO và tín hiệu doanh nghiệp

Nếu PaxMoly/Dermacoon có địa điểm phục vụ khách hàng hợp lệ:

- Xác minh Google Business Profile.
- Đồng nhất tên doanh nghiệp, địa chỉ và số điện thoại trên website/kênh chính thức.
- Tạo trang Liên hệ có thông tin pháp nhân/đơn vị vận hành đúng thực tế.
- Nhúng bản đồ chỉ khi địa điểm có thể tiếp khách.
- Không tạo địa điểm ảo hoặc trang địa phương hàng loạt.

Nếu chỉ bán online:

- Tập trung Organization/OnlineStore information.
- Công khai khu vực giao hàng, thời gian hỗ trợ, hotline và chính sách.
- Không giả định storefront vật lý.

---

## 15. Ecommerce SEO và Merchant Center

Khi checkout thật đi vào hoạt động:

1. Đồng bộ giá, availability và URL sản phẩm giữa website, schema và feed.
2. Tạo Google Merchant Center và xác minh domain.
3. Khai báo shipping/return policy đúng vận hành.
4. Dùng GTIN khi nhà sản xuất cung cấp; không tự tạo GTIN.
5. Dùng SKU nội bộ ổn định.
6. Khi hết hàng tạm thời: giữ URL, hiển thị OutOfStock và gợi ý liên quan.
7. Khi ngừng vĩnh viễn: quyết định giữ trang thông tin, redirect tương đương hoặc trả 410/404 dựa trên nhu cầu tìm kiếm và sản phẩm thay thế.
8. Không redirect mọi sản phẩm hết bán về trang chủ.

---

## 16. Đo lường

## 16.1. Google Search Console

Thiết lập Domain Property, sau đó:

- Submit sitemap.
- Kiểm tra URL đại diện cho mỗi template.
- Theo dõi Pages/Indexing.
- Theo dõi Core Web Vitals.
- Theo dõi Enhancements/Product snippets/Merchant listings.
- Theo dõi manual actions và security issues.
- Phân tích query, page, country, device, clicks, impressions, CTR và position.

Nguồn: [Google — How to use Search Console](https://developers.google.com/search/docs/monitor-debug/search-console-start).

## 16.2. GA4 ecommerce events

| Event               | Khi gửi                               |
| ------------------- | ------------------------------------- |
| `view_item_list`    | Xem danh mục/grid sản phẩm            |
| `select_item`       | Click product card                    |
| `view_item`         | Xem trang sản phẩm                    |
| `add_to_cart`       | Thêm sản phẩm vào giỏ                 |
| `view_cart`         | Mở cart drawer                        |
| `remove_from_cart`  | Xóa khỏi giỏ                          |
| `begin_checkout`    | Bắt đầu checkout thật                 |
| `add_shipping_info` | Hoàn tất thông tin giao hàng          |
| `add_payment_info`  | Chọn phương thức thanh toán           |
| `purchase`          | Backend xác nhận giao dịch thành công |

Không gửi `purchase` chỉ vì người dùng click nút hoặc mở trang cảm ơn. Event purchase cần transaction ID duy nhất và dữ liệu xác nhận từ hệ thống đơn hàng.

## 16.3. KPI theo giai đoạn

### KPI North Star — brand query

- `paxmoly`: trang chủ đạt average position ≤ 5 tại Việt Nam trong 28 ngày liên tục.
- `pax moly`, `paxmoly vietnam`, `paxmolly`: theo dõi riêng từng query và theo nhóm regex; không gộp số liệu đến mức che mất biến thể yếu.
- Trang chủ là landing page ưu tiên; nếu URL khác lên hạng cao hơn, kiểm tra cannibalization và intent trước khi redirect/canonical.
- Báo cáo kèm impressions, clicks và CTR; không báo “top 5” khi dữ liệu impression quá ít hoặc chỉ dựa trên ảnh chụp SERP.
- Review hằng tuần trong 90 ngày đầu sau khi domain production được index; sau đó review hằng tháng.

### 0–30 ngày

- Tỷ lệ URL quan trọng được index.
- Không còn soft 404/canonical conflict.
- Structured data không có critical error.
- Sitemap fetch thành công.
- Baseline clicks/impressions non-brand.

### 31–90 ngày

- Organic impressions theo cluster hoạt chất.
- CTR của trang sản phẩm/danh mục.
- Số query non-brand vào top 20/top 10.
- Organic product views và add-to-cart rate.
- Core Web Vitals pass rate mobile.

### Sau 90 ngày

- Organic revenue và assisted conversions.
- Tỷ lệ brand/non-brand.
- Tăng trưởng landing pages có conversion.
- Tỷ lệ nội dung tạo internal click sang sản phẩm.
- Chi phí nội dung trên doanh thu organic.

Không dùng “số lượng bài đăng” làm KPI chính.

---

## 17. Kế hoạch triển khai theo sprint

## Sprint 1 — Nền tảng crawl và metadata

**Mức độ:** P0  
**Kết quả nghiệm thu:** Mỗi URL chính trả đúng title/description/canonical và có HTML crawlable.

- Chốt domain production và host canonical.
- Tạo `src/config/seo.config.ts`.
- Tạo component quản lý head theo route.
- Bổ sung metadata riêng cho home/shop/product/404.
- Tạo `public/robots.txt`.
- Tạo sitemap từ `PRODUCTS`.
- Noindex search/focus URL không có giá trị độc lập.
- Xử lý product không tồn tại bằng status 404 hoặc route 404 noindex rõ ràng.
- Prerender các route sản phẩm.

## Sprint 2 — Structured data và trust

**Mức độ:** P1  
**Kết quả nghiệm thu:** Rich Results Test đọc được Organization, Product/Offer và Breadcrumb đúng dữ liệu hiển thị.

- Mở rộng product model với SKU/availability/SEO fields.
- Organization JSON-LD.
- Product/Offer JSON-LD.
- Breadcrumb UI + BreadcrumbList.
- Trang Giới thiệu/Liên hệ/Chính sách.
- Không thêm review/rating giả.

## Sprint 3 — Performance và analytics

**Mức độ:** P1  
**Kết quả nghiệm thu:** Build ổn định, GA4 events đúng và có baseline CWV.

- Responsive image pipeline.
- Width/height cho ảnh.
- Route-level code splitting.
- Font strategy.
- GA4 ecommerce events.
- Search Console + sitemap submission.
- PageSpeed/Lighthouse baseline và RUM.

## Sprint 4 — Content hub

**Mức độ:** P2  
**Kết quả nghiệm thu:** Có ít nhất 4 pillar pages và internal-link graph hoàn chỉnh.

- Route hoạt chất.
- Route nhu cầu da.
- Template bài viết.
- Author/reviewer/source fields.
- 90-day editorial calendar.
- Quy trình review claim trước publish.

---

## 18. Mapping thay đổi vào project hiện tại

| File/folder                                | Thay đổi đề xuất                                        |
| ------------------------------------------ | ------------------------------------------------------- |
| `index.html`                               | Giữ metadata fallback, bổ sung preconnect/font strategy |
| `src/config/seo.config.ts`                 | Metadata mặc định và theo route                         |
| `src/components/seo/SeoHead.tsx`           | Title, description, canonical, OG/Twitter               |
| `src/components/seo/StructuredData.tsx`    | Render JSON-LD an toàn                                  |
| `src/pages/HomePage.tsx`                   | Organization/WebSite schema, nội dung trust             |
| `src/pages/ShopPage.tsx`                   | Metadata riêng và canonical query policy                |
| `src/pages/ProductDetailPage.tsx`          | Product/Offer/Breadcrumb schema và content hoàn chỉnh   |
| `src/pages/NotFoundPage.tsx`               | `noindex` và status/redirect strategy                   |
| `src/types/Product.ts`                     | SKU, brand, availability, SEO fields                    |
| `src/data/products.ts`                     | Metadata/schema data đã xác minh                        |
| `public/robots.txt`                        | Crawl policy + sitemap URL                              |
| `public/sitemap.xml` hoặc script generator | URL canonical indexable                                 |
| `nginx.conf`                               | Cache, 404 strategy và redirect canonical host          |

### Cấu trúc folder đề xuất

```text
src/
├── components/seo/
│   ├── SeoHead.tsx
│   └── StructuredData.tsx
├── config/
│   └── seo.config.ts
├── content/
│   ├── ingredients/
│   ├── concerns/
│   └── articles/
└── types/
    └── Seo.ts

public/
├── robots.txt
├── sitemap.xml
└── og/
```

---

## 19. Checklist trước khi production

### Crawl/index

- [ ] Domain production và canonical host đã chốt.
- [ ] HTTP → HTTPS redirect 301.
- [ ] Non-www ↔ www chỉ giữ một phiên bản.
- [ ] Mọi route indexable trả HTTP 200.
- [ ] URL không tồn tại trả 404 thật hoặc noindex đúng chiến lược.
- [ ] Không chặn JS/CSS/ảnh cần thiết trong robots.txt.
- [ ] Sitemap chỉ chứa URL 200, canonical và indexable.
- [ ] Sitemap đã submit trong Search Console.

### Metadata

- [ ] Title duy nhất cho từng trang.
- [ ] Meta description duy nhất và đúng nội dung.
- [ ] Canonical tuyệt đối cho từng trang.
- [ ] Open Graph/Twitter đầy đủ.
- [ ] OG image truy cập công khai.
- [ ] Trang 404/search không tạo metadata indexable sai.

### Content

- [ ] Mỗi trang có một h1.
- [ ] Heading theo thứ bậc hợp lý.
- [ ] Claim mỹ phẩm đã được duyệt.
- [ ] Không có review/rating giả.
- [ ] Thành phần, nồng độ, giá, dung tích khớp dữ liệu vận hành.
- [ ] Trang trust/chính sách đã có.
- [ ] Không có thin/duplicate content hàng loạt.

### Structured data

- [ ] Organization khớp thông tin doanh nghiệp.
- [ ] Product/Offer khớp nội dung nhìn thấy.
- [ ] Price/availability đồng bộ.
- [ ] Breadcrumb khớp navigation.
- [ ] Rich Results Test không có critical error.

### Performance

- [ ] Ảnh LCP được ưu tiên đúng.
- [ ] Ảnh có width/height.
- [ ] Ảnh responsive và được nén.
- [ ] Bundle route được code-split.
- [ ] Không có layout shift do ảnh/font/banner.
- [ ] Đo LCP, INP, CLS trên mobile và desktop.

### Analytics

- [ ] Search Console domain property.
- [ ] GA4 production property.
- [ ] Ecommerce events đã QA.
- [ ] Không gửi PII vào analytics.
- [ ] Consent/cookie implementation phù hợp chính sách vận hành.
- [ ] Purchase event được xác nhận server-side hoặc từ order system.

---

## 20. Nguồn chính thức tham khảo

1. [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
2. [Google — Developer SEO guide](https://developers.google.com/search/docs/fundamentals/get-started-developers)
3. [Google — Helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
4. [Google — JavaScript SEO basics](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)
5. [Google — Fix JavaScript search problems](https://developers.google.com/search/docs/crawling-indexing/javascript/fix-search-javascript)
6. [Google — Canonicalization](https://developers.google.com/search/docs/crawling-indexing/canonicalization)
7. [Google — Specify canonical URLs](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
8. [Google — Build and submit a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
9. [Google — robots.txt introduction](https://developers.google.com/search/docs/crawling-indexing/robots/intro)
10. [Google — Structured data gallery](https://developers.google.com/search/docs/appearance/structured-data/search-gallery)
11. [Google — Product structured data](https://developers.google.com/search/docs/appearance/structured-data/product)
12. [Google — Merchant listing structured data](https://developers.google.com/search/docs/appearance/structured-data/merchant-listing)
13. [Google — Organization structured data](https://developers.google.com/search/docs/appearance/structured-data/organization)
14. [Google — Breadcrumb structured data](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb)
15. [Google — Core Web Vitals and Search](https://developers.google.com/search/docs/appearance/core-web-vitals)
16. [web.dev — Web Vitals](https://web.dev/articles/vitals)
17. [Google — Search Console monitoring](https://developers.google.com/search/docs/monitor-debug/search-console-start)

---

## 21. Các thông tin cần doanh nghiệp xác nhận trước khi triển khai

1. Domain production chính thức.
2. Tên pháp nhân/đơn vị vận hành website.
3. Quan hệ giữa PaxMoly Vietnam và Dermacoon.
4. Logo chuẩn dùng cho Organization schema.
5. Hotline, email, địa chỉ và giờ hỗ trợ chính thức.
6. Social profile chính thức.
7. SKU/GTIN từng sản phẩm.
8. Tình trạng hàng và nguồn price truth.
9. Chính sách giao hàng, đổi trả và hoàn tiền.
10. Xuất xứ và thông tin chịu trách nhiệm theo hồ sơ sản phẩm.
11. Danh sách claim/nồng độ đã được phê duyệt.
12. Có checkout trực tiếp hay chỉ chuyển khách sang kênh bán khác.
13. Có địa điểm vật lý phục vụ khách hay chỉ online.
14. Người chịu trách nhiệm chuyên môn cho nội dung hoạt chất.
15. Công cụ analytics/consent được doanh nghiệp phê duyệt.

Khi 15 mục này chưa được xác nhận, không nên publish schema hoặc metadata chứa thông tin suy đoán.
