/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
    // Dividing by 10 and multiplying by 10 "shift" left and right with base 10 integers

    // modulating by 10 gives the leftover amount, e.g. 123 mod 10 -> 3

    // % is remainder operator, not a modulo
    // https://262.ecma-international.org/5.1/#sec-11.5.2


    const isNegative = x < 0
    // invert the sign so we can use the remainder operator
    if (isNegative) x = x * -1

    let result = 0;
    // keep chruing through the digits of the input until they are gone
    while (x > 0) {
        // Get the next digit to process from input
        let rightMostDigitOfInput = x % 10
        // As we get new digits to add to the result, shift the current result to the left
        let shiftLeft = result * 10
        // Update the result to include the next digit
        result = shiftLeft + rightMostDigitOfInput
        // Shrink the input by dropping the right most digit
        x = Math.floor(x / 10)
    }

    const outputExceedsSize = result > Math.pow(2, 31) - 1
    if (outputExceedsSize) {
        return 0
    }

    // Preserve the original sign
    return isNegative ? (-1 * result) : result
};