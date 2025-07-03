/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLastWord = function(s) {
    // keep track of the start and end index of the last word
    let start;
    // the end index can't be greater than the last character
    let end = s.length - 1

    // traverse the string from the end to the start
    // The end of the word is the first non whitespace character
    while (s[end] == ' ') {
        end--
    }
    // Once the end index has been found
    // the start of the word must be at least the last character found
    start = end;
    // move the start index until you find a whitespace character or the first character
    while(start >= 0 && s[start] !== ' ') {
        start--
    }
    // the length is equal to the difference in start and end index
    return end - start
};