import { test, expect } from '@playwright/test';

// 1. Check all 9 coffee is visible
test('CC-1 Is all coffee is visible', async ({ page }) => {
    await page.goto('https://coffee-cart.app/');

    await expect(page.locator('[data-test="Espresso"]')).toBeVisible();
    await expect(page.locator('[data-test="Espresso_Macchiato"]')).toBeVisible();
    await expect(page.locator('[data-test="Cappuccino"]')).toBeVisible();
    await expect(page.locator('[data-test="Mocha"]')).toBeVisible();
    await expect(page.locator('[data-test="Flat_White"]')).toBeVisible();
    await expect(page.locator('[data-test="Americano"]')).toBeVisible();
    await expect(page.locator('[data-test="Cafe_Latte"]')).toBeVisible();
    await expect(page.locator('[data-test="Espresso_Con Panna"]')).toBeVisible();
    await expect(page.locator('[data-test="Cafe_Breve"]')).toBeVisible();
});

// 2. Check header
test('CC-2 Header is visible', async ({ page }) => {
    await page.goto('https://coffee-cart.app/');

    await expect(page.locator('a[aria-label="Menu page"]')).toBeVisible();
    await expect(page.locator('a[aria-label="Cart page"]')).toBeVisible();
    await expect(page.locator('a[aria-label="GitHub page"]')).toBeVisible();
});

// 3. Check cart is empty for default
test('CC-3 Is cart empty for default', async ({ page }) => {
    await page.goto('https://coffee-cart.app/');

    await expect(page.locator('a[aria-label="Cart page"]')).toContainText('cart (0)');
});

// 4. Check "Total" is empty for default
test('CC-5 Is total = 0 for default', async ({ page }) => {
    await page.goto('https://coffee-cart.app/');

    await expect(page.locator('button[data-test="checkout"]')).toContainText('Total: $0.00');    
});

