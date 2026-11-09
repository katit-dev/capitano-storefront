# Deploy PaxMoly qua VPS gate

Image riêng: `ghcr.io/an2905/picare-paxmoly-client`, Nginx port 80. Workflow build chạy khi push `production`; workflow Request satellite deploy chạy thủ công sau khi lead duyệt digest. Gửi lead repo, commit SHA, image@digest trong Actions Summary.

Dùng bốn Actions secrets như CMS: SERVER_HOST, SERVER_USER, SERVER_SSH_KEY, SERVER_KNOWN_HOSTS. Private SSH key dùng chung hiện tại chỉ gọi cổng deploy, không có quyền shell. Lead cần cấu hình gate để phân biệt image PaxMoly và CMS/Server, Compose và domain riêng; không chạy deploy trước khi xác nhận mapping và duyệt digest.

`.env.production` chỉ chứa VITE_* public, API hiện trỏ backend Railway đang hoạt động. Khi lead cung cấp domain CMS, thêm `VITE_CMS_ADMIN_URL=https://<cms-domain>` để preview CMS hoạt động trên production. Đồng thời cấu hình `VITE_STOREFRONT_PREVIEW_URLS` của CMS với domain PaxMoly rồi build lại image CMS.

Dockerfile hiện nạp public env từ file, thay cho build args trước đây. Vite biên dịch biến vào bundle; đổi URL thì phải build/duyệt lại digest. Không ghi DB/S3 secrets vào frontend.

Deploy key GitHub picare-security khác với SSH deploy key. GitHub không cho dùng một deploy key trên nhiều repo; quyền đọc repo private và quyền pull GHCR do lead xác nhận trước khi deploy.
