const car = {
    color: 'black',
    size: 'big',
    wheel: 4,
    mark: 'Mazda',
    doors: 5,
    price: '12000$',
    isNew: true,
    maxSpeed: 220,
    startEngine: () => { console.log('wrhuuum!') },
    drive: () => { console.log("DRIVE!") },
    driveAtMaxSpeed: function () { console.log(`Drive with speed ${this.maxSpeed}`) },
}

car.startEngine()
car.driveAtMaxSpeed()



class Car {
    color: string = 'white';
    size: string = 'big';
    wheel: number = 4;
    mark: string = 'Mazda';
    doors: number = 5;
    price: string = '12000$';
    isNew: boolean = true;
    maxSpeed: number = 220;

    startEngine()  { console.log('wrhuuum!') };
    drive()  { console.log("DRIVE!") };

    constructor(color: string) {
        this.color = color
    }
}

const whiteCar = new Car('Yellow');

console.log(whiteCar.color)