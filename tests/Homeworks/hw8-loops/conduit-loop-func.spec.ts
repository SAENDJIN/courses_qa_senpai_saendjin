import { test, expect } from '@playwright/test';
import { log } from 'console';

const home_url = 'https://demo.learnwebdriverio.com/'
const reg_url = 'https://demo.learnwebdriverio.com/login'
const article_url = 'https://demo.learnwebdriverio.com/editor'

const loginPage = (page) => ({
  emailInput: () => page.locator('[placeholder="Email"]'),
  passwordInput: () => page.locator('[placeholder="Password"]'),
  loginButton: () => page.locator('//button')
})

const articlePage = (page) => ({
  newArticleButton: () => page.locator('[href="/editor"]'),
  titleInput: () => page.locator('[placeholder="Article Title"]'),
  aboutInput: () => page.locator(`[placeholder="What's this article about?"]`),
  contentInput: () => page.locator('[placeholder="Write your article (in markdown)"]'),
  tagsInput: () => page.locator('[placeholder="Enter tags"]'),
  createButton: () => page.locator('[data-qa-id="editor-publish"]'),
  articlePreview: () => page.locator('[data-qa-type="article-preview"]'),
  titlePreview: () => page.locator('[data-qa-type="preview-title"]')
})

async function login(page, email, password) {
  const login = loginPage(page);
  await page.goto(reg_url);
  await login.emailInput().fill(email);
  await login.passwordInput().fill(password);
  await login.loginButton().click();
  await expect(articlePage(page).newArticleButton()).toBeVisible();
}

async function createArticle(page, title, about, content, tags) {
  const article = articlePage(page);
  await page.goto(article_url);
  await article.titleInput().fill(title);
  await article.aboutInput().fill(about);
  await article.contentInput().fill(content);
  await article.tagsInput().fill(tags);
  await article.createButton().click();
}

async function verifyArticles(page) {
  const article = articlePage(page);
  await page.goto(home_url);

  for (let i = 0; i < 3; i++) {
    const content = await article.articlePreview().nth(i).textContent();
    const reversedIndex = 2 - i;
    await expect(article.titlePreview().nth(reversedIndex))
      .toContainText(`Test_tittle_${i}`);
  }
}

test('Create 3 article', async ({ page }) => {
  await login(page, 'test@test.com', 'testtest');
  for (let i = 0; i < 3; i++){
    await createArticle(
      page,
      `Test_tittle_${i}`,
      `Test_about_${i}`,
      `Test_content_${i}`,
      'Test_tag_1'
    );
  }
  await verifyArticles(page);
})
