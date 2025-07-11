/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function(m, n) {
    // Create a mxn matrix filled with 1s
    // stores the number of unique paths to any given tile
    const M = new Array(m).fill(new Array(n).fill(1))

    // For each row
    for (var rowIndex = 0; rowIndex < m; rowIndex++) {
        // For each column
        for (var columnIndex = 0; columnIndex < n; columnIndex++) {
            // There is only 1 way to get to the first tile in each row, e.g. go down
            if (rowIndex === 0) continue;
            // There is only 1 way to get to the first tile in each column, e.g. go right
            if (columnIndex === 0) continue;
            // The number of unique paths to any tile is the sum
            // of the unique paths to the tile above it and before it (left)
            M[rowIndex][columnIndex] = M[rowIndex - 1][columnIndex] + M[rowIndex][columnIndex - 1]
        }
    }
    // the number of paths to the bottom right tile
    return M[m-1][n-1]
};