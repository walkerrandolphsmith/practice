/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var setZeroes = function(matrix) {
    // store which rows and columns need to be zero-ed out
    const flags = {}
    // find the existing zeros 
    for(let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] !== 0) continue;
            // mark row and column to be mutated
            flags[`r${i}`] = true;
            flags[`c${j}`] = true;
        }
    }
    // mutate the matrix
    for(let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (flags[`r${i}`] || flags[`c${j}`]) matrix[i][j] = 0 
        }
    }

    return matrix;
};