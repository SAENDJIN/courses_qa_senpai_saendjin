import { Locator, Page, test } from "@playwright/test"
import { sign } from "crypto";
class SignUpPage {
    page: Page
    userName: Locator;
    email: Locator;
    password: Locator;
    signUpBtn: Locator;
    baseUrl: string = 'https://demo.learnwebdriverio.com';
    fullUrl: string = this.baseUrl + '/register';


    constructor(page: Page) {
        this.page = page;

        
        this.userName = this.page.locator('[placeholder="Username"]');
        this.email = this.page.locator('[placeholder="Email"]');
        this.password = this.page.locator('[placeholder="Password"]');
        this.signUpBtn = this.page.locator('.btn');
    }
}

test("pom example", async ({ page }) => {
    const signUpPage = new SignUpPage(page);
    await page.goto('https://demo.learnwebdriverio.com/register');
    
    await signUpPage.userName.fill('test');
    await signUpPage.email.fill('test@test.com');
    await signUpPage.password.fill('qweasdzxc123');
    await signUpPage.signUpBtn.click();

})