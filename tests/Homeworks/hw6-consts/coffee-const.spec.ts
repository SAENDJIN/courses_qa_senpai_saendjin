import { test, expect } from '@playwright/test';
import { url } from 'inspector';

const COFFEE = {
    espresso: '[data-test="Espresso"]',
    espressoMacchiato: '[data-test="Espresso_Macchiato"]',
    cappuccino: '[data-test="Cappuccino"]',
    mocha:'[data-test="Mocha"]',
    flatWhite:'[data-test="Flat_White"]',
    americano:'[data-test="Americano"]',
    cafeLatte:'[data-test="Cafe_Latte"]',
    espressoConPanna:'[data-test="Espresso_Con Panna"]',
    cafeBreve:'[data-test="Cafe_Breve"]',
};

const urlCoffee = 'https://coffee-cart.app/'
// 1. Check all 9 coffee is visible
test('CC-1 Is all coffee is visible', async ({ page }) => {
    await page.goto(urlCoffee);

    await expect(page.locator(COFFEE.espresso)).toBeVisible();
    await expect(page.locator(COFFEE.espressoMacchiato)).toBeVisible();
    await expect(page.locator(COFFEE.cappuccino)).toBeVisible();
    await expect(page.locator(COFFEE.mocha)).toBeVisible();
    await expect(page.locator(COFFEE.flatWhite)).toBeVisible();
    await expect(page.locator(COFFEE.americano)).toBeVisible();
    await expect(page.locator(COFFEE.cafeLatte)).toBeVisible();
    await expect(page.locator(COFFEE.espressoConPanna)).toBeVisible();
    await expect(page.locator(COFFEE.cafeBreve)).toBeVisible();
});

// 2. Check header

const HEADER = {
    menu: 'a[aria-label="Menu page"]',
    cart: 'a[aria-label="Cart page"]',
    gitHub: 'a[aria-label="GitHub page"]',
};
test('CC-2 Header is visible', async ({ page }) => {
    await page.goto(urlCoffee);

    await expect(page.locator(HEADER.cart)).toBeVisible();
    await expect(page.locator(HEADER.menu)).toBeVisible();
    await expect(page.locator(HEADER.gitHub)).toBeVisible();
});

// 3. Check cart is empty for default
test('CC-3 Is cart empty for default', async ({ page }) => {
    await page.goto(urlCoffee);

    await expect(page.locator(HEADER.cart)).toContainText('cart (0)');
});

// 4. Check "Total" is empty for default

const totalBtn = 'button[data-test="checkout"]';
test('CC-5 Is total = 0 for default', async ({ page }) => {
    await page.goto('https://coffee-cart.app/');

    await expect(page.locator(totalBtn)).toContainText('Total: $0.00');    
});

