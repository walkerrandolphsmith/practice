/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function(s, numRows) {
    const fitsInSingleRow = numRows === 1;
    if (fitsInSingleRow) return s;

    const tooShortToZigzag = numRows >= s.length;
    if (tooShortToZigzag ) return s

    // Create an array to represent each row in the zigzag pattern.
    // Each element is a string that collects characters for that row.
    // At the end, we'll join all rows together to form the final output.
    const rows = new Array(numRows).fill().map(() => '')

    // Keep track of which row a character belongs in
    let currentRowIndex = 0;
    // Controls direction: next row/down (1) or previous row/up (-1)
    let step = 1;

    for (const char of s) {
        rows[currentRowIndex] += char;
        // When you reach the top row
        if (currentRowIndex === 0) {
            // reverse diection back down
            step = 1
        }
        // When you reach the bottom row
        if (currentRowIndex === numRows - 1) {
            // reverse dirction back up
            step = -1
        }
        // Adjust which column we'll add to next
        currentRowIndex += step
    }

    return rows.join('')
};