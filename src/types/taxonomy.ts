import type { SeriesSummary } from './series';

/** Shape confirmada por el backend (Laravel), embebida en ArticleListResource. */
export interface Section {
  id: number;
  name: string;
  slug: string;
  description?: string | null;
  icon?: string | null;
}

export interface Topic {
  id: number;
  name: string;
  slug: string;
  description?: string | null;
  featured_image?: string | null;
  is_featured?: boolean;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
}

export interface Author {
  name: string;
  slug: string;
}

export type ArticleLevel = 'basic' | 'intermediate' | 'advanced';

/** "sources[] (con reference/quote/context_note del pivot)" — SPEC backend. */
export interface Source {
  id: number;
  title: string;
  type?: string | null;
  author?: string | null;
  abbreviation?: string | null;
  url?: string | null;
  publisher?: string | null;
  year?: number | null;
  is_verified?: boolean;
  reference?: string | null;
  quote?: string | null;
  context_note?: string | null;
}

/** "videos[] (youtube: provider, external_id, url, thumbnail_url)" — SPEC backend. */
export interface ArticleVideo {
  provider: 'youtube' | string;
  external_id: string;
  url: string;
  thumbnail_url: string;
  title?: string | null;
}

/** "resources[] (title, type, url, is_downloadable)" — SPEC backend. */
export interface ArticleResource {
  title: string;
  type: string;
  url: string;
  is_downloadable: boolean;
}

/** "series[] (con position)" — la serie a la que pertenece el artículo. */
export interface ArticleSeriesRef extends SeriesSummary {
  position: number;
}
