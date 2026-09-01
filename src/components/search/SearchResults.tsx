import { useEffect } from 'react';
import { useSearchStore } from '../../store/searchStore';

interface SearchResultsProps {
  initialQuery: string;
}

export default function SearchResults({ initialQuery }: SearchResultsProps) {
  const { status, results, errorMessage, runSearch, setQuery } = useSearchStore();

  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
      void runSearch(initialQuery);
    }
    // Solo debe ejecutarse una vez, al montar con el ?q= inicial de la URL.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (status === 'idle') {
    return <p className="font-sans text-muted-foreground">Escribe algo para empezar a explorar la biblioteca.</p>;
  }

  if (status === 'too_short') {
    return <p className="font-sans text-muted-foreground">Escribe al menos 2 caracteres para buscar.</p>;
  }

  if (status === 'loading') {
    return (
      <div className="space-y-3" aria-busy="true" aria-live="polite">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-20 animate-pulse rounded-xl bg-muted" />
        ))}
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div role="alert" className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 font-sans text-sm text-destructive">
        {errorMessage}
      </div>
    );
  }

  if (!results || results.data.length === 0) {
    return <p className="font-sans text-muted-foreground">No encontramos resultados. Prueba con otras palabras.</p>;
  }

  return (
    <div aria-live="polite">
      <p className="mb-4 font-sans text-sm text-muted-foreground">{results.meta.total} resultado(s)</p>
      <ul className="space-y-3">
        {results.data.map((article) => (
          <li key={article.id}>
            <a
              href={`/${article.section.slug}/${article.slug}`}
              className="block rounded-xl border border-border bg-white p-4 transition-colors duration-200 hover:border-primary"
            >
              <span className="font-sans text-xs font-medium text-accent">{article.section.name}</span>
              <p className="font-serif text-lg text-foreground">{article.title}</p>
              <p className="mt-1 font-sans text-sm text-muted-foreground">{article.excerpt}</p>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
