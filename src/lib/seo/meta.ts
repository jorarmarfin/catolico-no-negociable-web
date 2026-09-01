export interface SeoMeta {
  title: string;
  description: string;
  canonicalUrl: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'video.other';
}

const SITE_NAME = 'Católico No Negociable';

export function buildPageTitle(title: string): string {
  return title === SITE_NAME ? title : `${title} · ${SITE_NAME}`;
}
