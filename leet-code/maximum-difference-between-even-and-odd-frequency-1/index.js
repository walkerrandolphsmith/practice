/**
 * @param {string} s - A string consisting of lowercase English letters.
 * @return {number} - The maximum difference between the frequency of a character with odd count and one with even count.
 */
var maxDifference = function(s) {
    const alphabetSize = 26
    // Initialize an array to count the frequency
    const frequencyByIndex = new Array(alphabetSize).fill(0);

    // Count the frequency of each character in the string
    for (let i = 0; i < s.length; i++) {
      const asciiLowercaseLetterStartIndex = 97
      // Convert character to index: 'a' -> 0, 'b' -> 1, ..., 'z' -> 25
        const characterIndex = s.charCodeAt(i) - asciiLowercaseLetterStartIndex
        frequencyByIndex[characterIndex]++;
    }
    // We'll start with the minimum odd frequency and look for larger values
    const minOddFrequency = 0
    // maxOdd will hold the highest frequency among characters with odd counts
    let maxOdd = minOddFrequency;
    // since s is bound to a length of 100, we'll start by maximizing the even frequency and look for smaller values
    const maxEvenFrequency = 101
    // minEven will hold the smallest frequency among characters with even counts
    let minEven = maxEvenFrequency;

    // Iterate over the frequency array to classify and compare frequencies
    for (let i = 0; i < alphabetSize; i++) {
        const frequency = frequencyByIndex[i];
        if (frequency === 0) continue; // skip characters that do not appear in the string
        const hasEvenFrequency = frequency % 2 === 0;
        if (hasEvenFrequency) {
            minEven = Math.min(minEven, frequency);
        } else {
            maxOdd = Math.max(maxOdd, frequency)
        }
    }

    // return the difference
    return maxOdd - minEven;
};