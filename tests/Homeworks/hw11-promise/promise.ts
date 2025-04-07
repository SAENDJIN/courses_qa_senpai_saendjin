import { fail } from "assert";
import { error } from "console";
import { resolve } from "path";

function waitForTwoSeconds(): Promise<string>{
    return new Promise((resolve) =>{
        setTimeout(()=> {
            resolve('2 секунди пройшло!');
        }, 2000);
    })
}

waitForTwoSeconds().then((message) => {
    console.log(message);
});

// Створи функцію failAfterOneSecond(), яка через 1 секунду відхиляє проміс з повідомленням "Щось пішло не так...".
// Потім оброби цю помилку через .catch(...).
function failAfterOneSecond(): Promise<string>{
    return new Promise((_, reject)=>{
        setTimeout(()=>{
            reject('Щось пішло не так...');
        }, 1000);
    })
}

failAfterOneSecond()
.then((message)=>{
    console.log('Все ок:', message);
})
.catch((error)=>{
    console.log('Помилка:', error);
});

//Створи функцію getRandomNumberAfterDelay(), яка через 1.5 секунди повертає випадкове число від 0 до 100 (Math.random * 100).
// Виведи результат у консоль.

function getRandomNumberAfterDelay(): Promise<number>{
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve(Math.random() * 100);
        }, 1500)
    })
}

getRandomNumberAfterDelay()
.then((message)=>{
    console.log(message)
})

//Створи функцію checkValue(value: number), яка:
//через 1 секунду повертає "Значення ок" якщо value > 10
//або відхиляє проміс з повідомленням "Значення замале" якщо value ≤ 10
//Перевір її з різними значеннями.

function checkValue(value: number): Promise<string>{
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            if(value > 10) {
                resolve('Значення ок');
            }
            else{
                reject('Значення замале')
            }
        }, 1000);
    })
}
checkValue(15)
  .then((message) => console.log('✅', message))
  .catch((error) => console.log('❌', error));


//Створи функцію doubleAfterDelay(num: number), яка через 1 секунду повертає подвоєне число.
// Використай цю функцію двічі підряд через .then(...), щоб отримати num -> x2 -> x4.

function doubleAfterDelay(num: number): Promise<number>{
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve(num *2);
        }, 1000);
    })
}

doubleAfterDelay(10)
    .then((message) => {
        console.log("x2: ", message);
        return doubleAfterDelay(message);
        })
    .then((message) => console.log("x4: ", message));



//Створи масив із 3 функцій waitAndSay(i: number), які повертають проміси з різною затримкою (1, 2, 3 секунди), і повертають рядок:
// "Пройшла X секунда(и): i = ..."
// Запусти всі три через Promise.all(...) і виведи результат у консоль.

function waitAndSay(i: number, seconds: number): Promise<string> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Пройшла ${seconds} секунда(и): i = ${i}`);
        }, seconds * 1000);
    });
}

const promises = [
    waitAndSay(1, 1),
    waitAndSay(2, 2),
    waitAndSay(3, 3),
];

Promise.all(promises).then((results) => {
    results.forEach((msg) => console.log(msg));
});
