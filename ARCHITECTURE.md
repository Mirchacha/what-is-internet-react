# 🏗️ Архітектура проекту

## Огляд

Цей проект демонструє **чистий архітектурний підхід** до фронтенд-розробки з мінімальними залежностями та чіткою розділенням відповідальності.

## Принципи

### 1. Separation of Concerns

Кожен модуль має одну відповідальність:
- **`api/`** — тільки HTTP-запити та абстракція мережі
- **`pages/`** — тільки UI та локальний стан
- **`components/** — переважно презентаційні компоненти
- **`store/`** — глобальний стан
- **`utils/`** — чисті функції без побічних ефектів

### 2. Type Safety

- Всі API відповіді типізовані
- Жодного `any` типу
- Strict TypeScript режим

### 3. Error Handling

- Централізована обробка помилок через HTTP wrapper
- Retry логіка для мережевих помилок
- User-friendly повідомлення про помилки

### 4. Performance

- Кешування для rate-limited API
- Автоматичне скасування запитів при unmount
- Ліниве завантаження через React Router

## Шар за шаром

### Layer 1: Data (API)

```
src/api/
├── http.ts        # Базовий HTTP wrapper
├── openmeteo.ts   # Weather API
├── coingecko.ts   # Crypto API
├── catfacts.ts    # Cat facts API
└── ipify.ts       # IP API
```

**Відповідальність:**
- Виконання HTTP-запитів
- Мапінг URL → API endpoint
- Abort сигнали та retry логіка

### Layer 2: Business Logic (Store/Utils)

```
src/store/
└── appStore.ts    # Zustand store для глобального стану

src/utils/
├── format.ts      # Форматування даних (чиста функція)
└── geo.ts         # Геолокація wrapper
```

**Відповідальність:**
- Управління глобальним станом
- Утилітарні функції для трансформації даних
- Бізнес-логіка

### Layer 3: Presentation (Components)

```
src/components/
├── Card.tsx           # Контейнер для контенту
├── Loader.tsx         # Індикатор завантаження
└── ErrorMessage.tsx   # Відображення помилок
```

**Відповідальність:**
- UI компоненти
- Типові візерунки (loading/error states)
- Переважно presentation logic

### Layer 4: Pages (Features)

```
src/pages/
├── Home.tsx      # Лендінґ з навігацією
├── Weather.tsx   # Погода за геолокацією
├── Crypto.tsx    # Топ криптовалют
└── Network.tsx   # IP + випадкові факти
```

**Відповідальність:**
- Композиція компонентів
- Локальний стан (loading, error, data)
- Життєвий цикл (useEffect з abort)
- Інтеграція з API та store

### Layer 5: Application (Routing)

```
src/app/
├── App.tsx       # Корінь додатку + навігація
└── routes.tsx    # Визначення роутів
```

**Відповідальність:**
- Роутинг та навігація
- Глобальний layout
- Ініціалізація додатку

## Потік даних

### Типовий запит

```
User Action → Page Component
    ↓
Page Component → API Module
    ↓
API Module → HTTP Wrapper
    ↓
HTTP Wrapper → Fetch API
    ↓
Response → HTTP Wrapper (retry, error handling)
    ↓
API Module → Page Component
    ↓
Page Component → Store (optional caching)
    ↓
Store → Page Component (state update)
    ↓
Page Component → UI Update
```

### Приклад: Завантаження погоди

```typescript
// 1. User clicks "Погода" → Weather.tsx mounts

// 2. useEffect triggers
useEffect(() => {
  const controller = new AbortController();
  
  // 3. Async fetch function
  const fetchWeather = async () => {
    // 4. Request geolocation
    const position = await getNavigatorPosition();
    
    // 5. Call API
    const weather = await getWeather(
      position.coords.latitude,
      position.coords.longitude,
      controller.signal
    );
    
    // 6. Update state
    setData(weather);
  };
  
  fetchWeather();
  
  // 7. Cleanup on unmount
  return () => controller.abort();
}, []);
```

## Патерни

### 1. Fetch Hook Pattern

Кожна сторінка використовує стандартний патерн:
```typescript
const [data, setData] = useState<Data | null>(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<AppError | null>(null);

useEffect(() => {
  // Fetch logic with abort
}, []);
```

### 2. Abort Controller Pattern

Автоматичне скасування запитів:
```typescript
useEffect(() => {
  const controller = new AbortController();
  
  fetchData(controller.signal);
  
  return () => controller.abort();
}, []);
```

### 3. Cache-Aside Pattern

Кешування через Zustand:
```typescript
const cached = getCache<CoinMarket[]>('top-coins', 60000);
if (cached) {
  setData(cached);
  return;
}

const coins = await getTopCoins();
setCache('top-coins', coins, 60000);
```

## Масштабування

### Додавання нової функції

1. **Додати тип** в `src/types/api.d.ts`
2. **Створити API модуль** в `src/api/`
3. **Створити сторінку** в `src/pages/`
4. **Додати роут** в `src/app/routes.tsx`
5. **Додати навігацію** в `App.tsx`

### Заміна HTTP wrapper

Просто замініть `src/api/http.ts` на новий implementation — інші модулі не зміняться.

### Додавання складнішого стану

Додайте новий slice в `appStore.ts` або створіть окремий store з Zustand.

## Технічний стек

```
React 18         → UI framework
TypeScript       → Type safety
Vite             → Build tool
Zustand          → State management
React Router     → Routing
Fetch API        → HTTP
CSS Modules      → Styling
```

Мінімальні залежності, максимум функціональності!

## Висновок

Ця архітектура забезпечує:
- ✅ Легке тестування
- ✅ Просте масштабування
- ✅ Чистий код
- ✅ Type safety
- ✅ Performance
- ✅ Maintainability

Готова до продакшн використання! 🚀

