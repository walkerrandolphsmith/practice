/**
 * @param {number} n
 * @return {number[]}
 */
var grayCode = function(n) {
    const numberOfBits = 1 << n; // 2^n
    return Array.from({ length: numberOfBits }, (_, i) => encode(i));
};

function encode(n) {
    return xor(n, dropLeastSignificantBit(n))
}

function dropLeastSignificantBit(n) {
    return n >> 1
}

function xor(x, y) {
    return  x ^ y
}