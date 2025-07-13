/**
 * @param {string} s
 * @return {number}
 */
var myAtoi = function(s) {
    const originalLength = s.length
    let digits = "";
    let hasStarted = false;
    let sign = 1;
    for (var i = 0; i < originalLength; i++) {
        const char = s.charAt(i)
        console.log(char)
        if (char === '-' && !hasStarted) {
            sign = -1
        } 
        else if (!/\D/.test(char)) {
            hasStarted = true;
            digits += char;
        }
        else if (char === " " && !hasStarted) {
            continue;
        }
        else if (hasStarted) {
            break;
        } else {
            return 0
        }
    }

    let result = 0
    let length = digits.length - 1;
    for (var i = length; i >= 0; i--) {
        result += Math.pow(10, length-i) * parseInt(digits.charAt(i))
    }
    return sign * result
};