/**
 * @param {string} s
 * @return {number}
 */

var longestPalindrome = function(s) {
    // used to shift the characters to 0
    const offest = 65;
    // Keep track of frequency of letters indexed by their char codes
    const frequency = []
    // count the frequency of every character in the string
    for (var i = 0; i < s.length; i++) {
        // A 65 -> 0, a -> 97 -> 32 Array contains 7 elements in between ranges that are wasted
        const index = s.charCodeAt(i) - offest
        // start at 1 and increment by 1 if previously seen
        frequency[index] = frequency[index] ? frequency[index] + 1 : 1
    }
    // store count of pairs of letters
    let pairs = 0;
    // store if a single character was found
    let hasSingles = false;
    // consider the uppercase range
    for (var i = 0; i <= 25; i++) {
        const count = frequency[i]
        // if characters weren't seen skip them
        if (count === undefined) continue
        // count how may pairs a chracter has
        pairs += Math.floor(count/2)
        // odd number of occurences mead there is at least one character that appeared without a pair
        if (!hasSingles && count % 2 !== 0) hasSingles = true
    }
    // ocnsider the lowercase range
    for (var i = 32; i <= 57; i++) {
        const count = frequency[i]
        if (count === undefined) continue
        pairs += Math.floor(count/2)
        if (!hasSingles && count % 2 !== 0) hasSingles = true
    }
    // Each pair contributes two to the length
    // if there were any singles then exactly one can be used to increase the length by 1; otherwise 0 
    return pairs * 2 + Number(hasSingles)
};