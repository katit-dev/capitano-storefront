# PaxMoly Storefront

Website **showcase + e-commerce frontend** cho PaxMoly Vietnam. Project giới thiệu thương hiệu, danh mục serum/mặt nạ, chi tiết sản phẩm và giỏ hàng cục bộ.

> [!IMPORTANT]
> Đây hiện là một SPA frontend. Catalog đang dùng dữ liệu demo trong source; giỏ hàng lưu bằng `localStorage`; chưa có backend, tài khoản, đơn hàng, thanh toán, PostgreSQL hay Redis trong runtime production. Phần Docker/PostgreSQL/Redis bên dưới được chuẩn bị để một backend tương lai có môi trường local đồng nhất, không nhằm tạo cảm giác rằng các chức năng đó đã được tích hợp.

## 1. Trạng thái hiện tại

- Trang chủ thiên về product showcase và commerce.
- Trang cửa hàng có tìm kiếm và lọc theo Serum/Mask Pack.
- Trang chi tiết sản phẩm có lợi ích, hoạt chất, số lượng và thêm giỏ.
- Giỏ hàng drawer hỗ trợ tăng, giảm, xóa và lưu lại trên trình duyệt.
- Nút thanh toán mới là placeholder, chưa tạo đơn hàng thật.
- Hình ảnh và nhận diện lấy từ brand guideline PaxMoly.

## 2. Tech stack

### Frontend runtime

| Thành phần   | Công nghệ                   | Vai trò                                       |
| ------------ | --------------------------- | --------------------------------------------- |
| UI runtime   | React 19                    | Component và rendering phía client            |
| Ngôn ngữ     | TypeScript 5.9              | Type safety, contract cho product/cart        |
| Build tool   | Vite 7                      | Dev server, HMR và production bundle          |
| Routing      | React Router 7              | Trang chủ, cửa hàng, chi tiết sản phẩm và 404 |
| Server state | TanStack React Query 5      | Query/cache catalog qua service layer         |
| Client state | Jotai 2                     | Cart drawer và giỏ hàng                       |
| Persistence  | `atomWithStorage`           | Lưu cart vào `localStorage`                   |
| CSS          | Tailwind CSS 4 + custom CSS | Reset/utilities và design system PaxMoly      |
| Motion       | Framer Motion 12            | Transition và animation có reduced motion     |
| Icon         | React Icons 5               | Icon giao diện                                |

### Tooling

| Thành phần          | Công nghệ                                           |
| ------------------- | --------------------------------------------------- |
| Node.js             | 24.x, pin bằng `.nvmrc`                             |
| Package manager     | npm 11.x, lock bằng `package-lock.json`             |
| Lint                | ESLint 10 + TypeScript ESLint + React Hooks/Refresh |
| Format              | Prettier 3 + Tailwind CSS plugin                    |
| Container           | Docker multi-stage: Node build → Nginx runtime      |
| Local orchestration | Docker Compose                                      |

### Hạ tầng chưa được frontend sử dụng

- **PostgreSQL** phù hợp để backend lưu sản phẩm, khách hàng, đơn hàng, tồn kho và nội dung quản trị.
- **Redis** phù hợp cho cache, session, rate limit, queue hoặc distributed lock ở backend.
- Trình duyệt **không được kết nối trực tiếp** tới PostgreSQL/Redis.
- Credentials database phải nằm ở backend hoặc secret manager, tuyệt đối không đặt trong biến `VITE_*` vì chúng được bundle công khai vào JavaScript.

## 3. Kiến trúc source

```text
src/
├── apis/
│   └── product.service.ts       # Service catalog; hiện đọc mock data
├── assets/
│   ├── brand/                   # Logo
│   └── products/                # Ảnh sản phẩm
├── components/
│   ├── layout/SiteLayout.tsx    # Header, navigation, footer
│   ├── BrandLogo.tsx
│   ├── CartDrawer.tsx
│   └── ProductCard.tsx
├── config/
│   ├── paths.ts                 # URL constants
│   └── routes.config.ts         # Navigation metadata
├── data/
│   └── products.ts              # Catalog demo
├── hooks/data/
│   └── useProductHooks.ts       # React Query hooks
├── pages/
│   ├── HomePage.tsx
│   ├── ShopPage.tsx
│   ├── ProductDetailPage.tsx
│   └── NotFoundPage.tsx
├── stores/
│   └── cartStore.ts             # Jotai atoms + localStorage
├── types/
│   └── Product.ts               # Product/cart contracts
├── App.tsx                      # Route tree
├── main.tsx                     # Root providers
└── index.css                    # Tokens, components, responsive UI
```

