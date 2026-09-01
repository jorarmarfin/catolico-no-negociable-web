import { apiFetch } from './client';
import type { ApiCollection } from '../../types/api';
import type { ArticleSummary } from '../../types/article';

export function listTagArticles(slug: string, page = 1) {
  return apiFetch<ApiCollection<ArticleSummary>>(`/tags/${slug}/articles`, { page });
}
