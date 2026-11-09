import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "node:url";
import { existsSync } from "node:fs";
import { resolve } from "node:path";

export default defineConfig({
  plugins: [react(), tailwindcss(), {
    name: "news-static-preview",
    configurePreviewServer(server) {
      // Match Vercel's news rewrites when testing the production build locally.
      server.middlewares.use((request, _response, next) => {
        const url = new URL(request.url ?? "/", "http://localhost");
        if (/^\/tin-tuc(?:\/[a-z0-9-]+)?\/?$/.test(url.pathname)) {
          const htmlPath = `${url.pathname.replace(/\/$/, "")}/index.html`;
          if (existsSync(resolve(server.config.root, server.config.build.outDir, htmlPath.slice(1)))) request.url = `${htmlPath}${url.search}`;
        }
        next();
      });
    },
  }],
  // Let phones use the local public API through the storefront's LAN address.
  server: {
  port: 5176,
  strictPort: true,
  proxy: {
    "/cms-api/api/public/": {
      target: "http://localhost:4300",
      changeOrigin: true,
      rewrite: path => path.replace(/^\/cms-api/, ""),
    },
  },
},
  build: { manifest: true },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
