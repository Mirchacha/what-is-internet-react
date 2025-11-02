# 🚀 Деploy на GitHub Pages

## Краткий огляд

Цей проект використовує React Router, тому для GitHub Pages потрібен конфігурація з `gh-pages` та корекція базового шляху.

---

## 📋 Крок за кроком

### Крок 1: Встановлення gh-pages

У PowerShell виконайте:

```powershell
cd C:\Users\User\what-is-internet-react
npm install --save-dev gh-pages
```

### Крок 2: Оновлення package.json

Додайте дві команди в секцію `scripts`:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

Також додайте поле `homepage`:

```json
{
  "name": "what-is-internet-react",
  "private": true,
  "homepage": "https://YOUR_USERNAME.github.io/what-is-internet-react",
  "version": "1.0.0",
  ...
}
```

⚠️ Замініть `YOUR_USERNAME` на ваш GitHub username!

### Крок 3: Оновлення vite.config.ts

Оскільки використовується React Router, додайте `base`:

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/what-is-internet-react/', // IMPORTANT: з / в кінці!
});
```

### Крок 4: Гіт репозиторій

Створіть репозиторій на GitHub:
1. https://github.com/new
2. Ім’я: `what-is-internet-react`
3. Public
4. Створіть репозиторій (без README та .gitignore)

Ініціалізуйте локально:

```powershell
cd C:\Users\User\what-is-internet-react
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/what-is-internet-react.git
git push -u origin main
```

⚠️ Замініть `YOUR_USERNAME`.

### Крок 5: Збірка та деплой

```powershell
npm run deploy
```

Час виконання: ~2–3 хв. Можливе авторизування в GitHub.

### Крок 6: Увімкнути GitHub Pages

1. https://github.com/YOUR_USERNAME/what-is-internet-react/settings/pages
2. Source: `gh-pages`
3. Folder: `/ (root)`
4. Save

Можливі помилки автентифікації:

```powershell
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

Далі:
```powershell
npm run deploy
```

---

## Альтернатива

- Vercel:
```powershell
npm install -g vercel
vercel --prod
```
- Netlify: drag & drop папки `dist`
- Cloudflare Pages: підключіть репозиторій

---

## Налаштування після деплою

- `gh-pages` пушитиме у гілку `gh-pages`
- Змінювати URL у `package.json` і `vite.config.ts`, якщо змінювали назву
- Перевіряти за адресою: `https://YOUR_USERNAME.github.io/what-is-internet-react/`

---

## Інструкція для продукту

Перегляньте [DEPLOY_SIMPLE.md](DEPLOY_SIMPLE.md) для спрощеної версії.

---

## Підсумок

Після деплою сайт буде доступний за адресою GitHub Pages.

