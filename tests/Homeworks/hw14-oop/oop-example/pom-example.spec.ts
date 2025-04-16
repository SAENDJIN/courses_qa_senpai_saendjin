// page object model  (обєкт моделі сторінки)
import { test, Locator, Page, expect } from "@playwright/test";
import { SignUpPage } from "./app/pages/SignUpPage";
import { ArticleEditorPage } from "./app/pages/ArticleEditorPage";
import { ArticlesPage } from "./app/pages/ArticlesPage";
import { BasePage } from "./app/pages/BasePage";
import { constrainedMemory } from "process";

test("pom example1111", async ({ page }) => {
  const signUpPage = new SignUpPage(page);
  const articleEditorPage = new ArticleEditorPage(page);
  const articlesPage = new ArticlesPage(page);

  const randomStr = Math.random().toString(36).substring(2, 10);
  console.log(randomStr)

  await signUpPage.goto();
  await signUpPage.registerUser({
    username: `user${randomStr}`,
    email: `user_${randomStr}@test.com`,
    pass: "qwerty123",
  });

  await page.locator(`//a[@href="/editor"]`).click();

  await articleEditorPage.editArticle({
    title: `random title - ${randomStr}`,
    description: `random desc - ${randomStr}`,
    body: `random body- ${randomStr}`,
  });

  await articleEditorPage.publishArticle();

  const articleHeader = articlesPage.getArticleLocatorByTitle("random title");
  await expect(articleHeader).toBeVisible();

  await articleEditorPage.editExistingArticle({
    title: `asd1`,
    description: `asd`,
    body: `asd`,
  });

  const updArticleHeader = articlesPage.getArticleLocatorByTitle("asd1");
  await expect(updArticleHeader).toBeVisible();

  // await articleEditorPage.deleteExistingArticle()
  // const deletedArticleHeader = articlesPage.getArticleLocatorByTitle("asd1");
  // await expect(deletedArticleHeader).not.toBeVisible();

});
