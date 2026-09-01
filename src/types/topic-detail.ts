import type { ApiCollection } from './api';
import type { ArticleSummary } from './article';
import type { Topic } from './taxonomy';

/** GET /topics/{slug}: `data.articles` viene paginado (data/links/meta). */
export interface TopicDetail extends Topic {
  articles: ApiCollection<ArticleSummary>;
}
