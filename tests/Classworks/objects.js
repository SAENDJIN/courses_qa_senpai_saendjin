const student = {
    name: 'Andrii',
    lastname: 'Saienko',
    age: 24,
    isMarried: false,
    isWork: true,
    height: '183',
    weight: '70',
    pc: ['rtx 5070ti', 'ryzen 7 78003xd'],
    education: [{name: 'school', yearsOfStudying: '2007-2017'}, {name:'university', yearsOfStudying:'2018-2023'}],
    greeting: () => {
        console.log('Hello!')
    }
}

student.greeting();
console.log(student.education[1].yearsOfStudying)