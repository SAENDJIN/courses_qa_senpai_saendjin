import { test, expect, chromium } from '@playwright/test';

//# Chrome DevTools Protocol (CDP) 
//Це низькорівневий API для взаємодії з браузером Chrome (і Chromium-браузерами, такими як Edge) через WebSocket.
//CDP дозволяє програмно керувати браузером, отримувати дані про виконання сторінки та налагоджувати JavaScript.


//# Основні об'єкти у Playwright
//Об'єкти browser, context і page є основними будівельними блоками у Playwright. Вони допомагають моделювати поведінку користувача у веб-додатку.

// ## 1. browser: Браузер
// Об’єкт browser представляє сам браузер, наприклад, Chrome, Firefox або WebKit (движок Safari). Цей об’єкт використовується для запуску браузера.
// Ви можете:
// - Відкрити новий браузер.
// - Налаштувати браузер (наприклад, увімкнути/вимкнути графічний інтерфейс або працювати в headless-режимі).
// - Виконати кілька ізольованих тестів у різних "контекстах".
// https://playwright.dev/docs/api/class-browser
// ### Запуск браузера:
const browser = await chromium.launch({ headless: true });

// ## 2. context: Браузерний контекст
// Контекст схожий на нове вікно браузера з ізольованими сесіями, cookies та іншими налаштуваннями. Дозволяє створити ізольовані середовища для тестування.
// - Кожен контекст працює незалежно від інших.
// - Ви можете тестувати декілька сесій одночасно (наприклад, два різних користувача).
// - Це корисно, коли тестуєте додаток, що використовує сесії, cookies чи локальне сховище.
// https://playwright.dev/docs/api/class-browsercontext
// ### Створення контексту:
const context = await browser.newContext();

// ## 3. page: Сторінка
// Об’єкт page представляє окрему вкладку або сторінку в браузері.
// Дозволяє взаємодіяти зі сторінкою:
// - Переходити на URL.
// - Шукати елементи.
// - Виконувати дії (клік, введення тексту тощо).
// - Знімати скріншоти чи перевіряти стан сторінки.
// ### Створення сторінки:
const page = await context.newPage();

// ### Взаємодія з елементом:
await page.click("text=Login");

// ## Як вони взаємодіють разом:
// 1. Спочатку запускається браузер (`browser`).
// 2. У браузері створюється новий контекст (`context`).
// 3. У контексті створюється сторінка (`page`), на якій виконуються всі дії.
// https://playwright.dev/docs/api/class-page


// # Об’єкт Locator у Playwright
// Об’єкт Locator у Playwright — це API для роботи з елементами на сторінці. Він дозволяє шукати, взаємодіяти і перевіряти стан елементів.

// ### Чому використовувати Locator?
// 1. Ефективне управління елементами: Locator запам'ятовує шлях до елемента і дозволяє виконувати дії без додаткових пошуків.
// 2. Автоматичне очікування: Playwright автоматично чекає появи елемента в DOM.
// 3. Зручність роботи: Позбавляє від повторного пошуку елементів.
// 4. Точні перевірки: Підтримує складні селектори.

// ### Як створити Locator?
const header = page.locator("h1");
await expect(header).toHaveText("Example Domain");


// ## Основні методи Locator
// ### 1. Дії з елементами
header.click(); // Клік
header.fill("Текст"); // Введення тексту
header.pressSequentially("Текст"); // Імітація набору
header.hover(); // Наведення миші
header.check(); // Вибір чекбокса
header.uncheck(); // Зняття вибору
header.selectOption("value"); // Вибір опції

// ### 2. Очікування
await header.waitFor(); // Чекає, поки елемент стане доступним

// ### 3. Отримання інформації
await header.textContent(); // Отримання тексту
await header.getAttribute("href"); // Отримання атрибута
await header.isVisible(); // Перевірка видимості

// ### 4. Перевірки (Assertions)
expect(header).toHaveText("Example");
expect(header).toBeVisible();
expect(header).toBeEnabled();

// ### 5. Робота зі списками
header.nth(1); // Отримання конкретного елемента
header.first(); // Перший елемент
header.last(); // Останній елемент
header.count(); // Кількість елементів

//### 6. Інтерактивні методи
header.focus(); // Фокус на елементі
header.blur(); // Зняття фокуса


//## Особливості Locator
// - Автоматичне повторення дій, якщо елемент тимчасово недоступний.
// - Підтримка складних селекторів: CSS, XPath, текстові селектори.
// Locator робить тести стабільнішими та ефективнішими, зменшуючи кількість помилок.
// https://playwright.dev/docs/locators






