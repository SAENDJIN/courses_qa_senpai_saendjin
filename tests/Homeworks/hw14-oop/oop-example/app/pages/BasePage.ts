import { Page, Locator } from "@playwright/test";

export class BasePage {
  protected page: Page;
  private headerHomeBtn: Locator;
  private headerNewArticle: Locator;
  private headerSettingsBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.headerHomeBtn = page.locator('.nav-item').first();
    this.headerNewArticle = page.locator('.nav-item').nth(1);
    this.headerSettingsBtn = page.locator('.nav-item').nth(2);
  }
  async clickHome() {
      await this.headerHomeBtn.click();
  }
  async clickNewArticle() {
    await this.headerNewArticle.click();
}
async clickSettings() {
  await this.headerSettingsBtn.click();
}
}