Luồng dữ liệu:

```text
Page/Component
     ↓
React Query hook
     ↓
Product service
     ↓
Catalog demo

Cart UI → Jotai atoms → localStorage
```

Khi có backend, giữ nguyên `types` và `hooks/data`; thay implementation trong `apis/product.service.ts` bằng HTTP client. Không gọi API trực tiếp từ component.

## 4. Scripts

| Lệnh                   | Công dụng                                             |
| ---------------------- | ----------------------------------------------------- |
| `npm run dev`          | Chạy Vite dev server                                  |
| `npm run build`        | Type-check project reference và tạo production bundle |
| `npm run typecheck`    | Kiểm tra TypeScript, không phát sinh output           |
| `npm run lint`         | Kiểm tra ESLint                                       |
| `npm run format`       | Format tài liệu và config chuẩn hóa của repo          |
| `npm run format:check` | Kiểm tra format tài liệu/config, không sửa file       |
| `npm run preview`      | Preview production bundle                             |

## 5. Cài đặt nhanh trên máy đã có Node

```bash
git clone https://github.com/An2905/paxmoly-storefront.git
cd paxmoly-storefront
nvm use
npm ci
npm run dev
```

Mở <http://localhost:5173>.

Kiểm tra trước khi làm việc:

```bash
npm run typecheck
npm run lint
npm run build
```

Luôn dùng `npm ci` để tái tạo đúng dependency từ lockfile. Chỉ dùng `npm install` khi chủ động thêm hoặc cập nhật dependency.

## 6. Migrate sang một máy Mac mới hoàn toàn

### 6.1. Xác định kiến trúc Mac

```bash
uname -m
```

- `arm64`: Apple Silicon; Homebrew thường nằm tại `/opt/homebrew`.
- `x86_64`: Intel; Homebrew thường nằm tại `/usr/local`.

Docker image trong repo hỗ trợ cả hai loại máy.

### 6.2. Cài Xcode Command Line Tools

```bash
xcode-select --install
```

Sau khi cài xong:

```bash
xcode-select -p
git --version
```

### 6.3. Cài Homebrew

Lấy lệnh cài đặt hiện hành từ <https://brew.sh>. Sau khi cài, chạy đúng phần `brew shellenv` mà installer in ra.

```bash
brew --version
brew doctor
```

### 6.4. Cài Git và GitHub CLI

```bash
brew install git gh
git config --global user.name "YOUR_NAME"
git config --global user.email "YOUR_GITHUB_EMAIL"
gh auth login
gh auth status
```

Với repository private, nên clone bằng GitHub CLI:

```bash
gh repo clone An2905/paxmoly-storefront
cd paxmoly-storefront
```

Không copy Personal Access Token vào `.env`, source hoặc README.

### 6.5. Cài NVM, Node và npm

```bash
brew install nvm
mkdir -p "$HOME/.nvm"
```

Thêm vào `~/.zshrc`:

```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$(brew --prefix nvm)/nvm.sh" ] && \. "$(brew --prefix nvm)/nvm.sh"
[ -s "$(brew --prefix nvm)/etc/bash_completion.d/nvm" ] && \. "$(brew --prefix nvm)/etc/bash_completion.d/nvm"
```

Nạp lại shell và cài đúng Node của project:

```bash
source ~/.zshrc
nvm install
nvm use
node --version
npm --version
```

Kỳ vọng Node `v24.x` và npm từ `11.x`.

### 6.6. Cài dependency và chạy project

```bash
npm ci
npm run typecheck
npm run lint
npm run dev
```

Nếu port 5173 đang được dùng:

```bash
npm run dev -- --port 5174
```

