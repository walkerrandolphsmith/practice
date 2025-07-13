/**
 * @param {string} s
 * @return {number}
 */
var myAtoi = function(s) {
  // edge case - the string is empty
  if (!s) return 0
  // start index at the beginning of the string
  let i = 0;
  // end index is the last character of the string
  let n = s.length;
  // trim leading whitespace
  while (i < n && s.charAt(i) === ' ') { i++ }
  // edge case - the string contained only whitespace
  if (i === n) return 0;
  // store the sign of the number, e.g. positive or negative
  let sign = 1;
  if (s.charAt(i) === '+') { i++ }
  else if (s.charAt(i) === '-') { sign = -1; i++ }

  // shift bits to quickly calcualte the min and max 32 bit signed int
  // smallest 32 bit signed int
  const min = -(2**31)
  // largest 32 bit signed int
  const max = 2**31 -1
  // sum of digits
  let number = 0;
  // consider characters until they are not numeric digits
  while (i < n && s.charAt(i) <= '9' && s.charAt(i) >= '0') {
    // get the numeric value of the character
    const digit = parseInt(s.charAt(i))
    // shift the total by a significant digit and add the value of the next digit
    number = number * 10 + digit
    // short curcuit if the sum exceeds the range of a 32 bit signed int
    const value = sign * number;
    if (value <= min)return min
    if (value >= max) return max;
    // consider the next character
    i++;
  }
  // apply the sign (positive or negative)
  return sign * number
}