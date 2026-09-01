import { useState, useRef, useEffect, type FormEvent } from 'react';
import { useChatStore } from '../../store/chatStore';

export default function LuisitoChat() {
  const isOpen = useChatStore((state) => state.isOpen);
  const messages = useChatStore((state) => state.messages);
  const toggle = useChatStore((state) => state.toggle);
  const close = useChatStore((state) => state.close);
  const sendMessage = useChatStore((state) => state.sendMessage);

  const [draft, setDraft] = useState('');
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [messages, isOpen]);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!draft.trim()) return;
    sendMessage(draft);
    setDraft('');
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3">
      {isOpen && (
        <div
          role="dialog"
          aria-label="Chat con Luisito"
          className="flex h-[28rem] w-[20rem] flex-col overflow-hidden rounded-xl border border-border bg-background shadow-xl sm:w-[22rem]"
        >
          <header className="flex items-center justify-between border-b border-border bg-primary px-4 py-3 text-primary-foreground">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-foreground/15 text-sm font-bold">L</span>
              <div>
                <p className="font-sans text-sm font-semibold leading-tight">Luisito</p>
                <p className="text-xs leading-tight text-primary-foreground/80">Asistente IA</p>
              </div>
            </div>
            <button
              type="button"
              onClick={close}
              aria-label="Cerrar chat"
              className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors duration-200 hover:bg-primary-foreground/10"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-5 w-5" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </header>

          <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.length === 0 && (
              <p className="text-sm text-muted-foreground">
                ¡Hola! Soy Luisito. Escríbeme lo que quieras, pronto podré ayudarte a responder.
              </p>
            )}
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <p
                  className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                    message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'
                  }`}
                >
                  {message.text}
                </p>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-border px-3 py-3">
            <input
              type="text"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Escribe un mensaje..."
              aria-label="Mensaje para Luisito"
              className="min-h-11 flex-1 rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-primary"
            />
            <button
              type="submit"
              aria-label="Enviar mensaje"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-colors duration-200 hover:bg-primary/90"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-5 w-5" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-7.5-15-7.5v6l10 1.5-10 1.5v6z" />
              </svg>
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={toggle}
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Cerrar chat con Luisito' : 'Abrir chat con Luisito'}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform duration-200 hover:scale-105"
      >
        {isOpen ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-6 w-6" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-6 w-6" aria-hidden="true">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 10.5h7.5m-7.5 3h4.5M21 12c0 4.556-4.03 8.25-9 8.25a9.76 9.76 0 01-4.135-.897L3 20.25l1.145-3.435C3.42 15.67 3 13.876 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
            />
          </svg>
        )}
      </button>
    </div>
  );
}
