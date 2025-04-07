import { test, expect } from "@playwright/test";
const url = 'https://demoqa.com/text-box'

const formData = [
    { fullName: 'Andrii', email: 'andrii@gmail.com', currentAddress: '1', permanentAddress: '1' },
    { fullName: 'Veronika', email: 'veronika@gmail.com', currentAddress: '2', permanentAddress: '2' },
    { fullName: 'Mykita', email: 'mykita@gmail.com', currentAddress: '3', permanentAddress: '3' },
    { fullName: 'Vlad', email: 'vlad@gmail.com', currentAddress: '4', permanentAddress: '4' },
    { fullName: 'Maria', email: 'maria@gmail.com', currentAddress: '5', permanentAddress: '5' },
];

const getLocators = (page) => ({
    nameInput: () => page.locator('[placeholder="Full Name"]'),
    emailInput: () => page.locator('[placeholder="name@example.com"]'),
    currentAddressInput: () => page.locator('[placeholder="Current Address"]'),
    permanentAddressInput: () => page.locator('[id="permanentAddress"]'),
    submitButton: () => page.locator('[id="submit"]'),
    nameOutput: () => page.locator('[id="name"][class=mb-1]'),
    emailOutput: () => page.locator('[id="email"][class=mb-1]'),
    currentAddressOutput: () => page.locator('[id="currentAddress"][class=mb-1]'),
    permanentAddressOutput: () => page.locator('[id="permanentAddress"][class=mb-1]'),
})

async function fillForm(page, data) { // {fullName, email, currentAddress, permanentAddress}
    const locators = getLocators(page)
    await locators.nameInput().fill(data.fullName);
    await locators.emailInput().fill(data.email);
    await locators.currentAddressInput().fill(data.currentAddress);
    await locators.permanentAddressInput().fill(data.permanentAddress);
    await locators.submitButton().click();
}

async function verifyForm(page, data) {
    const locators = getLocators(page);
    await expect(locators.nameOutput()).toContainText(data.fullName);
    await expect(locators.emailOutput()).toContainText(data.email);
    await expect(locators.currentAddressOutput()).toContainText(data.currentAddress);
    await expect(locators.permanentAddressOutput()).toContainText(data.permanentAddress);
}

for (const data of formData) {
    test(`TextBox by ${data.fullName}`, async ({ page }) => {
        await page.goto(url);
        await fillForm(page, data);
        await verifyForm(page, data);
    });
}
