/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function(n) {
    const combinations = [];

    function dfs (openCount, closedCount, combination) {
        // Record the combination when all parentheses have been used
        if (openCount === n && closedCount === n) {
            combinations.push(combination)
            return;
        }
        if(openCount < n) {
          // Explore all valid combinations
          // where an opening parenthesis is placed
          // at the current position in the sequence
            dfs(openCount + 1, closedCount, combination + "(")
        }
        // Allowing more closing than opening
        // violates the matching requirement
        if(closedCount < openCount) {
            // Explore all valid combinations
            // where a closing parenthesis is placed
            // at the current position in the sequence
            dfs(openCount, closedCount + 1, combination + ")")
        }
    }
    dfs(0, 0, "")
    return combinations;
};