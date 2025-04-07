import { da } from '@faker-js/faker';
import { test, expect } from '@playwright/test';
import path from 'path';

const url = 'https://demoqa.com/automation-practice-form'
const filePath = path.join('tests', 'Homeworks', 'hw12-upload-file', 'BHFO.gif')
const fileName = path.basename(filePath); // поверне 'BHFO.gif'
  
const formData = [
    { id: '1', firstName: 'Andrii', lastName: 'Saienko', email: 'andrii@gmail.com', mobilePhone: '0991166771',  currentAddress: 'street 1' },
    { id: '2', firstName: 'Veronika', lastName: 'Pipnyk', email: 'veronika@gmail.com', mobilePhone: '0991166772', currentAddress: 'street 2' },
    { id: '3', firstName: 'Mykita', lastName: 'Kovalsky', email: 'mykita@gmail.com', mobilePhone: '0991166773', currentAddress: 'street 3' },
    { id: '4', firstName: 'Daria', lastName: 'Kriukova', email: 'daria@gmail.com', mobilePhone: '0991166774', currentAddress: 'street 4' },
]

const getLocators = (page) => ({
    firstNameInput: () => page.locator('[placeholder="First Name"]'),
    lastNameInput: () => page.locator('[placeholder="Last Name"]'),
    emailInput: () => page.locator('[placeholder="name@example.com"]'),
    genderCheckBox: () => page.locator('[for="gender-radio-1"]'),
    mobilePhoneInput: () => page.locator('[placeholder="Mobile Number"]'),
    birthInput: () => page.locator('[id="dateOfBirthInput"]'), // idk do i need to use
    subjectInput: () => page.locator('#subjectsInput'),
    subjectContent: () => page.getByText('Maths', { exact: true }),
    hobbiesCheckBox: () => page.locator('[for="hobbies-checkbox-1"]'),
    fileBtn: () => page.locator('[id="uploadPicture"]'),
    currentAddressInput: () => page.locator('[placeholder="Current Address"]'),
    stateDropdown: () => page.getByText('Select State'),
    stateValue: () => page.getByText('NCR', { exact: true }),
    cityDropdown: () => page.getByText('Select City'),
    cityValue: () => page.getByText('Delhi', { exact: true }),
    submitBtn: () => page.locator('[id="submit"]'),
    finalForm: () => page.locator('tbody'),
})

async function fillForm(page, data) {
    const locators = getLocators(page)
    await locators.firstNameInput().fill(data.firstName);
    await locators.lastNameInput().fill(data.lastName);
    await locators.emailInput().fill(data.email);
    await locators.genderCheckBox().click();
    await locators.mobilePhoneInput().fill(data.mobilePhone);
    await locators.subjectInput().fill('m');
    await locators.subjectContent().click();
    await locators.hobbiesCheckBox().click();
    await locators.fileBtn().setInputFiles(filePath);

    await checkFileName(page, fileName);

    await locators.currentAddressInput().fill(data.currentAddress);
    await locators.stateDropdown().click();
    await locators.stateValue().click();
    await locators.cityDropdown().click();
    await locators.cityValue().click();
    await locators.submitBtn().click();
}

async function checkFileName(page, expectedName) {
    const actualName = await page.$eval('#uploadPicture', input =>
        input.files[0]?.name);
    expect(actualName).toBe(expectedName);
}

function getFormattedToday(): string {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = today.toLocaleString('en-US', { month: 'long' });
    const year = today.getFullYear();
  
    return `${day} ${month},${year}`;
  }

async function verifyForm(page, data) {
    const locators = getLocators(page)
    await expect(locators.finalForm()).toContainText(data.firstName);
    await expect(locators.finalForm()).toContainText(data.lastName)
    await expect(locators.finalForm()).toContainText(data.email)
    await expect(locators.finalForm()).toContainText('Male')
    await expect(locators.finalForm()).toContainText(data.mobilePhone)
    await expect(locators.finalForm()).toContainText(getFormattedToday())
    await expect(locators.finalForm()).toContainText('Maths')
    await expect(locators.finalForm()).toContainText('Sports')
    await expect(locators.finalForm()).toContainText(fileName) //edit
    await expect(locators.finalForm()).toContainText(data.currentAddress)
    await expect(locators.finalForm()).toContainText('NCR Delhi')
}

for (const data of formData) {
    test(`Upload file and check data #${data.id}`, async ({page}) =>{
        await page.goto(url);
        await fillForm(page, data);
        await verifyForm(page, data);
    })
}
