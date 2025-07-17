/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function(digits) {
    // store the distinct combinations of chracters
    const combinations = [];
    // short circuit if there are no digits to consider
    if (digits === "") return combinations
    // lookup alphabetic characters by number
    const lettersByNumber = {
        2: 'abc',
        3: 'def',
        4: 'ghi',
        5: 'jkl',
        6: 'mno',
        7: 'pqrs',
        8: 'tuv',
        9: 'wxyz'
    }
    // explore all possible combinations using backtracking
    function search(index, workingMemory) {
        // combinations can't exceed the length of digits used
        const isValidCombination = index === digits.length;
        if (isValidCombination) {
            // add the combination
            combinations.push(workingMemory)
            return;
        }
        // lookup the letters corresponding to the current number
        const letters = lettersByNumber[digits[index]]
        // add each character to working memory and continue searching for combinations
        for (var j = 0; j < letters.length; j++) {
            // increment the index to process the next digit
            search(index + 1, workingMemory + letters[j])
        }
    }
    // start at the first digit and no working memory
    search(0, "")
    // return the alphabetic combinations
    return combinations;
};