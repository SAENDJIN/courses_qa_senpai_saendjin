import path from 'path';
import {test, expect, Page } from '@playwright/test';

const formData = [
    { id: '1', firstName: 'Andrii', lastName: 'Saienko', email: 'andrii@gmail.com', mobilePhone: '0991166771',  currentAddress: 'street 1' },
    { id: '2', firstName: 'Veronika', lastName: 'Pipnyk', email: 'veronika@gmail.com', mobilePhone: '0991166772', currentAddress: 'street 2' },
    { id: '3', firstName: 'Mykita', lastName: 'Kovalsky', email: 'mykita@gmail.com', mobilePhone: '0991166773', currentAddress: 'street 3' },
    { id: '4', firstName: 'Daria', lastName: 'Kriukova', email: 'daria@gmail.com', mobilePhone: '0991166774', currentAddress: 'street 4' },
]

function RegistrationForm(page: Page) {
  const filePath = path.join('tests', 'Homeworks', 'hw12-upload-file', 'BHFO.gif');
  const fileName = path.basename(filePath);
  const today = getFormattedToday();

  const locators = {
    firstNameInput: () => page.locator('[placeholder="First Name"]'),
    lastNameInput: () => page.locator('[placeholder="Last Name"]'),
    emailInput: () => page.locator('[placeholder="name@example.com"]'),
    genderCheckBox: () => page.locator('[for="gender-radio-1"]'),
    mobilePhoneInput: () => page.locator('[placeholder="Mobile Number"]'),
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
  };


  this.setName = async (firstName: string, lastName: string) => {
    await locators.firstNameInput().fill(firstName);
    await locators.lastNameInput().fill(lastName);
  };

  this.setEmail = async (email: string) => {
    await locators.emailInput().fill(email);
  };

  this.setGender = async () => {
    await locators.genderCheckBox().click();
  };

  this.setMobile = async (phone: string) => {
    await locators.mobilePhoneInput().fill(phone);
  };

  this.setSubject = async () => {
    await locators.subjectInput().fill('m');
    await locators.subjectContent().click();
  };

  this.setHobbies = async () => {
    await locators.hobbiesCheckBox().click();
  };

  this.uploadFile = async () => {
    await locators.fileBtn().setInputFiles(filePath);
  };

  this.setAddress = async (address: string) => {
    await locators.currentAddressInput().fill(address);
  };

  this.selectStateAndCity = async () => {
    await locators.stateDropdown().click();
    await locators.stateValue().click();
    await locators.cityDropdown().click();
    await locators.cityValue().click();
  };

  this.submit = async () => {
    await locators.submitBtn().click();
  };

  this.verifyForm = async (data) => {
    await expect(locators.finalForm()).toContainText(data.firstName);
    await expect(locators.finalForm()).toContainText(data.lastName);
    await expect(locators.finalForm()).toContainText(data.email);
    await expect(locators.finalForm()).toContainText('Male');
    await expect(locators.finalForm()).toContainText(data.mobilePhone);
    await expect(locators.finalForm()).toContainText(today);
    await expect(locators.finalForm()).toContainText('Maths');
    await expect(locators.finalForm()).toContainText('Sports');
    await expect(locators.finalForm()).toContainText(fileName);
    await expect(locators.finalForm()).toContainText(data.currentAddress);
    await expect(locators.finalForm()).toContainText('NCR Delhi');
  };
}

function getFormattedToday(): string {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = today.toLocaleString('en-US', { month: 'long' });
  const year = today.getFullYear();
  return `${day} ${month},${year}`;
}


for (const data of formData) {
    test(`Upload file and check data #${data.id}`, async ({ page }) => {
      await page.goto('https://demoqa.com/automation-practice-form');
  
      const form = new RegistrationForm(page);
  
      await form.setName(data.firstName, data.lastName);
      await form.setEmail(data.email);
      await form.setGender();
      await form.setMobile(data.mobilePhone);
      await form.setSubject();
      await form.setHobbies();
      await form.uploadFile();
      await form.setAddress(data.currentAddress);
      await form.selectStateAndCity();
      await form.submit();
      await form.verifyForm(data);
    });
  }
  