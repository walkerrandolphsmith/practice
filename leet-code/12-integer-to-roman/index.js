/**
 * @param {number} num
 * @return {string}
 */
var intToRoman = function(num) {
    // store the roman digits and their corresponding values in equal length arrays
    const romanNumerals = ['M',  'CM', 'D',  'CD', 'C',  'XC', 'L',  'XL', 'X', 'IX', 'V', 'IV', 'I']
    const values = [ 1000, 900,  500,  400,  100,  90,   50,   40,   10,  9,    5,   4,    1 ]
    let romanNumeral = ''
    // Consider values largest to smallest
    for (var i = 0; i < values.length; i++) {
        // Conintue processing a digit until it exceeds the remainig number
        while (num >= values[i]) {
            // append the next roman numeral
            romanNumeral += romanNumerals[i]
            // reduce the number by the value of the appended digit
            num -= values[i]
        }
    }
    return romanNumeral;
};