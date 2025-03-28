//1️⃣ Перевірка масиву  
function isArray(input) {
    return Array.isArray(input);
}

console.log(isArray('QA DOJO'))
console.log(isArray([1, 2, 4, 0]))

//2️⃣ Клонування масиву
function cloneArray(arr) {
    return arr.slice();
}
console.log(cloneArray([1, 2, 4, 0]));
console.log(cloneArray([1, 2, [4, 0]]));

//3️⃣ Перші елементи масиву  
function first(arr, n = 1) {
    if (n === 1) {
        return arr[0]
    }
    return arr.slice(0, n)
}

console.log(first([7, 9, 0, -2]));
console.log(first([7, 9, 0, -2], 3));

//4️⃣ Останні елементи масиву  
function last(arr, n = 1) {
    if (n === 1) {
        return arr[arr.length - 1]
    }
    return arr.slice(-n)
}

console.log(last([7, 9, 0, -2]));
console.log(last([7, 9, 0, -2], 3));

//5️⃣ Об’єднання елементів масиву  
function joinArray(arr, separator = ',') {
    return arr.join(separator);
}

const myColor = ["Red", "Green", "White", "Black"];

console.log(joinArray(myColor));
console.log(joinArray(myColor, '+'));
console.log(joinArray(myColor, ' and '));

//6️⃣ Дефіси між парними числами   ⭐️⭐️⭐️
function addDashesBetweenEvenNumbers(input) {
    const str = input.toString();
    let result = ''
    for (let i = 0; i < str.length; i++) {
        result += str[i];

        if (i < str.length - 1 && str[i] % 2 === 0 && str[i + 1] % 2 === 0) {
            result += '-'
        }
    }
    return result
}

console.log(addDashesBetweenEvenNumbers("025468"))

//7️⃣ Сортування масиву    ⭐️⭐️⭐️
function bubbleSort(arr) {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {

        for (let j = 0; j < n - 1 - i; j++) {

            if (arr[j] > arr[j + 1]) {
                const temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp
            }
        }
    }
    return arr
}
const arr1 = [-3, 8, 7, 6, 5, -4, 3, 2, 1];

console.log(bubbleSort(arr1))

// 8️⃣ Числа від 1 до 345
function createArrayYear() {
    const numbers = [];

    for (let i = 0; i <= 345; i++) {
        numbers.push(i)
    }
    return numbers
}
console.log(createArrayYear())

//9️⃣ Сума чисел від 1 до 100
function sumFromOneToHundred() {
    let sum = 0;
    for (let i = 0; i <= 100; i++) {
        sum += i
        console.log(i)
    }
    return sum;
}
console.log(sumFromOneToHundred())

//🔟 Числа від 241 до 1
function arrayFromTo() {
    const numbers = []
    for (let i = 241; i >= 1; i--) {
        numbers.push(i);
    }
    return numbers
}
console.log(arrayFromTo())

//1️⃣ 1️⃣ Максимальне число з двох
function maxNumber(num1, num2) {
    if (num1 > num2){
        return num1;
    }
    else if (num2 > num1) {
        return num2;
    }
    else {
        return 'Обидва числа рівні'
    }
}
console.log(maxNumber(10, 20))
console.log(maxNumber(5, 5))
console.log(maxNumber(-10, 0))