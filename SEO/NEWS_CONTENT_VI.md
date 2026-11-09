# Trang tin tức PaxMoly

Trang `/tin-tuc` có 6 bài viết ban đầu, chia thành ba chuyên mục. Nội dung ở `src/data/news.ts`; mỗi bài có slug riêng, mô tả, ngày xuất bản, mục lục, câu hỏi, nguồn tham khảo và sản phẩm liên quan.

Các bài kiến thức dẫn nguồn từ American Academy of Dermatology. Các bài sản phẩm dựa trên danh mục đang có, không phải trải nghiệm thử nghiệm thực tế. Không tự thêm sự kiện, kết quả điều trị, đánh giá khách hàng hoặc người duyệt chuyên môn chưa xác nhận.

## Thêm và sửa bài

- Thêm bài vào `NEWS_ARTICLES`, dùng slug duy nhất và ID sản phẩm có thật.
- Đối chiếu tên, dung tích và thành phần với nhãn hoặc tài liệu sản phẩm trước khi sửa thông tin.
- Giữ nguyên ngày xuất bản khi chỉnh sửa bài cũ; khi có cập nhật nội dung đáng kể, bổ sung ngày sửa thật và đồng bộ dữ liệu cấu trúc.
- Viết nội dung hữu ích, không nhồi từ khóa hoặc sao chép nguyên bài từ nguồn tham khảo.
- Kiểm tra giao diện máy tính, điện thoại, bộ lọc và liên kết sau khi thêm bài.

## SEO kỹ thuật

`npm run build` dựng sẵn HTML cho danh sách tin và từng bài bằng chính giao diện React đang hiển thị. Không phân biệt bot và người dùng. Các trang có title, description, canonical, Open Graph và JSON-LD (CollectionPage / BlogPosting / BreadcrumbList). Build kiểm tra slug, nguồn nội bộ, sản phẩm liên quan, H1 và metadata.

Bộ lọc chuyên mục dùng query, canonical về trang tin chính và noindex để tránh tạo nhiều trang chỉ thay đổi bộ lọc. Các bài chi tiết vẫn index độc lập. Chuyển sang trang khác sẽ xóa metadata của bài cũ.

Build tạo `dist/sitemap.xml` và `dist/robots.txt`. `vercel.json` chuyển các đường dẫn tin tức đến HTML dựng sẵn; các trang cửa hàng khác giữ cách hoạt động trước đây. Chưa bổ sung prerender hoặc SEO riêng cho toàn bộ cửa hàng.

Tên miền chuẩn đang là `https://paxmoly-storefront.vercel.app`, khai báo ở `src/utils/news-seo.ts`. Nếu chuyển sang tên miền riêng, sửa giá trị này và build lại trước khi gửi sitemap mới.

Sau khi triển khai, xác nhận Google Search Console, gửi sitemap và kiểm tra URL. Chưa có xác nhận lập chỉ mục hoặc bảo đảm thứ hạng tìm kiếm.
