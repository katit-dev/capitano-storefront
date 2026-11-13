# Capitano Storefront

Website giới thiệu sản phẩm chăm sóc răng miệng Pasta del Capitano tại Việt Nam, xây dựng bằng React, TypeScript và Vite.

## Trạng thái hiện tại

- Trang chủ hiển thị banner Fresco và các sản phẩm nổi bật.
- Cửa hàng có 17 sản phẩm trong catalog local. Có thể tìm theo tên hoặc SKU, lọc theo danh mục, dòng sản phẩm và giá.
- Trang chi tiết có ảnh, giá, dung tích, thành phần và nút thêm vào giỏ.
- Giỏ hàng lưu trên trình duyệt bằng Jotai và `localStorage`.
- Trang thanh toán là bản xem trước giao diện. Việc tạo đơn và thanh toán thật thuộc giai đoạn sau.
- Storefront dùng catalog local khi chưa cấu hình CMS hoặc khi CMS gặp lỗi và chưa có dữ liệu đã tải. Trang Tin tức có sẵn ba chuyên mục; bài viết mẫu chỉ có khi chạy môi trường phát triển.

## Công nghệ

| Phần                | Công nghệ                                |
| ------------------- | ---------------------------------------- |
| Giao diện           | React 19, TypeScript 5.9, Tailwind CSS 4 |
| Build và điều hướng | Vite 7, React Router 7                   |
| Dữ liệu và giỏ hàng | TanStack Query 5, Jotai 2                |
| Công cụ phát triển  | Node.js 24, npm 11, ESLint, Prettier     |

## Chạy dự án

Cài Node.js **24.x** và npm **11.x**. Nếu dùng NVM, phiên bản Node được ghi trong `.nvmrc`. Từ thư mục repo, chạy:

```powershell
npm ci
npm run dev
```

Mở địa chỉ Vite in ở dòng **Local**. Cổng dev của dự án là **5176**. Nếu cổng đó đang bận, có thể chạy `npm run dev -- --port 5177`.

Để kiểm tra bản build production tại máy:

```powershell
npm run build
npm run preview
```

## Kiểm tra trước khi commit

```powershell
npm run typecheck
npm run lint
node --test tests/*.test.mjs
npm run build
```

## Cấu trúc dự án

```text
src/
  assets/brand/             Logo Capitano và Picare
  assets/collections/       Banner theo dòng sản phẩm
  assets/products/catalog/  Ảnh sản phẩm
  components/layout/        Header, menu, footer
  data/capitano-catalog.ts  Catalog local
  hooks/data/               Đọc CMS và catalog
  apis/product.service.ts   Chuyển đổi và lọc sản phẩm
  pages/                    Các trang storefront
  stores/cartStore.ts       Trạng thái giỏ hàng
  index.css                 Màu, kiểu chữ và bố cục responsive
build/prerender-news.mjs    Tạo HTML tĩnh cho Tin tức trong bản build
tests/                      Bài kiểm thử hiện có
```

| Đường dẫn         | Trang                 |
| ----------------- | --------------------- |
| `/`               | Trang chủ             |
| `/cua-hang`       | Tất cả sản phẩm       |
| `/san-pham/:slug` | Chi tiết sản phẩm     |
| `/tin-tuc`        | Tin tức và chuyên mục |
| `/thanh-toan`     | Xem trước thanh toán  |

## Cấu hình CMS

Dùng [`.env.example`](./.env.example) làm mẫu nếu cần kết nối CMS khi phát triển. Để chạy bằng catalog local, giữ `VITE_CMS_API_URL` trống.

| Biến                 | Mục đích                                     |
| -------------------- | -------------------------------------------- |
| `VITE_CMS_API_URL`   | Địa chỉ API nội dung công khai               |
| `VITE_CMS_SITE_CODE` | Mã site, dùng `capitano`                     |
| `VITE_CMS_ADMIN_URL` | Địa chỉ CMS admin được phép mở bản xem trước |

Các biến `VITE_*` có thể đọc được từ trình duyệt. Giữ token, mật khẩu và khóa triển khai trong nơi quản lý secrets của môi trường tương ứng.

Để thử Flash Sale local, đặt `VITE_LOCAL_FLASH_SALE=1` và giữ `VITE_CMS_API_URL=` trong `.env.development.local`, rồi chạy lại `npm run dev`. Bấm **Chạy lại Flash Sale mẫu** dưới thanh điều hướng để mở popup và bắt đầu một lượt 5 phút cho hai SKU CAP012 và CAP018. Khi tải lại cùng tab, đồng hồ tiếp tục theo giờ kết thúc đã lưu và popup đã xem sẽ không hiện lại. Sau khi hết giờ, bấm nút demo để chạy lượt mới. Nút **Xem ưu đãi** dẫn đến khu Flash Sale trên trang chủ.

Dữ liệu ưu đãi mẫu không chạy khi đã kết nối CMS hoặc trong bản build chính thức. Bản chính thức lấy chiến dịch và giá từ CMS; đặt giờ bắt đầu, kết thúc và giá Flash Sale cho đúng SKU của chiến dịch.

## Tài liệu và triển khai

- [Capitano Brand Guideline 2026](./Capitano_Brand_Guideline_2026.pdf) là tài liệu tham chiếu nội bộ cho logo, màu sắc và bố cục.
- Giữ repo GitHub ở chế độ **Private** để quản lý mã nguồn cùng tài liệu nội bộ. Repo GitHub và môi trường chạy website được thiết lập riêng.
- Workflow VPS hiện chạy thủ công. Trước khi dùng cho Capitano, cần kiểm tra cấu hình image, môi trường và secrets của dự án.
