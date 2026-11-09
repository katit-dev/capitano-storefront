import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { createServer } from "vite";

const output = resolve("dist");
const template = await readFile(join(output, "index.html"), "utf8");
const manifest = JSON.parse(
  await readFile(join(output, ".vite/manifest.json"), "utf8"),
);
const server = await createServer({
  server: { middlewareMode: true },
  appType: "custom",
});

try {
  const { newsRoutes, sitemapUrls, SITE_ORIGIN, renderNewsRoute, validateNewsContent } =
    await server.ssrLoadModule("/src/entry-news-server.tsx");
  validateNewsContent();
  const assets = Object.entries(manifest).filter(([source]) =>
    source.startsWith("src/assets/"),
  );
  const productionAssets = (html) =>
    assets.reduce(
      (result, [source, asset]) =>
        result.replaceAll(`/${source}`, `/${asset.file}`),
      html,
    );
  for (const route of newsRoutes) {
    const { html, head } = renderNewsRoute(route);
    const page = template
      .replace(/<title>[\s\S]*?<\/title>/, "")
      .replace(/<meta\s+name="description"[\s\S]*?\/>/, "")
      .replace("</head>", `${productionAssets(head)}\n</head>`)
      .replace(
        '<div id="root"></div>',
        `<div id="root" data-prerendered="true">${productionAssets(html)}</div>`,
      );
    if (/\/src\/assets\//.test(page))
      throw new Error(`Unmapped source asset in ${route}`);
    if ((page.match(/<h1(?:\s|>)/g) ?? []).length !== 1 || (page.match(/<title>/g) ?? []).length !== 1) throw new Error(`Invalid title or H1 in ${route}`);
    if (!page.includes(`rel="canonical" href="${SITE_ORIGIN}${route}"`)) throw new Error(`Invalid canonical in ${route}`);
    const structuredData = JSON.parse(page.match(/id="news-structured-data">([\s\S]*?)<\/script>/)[1]);
    if (structuredData[0]["@type"] !== (route === "/tin-tuc" ? "CollectionPage" : "BlogPosting")) throw new Error(`Invalid schema in ${route}`);
    const directory = join(output, route.slice(1));
    await mkdir(directory, { recursive: true });
    await writeFile(join(directory, "index.html"), page);
  }
  await writeFile(
    join(output, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${sitemapUrls.map((url) => `<url><loc>${url}</loc></url>`).join("")}</urlset>`,
  );
  await writeFile(
    join(output, "robots.txt"),
    `User-agent: *\nAllow: /\nDisallow: /thanh-toan\nSitemap: ${SITE_ORIGIN}/sitemap.xml\n`,
  );
  console.log(
    `Prerendered ${newsRoutes.length} news pages; sitemap and robots.txt generated.`,
  );
} finally {
  await server.close();
}
