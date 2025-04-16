import { Locator, Page, test } from "@playwright/test"


class SignUpPage {
    page: Page;
    usernameLocator: Locator;
    passwordLocator: Locator;
    emailLocator: Locator;
    signUpButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameLocator = this.page.locator('[placeholder="Username"]');
        this.passwordLocator = this.page.locator('[placeholder="Password"]');
        this.emailLocator = this.page.locator('[placeholder="Email"]');
        this.signUpButton = this.page.locator('.btn');
    }

    async setUsername(username: string) {
        await this.usernameLocator.fill(username);
    }

    async setPassword(password: string) {
        await this.passwordLocator.fill(password);
    }

    async setEmail(email: string) {
        await this.emailLocator.fill(email);
    }

    async clickRegisterButton() {
        await this.signUpButton.click();
    }
}

test("registration via SignUpPage POM", async ({ page }) => {
    const signUpPage = new SignUpPage(page);
    await page.goto('https://demo.learnwebdriverio.com/register');

    await signUpPage.setUsername('abc');
    await signUpPage.setPassword('abc');
    await signUpPage.setEmail('abc');
    await signUpPage.clickRegisterButton();
});
