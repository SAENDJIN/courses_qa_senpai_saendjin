import { test, expect } from "@playwright/test";

/*
 Масив тестових даних для параметризованого запуску

 Зверніть увагу на те що testData це масив який містить обʼєкти в якості елементів масиву.
 Важливо щоб обʼєкти мають однакові ключі (в нашому випадку - name, email, wantsUpdates)
 */
const testData = [
  { name: "Іван Петренко", email: "ivan@example.com", wantsUpdates: true },
  { name: "Оксана Шевченко", email: "oksana@example.com", wantsUpdates: false },
];

// Параметризований тест, який проходить по кожному набору даних
for (const data of testData) {
  test(`Надсилання платіжної форми для ${data.name}`, async ({ page }) => {
    // Відкриваємо сторінку з формою (замінити на актуальну адресу)
    await page.goto("https://coffee-cart.app/");

    await page.locator('[data-test="Cappuccino"]').click();

    // Клікаємо по кнопці, яка відкриває форму (оновити селектор за потреби)
    await page.locator('[data-test="checkout"]').click();

    // Вводимо ім’я в поле Name
    await page.getByRole("textbox", { name: "Name" }).fill(data.name);

    // Вводимо email у відповідне поле
    await page.getByRole("textbox", { name: "Email" }).fill(data.email);

    // Якщо користувач хоче отримувати оновлення, клікаємо чекбокс
    if (data.wantsUpdates) {
      await page.getByRole("checkbox", { name: "Promotion checkbox" }).check();
    }

    // Натискаємо кнопку Submit для надсилання форми
    await page.getByRole("button", { name: "Submit" }).click();

    // Перевірка: очікуємо, що після надсилання з’явиться певне повідомлення або індикатор успіху
  });
}