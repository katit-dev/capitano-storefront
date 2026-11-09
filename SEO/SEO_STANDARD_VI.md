# Quy chuẩn SEO dùng chung

**Mã tài liệu:** SEO-STD-001  
**Phiên bản:** 1.0  
**Ngày ban hành:** 23/09/2026  
**Chu kỳ rà soát:** 6 tháng hoặc ngay khi có thay đổi lớn từ công cụ tìm kiếm  
**Phạm vi:** Website thương hiệu, nội dung, dịch vụ, thương mại điện tử và web application có URL công khai  
**Đối tượng:** Product Owner, SEO, Content, Design, Frontend, Backend, QA, DevOps và Analytics
**Checklist nghiệm thu:** [Checklist tiêu chuẩn SEO](./SEO_CHECKLIST_VI.md)

---

## 1. Mục đích

Tài liệu này là baseline SEO dùng chung cho mọi dự án web. Mục tiêu là bảo đảm:

- Công cụ tìm kiếm có thể crawl, render, hiểu và index đúng nội dung được phép công khai.
- Mỗi URL có mục đích, nội dung, metadata và canonical rõ ràng.
- Nội dung phục vụ người dùng trước, có nguồn gốc và mức độ tin cậy phù hợp.
- Website nhanh, ổn định, accessible và hoạt động tốt trên thiết bị di động.
- Structured data phản ánh đúng nội dung nhìn thấy, không tạo tín hiệu giả.
- Mọi thay đổi SEO được đo lường, kiểm thử và có người chịu trách nhiệm.
- Không hy sinh bảo mật, quyền riêng tư hoặc trải nghiệm để đổi lấy traffic ngắn hạn.

Quy chuẩn không cam kết thứ hạng. SEO là quá trình giúp nội dung đủ điều kiện được khám phá, hiểu và đánh giá; công cụ tìm kiếm vẫn tự quyết định crawl, index, canonical và cách hiển thị.

---

## 2. Cấp độ yêu cầu

| Từ khóa        | Ý nghĩa                                                                               |
| -------------- | ------------------------------------------------------------------------------------- |
| **BẮT BUỘC**   | Điều kiện phải đáp ứng. Vi phạm có thể chặn release hoặc cần ngoại lệ được phê duyệt. |
| **NÊN**        | Best practice mặc định. Có thể không áp dụng nếu có lý do kỹ thuật/nghiệp vụ rõ ràng. |
| **CÓ THỂ**     | Tùy chọn cải thiện; áp dụng khi phù hợp mục tiêu và nguồn lực.                        |
| **KHÔNG ĐƯỢC** | Hành vi bị cấm vì tạo rủi ro index, spam, pháp lý, bảo mật hoặc trải nghiệm.          |

### Thứ tự tài liệu

```text
Quy chuẩn SEO dùng chung
        ↓
Chiến lược SEO của dự án/thương hiệu
        ↓
Specification theo template/page type
        ↓
Ticket triển khai và test case
```

Tài liệu dự án được phép chi tiết hơn nhưng không được âm thầm hạ thấp baseline.

---

## 3. Quản trị và trách nhiệm

| Vai trò       | Trách nhiệm chính                                                  |
| ------------- | ------------------------------------------------------------------ |
| Product Owner | Chốt mục tiêu, phạm vi, ưu tiên và chấp nhận rủi ro                |
| SEO Lead      | Sở hữu quy chuẩn, keyword mapping, index policy và nghiệm thu SEO  |
| Content Lead  | Chất lượng, nguồn, tác giả, claim và lifecycle nội dung            |
| Design        | Hierarchy, mobile UX, accessible components và media specification |
| Frontend      | Semantic HTML, metadata, rendering, links, performance             |
| Backend       | Status code, redirect, API content, inventory và source of truth   |
| DevOps        | DNS, HTTPS, host redirect, caching, CDN, headers, logs             |
| QA            | Test chức năng, crawlability, metadata, schema và regression       |
| Analytics     | Search Console, analytics events, dashboard và data quality        |

### Quy trình ngoại lệ

Mọi ngoại lệ với yêu cầu **BẮT BUỘC** phải có:

1. Quy chuẩn bị vi phạm.
2. URL/template bị ảnh hưởng.
3. Lý do nghiệp vụ/kỹ thuật.
4. Rủi ro SEO và người dùng.
5. Biện pháp giảm thiểu.
6. Người phê duyệt.
7. Owner xử lý.
8. Ngày hết hạn ngoại lệ.

Ngoại lệ không có ngày hết hạn được xem là không hợp lệ.

---

## 4. Nguyên tắc cốt lõi

1. **Một URL — một mục đích chính.**
2. **Một nội dung chính — một URL canonical.**
3. **Nội dung quan trọng phải truy cập được bằng URL và link crawlable.**
4. **Metadata phải đúng nội dung người dùng nhìn thấy.**
5. **Không đánh dấu schema cho dữ liệu không hiển thị hoặc không có thật.**
6. **Không tạo trang hàng loạt chỉ để phủ biến thể từ khóa.**
7. **Không chặn crawl khi mục tiêu thực tế là noindex.**
8. **Không dùng JavaScript để che giấu nội dung hoặc phục vụ bot khác người dùng.**
9. **Tối ưu cho trải nghiệm thật, không chỉ điểm Lighthouse.**
10. **Đo kết quả kinh doanh, không chỉ thứ hạng.**

