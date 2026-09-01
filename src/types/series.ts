import type { ArticleSummary } from './article';

export interface SeriesSummary {
  id: number;
  name: string;
  slug: string;
  description?: string | null;
  featured_image?: string | null;
}

/** GET /series/{slug}: `data.articles` es un array plano ya ordenado por posición. */
export interface Series extends SeriesSummary {
  articles: ArticleSummary[];
}
