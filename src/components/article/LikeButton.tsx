import { useEffect, useState } from 'react';

interface LikeButtonProps {
  slug: string;
  initialLikes: number;
}

function storageKey(slug: string) {
  return `liked:${slug}`;
}

export default function LikeButton({ slug, initialLikes }: LikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      setLiked(localStorage.getItem(storageKey(slug)) === '1');
    } catch {
      // localStorage no disponible (modo privado, etc.); se permite dar like igual.
    }
  }, [slug]);

  async function handleClick() {
    if (liked || loading) return;
    setLoading(true);

    try {
      const response = await fetch(`/api/articles/${slug}/like`, { method: 'POST' });
      if (!response.ok) throw new Error('like request failed');

      const { data } = (await response.json()) as { data: { likes_count: number } };
      setLikes(data.likes_count);
      setLiked(true);
      try {
        localStorage.setItem(storageKey(slug), '1');
      } catch {
        // ignorar si no se puede persistir
      }
    } catch {
      // fallo silencioso: no interrumpir la lectura del artículo por esto
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={liked || loading}
      aria-pressed={liked}
      className={`flex items-center gap-2 rounded-full border px-4 py-2 font-sans text-sm font-medium transition-colors duration-200 ${
        liked
          ? 'border-primary bg-primary/10 text-primary'
          : 'border-border text-muted-foreground hover:border-primary hover:text-primary'
      } disabled:cursor-default`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={liked ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="2"
        className="h-4 w-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.318 6.318a4.5 4.5 0 0 1 6.364 0L12 7.636l1.318-1.318a4.5 4.5 0 1 1 6.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 0 1 0-6.364Z"
        />
      </svg>
      <span>Me gusta</span>
      <span className="tabular-nums">{likes}</span>
    </button>
  );
}
