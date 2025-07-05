/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    // two pointer approach
    let start = 0;
    let end = 0;

    // keep track of longest substring
    let max = 0
    // keep track of current substring
    let current = ""
    // keep track of repeating characters
    let map = []
    
    // while there are still combinations to eval
    while (start < s.length) {
        // short circuit if the remaining possibilities are smaller than what we've already seen
        if (s.length - start < max) break;
        // Use the chracter code to index into the map
        const code = s.charCodeAt(end)
        // if a character is repeating or we've exceeded the length of the string
        if (map[code] || end === s.length) {
            // increment start and reset memory
            start++
            end = start
            map = []
            current = ""
        } else {
            // expand current substring
            current += s[end]
            // update max
            max = Math.max(max, current.length)
            // record the chracter as seen
            map[code] = true
            // promote the end pointer to expand the substring
            end++
        }
    }

    return max
};