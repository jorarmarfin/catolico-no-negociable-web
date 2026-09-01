import { useEffect, useId, useState, type FormEvent } from 'react';
import { useSearchStore } from '../../store/searchStore';

interface SearchInputProps {
  /** En el header solo redirige a /buscar; en la página de resultados busca en vivo. */
  mode: 'redirect' | 'live';
  autoFocus?: boolean;
}

export default function SearchInput({ mode, autoFocus = false }: SearchInputProps) {
  const inputId = useId();
  const storeQuery = useSearchStore((state) => state.query);
  const runSearch = useSearchStore((state) => state.runSearch);
  const [value, setValue] = useState(storeQuery);

  useEffect(() => {
    setValue(storeQuery);
  }, [storeQuery]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;

    if (mode === 'redirect') {
      window.location.href = `/buscar?q=${encodeURIComponent(trimmed)}`;
      return;
    }

    void runSearch(trimmed);
    const url = new URL(window.location.href);
    url.searchParams.set('q', trimmed);
    window.history.replaceState({}, '', url);
  }

  return (
    <form onSubmit={handleSubmit} role="search" className="flex w-full items-center gap-2">
      <label htmlFor={inputId} className="sr-only">
        ¿Qué deseas aprender?
      </label>
      <div className="relative flex-1">
        <svg
          className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
        <input
          id={inputId}
          type="search"
          name="q"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="¿Qué deseas aprender?"
          autoFocus={autoFocus}
          className="min-h-11 w-full rounded-lg border border-border bg-white py-2.5 pl-10 pr-4 font-sans text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        />
      </div>
      <button
        type="submit"
        className="min-h-11 cursor-pointer rounded-lg bg-primary px-5 py-2.5 font-sans font-semibold text-primary-foreground transition-colors duration-200 hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        Buscar
      </button>
    </form>
  );
}
