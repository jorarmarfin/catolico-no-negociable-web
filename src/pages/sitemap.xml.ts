import type { APIRoute } from 'astro';
import { listArticles } from '../lib/api/articles';
import { listSections } from '../lib/api/sections';
import { listTopics } from '../lib/api/topics';
import { listSeries } from '../lib/api/series';
import { safeFetch } from '../lib/api/safe';
import type { ApiCollection } from '../types/api';
import type { ArticleSummary } from '../types/article';

const STATIC_PATHS = ['/', '/temas', '/series', '/buscar', '/explorar', '/acerca-de'];

const MAX_PAGES = 50;

async function collectAllArticles(): Promise<ArticleSummary[]> {
  const items: ArticleSummary[] = [];
  let page = 1;

  while (page <= MAX_PAGES) {
    const result: ApiCollection<ArticleSummary> | null = await safeFetch(() => listArticles({ page }));
    if (!result) break;

    items.push(...result.data);
    if (page >= result.meta.last_page) break;
    page += 1;
  }

  return items;
}

function urlEntry(loc: string, lastmod?: string): string {
  return `<url><loc>${loc}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}</url>`;
}

export const GET: APIRoute = async ({ site }) => {
  const base = site?.toString().replace(/\/$/, '') ?? '';

  const [articles, sections, topics, series] = await Promise.all([
    collectAllArticles(),
    safeFetch(() => listSections()).then((res) => res?.data ?? []),
    safeFetch(() => listTopics()).then((res) => res?.data ?? []),
    safeFetch(() => listSeries()).then((res) => res?.data ?? [])
  ]);

  const entries = [
    ...STATIC_PATHS.map((path) => urlEntry(`${base}${path}`)),
    ...sections.map((section) => urlEntry(`${base}/${section.slug}`)),
    ...topics.map((topic) => urlEntry(`${base}/temas/${topic.slug}`)),
    ...series.map((item) => urlEntry(`${base}/series/${item.slug}`)),
    ...articles.map((article) => urlEntry(`${base}/${article.section.slug}/${article.slug}`, article.updated_at))
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join('\n')}
</urlset>`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' }
  });
};
