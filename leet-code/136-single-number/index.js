/**
 * @param {number[]} numbers
 * @return {number}
 */
const singleNumber = function(numbers) {
    // Duplicate numbers cancel each other out
    // Leaving only the unique number
    return numbers.reduce(xorReducer, 0)
};

// Given two numbers return their XOR
const xorReducer = (acc, n) => acc ^= n;