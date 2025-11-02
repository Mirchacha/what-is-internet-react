# 🧪 Тестування

## Огляд

Проект використовує **Vitest** + **React Testing Library** для повного тестового покриття.

## Запуск тестів

```bash
# Запустити всі тести
npm test

# Запустити тести у watch режимі
npm test -- --watch

# Запустити тести з UI
npm run test:ui

# Запустити тести з покриттям
npm run test:coverage

# Запустити тести в одному процесі (для CI)
npm test -- --run
```

## Структура тестів

```
src/
├── test/
│   ├── setup.ts           # Глобальна конфігурація тестів
│   ├── mockData.ts        # Mock дані для тестів
│   └── README.md          # Цей файл
├── api/__tests__/
│   ├── http.test.ts       # HTTP wrapper тести
│   ├── ipify.test.ts      # IP API тести
│   ├── catfacts.test.ts   # Cat Facts тести
│   ├── coingecko.test.ts  # CoinGecko тести
│   └── openmeteo.test.ts  # Weather API тести
├── utils/__tests__/
│   ├── format.test.ts     # Форматування тести
│   └── geo.test.ts        # Геолокація тести
├── components/__tests__/
│   ├── Card.test.tsx      # Card компонент тести
│   ├── Loader.test.tsx    # Loader тести
│   └── ErrorMessage.test.tsx # ErrorMessage тести
└── store/__tests__/
    └── appStore.test.ts   # Zustand store тести
```

## Типи тестів

### Unit Tests (API & Utils)

Тести для чистых функций та API модулів:
- `src/api/__tests__/` - HTTP wrapper та всі API endpoints
- `src/utils/__tests__/` - Утилітарні функції

**Приклади:**
- ✅ Успішний HTTP запит
- ✅ Обробка помилок
- ✅ Retry логіка
- ✅ Timeout
- ✅ Форматування даних

### Component Tests

Тести для React компонентів:
- `src/components/__tests__/` - UI компоненти

**Приклади:**
- ✅ Рендеринг компонентів
- ✅ Відображення даних
- ✅ Обробка кліків
- ✅ Умовний рендеринг

### Integration Tests (Store)

Тести для Zustand store:
- `src/store/__tests__/` - State management

**Приклади:**
- ✅ Зміна теми
- ✅ Кешування даних
- ✅ TTL функціональність
- ✅ Очищення кешу

## Mock Data

Всі mock дані зберігаються в `src/test/mockData.ts`:

```typescript
import { mockWeather, mockCoins, mockIp, mockCatFact } from '@/test/mockData';

// Використання
global.fetch = vi.fn().mockResolvedValue(mockSuccessfulFetch(mockWeather));
```

## Best Practices

### 1. Isolation

Кожен тест повинен бути незалежним:
```typescript
beforeEach(() => {
  vi.clearAllMocks();
});
```

### 2. Clear Assertions

Використовуйте зрозумілі назви:
```typescript
it('should fetch IP address successfully', async () => {
  // ...
});
```

### 3. Mock Management

Mock тільки те, що потрібно:
```typescript
global.fetch = vi.fn().mockResolvedValue(mockSuccessfulFetch(data));
```

### 4. Coverage

Прагніть до 80%+ покриття для критичного коду.

### 5. Snapshot Tests (опційно)

Для складних компонентів:
```typescript
expect(container.firstChild).toMatchSnapshot();
```

## Покриття коду

```bash
npm run test:coverage
```

Targets для покриття:
- **api/** - 90%+
- **utils/** - 85%+
- **components/** - 80%+
- **store/** - 85%+

## CI Integration

Додайте в `.github/workflows/test.yml`:

```yaml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm test -- --run --coverage
      - uses: codecov/codecov-action@v3
```

## Налагодження тестів

### Проблеми з jsdom

```typescript
// mock window.matchMedia в setup.ts
Object.defineProperty(window, 'matchMedia', { ... });
```

### Async Issues

```typescript
await waitFor(() => {
  expect(screen.getByText('Content')).toBeInTheDocument();
});
```

### Router Issues

```typescript
import { MemoryRouter } from 'react-router-dom';

render(
  <MemoryRouter>
    <Component />
  </MemoryRouter>
);
```

## Додаткова інформація

- [Vitest Docs](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

