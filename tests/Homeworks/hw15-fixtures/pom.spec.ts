import { Page, expect } from "@playwright/test";
import { test } from '../hw15-fixtures/fixtures';


const formData = {
  firstName: 'Andrii',
  lastName: 'Saienko',
  email: 'andrii@gmail.com',
  mobilePhone: '0991166771',
  currentAddress: 'street 1'
};

const bookData = {
  bookName: 'Git Pocket Guide',
}

test('Submit form and verify data', async ({ practiceFormPage }) => {
  await practiceFormPage.goto();
  await practiceFormPage.fillForm(formData);
  await practiceFormPage.verifyForm(formData);
});
test('Search book and check url', async ({ bookPage }) => {
  await bookPage.goto();
  await bookPage.fillSearch(bookData);
  await bookPage.clickBook(bookData.bookName);
  await bookPage.verifyBookPage();
});