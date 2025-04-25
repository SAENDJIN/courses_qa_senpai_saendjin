import { test as base } from "@playwright/test"
import { PracticeFormPage } from "./app/pages/PracticeFormPage"
import { BookPage } from "./app/pages/BooksPage";
import fs from 'fs/promises';


type Fixture = {
    practiceFormPage: PracticeFormPage;
    bookPage: BookPage;

}
export const test = base.extend<Fixture>({
    practiceFormPage: async ({ page }, use) => {


        await page.route('**/*.{png,jpg,jpeg}', route => route.abort());

        page.on('console', async msg => {
            if (msg.type() === 'error') {
                const logText = `Console error: ${msg.text()}\n`;
                console.log(logText);
                await fs.appendFile('console-errors.txt', logText);
            }
        });

        const practiceFormPage = new PracticeFormPage(page);
        await use(practiceFormPage)
    },
    
    bookPage: async ({ page }, use) => {
        const bookPage = new BookPage(page);
        await use(bookPage)
    }

})