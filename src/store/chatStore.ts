import { create } from 'zustand';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
}

interface ChatState {
  isOpen: boolean;
  messages: ChatMessage[];
  open: () => void;
  close: () => void;
  toggle: () => void;
  sendMessage: (text: string) => void;
}

const COMING_SOON_REPLY = 'Pronto estaré listo para ayudarte a responder. ¡Gracias por tu paciencia!';

export const useChatStore = create<ChatState>((set) => ({
  isOpen: false,
  messages: [],

  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),

  sendMessage: (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMessage: ChatMessage = { id: crypto.randomUUID(), role: 'user', text: trimmed };
    set((state) => ({ messages: [...state.messages, userMessage] }));

    const assistantMessage: ChatMessage = { id: crypto.randomUUID(), role: 'assistant', text: COMING_SOON_REPLY };
    set((state) => ({ messages: [...state.messages, assistantMessage] }));
  }
}));
