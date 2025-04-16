import {expect, chromium } from '@playwright/test';
import {spec} from "./fixture";

let signUpPage;
let articleEditorPage;
let articlesPage;

spec.beforeEach(({page, browser, context})=>{
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    signUpPage = new SignUpPage(page);
    articleEditorPage = new ArticleEditorPage(page);
    articlesPage = new ArticlesPage(page);

    await signUpPage.goto();
    await signUpPage.registerUser({
        username: 'test',
        email: 'test',
        password: 'test',
    });
})
