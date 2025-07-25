/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
var addBinary = function(a, b) {
    // pointer for each bitstring
    let i = a.length - 1;
    let j = b.length - 1;
    // store the carry value for each place value
    let carry = 0
    // store the resulting bitstring
    const result = []
    // continue as long as either input bitstring has digits remaining
    while (i >= 0 || j >= 0) {
        // read the next digit in each bitstring
        const a1 = a[i] === '1' ? 1 : 0
        const b1 = b[j] === '1' ? 1 : 0
        // sum of digits
        const sum = carry + a1 + b1
        // divide by 2
        carry = sum >> 1
        // remainder upon division by 2
        result.push(sum & 1)
        // progress to next digit
        i--
        j--
    }
    // add left over carry as most significant digit
    if (carry) result.push('1');
    // order most to least significant bits
    return result.reverse().join(''); 
};