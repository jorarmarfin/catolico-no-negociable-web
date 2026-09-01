import type { ArticleVideo } from '../../types/taxonomy';

/** Convierte provider+external_id (o la url cruda para providers no soportados) en una URL embebible. */
export function toEmbedUrl(video: ArticleVideo): string {
  if (video.provider === 'youtube') {
    return `https://www.youtube-nocookie.com/embed/${video.external_id}`;
  }

  return video.url;
}
