import {test, expect } from '@playwright/test';

const generateRandomUser = () => {
    const randomString = Math.random().toString(36).substring(2, 10);
    return {
        username: `user${randomString}`,
        email: `test_${randomString}@example.com`,
        password: `Passw0rd!${randomString}`
    };
};

const { username, email, password } = generateRandomUser();


test('Successful registration', async ({page}) =>{
    await page.goto('https://demo.learnwebdriverio.com/');
    await page.locator('//*[@href="/register"]').click();
    await page.locator('//input[@placeholder="Username"]').fill(username);
    await page.locator('//input[@placeholder="Email"]').fill(email);
    await page.locator('//input[@placeholder="Password"]').fill(password);
    await page.locator('//button[contains(text(), "Sign up")]').click();

    await console.log(username)
    const username_play = await page.locator('//ul[@data-qa-id="site-nav"]/li[last()]/a').textContent();
    console.log(username_play)
    await expect(page.locator('//ul[@data-qa-id="site-nav"]/li[last()]/a')).toHaveText(username);

});

test('Reisstration errors ', async ({page})=>{
    await page.goto('https://demo.learnwebdriverio.com/');
    await page.locator('//*[@href="/register"]').click();
    await page.locator('//button[contains(text(), "Sign up")]').click();

    // await expect(page.locator('//ul[@class="error-messages"]/li[1]')).toBeVisible();
    // await expect(page.locator('//ul[@class="error-messages"]/li[2]')).toBeVisible();

    await expect(page.locator('//ul[@class="error-messages"]/li[1]')).toHaveText('username can\'t be blank');
    await expect(page.locator('//ul[@class="error-messages"]/li[2]')).toHaveText('email can\'t be blank');

});