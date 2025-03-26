import { test, expect } from '@playwright/test';

const reg_url = 'https://demo.learnwebdriverio.com/login'
const article_url = 'https://demo.learnwebdriverio.com/editor'

const email = 'test@test.com'
const password = 'testtest'

const email_input = '[placeholder="Email"]'
const password_input = '[placeholder="Password"]'
const login_btn = '//button'

const new_article_btn = '[href="/editor"]'

const article_title = '[placeholder="Article Title"]'
const article_about = `[placeholder="What's this article about?"]`
const article_content = '[placeholder="Write your article (in markdown)"]'
const article_tags = '[placeholder="Enter tags"]'
const article_create = '[data-qa-id="editor-publish"]'
const article_preview = '[data-qa-type="article-preview"]'
const preview_tittle = '[data-qa-type="preview-title"]'

test('Create 3 articles', async ({ page }) => {
    await page.goto(reg_url);
    await page.locator(email_input).fill(email);
    await page.locator(password_input).fill(password);
    await page.locator(login_btn).click()
    await expect(page.locator(new_article_btn)).toBeVisible();

    for (let i = 0; i < 3; i++) {
        await page.goto(article_url);
        await page.locator(article_title).fill(`Test_tittle_${i}`);
        await page.locator(article_about).fill(`Test_about_${i}`);
        await page.locator(article_content).fill(`Test_content_${i}`);
        await page.locator(article_tags).fill(`Test_tag_1`);
        await page.locator(article_create).click();
    }

    await page.goto('https://demo.learnwebdriverio.com/');
    for (let i = 0; i < 3; i++) { 
        const content = await page.locator(article_preview).nth(i).textContent();
        console.log(content)
        const reversedIndex = 2 - i; 
        await expect(page.locator(preview_tittle).nth(reversedIndex))
        .toContainText(`Test_tittle_${i}`);
    }
});