# 🚀 Легкий деплой за 3 кроки!

## ⚡ Від нуля до живого сайту за 5 хвилин

---

## Крок 1️⃣ : Встановити gh-pages

```powershell
cd C:\Users\User\what-is-internet-react
npm install --save-dev gh-pages
```

---

## Крок 2️⃣ : Оновити package.json

**Відкрийте** файл `package.json` в будь-якому текстовому редакторі (Notepad, VS Code, і т.д.)

**Додайте** в саму першу строку після `{`:

```json
{
  "name": "what-is-internet-react",
  "homepage": "https://YOUR_USERNAME.github.io/what-is-internet-react",
  "private": true,
```

⚠️ **Замініть `YOUR_USERNAME` на ваш GitHub username!**

Наприклад, якщо ваш username `ivan123`, то буде:
```json
"homepage": "https://ivan123.github.io/what-is-internet-react",
```

**Збережіть файл** (Ctrl + S)

---

## Крок 3️⃣ : Задеплоїти!

### 3a. Завантажити код на GitHub

Якщо ще не створювали репозиторій на GitHub:

1. Перейдіть на: https://github.com/new
2. Назва: `what-is-internet-react`
3. Публічний
4. Натисніть "Create repository"

Потім в PowerShell:

```powershell
cd C:\Users\User\what-is-internet-react
git init
git add .
git commit -m "First commit"
git remote add origin https://github.com/YOUR_USERNAME/what-is-internet-react.git
git push -u origin main
```

⚠️ Замініть `YOUR_USERNAME`!

### 3b. Запустити деплой

```powershell
npm run deploy
```

⏱️ Почекайте 2-3 хвилини...

### 3c. Увімкнути Pages

1. Відкрийте: https://github.com/YOUR_USERNAME/what-is-internet-react/settings/pages
2. Branch: **gh-pages** (виберіть зі списку)
3. Folder: `/ (root)`
4. **Save**

---

## 🎉 Готово!

За 2-3 хвилини ваш сайт буде тут:

**https://YOUR_USERNAME.github.io/what-is-internet-react/**

⚠️ Не забудьте замінити `YOUR_USERNAME` на ваш username!

---

## 🔄 Оновлення сайту

Просто запустіть:

```powershell
npm run deploy
```

---

## ❌ Що робити якщо помилка?

### "gh-pages is not recognized"
```powershell
npm install --save-dev gh-pages
```

### "Cannot push"
```powershell
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
```

### Сайт показує 404
Перевірте:
- Settings → Pages → Branch: **gh-pages**
- Через 2-3 хвилини оновіть сторінку

---

## 💡 Поради

- `package.json` - `homepage` повинен мати **ТОЧНУ** назву репозиторію
- `vite.config.ts` - вже налаштовано ✅
- Якщо змінили назву репо - змініть обидва файли

---

**Це все! 🚀**

