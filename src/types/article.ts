import type {
  ArticleLevel,
  ArticleResource,
  ArticleSeriesRef,
  ArticleVideo,
  Author,
  Section,
  Source,
  Tag,
  Topic
} from './taxonomy';

export interface Seo {
  title: string;
  description: string;
}

export interface ArticleSummary {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  level: ArticleLevel;
  content_type: string;
  is_featured: boolean;
  featured_image: string | null;
  section: Section;
  published_at: string;
  updated_at: string;
}

export interface Article extends ArticleSummary {
  content_markdown: string;
  content_html: string;
  featured_image_alt: string | null;
  author: Author | null;
  topics: Topic[];
  tags: Tag[];
  sources: Source[];
  videos: ArticleVideo[];
  resources: ArticleResource[];
  series: ArticleSeriesRef[];
  related: ArticleSummary[];
  seo: Seo;
}
