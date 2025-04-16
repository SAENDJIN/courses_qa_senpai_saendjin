import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ArticleEditorPage extends BasePage {
  private titleLocator: Locator;
  private descriptionLocator: Locator;
  private bodyLocator: Locator;
  private publishArticleButtonLocator: Locator;
  private editBtn: Locator;
  private deleteBtn: Locator;

  constructor(page: Page) {
    super(page); //
    this.titleLocator = page.locator('[data-qa-id="editor-title"]');
    this.descriptionLocator = page.locator(`[data-qa-id="editor-description"]`);
    this.bodyLocator = page.getByRole("textbox", {
      name: "Write your article",
    });
    this.publishArticleButtonLocator = page.locator(`//button[@type="submit"]`);
    this.editBtn = page.locator('[data-qa-id="article-edit"]').first();
    this.deleteBtn = page.locator('[data-qa-id="article-delete"]').first();

  }

  async goto() {
    await this.page.goto("/editor");
  }

  async editArticle(articleData: {
    title: string;
    description: string;
    body: string;
  }) {
    await this.titleLocator.fill(articleData.title);
    await this.descriptionLocator.fill(articleData.description);
    await this.bodyLocator.fill(articleData.body);
  }

  async publishArticle() {
    await this.publishArticleButtonLocator.click();
  }

  async editExistingArticle(articleData1: {
    title: string;
    description: string;
    body: string;
  }) {
    await this.editBtn.click();
    await this.titleLocator.fill(articleData1.title);
    await this.descriptionLocator.fill(articleData1.description);
    await this.bodyLocator.fill(articleData1.body);
    await this.publishArticleButtonLocator.click();
  }

  async deleteExistingArticle() {
    await this.deleteBtn.click();
  }
}
