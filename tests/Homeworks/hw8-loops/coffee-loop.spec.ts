import { test, expect } from '@playwright/test';

const urlCoffee = 'https://coffee-cart.app/'
test('order all coffee', async ({ page }) => {
    await page.goto(urlCoffee);
    const countCoffee = await page.locator(".cup-body").count();
    console.log(countCoffee)



    for (let i = 0; i < countCoffee; i++) {
        if (await page.locator('.promo').first().isVisible()) {
            await page.getByRole("button", { name: "Nah" }).click()
        }
        await page.locator(".cup-body").nth(i).click();
    }

    const checkoutList = await page.locator('[data-test="checkout"]').textContent();
    console.log(checkoutList)
    await expect(page.locator('[data-test="checkout"]')).toContainText('Total: $119.00');



});