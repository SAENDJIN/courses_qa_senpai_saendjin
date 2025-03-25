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

const SELECTORS = {
    registerLink: '//*[@href="/register"]',
    usernameInput: '//input[@placeholder="Username"]',
    emailInput: '//input[@placeholder="Email"]',
    passwordInput: '//input[@placeholder="Password"]',
    signUpButton: '//button[contains(text(), "Sign up")]',
    navUsername: '//ul[@data-qa-id="site-nav"]/li[last()]/a',
    errorMessagesUsername: '//ul[@class="error-messages"]/li[1]',
    errorMessagesEmail: '//ul[@class="error-messages"]/li[2]'
};

const url = 'https://demo.learnwebdriverio.com/';

test('Successful registration', async ({page}) =>{
    await page.goto(url);
    await page.locator(SELECTORS.registerLink).click();
    await page.locator(SELECTORS.usernameInput).fill(username);
    await page.locator(SELECTORS.emailInput).fill(email);
    await page.locator(SELECTORS.passwordInput).fill(password);
    await page.locator(SELECTORS.signUpButton).click();

    const username_play = await page.locator(SELECTORS.navUsername).textContent();
    await expect(page.locator(SELECTORS.navUsername)).toHaveText(username);

});

test('Reisstration errors ', async ({page})=>{
    await page.goto(url);
    await page.locator(SELECTORS.registerLink).click();
    await page.locator(SELECTORS.signUpButton).click();

    await expect(page.locator(SELECTORS.errorMessagesUsername)).toHaveText('username can\'t be blank');
    await expect(page.locator(SELECTORS.errorMessagesEmail)).toHaveText('email can\'t be blank');

});