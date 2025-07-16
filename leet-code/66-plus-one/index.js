/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function(digits) {
    let newDigits = []
    // Initialize carry to represent the '+1' operation
    let carry = 1;
    // iterate from least significant digit to most
    for(var i = digits.length-1; i >= 0; i--) {
        // add the current digit and the carry
        const sum = digits[i] + carry
        // extract the current digit
        const newDigit = sum % 10
        // update carry for next iteration
        carry = Math.floor(sum / 10)
        // record the next digit
        newDigits.push(newDigit)
    }
    // If carray remains, add as most significant digit
    if (carry > 0) newDigits.push(carry)
    // reverse to preserve most significant to least significant order
    return newDigits.reverse()
};