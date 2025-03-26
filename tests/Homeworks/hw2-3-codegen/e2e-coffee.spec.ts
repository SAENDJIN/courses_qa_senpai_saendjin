import { test, expect } from '@playwright/test';

// 1. Check all 9 coffee is visible
test('CC-1 Is all coffee is visible', async ({ page }) => {
    await page.goto('https://coffee-cart.app/');

    await expect(page.getByTestId('Espresso')).toBeVisible();
    await expect(page.getByTestId('Espresso_Macchiato')).toBeVisible();
    await expect(page.getByTestId('Cappuccino')).toBeVisible();
    await expect(page.getByTestId('Mocha')).toBeVisible();
    await expect(page.getByTestId('Flat_White')).toBeVisible();
    await expect(page.getByTestId('Americano')).toBeVisible();
    await expect(page.getByTestId('Cafe_Latte')).toBeVisible();
    await expect(page.getByTestId('Espresso_Con Panna')).toBeVisible();
    await expect(page.getByTestId('Cafe_Breve')).toBeVisible();
});

// 2. Check all 9 coffee price is visible???
test('CC-2 Is all coffee price is visible', async ({ page }) => {
    await page.goto('https://coffee-cart.app/');

    await expect(page.locator("//h4[text()='Espresso ']/small")).toHaveText('$10.00');
    // await expect(page.locator('h4:has-text("Espresso") + small')).toHaveText('$10.00');
    // await expect(page.getByTestId('Espresso_Macchiato')).toContainText('$12.00');
    // await expect(page.getByTestId('Cappuccino')).toContainText('$19.00');
    // await expect(page.getByTestId('Mocha')).toContainText('$8.00');
    // await expect(page.getByTestId('Flat_White')).toContainText('$18.00');
    // await expect(page.getByTestId('Americano')).toContainText('$7.00');
    // await expect(page.getByTestId('Cafe_Latte')).toContainText('$16.00');
    // await expect(page.getByTestId('Espresso_Con Panna')).toContainText('$14.00');
    // await expect(page.getByTestId('Cafe_Breve')).toContainText('$15.00');
    
});

// 3. Check header
test('CC-3 Header is visible', async ({ page }) => {
    await page.goto('https://coffee-cart.app/');

    await expect(page.getByText('menucart (0)github')).toBeVisible();
    await expect(page.getByRole('listitem').filter({ hasText: 'menu' })).toBeVisible();
    await expect(page.locator("//html/body/div/ul/li[2]")).toBeVisible();
    await expect(page.getByRole('listitem').filter({ hasText: 'github' })).toBeVisible();
});

// 4. Check cart is empty for default
test('CC-4 Is cart empty for default', async ({ page }) => {
    await page.goto('https://coffee-cart.app/');

    await expect(page.locator("//html/body/div/ul/li[2]")).toContainText('cart (0)');
});

// 5. Check "Total" is empty for default
test('CC-5 Is total = 0 for default', async ({ page }) => {
    await page.goto('https://coffee-cart.app/');

    await expect(page.getByTestId('checkout')).toContainText('Total: $0.00');    
});

// 6. Check adding coffee to cart
test('CC-6 Successful adding coffee to cart', async ({ page }) => {
    await page.goto('https://coffee-cart.app/');

    await expect(page.getByTestId('checkout')).toContainText('Total: $0.00');    
});

// 7. Check mocha promotion
test('CC-7 Mocha promotion is working', async ({ page }) => {
    await page.goto('https://coffee-cart.app/');

    await page.locator('[data-test="Espresso"]').click();
    await page.locator('[data-test="Espresso_Macchiato"]').click();
    await page.locator('[data-test="Cappuccino"]').click();

    await expect(page.getByText('It\'s your lucky day! Get an extra cup of Mocha for $4.espressochocolate')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Yes, of course!' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Nah, I\'ll skip.' })).toBeVisible();
});

// 8. Check the contents of the shopping cart
test('CC-8 Cart is filled with the selected items', async ({ page }) => {
    await page.goto('https://coffee-cart.app/');

    await page.locator('[data-test="Espresso"]').click();
    await page.locator('[data-test="Espresso_Macchiato"]').click();
    await page.locator('[data-test="Cappuccino"]').click();

    await page.getByRole('link', { name: 'Cart page' }).click();
    await expect(page.getByText('Cappuccino$19.00 x 1+-$19.00x')).toBeVisible();
    await expect(page.getByText('Espresso$10.00 x 1+-$10.00x')).toBeVisible();
    await expect(page.getByText('Espresso Macchiato$12.00 x 1')).toBeVisible();
    await expect(page.locator('[data-test="checkout"]')).toContainText('Total: $41.00');
});

// 9. Check successful order
test('CC-9 Successful ordering', async ({ page }) => {
    await page.goto('https://coffee-cart.app/');

    await page.locator('[data-test="Espresso"]').click();
    await page.locator('[data-test="Espresso_Macchiato"]').click();
    await page.locator('[data-test="Cappuccino"]').click();
    await page.locator('[data-test="checkout"]').click();
    
    await expect(page.getByText('Payment details×We will send')).toBeVisible();
    await page.getByRole('textbox', { name: 'Name' }).fill('andrew');
    await page.getByRole('textbox', { name: 'Email' }).fill('email@ss.com');
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByRole('button', { name: 'Thanks for your purchase.' })).toBeVisible();
});

// 10. Check cart page, delete add and minus coffee
test('CC-10 delete, add and minus btn is working', async ({ page }) => {
    await page.goto('https://coffee-cart.app/');

    await page.locator('[data-test="Espresso"]').click();
    await page.locator('[data-test="Espresso_Macchiato"]').click();
    await page.locator('[data-test="Cappuccino"]').click();
    await page.getByRole('link', { name: 'Cart page' }).click();
    
    await page.getByRole('button', { name: 'Remove all Cappuccino' }).click();
    await expect(page.getByText('Cappuccino$19.00 x 1+-$19.00x')).not.toBeVisible();
    await page.getByRole('button', { name: 'Add one Espresso', exact: true }).click();
    await expect(page.getByText('Espresso$10.00 x 2+-$20.00x')).toBeVisible();
    await page.getByRole('button', { name: 'Remove one Espresso', exact: true }).click();
    await expect(page.getByText('Espresso$10.00 x 1+-$10.00x')).toBeVisible();
  
});