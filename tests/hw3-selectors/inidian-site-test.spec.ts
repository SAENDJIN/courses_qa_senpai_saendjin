import { test, expect } from '@playwright/test';

test('selectors', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/login');

    await page.getByRole('textbox', { name: 'Password' }); // skip on courses
    await page.getByText('Username', {exact: true}); // recommend, but with nuances
    await page.getByLabel('Username'); //
    await page.getByPlaceholder('Email') // Be careful, recommend to use exact: true
    await page.getByAltText(''); // specific to use for image
    await page.getByTitle(''); //Its ok to use
    await page.getByTestId('best_way') //Best way to use

    // Классы не лучший вариант, вниз списка  . - .large-6
    // Можно искать за атрибутами, ПРИОРИТЕТНЫЙ  [] - input[id='username'][name='username']
    // К атрибуту можно добавлять * и сокращать имя атрибута - input[id='name'][name='user']
    // [class~='fa-2x'] -???
    // Пошук по початку атрибута - button[class^= 'form']
    // Пошук по початку закінченню - button[class$= 'form']
    // Нам скинут чит табличку, добавить
    



});


