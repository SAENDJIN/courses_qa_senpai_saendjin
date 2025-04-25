import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import path from 'path';


export class PracticeFormPage extends BasePage {
    private firstNameInput: Locator;
    private lastNameInput: Locator;
    private emailInput: Locator;
    private genderCheckBox: Locator;
    private mobilePhoneInput: Locator;
    private birthInput: Locator;
    private subjectInput: Locator;
    private subjectContent: Locator;
    private hobbiesCheckBox: Locator;
    private fileBtn: Locator;
    private currentAddressInput: Locator;
    private stateDropdown: Locator;
    private stateValue: Locator;
    private cityDropdown: Locator;
    private cityValue: Locator;
    private submitBtn: Locator;
    private finalForm: Locator;

    private filePath: string = path.join("tests", "Homeworks", "hw12-upload-file", "BHFO.gif");
    private fileName: string = path.basename(this.filePath);




    constructor(page: Page) {
        super(page);
        this.firstNameInput = page.locator('[placeholder="First Name"]');
        this.lastNameInput = page.locator('[placeholder="Last Name"]');
        this.emailInput = page.locator('[placeholder="name@example.com"]');
        this.genderCheckBox = page.locator('[for="gender-radio-1"]');
        this.mobilePhoneInput = page.locator('[placeholder="Mobile Number"]');
        this.birthInput = page.locator('[id="dateOfBirthInput"]');
        this.subjectInput = page.locator('#subjectsInput');
        this.subjectContent = page.getByText('Maths', { exact: true });
        this.hobbiesCheckBox = page.locator('[for="hobbies-checkbox-1"]');
        this.fileBtn = page.locator('[id="uploadPicture"]');
        this.currentAddressInput = page.locator('[placeholder="Current Address"]');
        this.stateDropdown = page.getByText('Select State');
        this.stateValue = page.getByText('NCR', { exact: true });
        this.cityDropdown = page.getByText('Select City');
        this.cityValue = page.getByText('Delhi', { exact: true });
        this.submitBtn = page.locator('[id="submit"]');
        this.finalForm = page.locator('tbody');
    }

    async goto() {
        await this.page.goto('https://demoqa.com/automation-practice-form')
    }

    async fillForm(data:
        {
            firstName: string;
            lastName: string;
            email: string;
            mobilePhone: string;
            currentAddress: string;
        }) {
        await this.firstNameInput.fill(data.firstName);
        await this.lastNameInput.fill(data.lastName);
        await this.emailInput.fill(data.email);
        await this.genderCheckBox.click();
        await this.mobilePhoneInput.fill(data.mobilePhone);
        await this.subjectInput.fill("m");
        await this.subjectContent.click();
        await this.hobbiesCheckBox.click();
        await this.fileBtn.setInputFiles(this.filePath);
        await this.checkFileName();
        await this.currentAddressInput.fill(data.currentAddress);
        await this.stateDropdown.click();
        await this.stateValue.click();
        await this.cityDropdown.click();
        await this.cityValue.click();
        await this.submitBtn.click();
    }
    async checkFileName() {
        const actualName = await this.page.$eval("#uploadPicture", (input: HTMLInputElement) => input.files?.[0]?.name);
        expect(actualName).toBe(this.fileName);
    }

    private getFormattedToday(): string {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, "0");
        const month = today.toLocaleString("en-US", { month: "long" });
        const year = today.getFullYear();
        return `${day} ${month},${year}`;
    }

    async verifyForm(data:
        {
            firstName: string;
            lastName: string;
            email: string;
            mobilePhone: string;
            currentAddress: string;
        }) {

        await expect(this.finalForm).toContainText(data.firstName);
        await expect(this.finalForm).toContainText(data.lastName);
        await expect(this.finalForm).toContainText(data.email);
        await expect(this.finalForm).toContainText("Male");
        await expect(this.finalForm).toContainText(data.mobilePhone);
        await expect(this.finalForm).toContainText(this.getFormattedToday());
        await expect(this.finalForm).toContainText("Maths");
        await expect(this.finalForm).toContainText("Sports");
        await expect(this.finalForm).toContainText(this.fileName);
        await expect(this.finalForm).toContainText(data.currentAddress);
        await expect(this.finalForm).toContainText("NCR Delhi");
    }
}