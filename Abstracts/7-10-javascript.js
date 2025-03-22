//JavaScript є динамічно типізованою мовою, тобто тип змінної визначається автоматично
//під час виконання, і одна змінна може змінювати свій тип.

//Примітивні типи (Primitive Types)

// 1. Number
// • Для чисел: як цілих, так і дробових.
// • Спеціальні значення: Infinity, -Infinity, NaN.
let num = 42;
let floatNum = 3.14;
console.log(10 / 0); // Infinity
console.log("a" * 2); // NaN


// 2. BigInt (ES11)
//  • Для роботи з дуже великими цілими числами.
let bigInt = 123456789012345678901234567890n;


//3. String
//  • Рядки, що зберігають текстові значення.
//  • Можуть бути записані в лапках: 'single', "double", backticks.
let str = "Hello, world!";
let template = `Number: ${num}`;

// 4. Boolean
//  • Логічні значення: true або false.
let isTrue = true;
let isFalse = false;


//  5. Null
//  • Спеціальне значення, яке означає “нічого” або “порожнє значення”.
let empty = null;


//6. Undefined
//  • Змінна якій не присвоєно значення має тип undefined
let undef;
console.log(undef); // undefined


// 7. Symbol (ES6)
//  • Унікальні ідентифікатори.
let sym = Symbol("unique");

//Об'єкти (Reference Types)
//  • Зберігають складні дані у вигляді колекцій ключ-значення:
let obj = { name: "John", age: 30 };


//Тип змінної може змінюватися під час виконання.
let value = 42; // Number
value = "Now I'm a string"; // String


//Для перевірка типу даних використовується оператор typeof:
console.log(typeof 42); // "number"
console.log(typeof "Hello"); // "string"
console.log(typeof null); // "object" (історична помилка)
console.log(typeof undefined); // "undefined"


// Типи даних у пам’яті

// - Примітивні значення
//  • Зберігаються в стеку.
//  • Передаються за значенням.
let a = 10;
let b = a;
b = 20;
console.log(a); // 10

// - Об’єкти
//  • Зберігаються у купі (heap).
//  • Передаються за посиланням.
let obj1 = { name: "Alice" };
let obj2 = obj1;
obj2.name = "Bob";
console.log(obj1.name); // "Bob"

// JS автоматично змінює типи даних (coercion).
console.log("5" + 2); // "52" (рядок)
console.log("5" * 2); // 10 (число)

// Використання методів для зміни типів:
let num1 = Number("123"); // Явне перетворення в число
let str1 = String(123); // Явне перетворення в рядок
let bool1 = Boolean(0); // false


//Falsy: Значення, які вважаються false у булевому контексті.
false, 0, "", null, undefined, NaN

//Усі інші значення вважаються true.
console.log(Boolean("Hello")); // true
console.log(Boolean([])); // true

// NaN (Not-a-Number): 
//  • Результат некоректної математичної операції.
//  • NaN !== NaN, перевіряється через isNaN() або Number.isNaN().
console.log(NaN === NaN); // false


//1. camelCase – найпоширеніший стиль у JavaScript для змінних, функцій і об’єктів.
//  2. PascalCase – використовується для назв класів та конструкторів.
//  3. snake_case – популярний у базах даних та деяких API, рідко використовується в JavaScript.
//  4. kebab-case – зазвичай застосовується у назвах файлів та CSS-класах.
//  5. UPPER_SNAKE_CASE – використовується для констант.