Google khuyến nghị nội dung hữu ích, đáng tin cậy và people-first thay vì nội dung chủ yếu tạo ra để thao túng thứ hạng: [Creating helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content).

---

## 5. Crawl và index

## 5.1. HTTP status code

### BẮT BUỘC

| Trạng thái  | Dùng khi                                              |
| ----------- | ----------------------------------------------------- |
| `200`       | URL hợp lệ, nội dung chính tồn tại                    |
| `301`/`308` | Chuyển vĩnh viễn sang URL mới                         |
| `302`/`307` | Chuyển tạm thời có chủ đích                           |
| `404`       | URL/tài nguyên không tồn tại                          |
| `410`       | Nội dung bị gỡ vĩnh viễn và muốn báo rõ hơn           |
| `401`/`403` | Nội dung yêu cầu xác thực/không được phép             |
| `429`       | Rate limit tạm thời, kèm retry policy hợp lý          |
| `5xx`       | Lỗi server thực tế, không dùng để che nội dung bị xóa |

- Trang lỗi **KHÔNG ĐƯỢC** trả `200` nếu nội dung chính không tồn tại.
- Redirect chain NÊN không vượt quá một bước trong internal link.
- Redirect loop **BẮT BUỘC** được phát hiện trước release.
- Internal link **BẮT BUỘC** trỏ thẳng tới URL cuối, không cố tình đi qua redirect.
- Staging **BẮT BUỘC** được bảo vệ bằng authentication hoặc network restriction; không chỉ dựa vào robots.txt.

### Soft 404

Các trường hợp thường tạo soft 404:

- Product slug không tồn tại nhưng SPA vẫn trả `200`.
- Trang “không tìm thấy kết quả” có rất ít giá trị nhưng được index.
- Hàng nghìn trang địa phương/filter dùng cùng nội dung mỏng.
- URL bị xóa redirect về trang chủ không liên quan.

Với SPA, cần 404 thật ở server/edge hoặc route lỗi có `noindex` và chiến lược rõ ràng. Nguồn: [Google JavaScript SEO basics](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics).

## 5.2. robots.txt

### BẮT BUỘC

- File đặt tại `/robots.txt` của từng host/protocol.
- Production không được vô tình `Disallow: /`.
- Không chặn JS, CSS hoặc ảnh cần để render nội dung chính.
- Khai báo sitemap production bằng URL tuyệt đối.
- Không đưa secret, URL private hoặc dữ liệu nhạy cảm vào robots.txt.

Ví dụ:

```text
User-agent: *
Allow: /

Sitemap: https://www.example.com/sitemap.xml
```

