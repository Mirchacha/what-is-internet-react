# 🌐 Як задеployити на GitHub Pages (просто!)

## ⚠️ Важливо

Якщо замінили назву репозиторію, змініть `YOUR_USERNAME` і назву в інструкції.

---

## 📦 Крок 1: Встановити gh-pages

Відкрийте PowerShell та виконайте:

```powershell
cd C:\Users\User\what-is-internet-react
npm install --save-dev gh-pages
```

---

## 🔧 Крок 2: Оновити package.json

**Відкрийте** файл `package.json` у редакторі.

Додайте після першої дужки `{`:

```json
{
  "name": "what-is-internet-react",
  "homepage": "https://YOUR_USERNAME.github.io/what-is-internet-react",
  "private": true,
  ...
}
```

⚠️ Замініть `YOUR_USERNAME` на ваш GitHub username!

---

## 📝 Крок 3: Налаштувати GitHub

### 3a. Створити репозиторій

1. Перейдіть на https://github.com/new
2. Repository name: `what-is-internet-react`
3. Public
4. Create repository

### 3b. Підключити локальний проєкт

```powershell
# Якщо Git ще не налаштовано, спочатку виконайте:
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Тепер підключіть проект:
cd C:\Users\User\what-is-internet-react
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/what-is-internet-react.git
git push -u origin main
```

⚠️ Знову замініть `YOUR_USERNAME`!

---

## 🚀 Крок 4: Деплой

Виконайте:

```powershell
npm run deploy
```

⏱️ Займе 2-3 хвилини. Можливе вікно автентифікації — увійдіть у GitHub.

---

## ✅ Крок 5: Увімкнути GitHub Pages

1. https://github.com/YOUR_USERNAME/what-is-internet-react/settings/pages
2. Branch: `gh-pages`
3. Folder: `/(root)`
4. Save

---

## 🎉 Готово

Сайт доступний за адресою:
`https://YOUR_USERNAME.github.io/what-is-internet-react/`

⚠️ Замініть `YOUR_USERNAME`.

---

## 🔄 Майбутні деплої

Після змін:

```powershell
npm run deploy
```

---

## ❌ Якщо щось пішло не так

### Помилка: "gh-pages is not recognized"
```powershell
npm install --save-dev gh-pages
```

### Помилка: "git config"
```powershell
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### Сайт не завантажується
1. Перевірте налаштування Pages і використану гілку
2. Зачекайте 2-3 хвилини
3. Переконайтеся, що `homepage` у `package.json` коректний

---

## 📚 Альтернативи

- Netlify: перенесіть папку `dist`
- Vercel: `npm install -g vercel` → `vercel --prod`
- Cloudflare Pages: підключіть репозиторій

---

Успіхів з деплоєм!