### 6.7. Build production tại local

```bash
npm run build
npm run preview
```

Output nằm trong `dist/`; không commit thư mục này.

## 7. Visual Studio Code

### Cài đặt

```bash
brew install --cask visual-studio-code
code .
```

Repo có sẵn `.vscode/extensions.json` và `.vscode/settings.json`. VS Code sẽ đề xuất:

- ESLint
- Prettier
- Tailwind CSS IntelliSense
- Docker
- EditorConfig
- GitLens

Workspace bật format khi lưu, ESLint fix khi lưu, TypeScript SDK của project và line ending LF.

Nếu lệnh `code` chưa tồn tại, mở Command Palette và chạy **Shell Command: Install 'code' command in PATH**.

## 8. Docker cho frontend

### 8.1. Cài Docker Desktop

```bash
brew install --cask docker
```

Mở Docker Desktop ít nhất một lần và chờ engine sẵn sàng:

```bash
docker version
docker compose version
docker info
```

### 8.2. Build và chạy frontend container

```bash
docker compose up --build web
```

Mở <http://localhost:8080>. Container dùng:

1. `node:24-alpine` để chạy `npm ci` và build.
2. `nginx:stable-alpine` để phục vụ file tĩnh.
3. SPA fallback về `index.html` để refresh URL con không bị 404.
4. Cache dài hạn cho asset có hash; `index.html` luôn no-cache.

Dừng container:

```bash
docker compose down
```

Theo dõi log:

```bash
docker compose logs -f web
```

## 9. PostgreSQL và Redis cho backend tương lai

### 9.1. Chạy bằng Docker — cách khuyến nghị

```bash
cp .env.example .env
```

Đổi password local trong `.env`, sau đó chạy profile backend:

```bash
docker compose --profile backend up -d postgres redis
docker compose ps
```

| Service    | Host từ macOS | Host trong Compose | Port   |
| ---------- | ------------- | ------------------ | ------ |
| PostgreSQL | `localhost`   | `postgres`         | `5432` |
| Redis      | `localhost`   | `redis`            | `6379` |

Kiểm tra PostgreSQL:

```bash
docker compose exec postgres pg_isready -U paxmoly -d paxmoly
docker compose exec postgres psql -U paxmoly -d paxmoly
```

Kiểm tra Redis:

```bash
docker compose exec redis redis-cli ping
```

Kết quả mong đợi: `PONG`.

Dữ liệu được giữ trong named volumes `postgres_data` và `redis_data`. `docker compose down` không xóa volume; chỉ lệnh có `--volumes` mới xóa dữ liệu local.

### 9.2. Cài native bằng Homebrew — tùy chọn

Chỉ chọn cách này nếu không muốn chạy Docker:

```bash
brew install postgresql@17 redis
brew services start postgresql@17
brew services start redis
```

Kiểm tra:

```bash
pg_isready
redis-cli ping
```

Không chạy đồng thời bản native và Docker trên cùng port 5432/6379.

### 9.3. Quy ước kết nối backend

Ví dụ biến môi trường của backend, **không phải frontend**:

```dotenv
DATABASE_URL=postgresql://paxmoly:CHANGE_ME@localhost:5432/paxmoly
REDIS_URL=redis://localhost:6379/0
```

Nếu backend chạy trong cùng Docker Compose, thay `localhost` bằng tên service:

```dotenv
DATABASE_URL=postgresql://paxmoly:CHANGE_ME@postgres:5432/paxmoly
REDIS_URL=redis://redis:6379/0
```

### 9.4. Migrate dữ liệu PostgreSQL giữa hai máy

Trên máy cũ:

```bash
pg_dump --format=custom --no-owner --file=paxmoly.dump "$DATABASE_URL"
```

Chuyển `paxmoly.dump` qua kênh bảo mật. Trên máy mới, sau khi tạo database và chạy migration schema:

```bash
pg_restore --clean --if-exists --no-owner --dbname="$DATABASE_URL" paxmoly.dump
```

Không commit file dump vào Git.

### 9.5. Có cần migrate Redis không?

