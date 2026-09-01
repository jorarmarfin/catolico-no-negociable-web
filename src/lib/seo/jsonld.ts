import type { Article } from '../../types/article';

export interface BreadcrumbEntry {
  name: string;
  url: string;
}

export function breadcrumbListJsonLd(items: BreadcrumbEntry[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}

export function articleJsonLd(article: Article, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: article.featured_image ?? undefined,
    datePublished: article.published_at,
    dateModified: article.updated_at,
    author: article.author ? { '@type': 'Person', name: article.author.name } : undefined,
    mainEntityOfPage: url
  };
}

export function organizationJsonLd(siteUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Católico No Negociable',
    url: siteUrl
  };
}
