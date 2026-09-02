import { apiFetch } from './client';
import type { ApiCollection, ApiResponse } from '../../types/api';
import type { Article, ArticleSummary } from '../../types/article';
import type { ArticleLevel } from '../../types/taxonomy';
import { toArticleSummaryArray } from '../utils/guards';

export interface ListArticlesParams {
  page?: number;
  section?: string;
  topic?: string;
  tag?: string;
  level?: ArticleLevel;
  featured?: 1;
  [key: string]: string | number | boolean | undefined;
}

export function listArticles(params: ListArticlesParams = {}) {
  return apiFetch<ApiCollection<ArticleSummary>>('/articles', params);
}

export async function likeArticle(slug: string) {
  const response = await apiFetch<ApiResponse<{ likes_count: number }>>(`/articles/${slug}/like`, undefined, {
    method: 'POST'
  });
  return response.data;
}

/**
 * 404 si el artículo no existe, no está publicado o `published_at` es futuro
 * (lo maneja el backend; aquí solo se propaga el ApiRequestError con status 404).
 */
export async function getArticleBySlug(slug: string) {
  const response = await apiFetch<ApiResponse<Article>>(`/articles/${slug}`);
  return { data: normalizeArticle(response.data) };
}

const asArray = <T>(value: unknown): T[] => (Array.isArray(value) ? (value as T[]) : []);

/**
 * El backend a veces devuelve relaciones embebidas sin resolver correctamente
 * (p.ej. `related` como un AnonymousResourceCollection de Laravel sin
 * serializar, en vez de un array). Se normaliza aquí para que el resto del
 * frontend pueda asumir siempre arrays válidos y nunca reviente la página
 * (SPEC §43/44: nunca mostrar errores técnicos).
 */
function normalizeArticle(article: Article): Article {
  return {
    ...article,
    topics: asArray(article.topics),
    tags: asArray(article.tags),
    sources: asArray(article.sources),
    videos: asArray(article.videos),
    resources: asArray(article.resources),
    series: asArray(article.series),
    related: toArticleSummaryArray(article.related)
  };
}
