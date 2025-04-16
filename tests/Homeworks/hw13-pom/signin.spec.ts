import { Locator, Page, test } from "@playwright/test"

class SignInPage {
    page: Page;
    emailLocator: Locator;
    passwordLocator: Locator;
    signInButton: Locator;

    constructor(page: Page){
        this.page = page;
        this.emailLocator = this.page.locator('[placeholder="Email"]');
        this.passwordLocator = this.page.locator('[placeholder="Password"]');
        this.signInButton = this.page.locator('.btn');        
    }

    async setEmail(email: string){
        await this.emailLocator.fill(email)
    }

    async setPassword(password: string){
        await this.passwordLocator.fill(password)
    }

    async clickLoginButton(){
        await this.signInButton.click()
    }    
}

test('Login on page', async ({ page }) => {
    const signInPage = new SignInPage(page);
    await page.goto('https://demo.learnwebdriverio.com/login');

    await signInPage.setEmail('test@test.test')
    await signInPage.setPassword('test')
    await signInPage.clickLoginButton();
});
