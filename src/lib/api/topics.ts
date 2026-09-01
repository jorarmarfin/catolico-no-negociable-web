import { apiFetch } from './client';
import type { ApiResponse } from '../../types/api';
import type { Topic } from '../../types/taxonomy';
import type { TopicDetail } from '../../types/topic-detail';

/** "todos los temas" — lista completa, sin paginar. */
export function listTopics() {
  return apiFetch<ApiResponse<Topic[]>>('/topics');
}

export function getTopicBySlug(slug: string, page = 1) {
  return apiFetch<ApiResponse<TopicDetail>>(`/topics/${slug}`, { page });
}
