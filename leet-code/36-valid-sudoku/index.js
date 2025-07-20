/**
 * @param {character[][]} board
 * @return {boolean}
 */
var isValidSudoku = function(board) {
    // store which digits have been seen
    let s = new Set()

    // Check 3x3 grid
    for (let g = 0; g < 9; g++) {
        let columnOffset; let rowOffset;
        // We can use math to compute this but ran out of time
        if (g === 0) { columnOffset = 0; rowOffset = 0 }
        if (g === 1) { columnOffset = 3; rowOffset = 0 }
        if (g === 2) { columnOffset = 6; rowOffset = 0 }
        if (g === 3) { columnOffset = 0; rowOffset = 3 }
        if (g === 4) { columnOffset = 3; rowOffset = 3 }
        if (g === 5) { columnOffset = 6; rowOffset = 3 }
        if (g === 6) { columnOffset = 0; rowOffset = 6 }
        if (g === 7) { columnOffset = 3; rowOffset = 6 }
        if (g === 8) { columnOffset = 6; rowOffset = 6 }
        for (let i = 0; i < 9; i++) {
            let colIndex = i % 3
            let rowIndex = Math.floor(i/3)
            const element = board[rowIndex + rowOffset][colIndex + columnOffset]
            if (element === '.') continue
            // identified rule violation
            if (s.has(element)) return false 
            s.add(element)
        }
        // reset for each new grid
        s = new Set()
    }
    // reset for next check
    s = new Set()
    // Check rows
    for (let i = 0; i < 9; i++) {
        const row = board[i]
        for (let j = 0; j < 9; j++) {
            const element = row[j]
            if (element === '.') continue;
            // identified rule violation
            if (s.has(element)) return false
            s.add(element)
        }
        // reset for each row
        s = new Set()
    }

    s = new Set();
    // Check columns
    for (let i = 0; i < 9; i++) {
        // The ith column in each row
        for (let j = 0; j < 9; j++) {
            const element = board[j][i]
            if (element === '.') continue;
            // identified rule violation
            if(s.has(element)) return false;
            s.add(element)
        }
        //reset for each column
        s = new Set()
    }

    // never found an invalid case
    return true;
};