import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import exp from "constants";


export class BookPage extends BasePage {
    private searchInput: Locator;
    private bookTitle: Locator;
    private bookName: string

    constructor(page: Page) {
        super(page);
        this.searchInput = page.locator('[id="searchBox"]');
        this.bookTitle = page.locator(`[id="see-book-${this.bookName}"]`)
    }

    async goto() {
        await this.page.goto('https://demoqa.com/books');
    }
    async fillSearch(
        data: { bookName: string }) {
        await this.searchInput.fill(data.bookName);
    }
    async clickBook(bookName: string) {
        const bookTitle = this.page.locator(`[id="see-book-${bookName}"]`);
        await bookTitle.click();
    }
    async verifyBookPage() {
        expect(this.page.url()).toMatch(/\/books\?book=/);
    }
}