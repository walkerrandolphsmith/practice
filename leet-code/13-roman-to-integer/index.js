const valueByRomanNumeral = {
  'M' : 1000,
  'CM': 900,
  'D' : 500,
  'CD': 400,
  'C' : 100,
  'XC': 90,
  'L' : 50,
  'XL': 40,
  'X' : 10,
  'IX': 9,
  'V' : 5,
  'IV': 4,
  'I' : 1,
}
/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function(s) {
    // store the running total
    let value = 0
    // process the symbols in reverse order
    for (var i = s.length - 1; i >= 0; i--) {
        // look up the numeric value of the current character
        const current = valueByRomanNumeral[s[i]]
        // the last charcter can't exhibit subtractive notation
        if (i === 0) {
            // accumulate the value
            value += current
            break;
        }
        const previous = valueByRomanNumeral[s[i-1]]
        // subtractive notation occurs when then preceeding character is less than the current, e.g. IX -> 9
        const isSubtractiveNotation = previous < current
        if (isSubtractiveNotation) {
            // Look up the numeric value of the subtractive notation
            value += valueByRomanNumeral[`${s[i-1]}${s[i]}`]
            // Skip the previous component of the compound symbol 
            i--
        } else {
            // accumulate the value
            value += current
        }
    }
    // return the arabic integer
    return value
};