Robots.txt dùng để quản lý crawler access, không phải cơ chế bảo mật và không phải cách đáng tin cậy để xóa URL khỏi index. Nguồn: [Google robots.txt introduction](https://developers.google.com/search/docs/crawling-indexing/robots/intro).

## 5.3. Meta robots và X-Robots-Tag

- Trang indexable mặc định không cần khai báo `index,follow`.
- Dùng `noindex` cho trang không muốn xuất hiện trong Search nhưng vẫn cho phép crawler truy cập để đọc chỉ thị.
- **KHÔNG ĐƯỢC** vừa chặn URL trong robots.txt vừa kỳ vọng Google nhìn thấy `noindex` bên trong URL đó.
- File PDF/media cần kiểm soát index CÓ THỂ dùng `X-Robots-Tag` response header.
- `nofollow` cấp trang chỉ dùng khi thực sự không muốn crawler theo toàn bộ links; không dùng để “giữ PageRank”.
- Sau khi URL đã rời index, có thể cân nhắc thay đổi crawl policy dựa trên mục tiêu dài hạn.

## 5.4. Sitemap XML

### BẮT BUỘC với site có nhiều URL hoặc nội dung thay đổi

Sitemap chỉ chứa URL:

- Trả `200`.
- Indexable.
- Canonical tự trỏ.
- Có giá trị tìm kiếm.
- Dùng host/protocol production chính thức.

Không chứa:

- Redirect.
- 404/410/5xx.
- `noindex`.
- Canonical sang URL khác.
- Search result nội bộ.
- URL có tracking parameter.
- URL staging/local.

Quy tắc:

- Dùng URL tuyệt đối, UTF-8.
- `lastmod` chỉ thay đổi khi nội dung chính thay đổi đáng kể.
- Không thêm `changefreq`/`priority` nếu pipeline không quản lý chính xác.
- Sitemap lớn phải tách file và dùng sitemap index.
- Submit trong Search Console/Bing Webmaster Tools.

Nguồn: [Google — Build and submit a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap).

---

## 6. Canonical và duplicate content

## 6.1. Quy chuẩn canonical

### BẮT BUỘC

- Mỗi trang indexable có một canonical hợp lệ.
- Canonical là URL tuyệt đối HTTPS.
- Canonical trỏ về chính URL đó trừ khi có chủ đích gom duplicate.
- Canonical có status `200`, không redirect và không noindex.
- URL canonical phải nhất quán giữa:
  - `<link rel="canonical">`
  - sitemap
  - internal links
  - hreflang
  - Open Graph URL
  - structured data
- Không tạo nhiều canonical xung đột trong HTML/header.
- Không thay canonical sau khi render sang một URL khác với HTML ban đầu.

### Tín hiệu canonical

Ưu tiên xử lý duplicate bằng:

1. Redirect vĩnh viễn nếu URL cũ không còn cần truy cập.
2. `rel="canonical"` khi nhiều URL vẫn phải tồn tại.
3. Internal link nhất quán.
4. Chỉ đưa URL canonical vào sitemap.

Google xem redirect và canonical annotation là tín hiệu mạnh hơn sitemap: [Specify canonical URLs](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls).

## 6.2. URL parameter

Mỗi parameter phải được phân loại:

| Loại          | Ví dụ                    | Index policy mặc định                              |
| ------------- | ------------------------ | -------------------------------------------------- |
| Tracking      | `utm_source`, `gclid`    | Canonical về URL sạch                              |
| UI state      | `focus`, `modal`, `view` | Không index riêng                                  |
| Sort          | `sort=price`             | Không index riêng                                  |
| Search nội bộ | `q=...`                  | `noindex,follow` hoặc không tạo URL indexable      |
| Filter        | `color=`, `category=`    | Chỉ index khi có search demand và content riêng    |
| Pagination    | `page=2`                 | URL crawlable, self-canonical nếu có giá trị riêng |

Không tạo faceted navigation indexable không giới hạn.

---

## 7. URL và kiến trúc thông tin

## 7.1. URL

### BẮT BUỘC

- Chữ thường.
- Dùng dấu gạch ngang để tách từ.
- Không chứa session ID hoặc dữ liệu người dùng.
- Ổn định theo thời gian.
- Có ý nghĩa với người dùng.
- Không phụ thuộc URL fragment `#` để định danh nội dung cần index.
- Không để nhiều URL khác nhau trả cùng nội dung mà không có canonical/redirect.

### NÊN

- Dùng slug ngắn nhưng đủ mô tả.
- Dùng tiếng Việt không dấu nếu hệ thống cần tương thích rộng.
- Tránh ngày/tháng trong URL evergreen.
- Tránh cấu trúc thư mục quá sâu nếu không phản ánh hierarchy thật.
- Không nhồi keyword hoặc lặp từ trong slug.

## 7.2. Information architecture

```text
Home
├── Category/Service hub
│   ├── Detail/Product
│   └── Supporting content
├── Knowledge hub
│   ├── Pillar content
│   └── Supporting articles
└── Trust pages
    ├── About
    ├── Contact
    └── Policies
```

- Mọi URL indexable **BẮT BUỘC** được link từ ít nhất một URL crawlable.
- Trang quan trọng NÊN cách trang chủ không quá ba click.
- Navigation không được chỉ tồn tại sau hover/tương tác mà crawler không kích hoạt.
- Breadcrumb NÊN phản ánh đường đi của người dùng.
- Không tạo orphan pages.

---

## 8. JavaScript, SSR và rendering

## 8.1. Nội dung quan trọng

### BẮT BUỘC

Crawler sau render phải thấy:

- Title và description đúng route.
- Canonical.
- H1 và nội dung chính.
- Link nội bộ.
- Structured data.
- Hình ảnh/URL media quan trọng.
- Status/index directive đúng.

## 8.2. Chính sách rendering

- Website nội dung/ecommerce NÊN dùng SSR, SSG hoặc prerender cho landing page indexable.
- CSR-only cần bằng chứng kiểm thử rằng Google render đầy đủ và không tạo soft 404.
- Dynamic rendering theo user-agent **KHÔNG NÊN** dùng như kiến trúc lâu dài.
- Nội dung quan trọng **KHÔNG ĐƯỢC** yêu cầu click, scroll, login hoặc localStorage mới xuất hiện.
- Link điều hướng **BẮT BUỘC** dùng phần tử `<a href>` với URL thật.
- History API được phép; hash routing không dùng cho nội dung indexable.
- Mỗi screen/content độc lập phải có URL riêng.

Google xử lý JavaScript theo các giai đoạn crawl, render và index; SSR/static rendering vẫn giúp nội dung nhanh hơn cho người dùng và crawler: [JavaScript SEO basics](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics).

## 8.3. Kiểm thử rendering

Với mỗi template mới:

1. Tắt JavaScript và kiểm tra nội dung HTML ban đầu nếu dùng SSR/SSG.
2. Kiểm tra rendered DOM.
3. Dùng URL Inspection/Rich Results Test trên môi trường truy cập được.
4. Kiểm tra console/network error.
5. So sánh nội dung người dùng và crawler nhận được.
6. Đảm bảo không có cloaking.

---

## 9. Metadata

## 9.1. Title

### BẮT BUỘC

- Mỗi URL indexable có title duy nhất.
- Mô tả đúng nội dung chính.
- Không rỗng, không placeholder, không chỉ có tên thương hiệu.
- Không lặp keyword vô nghĩa.
- Title render cuối cùng phải giống hoặc tương thích với HTML ban đầu.

### Công thức tham khảo

```text
Trang chủ: Định vị chính | Thương hiệu
Danh mục: Danh mục + lợi ích chính | Thương hiệu
Sản phẩm: Tên sản phẩm + thuộc tính phân biệt | Thương hiệu
Dịch vụ: Dịch vụ + khu vực/đối tượng thật | Thương hiệu
Bài viết: Câu hỏi/lợi ích chính | Chuyên mục hoặc thương hiệu
```

Không có giới hạn ký tự tuyệt đối. Viết súc tích, ưu tiên thông tin khác biệt ở đầu và kiểm tra cách hiển thị thực tế.

## 9.2. Meta description

- Duy nhất theo trang khi có thể.
- Tóm tắt đúng lợi ích/nội dung.
- Có lời mời hành động tự nhiên nếu phù hợp.
- Không chứa giá, giảm giá, giao hàng hoặc availability nếu dữ liệu có thể sai.
- Không nhồi keyword.
- Không xem description là yếu tố xếp hạng trực tiếp; mục tiêu chính là giúp snippet/CTR.

Google có thể lấy snippet từ nội dung trang thay vì meta description: [SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide).

## 9.3. Open Graph và social metadata

Trang chia sẻ công khai NÊN có:

```html
<meta property="og:type" content="website" />
<meta property="og:site_name" content="Brand" />
<meta property="og:title" content="Page title" />
<meta property="og:description" content="Page description" />
<meta property="og:url" content="https://www.example.com/page" />
<meta property="og:image" content="https://www.example.com/og/page.jpg" />
<meta name="twitter:card" content="summary_large_image" />
```

- OG URL phải trùng canonical.
- Ảnh phải truy cập công khai, URL tuyệt đối.
- Không dùng một ảnh chung không liên quan cho mọi content page nếu có thể tạo ảnh riêng.

---

## 10. Semantic HTML và on-page

### BẮT BUỘC

- Mỗi trang có một chủ đề chính rõ ràng.
- H1 mô tả chủ đề chính.
- Heading theo hierarchy logic; không chọn heading chỉ vì kích thước font.
- Nội dung chính nằm trong `<main>`.
- Navigation dùng `<nav>`.
- Link dùng `<a>`; action dùng `<button>`.
- Anchor text mô tả được trang đích.
- Ảnh thông tin có alt; ảnh trang trí dùng alt rỗng.
- Nội dung quan trọng không được chỉ nằm trong canvas/image.
- Bảng phải dùng markup bảng khi dữ liệu có quan hệ hàng/cột.

### NÊN

- Có breadcrumb cho hierarchy sâu.
- Có mục lục cho nội dung dài.
- Trả lời trực tiếp câu hỏi chính gần đầu trang.
- Dùng list/table/definition phù hợp nội dung.
- Có ngày xuất bản/cập nhật khi người dùng cần đánh giá độ mới.
- Hiển thị tác giả/người duyệt khi chủ đề cần chuyên môn.

Accessibility không chỉ phục vụ SEO nhưng giúp nội dung, navigation và tương tác rõ ràng hơn cho cả người dùng lẫn máy.

---

## 11. Structured data

## 11.1. Nguyên tắc

### BẮT BUỘC

- Dùng vocabulary `https://schema.org`.
- Ưu tiên JSON-LD nếu nền tảng hỗ trợ.
- Dữ liệu khớp nội dung người dùng nhìn thấy.
- Chỉ dùng type phù hợp bản chất trang.
- URL, giá, trạng thái, ngày và định danh phải lấy từ source of truth.
- Test bằng Rich Results Test và schema validator.
- Không có critical error trước release.

### KHÔNG ĐƯỢC

- Tạo review/rating giả.
- Đánh dấu nội dung ẩn không dành cho người dùng.
- Dùng FAQ/Product/Article schema cho trang không đáp ứng định nghĩa.
- Gắn nhiều schema xung đột chỉ để thử chiếm rich result.
- Hard-code price/availability nếu vận hành có thể thay đổi.

## 11.2. Mapping type thường dùng

| Page type                | Schema thường phù hợp              |
| ------------------------ | ---------------------------------- |
| Trang chủ thương hiệu    | `Organization`, `WebSite`          |
| Doanh nghiệp địa phương  | `LocalBusiness` subtype phù hợp    |
| Sản phẩm bán trực tiếp   | `Product` + `Offer`                |
| Review sản phẩm biên tập | `Product` + review fields phù hợp  |
| Bài viết                 | `Article`/`BlogPosting`            |
| Breadcrumb               | `BreadcrumbList`                   |
| Video page               | `VideoObject`                      |
| Profile chuyên gia       | `ProfilePage`/`Person` khi phù hợp |
| Job detail               | `JobPosting` nếu đáp ứng yêu cầu   |
| Event                    | `Event` nếu là sự kiện thực        |

Structured data giúp công cụ tìm kiếm hiểu nội dung và làm trang đủ điều kiện cho rich results, không bảo đảm hiển thị: [Google structured data gallery](https://developers.google.com/search/docs/appearance/structured-data/search-gallery).

## 11.3. ID graph

NÊN dùng `@id` ổn định để liên kết entity:

```text
https://www.example.com/#organization
https://www.example.com/#website
https://www.example.com/page#webpage
https://www.example.com/product/slug#product
```

---

## 12. Nội dung và E-E-A-T

## 12.1. Tiêu chuẩn nội dung

Mọi nội dung indexable **BẮT BUỘC**:

- Có mục tiêu người dùng và search intent rõ ràng.
- Cung cấp giá trị độc lập, không chỉ viết lại nguồn khác.
- Chính xác, dễ kiểm chứng và cập nhật.
- Không có lỗi chính tả/logic nghiêm trọng.
- Có owner nội dung.
- Có ngày review tiếp theo với chủ đề dễ lỗi thời.
- Có internal link hợp lý.
- Không tạo chỉ để đạt số lượng bài hoặc word count.

## 12.2. Who, How, Why

### Who

- Ai viết?
- Ai duyệt?
- Người đó có kinh nghiệm/chuyên môn gì liên quan?
- Có trang tác giả hoặc thông tin tổ chức không?

### How

- Dữ liệu/thử nghiệm/đánh giá được thực hiện thế nào?
- Nguồn nào được dùng?
- AI/automation tham gia ở mức nào?
- Hình ảnh hoặc trải nghiệm gốc ở đâu?

### Why

- Nội dung giúp người đọc giải quyết vấn đề gì?
- Nếu không có traffic từ Google, nội dung này còn hữu ích với khách hàng không?

## 12.3. Chính sách nội dung AI

- AI CÓ THỂ hỗ trợ outline, research discovery, kiểm tra ngôn ngữ và biến thể format.
- Người chịu trách nhiệm **BẮT BUỘC** xác minh sự thật, nguồn và claim.
- Nội dung AI **KHÔNG ĐƯỢC** xuất bản hàng loạt mà không review.
- Không dùng AI tạo trải nghiệm, số liệu, trích dẫn, tác giả hoặc review giả.
- Disclosure NÊN có khi người dùng hợp lý sẽ muốn biết nội dung được tạo như thế nào.
- Automation để thao túng thứ hạng hoặc tạo scaled low-value content bị cấm.

## 12.4. YMYL

Với nội dung sức khỏe, tài chính, pháp lý, an toàn hoặc quyết định ảnh hưởng lớn:

- BẮT BUỘC có quy trình review chuyên môn.
- BẮT BUỘC trích nguồn uy tín cho claim quan trọng.
- BẮT BUỘC ghi rõ giới hạn thông tin và khi nào cần gặp chuyên gia.
- KHÔNG ĐƯỢC biến nội dung marketing thành chẩn đoán/điều trị nếu không đủ thẩm quyền.
- NÊN hiển thị ngày cập nhật và reviewer.

---

## 13. Keyword và search intent

## 13.1. Mapping

Mỗi keyword cluster cần ghi:

| Trường             | Nội dung                                                  |
| ------------------ | --------------------------------------------------------- |
| Cluster            | Chủ đề tổng                                               |
| Primary intent     | Informational/commercial/transactional/navigational/local |
| Primary URL        | URL ưu tiên                                               |
| Supporting queries | Biến thể và câu hỏi                                       |
| Content type       | Category/product/service/article/tool                     |
| Funnel stage       | Awareness/consideration/conversion/retention              |
| Owner              | Người chịu trách nhiệm                                    |

## 13.2. Cannibalization

Không tự động xem mọi URL cùng nhận một query là cannibalization. Chỉ xử lý khi:

- Các URL có cùng intent và nội dung trùng đáng kể.
- Google liên tục đổi URL xếp hạng.
- CTR/rank/conversion phân tán không có lợi.
- Người dùng khó phân biệt trang nào phù hợp.

Hướng xử lý:

1. Khác intent: làm rõ nội dung và internal link.
2. Cùng intent: merge + redirect/canonical khi phù hợp.
3. Trang hỗ trợ: định vị lại long-tail và link về pillar.

## 13.3. Keyword usage

- Không có mật độ từ khóa bắt buộc.
- Dùng ngôn ngữ tự nhiên, entity, thuật ngữ và câu hỏi thật.
- Keyword chính NÊN xuất hiện hợp lý trong title, h1, intro và nội dung.
- Không hy sinh clarity để thêm exact match.

---

## 14. Media SEO

## 14.1. Image

### BẮT BUỘC

- Alt đúng mục đích ảnh.
- Ảnh trang trí dùng `alt=""`.
- URL ảnh crawlable nếu muốn xuất hiện trong Search.
- Không lazy-load ảnh LCP.
- Khai báo width/height hoặc aspect-ratio để tránh CLS.
- Không dùng ảnh chứa toàn bộ nội dung thay cho HTML.

### NÊN

- Tên file mô tả, không dùng chuỗi ngẫu nhiên nếu pipeline cho phép.
- WebP/AVIF và responsive `srcset`/`sizes`.
- CDN và cache dài hạn.
- Caption/context gần ảnh khi có giá trị.
- Ảnh gốc, chất lượng cao, đúng bản quyền.

Lazy loading phải tải khi media vào viewport, không phụ thuộc click/scroll thủ công mà crawler không thực hiện: [Google lazy-loading guidance](https://developers.google.com/search/docs/crawling-indexing/javascript/lazy-loading).

## 14.2. Video

- Video quan trọng NÊN có watch page riêng.
- Có title, description, thumbnail, duration và transcript.
- Thumbnail phải crawlable, ổn định.
- Dùng `VideoObject` khi đáp ứng yêu cầu.
- Không autoplay có âm thanh.
- Transcript phải phản ánh nội dung thật, không nhồi keyword.

---

## 15. Core Web Vitals và page experience

## 15.1. Ngưỡng chuẩn

Đánh giá tại percentile 75, riêng mobile và desktop:

| Chỉ số | Tốt        | Cần cải thiện | Kém        |
| ------ | ---------- | ------------- | ---------- |
| LCP    | ≤ 2,5 giây | 2,5–4,0 giây  | > 4,0 giây |
| INP    | ≤ 200 ms   | 200–500 ms    | > 500 ms   |
| CLS    | ≤ 0,1      | 0,1–0,25      | > 0,25     |

Nguồn: [web.dev Web Vitals](https://web.dev/articles/vitals) và [Google Search Central Core Web Vitals](https://developers.google.com/search/docs/appearance/core-web-vitals).

## 15.2. Quality gate

- Template mới NÊN đạt Lighthouse Performance ≥ 80 trên mobile test ổn định; đây là lab guardrail, không thay thế field data.
- Không release regression nghiêm trọng làm LCP/CLS vượt ngưỡng trên page type doanh thu cao mà không có phê duyệt.
- Field data là nguồn ưu tiên để đánh giá trải nghiệm thực.
- Theo dõi CWV theo page template, device và release.

## 15.3. Checklist performance

- TTFB/CDN/cache.
- Critical CSS và render-blocking resources.
- LCP image priority.
- Font preload/self-host và `font-display`.
- Image/video size.
- JavaScript bundle và long tasks.
- Hydration cost.
- Third-party scripts.
- Layout reservation.
- Animation chỉ dùng transform/opacity khi phù hợp.
- `prefers-reduced-motion`.

---

## 16. Mobile và responsive

- Nội dung chính desktop/mobile phải tương đương.
- Metadata và structured data không được thiếu trên mobile.
- Navigation và internal links quan trọng phải dùng được trên mobile.
- Không ẩn nội dung có giá trị chỉ để “gọn mobile” nếu desktop vẫn dùng để index.
- Touch target đủ lớn, không có horizontal overflow ngoài chủ đích.
- Interstitial không che nội dung chính ngay khi vào trang.
- Không bắt cài app để tiếp cận nội dung công khai.

---

## 17. International SEO

Chỉ áp dụng khi có nhiều ngôn ngữ/khu vực.

### BẮT BUỘC

- Mỗi ngôn ngữ có URL riêng.
- Không dịch chỉ header/footer trong khi body giữ nguyên ngôn ngữ khác.
- `lang` đúng trên HTML.
- Hreflang dùng mã ngôn ngữ/khu vực hợp lệ.
- Hreflang tự tham chiếu và reciprocal.
- Mọi hreflang URL indexable, canonical đúng và trả `200`.
- `x-default` dùng cho trang selector/global fallback khi phù hợp.
- Không auto-redirect bắt buộc theo IP/ngôn ngữ làm crawler không truy cập được phiên bản khác.

Ví dụ:

```html
<link rel="alternate" hreflang="vi-VN" href="https://example.com/vi/page" />
<link rel="alternate" hreflang="en" href="https://example.com/en/page" />
<link rel="alternate" hreflang="x-default" href="https://example.com/page" />
```

---

## 18. Ecommerce SEO

## 18.1. Product page

Mỗi product page NÊN có:

- Tên sản phẩm khác biệt.
- Ảnh/video thực tế.
- Giá và availability đúng.
- SKU/GTIN/brand khi có.
- Mô tả riêng, không chỉ copy supplier.
- Specs/thành phần/kích thước.
- Cách dùng và lưu ý.
- Giao hàng/đổi trả.
- Review thật và có cơ chế kiểm duyệt.
- Product + Offer schema.
- Sản phẩm thay thế/liên quan.

## 18.2. Out-of-stock và discontinued

| Trường hợp                        | Xử lý đề xuất                             |
| --------------------------------- | ----------------------------------------- |
| Hết tạm thời, sẽ có lại           | Giữ 200, OutOfStock, cho đăng ký nhận tin |
| Ngừng bán nhưng trang còn nhu cầu | Giữ trang thông tin, gợi ý thay thế       |
| Có sản phẩm kế nhiệm tương đương  | 301 khi thực sự thay thế một-một          |
| Không còn giá trị/không thay thế  | 404 hoặc 410                              |

Không redirect hàng loạt sản phẩm hết bán về trang chủ.

## 18.3. Filter/faceted navigation

- Chỉ index combination có demand, inventory ổn định và nội dung riêng.
- Các combination khác không được tạo crawl space vô hạn.
- UI filter vẫn phải hoạt động cho người dùng kể cả khi URL không index.
- Canonical/noindex/robots/internal link phải được thiết kế đồng bộ, không chắp vá.

## 18.4. Merchant data

- Website, Product schema và Merchant Center feed phải đồng bộ price/availability.
- Không tự tạo GTIN.
- Shipping/return policy phải đúng vận hành.
- Purchase event chỉ gửi khi đơn hàng được xác nhận.

Nguồn: [Google Product structured data](https://developers.google.com/search/docs/appearance/structured-data/product) và [Merchant listing](https://developers.google.com/search/docs/appearance/structured-data/merchant-listing).

---

## 19. Local SEO

Chỉ áp dụng khi doanh nghiệp có hiện diện/địa bàn phục vụ thực.

- NAP: name, address, phone phải nhất quán.
- Trang location chỉ tạo cho địa điểm thực và có nội dung riêng.
- Không tạo doorway pages hàng loạt theo tỉnh/quận.
- Google Business Profile phải dùng category, giờ mở cửa, ảnh và URL đúng.
- LocalBusiness schema phải khớp thông tin công khai.
- Review không được mua, tự tạo hoặc ép đổi lấy ưu đãi trái chính sách nền tảng.
- Doanh nghiệp online-only không giả storefront vật lý.

---

## 20. Internal và external links

## 20.1. Internal links

- Dùng `<a href>` crawlable.
- Anchor mô tả trang đích.
- Link từ page mạnh/phù hợp tới page cần ưu tiên.
- Không lạm dụng exact-match anchor lặp lại máy móc.
- Không có broken internal link trước release.
- Không link tới redirect nếu có thể cập nhật đích cuối.
- Related content/product phải dựa trên quan hệ thật.

## 20.2. External links

- Link nguồn chính thống khi nội dung cần bằng chứng.
- Link quảng cáo/tài trợ dùng `rel="sponsored"`.
- User-generated links có rủi ro dùng `rel="ugc"`.
- `nofollow` dùng khi không muốn endorsement và không có qualifier phù hợp hơn.
- Link mở tab mới cần xử lý bảo mật phù hợp.
- Không mua/bán links nhằm thao túng ranking.

---

## 21. Content lifecycle

Mỗi content asset cần có:

- Owner.
- Ngày publish.
- Ngày review gần nhất.
- Review cadence.
- Status: draft/active/update/merge/redirect/archive/remove.
- Primary keyword cluster và intent.
- Conversion/supporting goal.

### Quy trình định kỳ

1. Giữ nguyên nếu chính xác và còn hữu ích.
2. Cập nhật khi thông tin thay đổi.
3. Merge khi nhiều trang cùng intent và giá trị phân tán.
4. Redirect khi có replacement tương đương.
5. Archive/noindex khi cần người dùng truy cập nhưng không cần Search.
6. 404/410 khi nội dung không còn giá trị và không có replacement.

Không đổi ngày chỉ để tạo cảm giác mới.

---

## 22. Analytics và đo lường

## 22.1. Công cụ tối thiểu

- Google Search Console.
- Web analytics được tổ chức phê duyệt.
- Tag manager nếu thật sự cần.
- PageSpeed Insights/CrUX/CWV report.
- Rank tracking có sampling hợp lý.
- Log analysis cho site lớn hoặc crawl-sensitive.

## 22.2. KPI framework

### Visibility

- Indexed canonical URLs.
- Impressions.
- Query/page coverage.
- Non-brand visibility.
- Rich result eligibility/errors.

### Engagement

- Organic landing sessions/users.
- Engaged sessions.
- Scroll/content interaction khi có ý nghĩa.
- Internal click từ content sang conversion pages.

### Conversion

- Leads.
- Add to cart/begin checkout/purchase.
- Organic revenue.
- Assisted conversions.
- Conversion rate theo landing page/query cluster.

### Quality

- CWV pass rate.
- Crawl/index errors.
- Duplicate title/canonical.
- Broken links.
- Content freshness/SLA.

## 22.3. Data quality và privacy

- Không gửi PII trong URL, event name hoặc analytics parameters.
- Consent phải phù hợp chính sách/pháp lý áp dụng.
- Bot/internal traffic cần được đánh giá khi phân tích.
- Purchase cần transaction ID duy nhất.
- Không coi pageview là conversion.
- Dashboard phải ghi nguồn, timezone, attribution và filter.

Nguồn monitoring: [Google — Search Console](https://developers.google.com/search/docs/monitor-debug/search-console-start).

---

## 23. Release quality gates

## 23.1. P0 — Chặn release

- Production có `noindex` toàn site ngoài chủ đích.
- Robots.txt chặn toàn site hoặc assets render quan trọng.
- Canonical toàn site trỏ sai host/staging.
- Widespread 5xx/blank page/hydration failure.
- Redirect loop.
- Sitemap production chứa localhost/staging trên diện rộng.
- Structured data chứa giá/đánh giá giả có rủi ro cao.
- Analytics gửi PII/secrets.
- Migration làm mất URL quan trọng mà không redirect.

## 23.2. P1 — Phải sửa trước release hoặc có ngoại lệ

- Title/description/canonical thiếu trên template indexable.
- Soft 404 trên product/detail routes.
- Hreflang broken cluster.
- Product schema critical error.
- Internal links quan trọng không crawlable.
- Mobile thiếu nội dung chính.
- Regression CWV nghiêm trọng trên template doanh thu.
- Broken links diện rộng.

## 23.3. P2 — Có thể vào backlog có owner

- Metadata chưa tối ưu CTR nhưng vẫn đúng.
- Thiếu một số supporting schema không critical.
- Ảnh chưa đạt format tối ưu nhưng performance vẫn trong ngưỡng.
- Internal linking còn cơ hội cải thiện.
- Content cần refresh nhưng chưa sai/harmful.

---

## 24. Checklist PR cho developer

### Route/template mới

- [ ] URL pattern được duyệt.
- [ ] Status code đúng.
- [ ] Index/noindex policy rõ ràng.
- [ ] Title và description riêng.
- [ ] Canonical tuyệt đối.
- [ ] OG/Twitter metadata.
- [ ] H1 và semantic structure.
- [ ] Internal link crawlable.
- [ ] Breadcrumb nếu cần.
- [ ] Structured data đúng type.
- [ ] Sitemap inclusion/exclusion đúng.
- [ ] 404 state đúng.
- [ ] Mobile parity.
- [ ] Image alt/size/loading.
- [ ] Analytics events.
- [ ] Test SSR/prerender/rendered DOM.

### Migration/refactor

- [ ] URL inventory trước/sau.
- [ ] Redirect map một-một.
- [ ] Không redirect chain.
- [ ] Canonical/hreflang/sitemap cập nhật.
- [ ] Internal link đổi sang URL mới.
- [ ] Staging được bảo vệ.
- [ ] Rollback plan.
- [ ] Monitoring 404/5xx/traffic sau launch.

---

## 25. QA protocol

## 25.1. Trước release

1. Crawl staging đã được cấp quyền nội bộ.
2. Kiểm tra status/indexability/canonical.
3. So sánh title, description, h1.
4. Validate structured data.
5. Kiểm tra internal links và assets.
6. Test responsive/mobile.
7. Test JS disabled/rendered HTML khi phù hợp.
8. Chạy Lighthouse trên template đại diện.
9. Kiểm tra analytics trong debug mode.
10. Review content/claim/legal.

## 25.2. Sau release 0–24 giờ

- Robots.txt và sitemap production.
- Canonical host/redirect.
- URL quan trọng trả đúng status.
- Search Console live test/URL inspection mẫu.
- Analytics realtime.
- Server/client errors.
- 404/5xx logs.
- Rich Results Test mẫu.

## 25.3. Sau release 7–28 ngày

- Index coverage.
- Google-selected canonical.
- Impressions/clicks theo template.
- CWV field data khi đủ mẫu.
- Structured data enhancement reports.
- Ranking/traffic anomaly.
- Crawl stats/logs nếu site lớn.

---

## 26. SEO incident response

### Sự cố nghiêm trọng

- Organic traffic giảm đột ngột toàn site.
- Nhiều URL rời index.
- Robots/noindex/canonical sai diện rộng.
- Site bị manual action/security issue.
- Migration mất redirect.
- Server 5xx kéo dài.

### Quy trình

1. Xác định thời điểm bắt đầu và release liên quan.
2. Kiểm tra monitoring, Search Console, status và source HTML.
3. Khoanh vùng host, directory, template, device, country.
4. Dừng release tiếp theo nếu còn làm tăng phạm vi.
5. Rollback/hotfix P0.
6. Ghi timeline và quyết định.
7. Theo dõi recovery; không gửi request indexing hàng loạt thiếu kiểm soát.
8. Postmortem: nguyên nhân gốc, guardrail, owner và deadline.

Không mặc định quy mọi biến động cho “Google update”; phải loại trừ lỗi kỹ thuật, tracking, seasonality, demand và thay đổi nội dung trước.

---

## 27. Những hành vi bị cấm

- Cloaking hoặc phục vụ nội dung khác cho bot nhằm thao túng.
- Keyword stuffing, hidden text hoặc doorway pages.
- Scaled low-value content.
- Scrape/copy nội dung không tạo giá trị mới.
- Fake author, fake expert, fake review, fake rating.
- Link scheme mua/bán để thao túng ranking.
- Structured data không khớp nội dung.
- Tạo location pages cho địa điểm không tồn tại.
- Nhồi URL search/filter vô hạn vào crawl graph.
- Dùng robots.txt như biện pháp bảo mật.
- Đưa PII/secrets vào URL, sitemap, schema hoặc analytics.
- Tuyên bố “đảm bảo top 1”.

---

## 28. Mẫu specification SEO cho một page type

```md
# Page type: [Tên template]

## Mục tiêu

- User intent:
- Business goal:
- Primary audience:

## URL

- Pattern:
- Example:
- Index policy:
- Canonical rule:
- Parameter rule:

## Metadata

- Title formula:
- Description formula:
- OG type/image:

## Content

- H1:
- Required sections:
- Author/reviewer:
- Freshness SLA:

## Structured data

- Type:
- Required source fields:

## Internal links

- Inbound sources:
- Outbound targets:

## Technical

- Rendering:
- Status states:
- Sitemap:
- Hreflang:

## Analytics

- Events:
- KPI:

## QA acceptance criteria

- [ ] ...
```

---

## 29. Mẫu SEO exception

```md
# SEO Exception

- ID:
- Ngày tạo:
- Quy chuẩn bị ngoại lệ:
- URL/template:
- Lý do:
- Rủi ro:
- Biện pháp giảm thiểu:
- Owner:
- Người phê duyệt:
- Ngày hết hạn:
- Ticket xử lý dứt điểm:
```

---

## 30. Nguồn chuẩn tham khảo

1. [Google Search Essentials và tài liệu SEO](https://developers.google.com/search/docs)
2. [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
3. [Google — Developer SEO guide](https://developers.google.com/search/docs/fundamentals/get-started-developers)
4. [Google — Helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
5. [Google — How Search works](https://developers.google.com/search/docs/fundamentals/how-search-works)
6. [Google — JavaScript SEO basics](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)
7. [Google — Canonicalization](https://developers.google.com/search/docs/crawling-indexing/canonicalization)
8. [Google — Specify canonical URLs](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
9. [Google — Build and submit a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
10. [Google — robots.txt introduction](https://developers.google.com/search/docs/crawling-indexing/robots/intro)
11. [Google — Structured data gallery](https://developers.google.com/search/docs/appearance/structured-data/search-gallery)
12. [Google — Core Web Vitals and Search](https://developers.google.com/search/docs/appearance/core-web-vitals)
13. [web.dev — Web Vitals](https://web.dev/articles/vitals)
14. [Schema.org vocabulary](https://schema.org/)
15. [Google — Monitor with Search Console](https://developers.google.com/search/docs/monitor-debug/search-console-start)

---

## 31. Lịch sử phiên bản

| Phiên bản | Ngày       | Thay đổi                                  |
| --------- | ---------- | ----------------------------------------- |
| 1.0       | 23/09/2026 | Ban hành quy chuẩn SEO dùng chung lần đầu |
