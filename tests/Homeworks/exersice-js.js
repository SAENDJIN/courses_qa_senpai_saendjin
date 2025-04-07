// Write a JavaScript function to split a string and convert it into an array of words.
function stringToArray(string){
    let strArr = string.split(' ')
    return strArr
}
console.log(stringToArray('Robin Singh'))
console.log(stringToArray('test and the other test'))

//№2  Write a JavaScript function to extract a specified number of characters from a string.
function truncateString(str1, num){
    return str1.slice(0, num)
}
console.log(truncateString('Robin Singh', 4))