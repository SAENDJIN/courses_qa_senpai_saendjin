function OddOrEven(number) {
    if (number % 2 === 0) { return "Число парне" }
    else {
        return "Число не парне"
    }
};
console.log(OddOrEven(4))


function HelloByTime(time) {
    if (time < 12) { return "Доброго ранку!" }
    else if (time >= 12 && time < 18) {
        return "Доброго дня!"
    } else {
        return "Доброго вечора!"

    }
};

console.log(HelloByTime())

function CheckScore(score) {
    if (score >= 50) { return 'Тест складено' }
    else { return 'Тест не складено' }
};

console.log(CheckScore(5))

function CheckAge(age) {
    if (age >= 18) { return 'Ви можете голосувати' }
    else { return 'Ви ще не можете голосувати' }
};

console.log(CheckAge(5))

function CompareNumbers(num1, num2) {
    if (num1 > num2) { return 'Перше число більше' }
    else if (num1 == num2) { return 'Числа рівні' }
    else { return 'Друге число більше' }
};
console.log(CompareNumbers(12, 2))
console.log(CompareNumbers(2, 2))
console.log(CompareNumbers(2, 3))

function TrafficLights(lights) {
    if (lights == 'Зелений') { return 'Переходьте' }
    else if (lights == 'Жовтий') { return 'Підготуйтеся' }
    else if (lights == 'Червоний') { return 'Зачекайте' }
    else { return 'Це не колір світлофору' }
};
console.log(TrafficLights('Червоний'))
console.log(TrafficLights('Жовтий'))
console.log(TrafficLights('Зелений'))
console.log(TrafficLights(''))

function GreaterOrLessThanZero(num3) {
    if (num3 > 0) { return 'Число додатнє' }
    else if ( num3< 0 ) { return "Число від'ємне" }
    else { return 'Число дорівнює нулю' }  
};
console.log(GreaterOrLessThanZero(1))
console.log(GreaterOrLessThanZero(-1))
console.log(GreaterOrLessThanZero(0))