Thông thường **không**. Nếu Redis chỉ là cache/session tạm, để backend tạo lại dữ liệu. Chỉ di chuyển RDB/AOF khi Redis chứa queue hoặc state không thể tái tạo, và phải kiểm tra tương thích phiên bản trước khi restore.

## 10. Environment và secrets

- `.env`, `.env.local` và các biến thể môi trường bị Git ignore.
- Chỉ `.env.example` được commit.
- Mọi biến bắt đầu bằng `VITE_` đều có thể đọc được từ browser bundle.
- Không đặt password PostgreSQL, Redis, API private key hoặc GitHub token trong biến `VITE_*`.
- Production nên dùng secret manager của nền tảng deploy.

Frontend hiện không yêu cầu biến môi trường. Khi thêm API, có thể dùng:

```dotenv
VITE_API_BASE_URL=https://api.example.com
```

Sau đó tạo HTTP client tập trung trong `src/apis/client.ts`.

## 11. Quy trình phát triển đề xuất

```bash
git checkout -b feat/ten-tinh-nang
npm ci
npm run dev
```

Trước khi commit:

```bash
npm run typecheck
npm run lint
npm run format:check
npm run build
```

Sau đó:

```bash
git add .
git commit -m "feat: mo ta thay doi"
git push -u origin feat/ten-tinh-nang
```

## 12. Những phần cần bổ sung để thành e-commerce production

- Backend API và database migrations.
- Authentication/authorization cho khách hàng và quản trị.
- Quản lý catalog, tồn kho, giá và promotion.
- Checkout, payment gateway và webhook idempotency.
- Đơn hàng, vận chuyển, email/SMS transaction.
- CMS cho showcase/editorial content.
- Search engine, analytics và consent management.
- Unit/integration/E2E tests.
- Monitoring, error reporting, backup và disaster recovery.
- CI/CD với branch protection và secret scanning.

## 13. Troubleshooting

### `npm ci` báo sai Node version

```bash
nvm install
nvm use
rm -rf node_modules
npm ci
```

### Refresh trang con trong Docker bị 404

Đảm bảo container dùng `nginx.conf` trong repo và có `try_files $uri $uri/ /index.html`.

### Docker không kết nối được PostgreSQL/Redis

```bash
docker compose ps
docker compose logs postgres
docker compose logs redis
lsof -nP -iTCP:5432 -sTCP:LISTEN
lsof -nP -iTCP:6379 -sTCP:LISTEN
```

### Import chạy trên Windows nhưng lỗi trên macOS/Linux

Kiểm tra đúng chữ hoa/thường của tên file và import. CI nên chạy trên Linux để bắt lỗi case-sensitive sớm.

### Reset dependency mà không đổi lockfile

```bash
rm -rf node_modules
npm ci
```

Không xóa `package-lock.json` trừ khi chủ động regenerate toàn bộ dependency tree.

## 14. Checklist máy Mac mới

- [ ] Xcode Command Line Tools hoạt động.
- [ ] Homebrew hoạt động.
- [ ] Git name/email đã cấu hình.
- [ ] GitHub CLI đã đăng nhập.
- [ ] NVM đọc được `.nvmrc`.
- [ ] Node 24 và npm 11 hoạt động.
- [ ] `npm ci` thành công.
- [ ] `npm run typecheck` thành công.
- [ ] `npm run lint` thành công.
- [ ] `npm run build` thành công.
- [ ] VS Code nhận recommended extensions.
- [ ] Docker frontend mở được tại port 8080.
- [ ] PostgreSQL/Redis chỉ chạy nếu backend cần.
- [ ] Không có secret hoặc database dump trong Git.

## 15. Brand assets

File `BRAND GUIDELINE PAXMOLY.pdf` được giữ trong repository làm tài liệu nội bộ cho thiết kế. Ảnh runtime đã được tối ưu và đặt trong `src/assets`.

### CMS production preview

Set `VITE_CMS_ADMIN_URL=https://cms.picare.vn` in `.env.production` before building the storefront image. This public URL identifies the trusted CMS parent window for draft previews; the local development default remains `http://localhost:5175`. In the CMS website profile, set the domain to `paxmoly.vn`.
