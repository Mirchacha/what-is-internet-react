import { create } from 'zustand';

interface AppState {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  
  // Cache для кешування запитів
  cache: Map<string, { data: unknown; timestamp: number }>;
  
  // Додати в кеш
  setCache: (key: string, data: unknown, ttl?: number) => void;
  
  // Отримати з кешу
  getCache: <T>(key: string, ttl?: number) => T | null;
  
  // Очистити кеш
  clearCache: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  theme: 'light',
  
  cache: new Map(),
  
  toggleTheme: () =>
    set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
  
  setCache: (key: string, data: unknown, ttl = 60000) => {
    const { cache } = get();
    cache.set(key, { data, timestamp: Date.now() + ttl });
    set({ cache: new Map(cache) });
  },
  
  getCache: <T>(key: string, ttl = 60000): T | null => {
    const { cache } = get();
    const entry = cache.get(key);
    if (!entry) return null;
    
    if (Date.now() > entry.timestamp) {
      cache.delete(key);
      set({ cache: new Map(cache) });
      return null;
    }
    
    return entry.data as T;
  },
  
  clearCache: () => set({ cache: new Map() }),
}));

